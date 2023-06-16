interface Token {
    type: string,
    value: string
}

interface ExpectedResults {
    [key: string]: Token[]
}

const expected: ExpectedResults = {
  "arithmetic-operations-strings.ndf": [
    {
      "type": "identifier",
      "value": "A"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "symbol",
      "value": "["
    },
    {
      "type": "number",
      "value": "1"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "number",
      "value": "2"
    },
    {
      "type": "symbol",
      "value": "]"
    },
    {
      "type": "symbol",
      "value": "+"
    },
    {
      "type": "symbol",
      "value": "["
    },
    {
      "type": "number",
      "value": "3"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "number",
      "value": "4"
    },
    {
      "type": "symbol",
      "value": "]"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "B"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "keyword",
      "value": "MAP"
    },
    {
      "type": "symbol",
      "value": "["
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "number",
      "value": "1"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "string",
      "value": "'one'"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "symbol",
      "value": "]"
    },
    {
      "type": "symbol",
      "value": "+"
    },
    {
      "type": "keyword",
      "value": "MAP"
    },
    {
      "type": "symbol",
      "value": "["
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "number",
      "value": "2"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "string",
      "value": "'two'"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "symbol",
      "value": "]"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "C"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "string",
      "value": "\"Hello\""
    },
    {
      "type": "symbol",
      "value": "+"
    },
    {
      "type": "string",
      "value": "\" World!\""
    }
  ],
  "arithmetic-operations.ndf": [
    {
      "type": "identifier",
      "value": "Pi"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "number",
      "value": "3"
    },
    {
      "type": "symbol",
      "value": "+"
    },
    {
      "type": "number",
      "value": "0.1415954"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "PiCube"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "Pi"
    },
    {
      "type": "symbol",
      "value": "*"
    },
    {
      "type": "identifier",
      "value": "Pi"
    },
    {
      "type": "symbol",
      "value": "*"
    },
    {
      "type": "identifier",
      "value": "Pi"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "X"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "number",
      "value": "35"
    },
    {
      "type": "keyword",
      "value": "div"
    },
    {
      "type": "number",
      "value": "8"
    },
    {
      "type": "comment",
      "value": "// Division is used through the keyword 'div'"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Y"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "number",
      "value": "35"
    },
    {
      "type": "symbol",
      "value": "%"
    },
    {
      "type": "number",
      "value": "8"
    }
  ],
  "namespaces-ex1.ndf": [
    {
      "type": "identifier",
      "value": "ExampleObject"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TExampleType"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "InnerExample"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "ExampleObject2"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TExampleType"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "InnerExample"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "ExampleObject3"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TExampleType"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    }
  ],
  "namespaces-ex2.ndf": [
    {
      "type": "identifier",
      "value": "ExampleObject"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TExampleType"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "InnerExample"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "TExampleType"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "InnerExample"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "ExampleObject3"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TExampleType"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    }
  ],
  "namespaces-ex3.ndf": [
    {
      "type": "identifier",
      "value": "ExampleObject"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TExampleType"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "InnerExample"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "_"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TExampleType"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "InnerExample"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "ExampleObject3"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TExampleType"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    }
  ],
  "naming-a-built-in-value.ndf": [
    {
      "type": "identifier",
      "value": "Gravity"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "number",
      "value": "-9.81"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Currencies"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "keyword",
      "value": "MAP"
    },
    {
      "type": "symbol",
      "value": "["
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "string",
      "value": "'EUR'"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "string",
      "value": "'€'"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "string",
      "value": "'USD'"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "string",
      "value": "'$'"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "string",
      "value": "'GBP'"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "string",
      "value": "'£'"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "]"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Places"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "symbol",
      "value": "["
    },
    {
      "type": "string",
      "value": "'Antarctica'"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "string",
      "value": "'Everest'"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "string",
      "value": "'Mars'"
    },
    {
      "type": "symbol",
      "value": "]"
    },
    {
      "type": "newline",
      "value": "\n"
    }
  ],
  "object-definition-nested.ndf": [
    {
      "type": "identifier",
      "value": "ExampleObject"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TExampleType"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "innerObject"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "TOtherType"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "ValueString"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "string",
      "value": "\"I am a member of TExampleType\""
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    }
  ],
  "object-definition-unnamed.ndf": [
    {
      "type": "keyword",
      "value": "unnamed"
    },
    {
      "type": "identifier",
      "value": "TExampleType"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "ValueString"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "string",
      "value": "\"I am an unnamed object\""
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    }
  ],
  "object-definition.ndf": [
    {
      "type": "comment",
      "value": "// This will create an instance of TExampleType containing two members"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "ExampleObject"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TExampleType"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "MemberInteger"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "number",
      "value": "12"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "MemberString"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "string",
      "value": "\"something\""
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    }
  ],
  "prototypes.ndf": [
    {
      "type": "identifier",
      "value": "Prototype"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TThing"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "ValueString"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "string",
      "value": "'I am a prototype object'"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "ValueInt"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "number",
      "value": "666"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "ObjectFromPrototype"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "Prototype"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "ValueString"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "string",
      "value": "'I am just me'"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    }
  ],
  "reference-objects.ndf": [
    {
      "type": "identifier",
      "value": "DataHolder"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TDataHolder"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "SomeInt"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "number",
      "value": "456"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "SomeString"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "string",
      "value": "\"A string\""
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "SomeMap"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "keyword",
      "value": "MAP"
    },
    {
      "type": "symbol",
      "value": "["
    },
    {
      "type": "number",
      "value": "1"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "number",
      "value": "2"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "number",
      "value": "3"
    },
    {
      "type": "symbol",
      "value": "]"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "DataUser"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TDataUser"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Condition"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "keyword",
      "value": "false"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "DataHolderReference"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "DataHolder"
    },
    {
      "type": "comment",
      "value": "// Here we are taking a reference to the DataHolder object"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    }
  ],
  "reference-types.ndf": [
    {
      "type": "identifier",
      "value": "$"
    },
    {
      "type": "symbol",
      "value": "/"
    },
    {
      "type": "identifier",
      "value": "Path"
    },
    {
      "type": "symbol",
      "value": "/"
    },
    {
      "type": "identifier",
      "value": "To"
    },
    {
      "type": "symbol",
      "value": "/"
    },
    {
      "type": "identifier",
      "value": "OtherObject"
    },
    {
      "type": "comment",
      "value": "// absolute reference"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "~"
    },
    {
      "type": "symbol",
      "value": "/"
    },
    {
      "type": "identifier",
      "value": "Path"
    },
    {
      "type": "symbol",
      "value": "/"
    },
    {
      "type": "identifier",
      "value": "To"
    },
    {
      "type": "symbol",
      "value": "/"
    },
    {
      "type": "identifier",
      "value": "OtherObject"
    },
    {
      "type": "comment",
      "value": "// reference from the loading namespace (can't be known by the modder)"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "."
    },
    {
      "type": "symbol",
      "value": "/"
    },
    {
      "type": "identifier",
      "value": "Path"
    },
    {
      "type": "symbol",
      "value": "/"
    },
    {
      "type": "identifier",
      "value": "To"
    },
    {
      "type": "symbol",
      "value": "/"
    },
    {
      "type": "identifier",
      "value": "OtherObject"
    },
    {
      "type": "comment",
      "value": "// reference from the current namespace"
    }
  ],
  "scoped-objects.ndf": [
    {
      "type": "keyword",
      "value": "template"
    },
    {
      "type": "identifier",
      "value": "Character"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "["
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": ":"
    },
    {
      "type": "keyword",
      "value": "string"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "symbol",
      "value": ":"
    },
    {
      "type": "keyword",
      "value": "int"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "number",
      "value": "1"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Weapon"
    },
    {
      "type": "symbol",
      "value": ":"
    },
    {
      "type": "identifier",
      "value": "TWeapon"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "TWeapon"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "]"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TCharacter"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Bag"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TInventory"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "MaxItemCount"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "symbol",
      "value": "<"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "symbol",
      "value": ">"
    },
    {
      "type": "symbol",
      "value": "*"
    },
    {
      "type": "number",
      "value": "3"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "symbol",
      "value": "<"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": ">"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "symbol",
      "value": "<"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "symbol",
      "value": ">"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "HP"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "symbol",
      "value": "<"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "symbol",
      "value": ">"
    },
    {
      "type": "symbol",
      "value": "*"
    },
    {
      "type": "number",
      "value": "100"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Weapon"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "symbol",
      "value": "<"
    },
    {
      "type": "identifier",
      "value": "Weapon"
    },
    {
      "type": "symbol",
      "value": ">"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Damages"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "symbol",
      "value": "<"
    },
    {
      "type": "identifier",
      "value": "Weapon"
    },
    {
      "type": "symbol",
      "value": ">"
    },
    {
      "type": "symbol",
      "value": "/"
    },
    {
      "type": "identifier",
      "value": "Damages"
    },
    {
      "type": "symbol",
      "value": "*"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "number",
      "value": "1"
    },
    {
      "type": "symbol",
      "value": "+"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "keyword",
      "value": "div"
    },
    {
      "type": "number",
      "value": "10"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Inventory"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "Bag"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    }
  ],
  "template-template-scope-override.ndf": [
    {
      "type": "keyword",
      "value": "template"
    },
    {
      "type": "identifier",
      "value": "CloneHero"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "["
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": ":"
    },
    {
      "type": "keyword",
      "value": "string"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "]"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "Character"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "symbol",
      "value": "<"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": ">"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "number",
      "value": "12"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Weapon"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "Axe"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Bag"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TInventory"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "identifier",
      "value": "MaxItemCount"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "number",
      "value": "0"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    }
  ],
  "template-template.ndf": [
    {
      "type": "keyword",
      "value": "template"
    },
    {
      "type": "identifier",
      "value": "CloneHero"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "["
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": ":"
    },
    {
      "type": "keyword",
      "value": "string"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "]"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "Character"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "symbol",
      "value": "<"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": ">"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "number",
      "value": "12"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Weapon"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "Axe"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    }
  ],
  "templates-elaborate.ndf": [
    {
      "type": "comment",
      "value": "// More elaborated example"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "comment",
      "value": "// Suppose there is a TWeapon and TCharacter types existing."
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Axe"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TWeapon"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "comment",
      "value": "// here would be members describing this weapon"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Knife"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TWeapon"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "keyword",
      "value": "template"
    },
    {
      "type": "identifier",
      "value": "Character"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "["
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": ":"
    },
    {
      "type": "keyword",
      "value": "string"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "comment",
      "value": "// Name has to be a string"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "symbol",
      "value": ":"
    },
    {
      "type": "keyword",
      "value": "int"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "number",
      "value": "1"
    },
    {
      "type": "symbol",
      "value": ","
    },
    {
      "type": "comment",
      "value": "// Level has a default value of 1"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Weapon"
    },
    {
      "type": "symbol",
      "value": ":"
    },
    {
      "type": "identifier",
      "value": "TWeapon"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "TWeapon"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "comment",
      "value": "// Weapon has to be a TWeapon"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "]"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TCharacter"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "symbol",
      "value": "<"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": ">"
    },
    {
      "type": "comment",
      "value": "// <Name> refers to the template parameter named 'Name'"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "symbol",
      "value": "<"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "symbol",
      "value": ">"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "HP"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "symbol",
      "value": "<"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "symbol",
      "value": ">"
    },
    {
      "type": "symbol",
      "value": "*"
    },
    {
      "type": "number",
      "value": "100"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Weapon"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "symbol",
      "value": "<"
    },
    {
      "type": "identifier",
      "value": "Weapon"
    },
    {
      "type": "symbol",
      "value": ">"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Damages"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "symbol",
      "value": "<"
    },
    {
      "type": "identifier",
      "value": "Weapon"
    },
    {
      "type": "symbol",
      "value": ">"
    },
    {
      "type": "symbol",
      "value": "/"
    },
    {
      "type": "identifier",
      "value": "Damages"
    },
    {
      "type": "symbol",
      "value": "*"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "number",
      "value": "1"
    },
    {
      "type": "symbol",
      "value": "+"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "keyword",
      "value": "div"
    },
    {
      "type": "number",
      "value": "10"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Hero"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "Character"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "string",
      "value": "\"Hero\""
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Level"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "number",
      "value": "12"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Weapon"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "Axe"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Creep"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "Character"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Name"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "string",
      "value": "\"Creep\""
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "identifier",
      "value": "Weapon"
    },
    {
      "type": "symbol",
      "value": "="
    },
    {
      "type": "identifier",
      "value": "Knife"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "comment",
      "value": "// Level is not specified, default value is used"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": ")"
    }
  ],
  "templates.ndf": [
    {
      "type": "comment",
      "value": "// Basic template that does nothing"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "keyword",
      "value": "template"
    },
    {
      "type": "identifier",
      "value": "MyTemplate"
    },
    {
      "type": "comment",
      "value": "// template name"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "["
    },
    {
      "type": "symbol",
      "value": "]"
    },
    {
      "type": "comment",
      "value": "// template parameters"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "keyword",
      "value": "is"
    },
    {
      "type": "identifier",
      "value": "TType"
    },
    {
      "type": "comment",
      "value": "// final type of the object created by the template"
    },
    {
      "type": "newline",
      "value": "\n"
    },
    {
      "type": "symbol",
      "value": "("
    },
    {
      "type": "symbol",
      "value": ")"
    },
    {
      "type": "comment",
      "value": "// object members"
    }
  ]
}

export default expected;
