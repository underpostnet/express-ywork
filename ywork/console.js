
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
  help: 'magenta',
  warn: 'yellow',
  debug: 'blue',
  error: ['red','underline']
});


function log(type, str){

  if(type=='error'){
    // console.log('error log ->');
    console.log(colors.error(str));

  }
  else if(type=='warn'){
    // console.log('warn log ->');
    console.log(colors.warn(str));

  }
  else if(type=='chat'){
    console.log(colors.help(str));

  }
  else if(type=='progress'){
    console.log(colors.verbose(str));

  }
  else if(type=='info'){
    // console.log('info log ->');
    console.log(colors.info(str));

  }else if(type=='ws'){
    // console.log('ws log ->');
    console.log(colors.data(str));

  }else {
    console.log('undefined log ->');
    console.log(str);
    console.log('-- end undefined log --');
  }

}

// outputs red text
// console.log(colors.error("this is an error"));

// outputs yellow text
// console.log(colors.warn("this is a warning"));
