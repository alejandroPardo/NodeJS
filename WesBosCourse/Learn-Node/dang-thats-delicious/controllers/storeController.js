const mongoose = require('mongoose');
const Store = mongoose.model('Store');

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

exports.updateStore = async (req, res) => {
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