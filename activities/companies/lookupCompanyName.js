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

    // STUB: Return the first entry from the database
    return _.filter(DB, company => regex.test(company['name']));
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