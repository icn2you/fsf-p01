// jQuery
const $ = require('jQuery');

// Load the full build.
var _ = require('lodash');

console.log('Testing webpack.dev.config!!');

// Test if jQuery works
const divEl = $('<div>').text('TEST!!!');
$('body').append(divEl);

// Test if Lodash works
const users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];

console.log(_.filter(users, (o) => !o.active));
// => objects for ['fred']