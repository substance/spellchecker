var b = require('substance-bundler');
var bodyParser = require('body-parser');
var fs = require('fs')
var api = require('./src/api')

b.task('clean', function() {
  b.rm('./dist')
})

b.task('substance', function() {
  b.make('substance', 'clean', 'browser')
})

b.task('substance:pure', function() {
  b.make('substance', 'clean', 'browser:pure')
})

b.task('assets', function() {
  b.copy('node_modules/font-awesome', './dist/lib/font-awesome')
  b.copy('node_modules/substance/dist', './dist/lib/substance')
})


function _app(legacy) {
  const src = './example/'
  const dist = './dist/'
  b.copy(src+'index.html', dist)
  b.css(src+'app.css', dist+'app.css', { variables: legacy })
  b.js(src+'app.js', {
    buble: legacy,
    commonjs: { include: ['/**/lodash/**'] },
    targets: [{
      useStrict: !legacy,
      dest: dist+'app.js',
      format: 'umd', moduleName: 'app'
    }]
  })
}

b.task('app', function() {
  _app(false)
})

b.task('service', function() {
  b.custom('Configuring SpellChecker...', {
    src: './config.json',
    execute: function() {
      var config = fs.readFileSync('./config.json', 'utf8')
      config = JSON.parse(config)
      api(b.server, config)
    }
  })
})

// Used for deployment (transpiled js and css)
b.task('default', ['clean', 'substance', 'assets', 'app'])

// Used for development (native js + css)
b.task('dev', ['clean', 'substance:pure', 'assets', 'app', 'service'])

// starts a server when CLI argument '-s' is set
b.setServerPort(4777)
b.serve({
  static: true, route: '/', folder: 'dist'
})
// for json bodies
b.server.use(bodyParser.json())
b.server.use(bodyParser.urlencoded({ extended: true }))
// for CORS
b.server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
