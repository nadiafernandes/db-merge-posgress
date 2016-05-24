# db-migration-posgress

## installation
- install **PostgreSQL** and create a database named **migration-test**
- npm install
- set environment (e.g. 'dev')
- run node main.js

##main.js
- executes the migration scripts, can use database json of local conection of from a conection with a cloud foundry server

./node_modules/db-migrate/bin/db-migrate up -m ./migrations -e pg --config ./migrations/database.json

up: used up to inform that new things will be added in the database
-m: indicates the path to migration folder
-e: environment used
-config: file with details to database

