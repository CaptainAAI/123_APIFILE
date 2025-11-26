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

// Get all comics
async function getAllKomik(req, res) {
  try {
    // Call service to fetch all comics
    const result = await komikService.getAllKomik(db);

    // Return success response
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    // Server error response
    res.status(500).json({ success: false, error: error.message });
  }
}

async function getKomikById(req, res) {
  try {
    const { id } = req.params;

    // Call service to fetch by ID
    const result = await komikService.getKomikById(db, id);

    // Return result
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    // Not found or error
    res.status(404).json({ success: false, error: error.message });
  }
}

async function updateKomik(req, res) {
  try {
    const komikData = req.body;

    // If file exists, update the image data
    if (req.file) {
      komikData.imageType = req.file.mimetype;
      komikData.imageName = req.file.originalname;
      komikData.imageData = req.file.buffer;
    }

    // Call service to update comic
    const result = await komikService.updateKomik(
      db,
      req.params.id,
      komikData
    );

    // Return success response
    res.json({ success: true, data: result });
  } catch (error) {
    // Bad request or validation error
    res.status(400).json({ success: false, error: error.message });
  }
}


// Delete comic
async function deleteKomik(req, res) {
  try {
    // Call service to delete by ID
    const result = await komikService.deleteKomik(db, req.params.id);

    // Respond with success message
    res.json({ success: true, message: result.message });
  } catch (error) {
    // Error while deleting
    res.status(400).json({ success: false, error: error.message });
  }
}

// Export controller functions
module.exports = {
  createKomik,
  getAllKomik,
  getKomikById,
  updateKomik,
  deleteKomik,
};