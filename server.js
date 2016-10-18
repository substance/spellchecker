var express = require('express')
var bodyParser = require('body-parser');
var SpellChecker = require('./src/NodehunSpellchecker')

var PORT = process.env.PORT || 4777
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var config = require('./config')
var spellchecker = new SpellChecker(config)

// get corrections for a piece of plain-text
app.post('/api/check', function (req, res) {
  var text = req.body.text;
  spellchecker.check(text, function(err, result) {
    if (err) {
      res.status(500).send('Internal Error')
    } else {
      res.status(200).json(result)
    }
  })
})

app.listen(PORT, function () {
  console.info('Example app listening on port %s!', PORT);
})
