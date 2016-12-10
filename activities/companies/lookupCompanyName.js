'use strict';

// ** Dependencies
const _ = require('underscore');
const util = require('util');
const Activity = require('dataprocess').Activity;
const DB = require('./db.json');

/**
 * Search the DataFox Companies Database for a specified company name
 * @param name - The name of the company to search for
 */
function lookupCompanyName(name) {

    // STUB: Return the first entry from the database
    return _.first(DB);
}

/**
 * Create an Activity to lookup a company by name.
 * - An Activity provides statistics, debug information, global error handlers, automatically
 */
const lookupCompanyNameActivity = Activity('lookup-company-name', lookupCompanyName);

/**
 * Export a function to search for a company by name
 * - Uses a global activity to track usage information during the lifetime of the application.
 * @param name
 * @returns {*}
 */
module.exports = name => {

    // Call the lookup company name activity
    return lookupCompanyNameActivity.run(name);
};