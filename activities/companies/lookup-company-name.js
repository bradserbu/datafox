'use strict';

// ** Constants
const DEFAULT_IGNORE_CASE = true;
const DEFAULT_MATCH = ['name', 'corporate_names'];
const DEFAULT_STOPWORDS = [
    /\bthe\b/ig,
    /\bllc\b/ig, /l.l.c./ig,
    /\bcorporation\b/ig, /\bcorp\b/ig,
    /\binc\b/ig, /\bIncorporated\b/ig
];

// ** Dependencies
const _ = require('underscore');
const util = require('util');
const Activity = require('dataprocess').Activity;
const DB = require('./db.json');

/**
 * Remove all instances of quotations in a string
 * @param text
 * @returns {void|XML|string|*}
 */
function trimQuotes(text) {
    return util.isString(text) ? text.replace(/['"]+/g, '') : text;
}

/**
 * Splits text into it's word components
 * @param text
 * @returns {Array|{index: number, input: string}|*}
 */
function words (text) {
    return text.match(/\w*\w/g);
}

/**
 * Remove Stop Words
 * @param text
 * @param stopWords
 * @returns {*}
 */
function removeStopWords(text, stopWords) {

    stopWords = stopWords || DEFAULT_STOPWORDS;

    stopWords.forEach(word => {
        text = text.replace(word, '');
    });

    return text;
}

/**
 * Search the DataFox Companies Database for a specified company name.
 * @param name - The name of the company to search for.
 * @param ignoreCase - (default:true) Option to ignore case when matching string name.
 * @param match - Optionaly specify which fields to search in the database.
 */
function lookupCompanyName(name, ignoreCase, match) {

    // Trim quotes from search term
    name = trimQuotes(name);

    // Remove Stop Words
    name = removeStopWords(name);

    console.error('NAME:', name);

    // Build a Regular Expression to search for name
    const regex = new RegExp(name, ignoreCase ? 'i' : '');

    // Function to test if a string matches the name regex
    const matchName = text => util.isString(text) && regex.test(removeStopWords(text));

    // Function to check if a company property matches the company name
    const matchProperty = (company, property) =>
        util.isArray(company[property])
            ? _.any(company[property], matchName)
            : matchName(company[property]);

    // Function to check if any of the match properties contain the company name
    const matchCompany = company => _.any(match, property => matchProperty(company, property));

    // Search Database for any matching companies
    const matches = _.filter(DB, matchCompany);

    // Return List of matches
    return matches;
}

/**
 * Create an Activity to lookup a company by name.
 * - An Activity provides statistics, debug information, global error handlers, automatically.
 */
const lookupCompanyNameActivity = Activity('lookup-company-name', lookupCompanyName, {
    logArguments: true
});

/**
 * Export a function to search for a company by name
 * - Uses a global activity to track usage information during the lifetime of the application.
 * @param name
 * @returns {*}
 */
module.exports = (name, ignoreCase, match) => {

    if (util.isNullOrUndefined(name))
        throw Error('REQUIRED_ARG: "name" is a required argument.');

    // Argument Defaults
    ignoreCase = util.isNullOrUndefined(ignoreCase)
        ? DEFAULT_IGNORE_CASE
        : util.isString(ignoreCase)
        ? ignoreCase !== 'false'
        : ignoreCase;

    match = util.isNullOrUndefined(match)
        ? DEFAULT_MATCH
        : util.isArray(match)
        ? match
        : util.isString(match)
        ? match.split(',')
        : DEFAULT_MATCH;

    // Call the lookup company name activity
    return lookupCompanyNameActivity.run(name, ignoreCase, match);
};