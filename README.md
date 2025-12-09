# WAD Homework 4

## Running the Application

### Install PostgreSQL

https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

We used default password of admin on port 5432

Open the pgAdmin tool.
Log into Postgre
Create -> Database
Name it wad_app

#### Database Setup (macOS)

Have homebrew installed

```bash
brew install postgresql
createuser -s postgres
createdb wad_app
```

### Server
```bash
cd server
npm install
npm start
```
Server runs on http://localhost:3000

### Client
```bash
cd client
npm installs
npm run serve
```
Client runs on http://localhost:8080