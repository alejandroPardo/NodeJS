const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto){
      next(null, true);
    } else {
      next({ message: 'That file isn\'t allowed!'}, false);
    }
  }
}

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
}

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store'});
}

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  //can be success, warning, info or error
  req.flash('success', `Successfully created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
}

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  //check if no new file
  if(!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  //now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);

  //once written, keep going
  next();
}

exports.updateStore = async (req, res) => {
  // set the location data to be a point 
  req.body.location.type = 'Point';
  //find and update store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, //return new store instead of old one
    runValidators: true //run mongoose schema validators
  }).exec();

  //redirect to store with flash
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`)
  res.redirect(`/stores/${store._id}/edit`);
}

exports.getStores = async (req, res) => {
  // Query the database for stores
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores} );
}

exports.editStore = async (req, res) => {
  // Query the database for stores with id
  const store = await Store.findOne({ _id: req.params.id });

  //confirm owner of store

  //render edit form
  res.render('editStore', { title: `Edit ${store.name}`, store });
}

exports.getStoreBySlug = async (req, res) => {
  // Query the database for stores with id
  const store = await Store.findOne({ slug: req.params.slug });

  if (!store) return next();

  //render edit form
  res.render('store', { title: store.name, store });
}

exports.getStoresByTag = async (req, res) => {
  const tag = req.params.tag;
  const tagQuery = tag || { $exists: true };
  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({tags: tagQuery});

  const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);
  
  res.render('tags', {tags, title: 'Tags', tag, stores});
}