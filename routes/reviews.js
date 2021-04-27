const express = require('express');
const router = express.Router();

const pool = require('./db');

async function getAll() {
  const result = await pool.query('select * from tv_reviews');
  return result.rows;
}

async function getFilter(tv_show) {
  const result = await pool.query('select * from tv_reviews where tv_show = $1', [tv_show]);
  return result.rows;
}

async function insert(tv_show, review) {
  await pool.query('insert into tv_reviews (tv_show, review) values ($1, $2)', [tv_show, review]);
}

router.get('/', async (req, res) => {
  res.json(await getAll());
});

router.get('/filter', async (req, res) => {
  res.json(await getFilter(tv_show));
});

router.post('/', async (req, res) => {
  const { tv_show, review } = req.body;
  await insert(tv_show, review);
  res.end();
});

module.exports = router;
