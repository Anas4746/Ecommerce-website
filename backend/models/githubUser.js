
const mongoose = require('mongoose');

const GithubUser = mongoose.model('GithubUser', new mongoose.Schema({}, { strict: false }), 'githubUsers');

module.exports = GithubUser;