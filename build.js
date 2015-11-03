'use strict'

const fs = require('fs')
const glob = require('glob')
const cssScss = require('css-scss')

glob('./node_modules/tachyons/src/**/*.css', (err, files) => {
  if (err) {
    throw err
  }

  files.forEach(file => {
    var css = fs.readFileSync(file, 'utf8')
    var fileName = file.replace(/(\.\/node_modules\/tachyons\/src\/|\.css)/g, '')

    fs.writeFileSync(fileName + '.scss', cssScss(css))
  })
})
