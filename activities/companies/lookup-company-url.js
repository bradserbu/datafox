'use strict';

// ** Constants
const URLS_PROPERTY = 'urls';

// ** Dependencies
const _ = require('underscore');
const URL = require('url');
const compareUrls = require('compare-urls');
const util = require('util');
const Activity = require('dataprocess').Activity;
const DB = require('./db.json');

/**
 * Search the DataFox Companies Database for a specified company url.
 * @param url - The url of the company to search for.
 */
function lookupCompanyUrl(url) {

    // console.error('URL', url);

    // Function to check if any of the match properties contain the company name
    // const matchCompany = company => _.any(company[URLS_PROPERTY],
    //     compare => util.isNullOrUndefined(compare) === false && new RegExp(url, 'i').test(compare)
    // );
    // const matchCompany = company => company[URLS_PROPERTY].indexOf(url) !== -1;

    const matchURL = compare => {

        try {
            return compareUrls(url, compare);
        } catch (err) {
        }
    };

    const matchCompany = company => _.any(company[URLS_PROPERTY], matchURL);

    // Search Database for any matching companies
    const matches = _.filter(DB, matchCompany);

    // Return List of matches
    return matches;
}

/**
 * Create an Activity to lookup a company by URL.
 * - An Activity provides statistics, debug information, global error handlers, automatically.
 */
const lookupCompanyUrlActivity = Activity('lookup-company-url', lookupCompanyUrl, {
    logArguments: true
});

/**
 * Export a function to search for a company by URL
 * - Uses a global activity to track usage information during the lifetime of the application.
 * @param url
 * @returns {*}
 */
module.exports = (url) => {

    if (util.isNullOrUndefined(url))
        throw Error('REQUIRED_ARG: "url" is a required argument.');

    // Call the lookup company name activity
    return lookupCompanyUrlActivity.run(url);
};