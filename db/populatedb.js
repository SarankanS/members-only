#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_member BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE   
);
`
async function main() {
  console.log("Seeding members only database...");
  const client = new Client({
    connectionString: "postgresql://sarankansrikaran:@localhost:5432/members_only",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done.");
}

main();