var express = require('express')
var bodyParser = require('body-parser');
var SpellChecker = require('./src/NodehunSpellchecker')

var PORT = process.env.PORT || 4777
var config = require('./config')
var spellchecker = new SpellChecker(config)

var app = express()
// for json bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// for CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// API

// get corrections for a piece of plain-text
app.post('/api/check', function (req, res) {
  var text = req.body.text;
  console.log('### received check request for', text, req.body)
  spellchecker.check(text, function(err, result) {
    if (err) {
      res.status(500).send('Internal Error')
    } else {
      res.status(200).json(result)
    }
  })
})

app.listen(PORT, function () {
  console.info('Spellchecker Service running port %s.', PORT);
})
