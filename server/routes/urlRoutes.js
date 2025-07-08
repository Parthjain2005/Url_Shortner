import express from 'express';
import pool from '../db.js';
import { nanoid } from 'nanoid';

const router = express.Router();

// POST /shorten - generate short URL
router.post('/shorten', async (req, res) => {
  let { original_url } = req.body;
  // Ensure the URL starts with http:// or https://
  if (!/^https?:\/\//i.test(original_url)) {
    original_url = 'http://' + original_url;
  }
  const slug = nanoid(6);

  try {
    await pool.query(
      'INSERT INTO urls (slug, original_url) VALUES ($1, $2)',
      [slug, original_url]
    );
    res.json({ short_url: `http://localhost:3000/${slug}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

// GET /:slug - redirect to original URL
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  const result = await pool.query(
    'SELECT original_url FROM urls WHERE slug = $1',
    [slug]
  );

  if (result.rowCount === 0) {
    return res.status(404).send('Not found');
  }

  res.redirect(result.rows[0].original_url);
});

export default router;
