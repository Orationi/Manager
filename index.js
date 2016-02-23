'use strict';

require('babel-core/register')({});
require('babel-polyfill');

if (process.env.NODE_ENV !== 'production') {
  global.__DEBUG__ = true;
} else {
  global.__DEBUG__ = false;
}

var server = require('./src/server').default;

const PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log('Server listening on: ' + PORT);
});
