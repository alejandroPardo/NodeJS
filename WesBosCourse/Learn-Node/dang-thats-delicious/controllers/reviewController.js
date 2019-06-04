const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const User = mongoose.model('User');
const Review = mongoose.model('Review');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');


exports.addReview = async (req, res) => {
    req.body.author = req.user._id;
    req.body.store = req.params.id;
    const newReview = new Review(req.body);
    await newReview.save();
    req.flash('success', 'Review saved!');
    res.redirect('back');
};