const { Pool } = require('pg');

// uses environment variables to create connect
// READ: https://node-postgres.com/features/connecting
// important variables:
// PGUSER
// PGHOST
// PGDATABASE
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
//  ssl: {
//    rejectUnauthorized: false,
//  },
});

module.exports = {
  query: function(text, values) {
    return pool.query(text, values);
  },
};
