const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const { env, validateEnv } = require('./src/config/env');
validateEnv();

const app = express();

app.use(cors({
    origin: env.CORS.ORIGIN,
    credentials: env.CORS.CREDENTIALS
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

const routes = require('./src/routes/index');
app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error('Error:', err);

    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

const pool = new Pool({
    connectionString: env.DATABASE.URL,
    host: env.DATABASE.HOST,
    port: env.DATABASE.PORT,
    database: env.DATABASE.NAME,
    user: env.DATABASE.USER,
    password: env.DATABASE.PASSWORD,
    ssl: env.DATABASE.SSL,
    max: env.DATABASE.POOL.MAX,
    idleTimeoutMillis: env.DATABASE.POOL.IDLE_TIMEOUT,
    connectionTimeoutMillis: env.DATABASE.POOL.CONNECTION_TIMEOUT,
});

pool.connect()
    .then(client => {
        console.log('❤️  Connected to PostgreSQL successfully');
        client.release();
    })
    .catch(err => {
        console.error('❌ PostgreSQL connection error:', err);
        process.exit(1);
    });

global.db = pool;

app.listen(env.PORT, () => {
    console.log(`🚀 Server is running on port ${env.PORT}`);
    console.log(`📍 Environment: ${env.NODE_ENV}`);
    console.log(`💾 Database: ${env.DATABASE.HOST}:${env.DATABASE.PORT}/${env.DATABASE.NAME}`);
});