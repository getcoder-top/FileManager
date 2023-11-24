const express = require('express');
const mongoose = require('mongoose');
const { promisify } = require('util');

const router = express.Router();
const createFolder = require('../models/createFolder');

const mkdirAsync = promisify(fs.mkdir);

router.post('/create-folder', async (req, res) => {
  try {
    const { userId, name } = req.body;

    // Validate user permission
    // Create folder record in PostgreSQL database
    const newFolder = new createFolder({ userId, name });
    await newFolder.save();

    // Create folder directory in AWS S3
    await mkdirAsync(`${name}`, { recursive: true });

    res.status(201).json({ message: 'Folder created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;