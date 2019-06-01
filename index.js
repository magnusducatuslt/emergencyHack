const express = require('express');
const app = express();

const fs = require('fs');
const Chance = require('chance');
const chance = new Chance();
const path = require('path');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/save', (req, res) => {
  const type = req.header('content-type').split('/')[1];
  const writer = fs.createWriteStream(`./${getName(chance, Date)}.${type}`);
  req.pipe(writer);
  req.on('end', () => {
    res.status(200).send('file store completed');
  });
  req.on('error', e => {
    res.status(500).send(e);
  });
});
app.listen(4000, function() {
  console.log('Example app listening on port 3000!');
});

function getName(chan, date) {
  return `${chan.guid()}${date.now()}`;
}
