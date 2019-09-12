# ember-lifeline-codemods


A collection of codemod's for ember-lifeline-codemods.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx ember-lifeline-codemods <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add ember-lifeline-codemods
ember-lifeline-codemods <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [replace-mixins](transforms/replace-mixins/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`