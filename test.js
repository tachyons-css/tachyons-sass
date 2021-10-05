const fs = require('fs');
const test = require('ava');
const sass = require('node-sass');


test('tachyons-sass is able to be compiled by node-sass', t => {
  t.plan(1)

  const scss = fs.readFileSync('tachyons.scss', 'utf8')

  t.notThrows(() => {
    sass.renderSync({ data: scss })
  })
})
