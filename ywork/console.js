
// https://www.npmjs.com/package/colors
var colors = require('colors/safe');

// set single property
// var error = colors.red;
// error('this is red');

// set theme
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: ['red','underline']
});

// outputs red text
// console.log(colors.error("this is an error"));

// outputs yellow text
// console.log(colors.warn("this is a warning"));
