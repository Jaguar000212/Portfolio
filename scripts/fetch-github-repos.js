// Script to fetch pinned GitHub repositories and flatten topics array
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
                    contributionsCollection {
                        contributionCalendar {
                            totalContributions
                        }
                    }
                    repositories(first: 100, ownerAffiliations: [OWNER], isFork: false, privacy: PUBLIC) {
                        totalCount
                        nodes {
                            stargazerCount
                            primaryLanguage {
                                name
                                color
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

                    const languageCounts = new Map();
                    allRepos.forEach(r => {
                        if (!r.primaryLanguage) return;
                        const key = r.primaryLanguage.name;
                        const existing = languageCounts.get(key);
                        if (existing) {
                            existing.count += 1;
                        } else {
                            languageCounts.set(key, {
                                name: key, color: r.primaryLanguage.color, count: 1,
                            });
                        }
                    });
                    const topLanguages = [...languageCounts.values()]
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 4);

                    const stats = {
                        totalStars,
                        totalPublicRepos: user.repositories.totalCount,
                        totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
                        topLanguages,
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

async function main() {
    console.log('Trying to fetch GitHub data first...');

    try {
        const {repositories, stats} = await fetchGitHubData();
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