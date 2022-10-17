# NDF Parser
Parse an ndf file into a json object.

## Parsing
```typescript
import { NdfParser } from "ndf-parser"
```


Initialize the parser and run the `parse()` method to perform the parsing. 

```typescript
try {
    // Initialize the parser
    const parser = new NdfParser(ndfText)
    // Parse
    const results = parser.parse()
} catch (e) { 
    // Parsing errors 
}
```

The `parse()` method returns two results, first first a list of parser tokens and the second, the actual parsed results.  You almost always want the second index `[1]` for anything useful.
```typescript
const results = parser.parse()[1]
```

# Searching parser results
The parser outputs a very verbose structure which can cause a lot of repeated calls to nested attributes and structures.  The `search` function is provided to help track down specific values within the resulting objects.  


```typescript
import { search } from 'ndf-parser';
```

The search function doesn't accept the full parser output, but instead accepts individual parser objects. If you take the UniteDescriptor.ndf file as an example, you would parse an individual unit object instead of the full list of parser results. 

The following code samples and output example are assuming you parse `Divisions.ndf` and use the first object contained in the results.

```typescript
// Initialize the parser
const parser = new NdfParser(rawNdfData.toString())
// Get results, not tokens
const parseResults = parser.parse()[1]
// Grab the first parsed object
const firstParserResult = parseResults[0]
// Search for "DivisionIds"
const divisionIdObject = search(data, "DivisionIds")
```

The search function will return the resulting block(s) with the named object or object attribute.

```typescript
[
  {
    name: 'DivisionIds',
    value: { value: [Array], ndf: 'map' },
    ndf: 'attribute'
  }
]
```

The search method can return multiple results if multiple attributes or names match the search query.  The parser will only return multiple results at the same "depth" and will not return results from different nesting levels in the data.

For example, if you parse `UniteDescriptor.ndf` and search a unit object for `TModuleSelector`, the search function will return a list of all of the `TModuleSelector` found within the units `ModulesDescriptors` map.

However, if you search for `NilDescriptorIfCadavre` you'll only get one result because the parser will find the first one without any similar siblings.
