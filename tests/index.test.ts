import { tokenize } from "../src/index"
import { readFileSync } from "fs"


test('tokenizer-testing', () => {

    let fileData = ""
    try {
        fileData = readFileSync('./test-data/Packs.ndf', 'utf8')
    } catch (err) {
        console.log(err)
    }

    const tokens = tokenize(fileData)
})
