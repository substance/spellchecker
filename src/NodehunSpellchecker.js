// wrapper around nodehun
var Nodehun = require('nodehun')
var fs = require('fs')

class NodehunSpellchecker {

  constructor(config) {
    var aff = fs.readFileSync(config.aff)
    var dict = fs.readFileSync(config.dict)
    this.nodehun = new Nodehun(aff, dict)
  }

  /*
    cb(err, result):
    result = Object[]
      - start: number
      - end: number
      - suggenstions: String[]
  */

  check(text, cb) {
    var dict = this.nodehun
    var words = splitText(text)
    var result = []

    var maxCount = words.length
    var count = 0
    words.forEach(function(w) {
      dict.isCorrect(w.text, function(err, correct) {
        if (err) {
          console.error(err)
          _finish()
        } else if (correct) {
          _finish()
        } else {
          dict.spellSuggestions(w.text, function(err, correct, suggestions) {
            if (err) {
              console.error(err)
            } else {
              w.suggestions = suggestions
              result.push(w)
            }
            _finish()
          })
        }
      })
    })
    function _finish() {
      count++
      if (count === maxCount) {
        cb(null, result)
      }
    }
  }
}

function splitText(text) {
  let words = []
  let re = /[A-Za-z\u00C0-\u017F]+/g
  let match
  while( (match = re.exec(text)) ) {
    words.push({
      start: match.index,
      end: match.index+match[0].length,
      text: match[0],
      suggestions: []
    })
  }
  return words
}

module.exports = NodehunSpellchecker

