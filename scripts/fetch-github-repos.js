// Script to fetch pinned GitHub repositories and profile stats
const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config({path: path.join(__dirname, '../.env')});

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
    console.warn(
        "GITHUB_USERNAME and/or GITHUB_TOKEN are not set — skipping GitHub repo fetch " +
        "and keeping the committed public/data/staticGithubData.json as-is."
    );
    process.exit(0);
}

console.log(`Fetching GitHub data for user: ${GITHUB_USERNAME}`);

// Calendar-year window (Jan 1 - Dec 31), matching GitHub's own profile
// contribution graph — contributionsCollection defaults to a rolling
// past-365-days window unless from/to are given explicitly.
const CALENDAR_YEAR = new Date().getFullYear();
const YEAR_START = `${CALENDAR_YEAR}-01-01T00:00:00Z`;
const YEAR_END = `${CALENDAR_YEAR}-12-31T23:59:59Z`;

async function fetchGitHubData() {
    return new Promise((resolve, reject) => {
        const query = `
            query {
                user(login: "${GITHUB_USERNAME}") {
                    pinnedItems(first: 6, types: [REPOSITORY]) {
                        nodes {
                            ... on Repository {
                                id
                                name
                                description
                                url
                                stargazerCount
                                forkCount
                                primaryLanguage {
                                    name
                                    color
                                }
                                repositoryTopics(first: 10) {
                                    nodes {
                                        topic {
                                            name
                                        }
                                    }
                                }
                                updatedAt
                            }
                        }
                    }
                    followers {
                        totalCount
                    }
                    pullRequests {
                        totalCount
                    }
                    issues {
                        totalCount
                    }
                    repositoriesContributedTo(first: 1, includeUserRepositories: false, contributionTypes: [COMMIT, PULL_REQUEST, ISSUE, REPOSITORY]) {
                        totalCount
                    }
                    contributionsCollection(from: "${YEAR_START}", to: "${YEAR_END}") {
                        totalPullRequestReviewContributions
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    contributionCount
                                    date
                                }
                            }
                        }
                    }
                    repositories(first: 100, ownerAffiliations: [OWNER], isFork: false, privacy: PUBLIC) {
                        totalCount
                        nodes {
                            stargazerCount
                            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                                edges {
                                    size
                                    node {
                                        name
                                        color
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

        const data = JSON.stringify({query});

        const options = {
            hostname: 'api.github.com', path: '/graphql', method: 'POST', headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Node.js GitHub Fetcher',
                'Authorization': 'Bearer ' + GITHUB_TOKEN,
            }
        };

        console.log('Making GraphQL request to fetch GitHub data...');

        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    console.log(`GraphQL Response Status: ${res.statusCode}`);

                    if (res.statusCode !== 200) {
                        console.error('GraphQL Error:', responseData);
                        return reject(new Error(`GraphQL request failed with status ${res.statusCode}`));
                    }

                    const parsedData = JSON.parse(responseData);

                    if (parsedData.errors) {
                        console.error('GraphQL Errors:', parsedData.errors);
                        return reject(new Error('GraphQL query returned errors'));
                    }

                    if (!parsedData.data || !parsedData.data.user || !parsedData.data.user.pinnedItems) {
                        console.error('Unexpected response structure:', parsedData);
                        return reject(new Error('Unexpected GraphQL response structure'));
                    }

                    const user = parsedData.data.user;
                    const pinnedRepos = user.pinnedItems.nodes;
                    console.log(`Found ${pinnedRepos.length} pinned repositories`);

                    // Flatten topics array for each repo and remove repositoryTopics field
                    const mappedRepos = pinnedRepos.map(repo => {
                        const topics = (repo.repositoryTopics?.nodes || [])
                            .map(n => n.topic?.name)
                            .filter(Boolean);

                        // Shallow copy, then remove repositoryTopics and add topics
                        const {
                            repositoryTopics, // eslint-disable-line no-unused-vars
                            ...rest
                        } = repo;

                        return {
                            ...rest, topics,
                        };
                    });

                    const allRepos = user.repositories.nodes;
                    const totalStars = allRepos.reduce((sum, r) => sum + r.stargazerCount, 0);

                    // Byte-weighted language breakdown (bytes of code per language,
                    // summed across every repo's full language list) instead of just
                    // counting how many repos have each language as "primary" — a
                    // large repo shouldn't count the same as a one-file script.
                    const languageBytes = new Map();
                    allRepos.forEach(r => {
                        (r.languages?.edges || []).forEach(edge => {
                            const key = edge.node.name;
                            const existing = languageBytes.get(key);
                            if (existing) {
                                existing.bytes += edge.size;
                            } else {
                                languageBytes.set(key, {
                                    name: key, color: edge.node.color, bytes: edge.size,
                                });
                            }
                        });
                    });
                    const totalLanguageBytes = [...languageBytes.values()]
                        .reduce((sum, l) => sum + l.bytes, 0);
                    const toPercent = bytes => totalLanguageBytes > 0
                        ? Math.round((bytes / totalLanguageBytes) * 1000) / 10
                        : 0;

                    const sortedLanguages = [...languageBytes.values()]
                        .sort((a, b) => b.bytes - a.bytes);
                    const topLanguages = sortedLanguages.slice(0, 5).map(l => ({
                        name: l.name,
                        color: l.color,
                        percent: toPercent(l.bytes),
                    }));

                    const othersBytes = sortedLanguages.slice(5)
                        .reduce((sum, l) => sum + l.bytes, 0);
                    if (othersBytes > 0) {
                        topLanguages.push({
                            name: 'Others',
                            color: '#6b7280',
                            percent: toPercent(othersBytes),
                        });
                    }

                    const calendar = user.contributionsCollection.contributionCalendar;
                    const contributionWeeks = calendar.weeks.map(week => ({
                        days: week.contributionDays.map(d => ({
                            date: d.date, count: d.contributionCount,
                        })),
                    }));

                    // Weeks/days come chronologically ascending, so the streak
                    // scan just walks the flattened list from the end (today)
                    // backwards for "current", and forwards for "longest".
                    // The requested range runs to Dec 31, and GitHub returns
                    // the future remainder of the year as zero-count days —
                    // scan only up to today, or the backward walk starts in
                    // months of guaranteed zeros and always reports 0.
                    const allDays = contributionWeeks.flatMap(w => w.days);
                    const today = new Date().toISOString().slice(0, 10);
                    const pastDays = allDays.filter(d => d.date <= today);
                    let currentStreak = 0;
                    for (let i = pastDays.length - 1; i >= 0; i--) {
                        if (pastDays[i].count > 0) {
                            currentStreak++;
                        } else if (i === pastDays.length - 1) {
                            // No contributions *yet* today — the day isn't
                            // over, so it doesn't break the streak.
                        } else {
                            break;
                        }
                    }
                    let longestStreak = 0;
                    let longestStreakStart = null;
                    let longestStreakEnd = null;
                    let running = 0;
                    let runStart = null;
                    for (const day of pastDays) {
                        if (day.count > 0) {
                            if (running === 0) runStart = day.date;
                            running++;
                            if (running > longestStreak) {
                                longestStreak = running;
                                longestStreakStart = runStart;
                                longestStreakEnd = day.date;
                            }
                        } else {
                            running = 0;
                        }
                    }

                    const stats = {
                        totalStars,
                        totalPublicRepos: user.repositories.totalCount,
                        totalContributions: calendar.totalContributions,
                        followers: user.followers.totalCount,
                        totalPullRequests: user.pullRequests.totalCount,
                        totalIssues: user.issues.totalCount,
                        totalReviews: user.contributionsCollection.totalPullRequestReviewContributions,
                        repositoriesContributedTo: user.repositoriesContributedTo.totalCount,
                        currentStreak,
                        longestStreak,
                        longestStreakStart,
                        longestStreakEnd,
                        calendarYear: CALENDAR_YEAR,
                        measurementStart: allDays[0]?.date || null,
                        measurementEnd: allDays[allDays.length - 1]?.date || null,
                        topLanguages,
                        contributionWeeks,
                    };

                    resolve({repositories: mappedRepos, stats});
                } catch (error) {
                    reject(new Error(`Error processing GraphQL response: ${error.message}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error(`Network error during GraphQL request: ${error.message}`));
        });

        req.write(data);
        req.end();
    });
}

// GitHub's search API can count every commit authored by a user across all
// (searchable) repos, all-time — not just the past-year contribution
// calendar the GraphQL API exposes. Resolves null (rather than rejecting)
// on any failure so a rate-limited/unavailable search endpoint doesn't
// take down the rest of the stats fetch.
async function fetchTotalCommits() {
    return new Promise((resolve) => {
        const options = {
            hostname: 'api.github.com',
            path: `/search/commits?q=author:${encodeURIComponent(GITHUB_USERNAME)}`,
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github+json',
                'User-Agent': 'Node.js GitHub Fetcher',
                'Authorization': 'Bearer ' + GITHUB_TOKEN,
            },
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode !== 200) {
                        console.warn(`Commit search API returned ${res.statusCode}, skipping total commit count.`);
                        return resolve(null);
                    }
                    const parsed = JSON.parse(body);
                    resolve(typeof parsed.total_count === 'number' ? parsed.total_count : null);
                } catch (error) {
                    console.warn('Failed to parse commit search response:', error.message);
                    resolve(null);
                }
            });
        });

        req.on('error', (error) => {
            console.warn('Commit search API request failed:', error.message);
            resolve(null);
        });

        req.end();
    });
}

// A simplified, clearly-approximate take on github-readme-stats' "rank"
// card: each metric is mapped to a 0-1 percentile via an exponential CDF
// (0 at zero activity, 0.5 at its baseline, approaching 1 well beyond it),
// then combined into a weighted overall score. The baselines/weights below
// are reasonable heuristic guesses, not a reproduction of that project's
// actual (undisclosed) tuning.
const RANK_BASELINES = {commits: 250, prs: 50, issues: 25, reviews: 2, stars: 50, followers: 10};
const RANK_WEIGHTS = {commits: 2, prs: 3, issues: 1, reviews: 1, stars: 4, followers: 1};

function percentileFor(value, baseline) {
    return 1 - Math.pow(2, -value / baseline);
}

function computeRank({commits, prs, issues, reviews, stars, followers}) {
    const scores = {
        commits: percentileFor(commits, RANK_BASELINES.commits),
        prs: percentileFor(prs, RANK_BASELINES.prs),
        issues: percentileFor(issues, RANK_BASELINES.issues),
        reviews: percentileFor(reviews, RANK_BASELINES.reviews),
        stars: percentileFor(stars, RANK_BASELINES.stars),
        followers: percentileFor(followers, RANK_BASELINES.followers),
    };

    const totalWeight = Object.values(RANK_WEIGHTS).reduce((a, b) => a + b, 0);
    const weightedSum = Object.keys(RANK_WEIGHTS)
        .reduce((sum, key) => sum + scores[key] * RANK_WEIGHTS[key], 0);
    const percentile = Math.round((weightedSum / totalWeight) * 1000) / 10;

    let grade;
    if (percentile >= 95) grade = 'S';
    else if (percentile >= 87) grade = 'A+';
    else if (percentile >= 75) grade = 'A';
    else if (percentile >= 60) grade = 'A-';
    else if (percentile >= 45) grade = 'B+';
    else if (percentile >= 30) grade = 'B';
    else grade = 'C';

    return {percentile, grade};
}

async function main() {
    console.log('Trying to fetch GitHub data first...');

    try {
        const [{repositories, stats}, totalCommits] = await Promise.all([
            fetchGitHubData(),
            fetchTotalCommits(),
        ]);

        stats.totalCommits = totalCommits;
        if (totalCommits !== null) {
            stats.rank = computeRank({
                commits: totalCommits,
                prs: stats.totalPullRequests,
                issues: stats.totalIssues,
                reviews: stats.totalReviews,
                stars: stats.totalStars,
                followers: stats.followers,
            });
        }

        saveGitHubData(repositories, stats);
    } catch (error) {
        console.error(
            'Error fetching GitHub data, keeping committed staticGithubData.json:',
            error.message
        );
    }
}

function saveGitHubData(repositories, stats) {
    const outputData = {
        repositories, stats, lastFetched: new Date().toISOString(),
    };

    const outputPath = path.join(__dirname, '../public/data/staticGithubData.json');
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

    console.log(`✅ Successfully saved ${repositories.length} repositories and stats to ${outputPath}`);
}

main();
