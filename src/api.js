var SpellChecker = require('./NodehunSpellchecker')
var spellchecker = null

function api(app, config) {
  spellchecker = new SpellChecker(config)

  // API
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
}

module.exports = api
