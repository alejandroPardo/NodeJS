const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  const wes = { name: 'Wes', age: 100, cool: true};
  // res.send('Hey! It works!');
  // res.json(wes)
  // res.send(req.query)
  res.render('hello', {
    dog: req.query.dog
  });
});

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});

module.exports = router;
