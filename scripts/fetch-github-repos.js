// Script to fetch pinned GitHub repositories
const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config({path: path.join(__dirname, '../.env')});

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
    throw new Error("Environment variables GITHUB_USERNAME and GITHUB_TOKEN must be defined.");
}

console.log(`Fetching pinned repositories for GitHub user: ${GITHUB_USERNAME}`);

async function fetchPinnedRepos() {
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
                        updatedAt
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

        console.log('Making GraphQL request to fetch pinned repositories...');

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

                    const pinnedRepos = parsedData.data.user.pinnedItems.nodes;
                    console.log(`Found ${pinnedRepos.length} pinned repositories`);

                    resolve(pinnedRepos);
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
    try {
        console.log('Trying to fetch pinned repositories first...');

        try {
            const pinnedRepos = await fetchPinnedRepos();
            saveRepositories(pinnedRepos);
        } catch (pinnedError) {
            console.error('Error fetching pinned repositories:', pinnedError.message);
        }
    } catch (error) {
        console.error('Fatal error:', error.message);
        process.exit(1);
    }
}

function saveRepositories(repositories) {
    const outputData = {
        repositories, lastFetched: new Date().toISOString()
    };

    const outputPath = path.join(__dirname, '../public/data/staticGithubData.json');
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

    console.log(`✅ Successfully saved ${repositories.length} repositories to ${outputPath}`);
}

main();