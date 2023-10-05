
## Required steps before running the application

Create and execute the postgres container
```
docker run -d --name postgresCont -p 15432:5432 -e POSTGRES_PASSWORD=test123 postgres
```
Get into the postgres container bash
```
docker exec -it postgresCont bash
```
Get into postgres
```
psql -h localhost -U postgres
```
Create database with the following command
```
create database searchhistory_database;
```
Use the new database
```
\c searchhistory_database
```
Create the table inside the database
```
CREATE TABLE search_history( id SERIAL PRIMARY KEY, text VARCHAR(1000));
```
Now the databse is ready to be used by the express.js server.

## Running the express.js server

```
cd node-server
```
```
npm install
```
```
node index.js
```


## Running the react application
From the root folder go into the react application folder
```
cd react-app
```
```
npm install
```
```
npm run dev
```