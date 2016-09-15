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

    if (fileName !== 'tachyons' && fileName !== '_media-queries' && fileName !== '_colors' && fileName !== '_debug') {
      fs.writeFileSync('scss/' + fileName + '.scss', cssScss(css))
      baseFile += '@import "scss/' + fileName + '";\n'
    }
  })

  fs.writeFileSync('tachyons.scss', `
/*
 *    ████████╗ █████╗  ██████╗██╗  ██╗██╗   ██╗ ██████╗ ███╗   ██╗███████╗
 *    ╚══██╔══╝██╔══██╗██╔════╝██║  ██║╚██╗ ██╔╝██╔═══██╗████╗  ██║██╔════╝
 *       ██║   ███████║██║     ███████║ ╚████╔╝ ██║   ██║██╔██╗ ██║███████╗
 *       ██║   ██╔══██║██║     ██╔══██║  ╚██╔╝  ██║   ██║██║╚██╗██║╚════██║
 *       ██║   ██║  ██║╚██████╗██║  ██║   ██║   ╚██████╔╝██║ ╚████║███████║
 *       ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════╝
 *
 *    TABLE OF CONTENTS
 *
 *    1. External Library Includes
 *       - Normalize.css | http://normalize.css.github.io
 *    2. Tachyons Modules
 *    3. Variables
 *       - Media Queries
 *       - Colors
 *    4. Debugging
 *       - Debug all
 *       - Debug children
 *
 */

/* Variables */
/* Importing here will allow you to override any variables in the modules */
@import "scss/_media-queries";
@import "scss/_colors";

/* Uncomment out the line below to help debug layout issues */
//@import "scss/_debug";

${baseFile}`)
})
