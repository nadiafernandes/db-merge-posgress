'use strict';

module.exports = {
    title: 'test-mig',
    root: 'http://localhost:3000/',
    sql: {
        server: '127.0.0.1',
        database: 'test-mig',
        dialect: 'postgres',
        enableLogging: console.log
    }
};