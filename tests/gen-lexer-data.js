const lexer = require('../dist/src/lex/lexer')
const fs = require('fs')
const path = require('path')
const dir = path.join(__dirname, '../test-data/ndf-manual')
const files = fs.readdirSync(dir)

let data = {}
files.forEach((file) => {
    if (! file.endsWith('.ndf')) return
    const filePath = path.join(dir, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const lexResult = lexer.lex(content)

    data[file] = lexResult
})

console.log(JSON.stringify(data, null, 2));
