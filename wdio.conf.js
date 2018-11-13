/* eslint-disable global-require */
const defaultTimeoutInterval = process.env.DEBUG ? 60 * 60 * 500 : 90000;

exports.config = {
  specs: ['./features/*.feature'],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  maxInstances: 10,

  capabilities: [
    {
      browserName: 'chrome',
      // platform: 'Windows 10',
      // version: '50.0',
      maxInstances: '5',
    },
  ],
  sync: true,
  logLevel: 'silent', // Level of logging verbosity: silent | verbose | command | data | result | error
  coloredLogs: true, // Enables colors for log output.
  screenshotPath: './reports/errorShots/', // Saves a screenshot to a given path if a command fails.
  baseUrl: 'http://computer-database.herokuapp.com',
  waitforTimeout: 90000, // Default timeout for all waitFor* commands.
  connectionRetryTimeout: 90000, // Default timeout in milliseconds for request  if Selenium Grid doesn't send response
  connectionRetryCount: 3, // Default request retries count
  services: ['selenium-standalone'],

  framework: 'cucumber',
  reporters: ['spec', 'junit', 'allure', 'json'],

  reporterOptions: {
    junit: { outputDir: './reports/junit-results/' },
    json: { outputDir: './reports/json-results/' },
    allure: {
      outputDir: './reports/allure-results/',
      disableWebdriverStepsReporting: false,
      useCucumberStepReporter: false,
    },
  },

  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    require: ['./steps/given.js', './steps/when.js', './steps/then.js'], // <string[]> (file/dir) require files before executing features
    backtrace: true, // <boolean> show full backtrace for errors
    compiler: ['js:babel-register'], // <string[]> filetype:compiler used for processing required features
    failAmbiguousDefinitions: true, // <boolean< Treat ambiguous definitions as errors
    dryRun: false, // <boolean> invoke formatters without executing steps
    failFast: false, // <boolean> abort the run on first failure
    ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings
    name: [], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    snippets: true, // <boolean> hide step definition snippets for pending steps
    format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true, // <boolean> disable colors in formatter output
    source: false, // <boolean> hide source uris
    profile: [], // <string[]> (name) specify the profile to use
    strict: true, // <boolean> fail if there are any undefined or pending steps
    tagExpression: 'not @Manual', // <string> (expression) only execute the features or scenarios with tags matching the expression, see https://docs.cucumber.io/tag-expressions/
    timeout: defaultTimeoutInterval, // <number> timeout for step definitions
    tagsInTitle: false, // <boolean> add cucumber tags to feature or scenario name
    snippetSyntax: undefined, // <string> specify a custom snippet syntax
  },
  before: function() {
    /**
     * Setup the Chai assertion framework
     */
    const chai = require('chai');
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
  },
};
