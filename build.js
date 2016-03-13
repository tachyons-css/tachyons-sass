'use strict'

const fs = require('fs')
const glob = require('glob')
const cssScss = require('css-scss')

glob('./node_modules/tachyons/src/**/*.css', (err, files) => {
  if (err) {
    throw err
  }

  var baseFile = ''
  files.forEach(file => {
    var css = fs.readFileSync(file, 'utf8')
    var fileName = file.replace(/(\.\/node_modules\/tachyons\/src\/|\.css)/g, '')

    if (fileName !== 'tachyons') {
      fs.writeFileSync('scss/' + fileName + '.scss', cssScss(css))
      baseFile += '@import "scss/' + fileName + '";\n'
    }
  })

  fs.writeFileSync('tachyons.scss', baseFile)
})
