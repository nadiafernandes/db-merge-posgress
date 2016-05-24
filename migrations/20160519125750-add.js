'use strict';

var dbm;
var type;
var seed;

//check docs
/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db, callback) {
    var data = [
        'CREATE TABLE "test" ("sid" varchar NOT NULL COLLATE "default", "sess" json NOT NULL, "expire" timestamp(6) NOT NULL) WITH (OIDS=FALSE);'
    ];
    db.runSql(data[0], function (err) {
        if (err) return console.log(err);
        callback()
    });
    callback();
};

exports.down = function (db, callback) {
    callback()
};
