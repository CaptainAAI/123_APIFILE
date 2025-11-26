// Import database models
const db = require('../models');
// Import komik service (existing file uses plural naming)
const komikService = require('../services/komikServices');

// Create a new comic
async function createKomik(req, res) {
  try {
    const body = req.body;
    // Map incoming fields (title, author, description) to model fields (Judul, Penulis, deskripsi)
    const komikData = {
      title: body.Judul || body.title,
      description: body.deskripsi || body.description,
      author: body.pengarang || body.author
    };

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
    const body = req.body;
    // Build update payload using service schema
    const updatePayload = {
      title: body.title,
      description: body.description,
      author: body.author
    };

    // If file exists, update the image data
    if (req.file) {
      updatePayload.imageType = req.file.mimetype;
      updatePayload.imageName = req.file.originalname;
      updatePayload.imageData = req.file.buffer;
    }

    // Service doesn't implement update; perform directly via model
    const { Komik } = db;
    const komik = await Komik.findByPk(req.params.id);
    if (!komik) {
      return res.status(404).json({ success: false, error: 'Komik not found' });
    }
    // Map service schema back to model fields
    const modelUpdate = {
      Judul: updatePayload.title ?? komik.Judul,
      deskripsi: updatePayload.description ?? komik.deskripsi,
      Penulis: updatePayload.author ?? komik.Penulis
    };
    if (req.file) {
      modelUpdate.imageType = updatePayload.imageType;
      modelUpdate.imageName = updatePayload.imageName;
      modelUpdate.imageData = updatePayload.imageData;
    }
    await komik.update(modelUpdate);
    res.json({ success: true, data: komik });
  } catch (error) {
    // Bad request or validation error
    res.status(400).json({ success: false, error: error.message });
  }
}


// Delete comic
async function deleteKomik(req, res) {
  try {
    // Service doesn't implement delete; perform directly via model
    const { Komik } = db;
    const komik = await Komik.findByPk(req.params.id);
    if (!komik) {
      return res.status(404).json({ success: false, error: 'Komik not found' });
    }
    await komik.destroy();
    res.json({ success: true, message: 'Komik deleted successfully' });
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