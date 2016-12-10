'use strict';

// ** Constants
const DEFAULT_INPUT = './crm.csv';
const DEFAULT_OUTPUT = './output.txt';

// ** Dependencies
const _ = require('underscore');
const Q = require('bluebird');
const util = require('util');
const fs = require('fs');
const csv = require('fast-csv');
const DataProcess = require('dataprocess').DataProcess;
const lookupCompanyName = require('./lookup-company-name.js');
const lookupCompanyUrl = require('./lookup-company-url.js');

/**
 * Create a readable stream from a CSV file
 * @param filename
 */
function createCSVStream(filename) {

    const filestream = fs.createReadStream(filename);

    return filestream.pipe(csv({headers: true}));
}

// ** Run the program
module.exports = (input, output) => {

    // Argument Defaults
    input = input || DEFAULT_INPUT;
    output = output || DEFAULT_OUTPUT;

    // Open an output file stream
    const output_stream = fs.createWriteStream(output);
    output_stream.write('Matches:\n');

    // Create DataProcess
    const process = DataProcess('match-companies')
        .map('lookup-company', entry => Q.all(
            lookupCompanyName(entry['Name']),
            lookupCompanyUrl(entry['URL'])
        ))
        .map('select-ids', matches => _.map(matches, _.property('id'))) // Select Just the IDS
        .map('join-ids', ids => ids.join(','))
        .map('output-results', results => output_stream.write(results + '\n'));

    // Run the match companies dataprocess against the input file
    return process
        .run(createCSVStream(input))
        // Wait for the process to finish
        .complete()
        // Output stats to STDERR
        .done(() => console.error(process.stats()));
};