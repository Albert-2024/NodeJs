const {format} = require('date-fns');
const {v4: uuid} = require('uuid');

const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

console.log(format(new Date(),'yyyy/MM/dd\tHH:mm:ss'));

console.log(uuid());