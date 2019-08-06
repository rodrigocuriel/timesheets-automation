require('dotenv').config();

module.exports = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    newPassword: process.env.NEW_PASSWORD,
    INNOTAS_URL: process.env.INNOTAS_URL,
    JIRA_URL: process.env.JIRA_URL,
    BITBUCKET_URL: process.env.BITBUCKET_URL,
    CONFLUENCE_URL: process.env.CONFLUENCE_URL,
    PASSWORD_RESET_URL: process.env.PASSWORD_RESET_URL
};