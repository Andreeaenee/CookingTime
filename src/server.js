const express = require('express');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const PORT = 8080;

// PostgreSQL pool configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cooking_time',
  password: 'postgres',
  port: 5432,
});

// Set up storage for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Appends the file extension
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/recipes', upload.single('image'), async (req, res) => {
  const { title, description, steps, category_id, user_id } = req.body;
  const image_id = req.file ? req.file.filename : null;

  try {
    const result = await pool.query(
      'INSERT INTO recipes (image_id, description, title, steps, category_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [image_id, description, title, steps, category_id, user_id]
    );
    res.status(201).json({ message: 'Recipe added successfully', recipe: result.rows[0] });
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ message: 'Failed to add recipe' });
  }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
