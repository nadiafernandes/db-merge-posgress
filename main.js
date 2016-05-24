var cfenv = require('cfenv'), //to deploy in a cloud foundry server
    childProcess = require('child_process').exec,
    appEnv = cfenv.getAppEnv(),
    config = require('./config'),
    data = {};


if (appEnv["services"]["hsdp-postgres"]) {
    //create data.json file
    data = {
        "pg": {
            "driver": "pg",
            "user": appEnv["services"]["hsdp-postgres"][0].credentials.username,
            "password": appEnv["services"]["hsdp-postgres"][0].credentials.password,
            "host": appEnv["services"]["hsdp-postgres"][0].credentials.host,
            "database": appEnv["services"]["hsdp-postgres"][0].credentials.name,
            "schema": "my_schema"
        }
    };
}
else {
    data = {
        "pg": {
            "driver": "pg",
            "user": "",
            "password": "",
            "host": config.sql.server,
            "database": config.sql.database,
            "schema": "my_schema"
        }
    };
}

var fs = require('fs');
//write database.json, because is a different file if we connect locally or to cloud foundry service
fs.writeFile(__dirname + "/database.json", JSON.stringify(data), function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The data.json was saved!");

    //docs to guide the database migration
    //https://db-migrate.readthedocs.io/en/latest/ check docs
    //https://bitbucket.org/juanseph/bytefilia/src/768104a8e5a1fa7b98f2e17e55aef2b5c03bcfca/node_db_migrate_tutorial/?at=master
    var cmd = "./node_modules/db-migrate/bin/db-migrate up -m ./migrations -e pg --config ./migrations/database.json";
    childProcess(cmd, function (error, stdout, stderr) {
        if (error) {
            console.log("migration not done", error, stderr);
            return;
        }
        console.log("migration done");
    });
});
