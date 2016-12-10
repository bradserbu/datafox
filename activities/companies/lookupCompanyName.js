'use strict';

// ** Constants
const DEFAULT_IGNORE_CASE = true;

// ** Dependencies
const _ = require('underscore');
const util = require('util');
const Activity = require('dataprocess').Activity;
const DB = require('./db.json');

/**
 * Search the DataFox Companies Database for a specified company name.
 * @param name - The name of the company to search for.
 * @param ignoreCase - (default:true) Option to ignore case when matching string name.
 * @param match - Optionaly specify which fields to search in the database.
 */
function lookupCompanyName(name, ignoreCase) {

    // Argument Defaults
    ignoreCase = util.isNullOrUndefined(ignoreCase)
        ? DEFAULT_IGNORE_CASE
        : util.isString(ignoreCase)
        ? ignoreCase !== 'false'
        : ignoreCase;

    // Build a Regular Expression to search for name
    const regex = new RegExp(name, ignoreCase ? 'i' : '');

    // Function to test if a string matches the name regex
    const matchName = name => regex.test(name);

    // Function to split name into words
    const words = text => text.match(/\w*\w/g);

    // Function to check if any of the match properties contain the company name
    const matchCompany = company => _.any(words(company['name']), matchName);

    // Search Database for any matching companies
    const matches = _.filter(DB, matchCompany);

    // Return List of matches
    return matches;
}

/**
 * Create an Activity to lookup a company by name.
 * - An Activity provides statistics, debug information, global error handlers, automatically.
 */
const lookupCompanyNameActivity = Activity('lookup-company-name', lookupCompanyName);

/**
 * Export a function to search for a company by name
 * - Uses a global activity to track usage information during the lifetime of the application.
 * @param name
 * @returns {*}
 */
module.exports = (name, ignoreCase) => {

    // Call the lookup company name activity
    return lookupCompanyNameActivity.run(name, ignoreCase);
};