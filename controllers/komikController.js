// Import database models
const db = require('../models');
// Import komik service
const komikService = require('../services/komikService');

// Create a new comic
async function createKomik(req, res) {
  try {
    const komikData = req.body;

    // If file exists, attach image metadata and buffer
    if (req.file) {
      komikData.imageType = req.file.mimetype;
      komikData.imageName = req.file.originalname;
      komikData.imageData = req.file.buffer;
    }

    // Call service layer to create comic
    const result = await komikService.createKomik(db, komikData);

    // Return success response
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    // Return error response
    res.status(400).json({ success: false, error: error.message });
  }
}