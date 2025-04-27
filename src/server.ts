import express from 'express';
import { Client } from 'pg';
import mysql from 'mysql2/promise';
import Redis from 'ioredis';

const app = express();

app.get('/api/health', async (_, res) => {
  // Postgres テスト
  const pg = new Client();
  await pg.connect();
  const pgVer = (await pg.query('SELECT version()')).rows[0];
  await pg.end();

  // MySQL テスト
  const my = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
  const [myVer] = await my.query('SELECT VERSION()');
  await my.end();

  // Redis テスト
  const rd = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  });
  const ping = await rd.ping();
  rd.disconnect();

  res.json({ postgres: pgVer, mysql: myVer, redis: ping });
});

app.listen(3000, () => console.log('Server listening on port 3000'));
