// Function for creating a new comic
async function createKomik(database, komikData) {
    const { title, description, author, imageType, imageName, imageData } = komikData;

  // Validate required fields
  if (!title || !description || !author) {
    throw new Error('Title, description, and author are required');
  }

  // Insert comic into database
  const newKomik = await database.Komik.create({
    Judul: title,
    deskripsi: description,
    Penulis: author,
    imageType: imageType || null,
    imageName: imageName || null,
    imageData: imageData || null,
  });

  return newKomik;
}

// Function for retrieving all comics
async function getAllKomik(database) {
  const komiks = await database.Komik.findAll();

  // Convert image buffer to base64 if exists
  return komiks.map(k => {
    if (k.imageData) {
      k.imageData = k.imageData.toString('base64');
    }
    return k;
  });
}

// Function for retrieving a comic by its ID
async function getKomikById(database, id) {
  const komik = await database.Komik.findByPk(id);
  if (!komik) throw new Error('Comic not found');

  // Convert image buffer to base64 if exists
  if (komik.imageData) {
    komik.imageData = komik.imageData.toString('base64');
  }

  return komik;
}

module.exports = {
  createKomik,
  getAllKomik,
  getKomikById
};

