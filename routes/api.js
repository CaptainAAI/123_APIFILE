const express = require('express');
const router = express.Router();
const multer = require('multer');
const komikController =  require('../controllers/komikcontroller');
const upload = multer({storage: multer.memoryStorage()});

router.post('/komiks', upload.single('gambar'), komikController.createKomik);
router.get('/komiks', komikController.getAllKomiks);
router.get('/komiks/:id', komikController.getKomikById);
router.put('/komiks/:id', upload.single('gambar'), komikController.updateKomik);
router.delete('/komiks/:id', komikController.deleteKomik);

module.exports = router;