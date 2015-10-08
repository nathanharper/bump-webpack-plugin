# Bump for webpack
A webpack plugin to bump the patch number every build

## Usage

``` javascript
var Bump = require("bump-webpack-plugin");
module.exports = {
	plugins: [
		new Bump([
			'package.json',
			'bower.json'
		])
	]
}
```

## Stuff I (Nathan Harper) Changed

For every file you supply to `Bump`, this plugin will add or update two fields: `version` and `webpackAssetHash`.

The version will only be bumped if two conditions are met:

1. webpackAssetHash has changed, i.e. the compiled output is different
2. version has not already been changed from its value in git `HEAD` (so this project is git dependent)

## TODO

Make git dependency optional and find a good git wrapper for NodeJS

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
