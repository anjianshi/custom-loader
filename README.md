# custom-loader
This package can help you use your own custom loader in [webpack](https://github.com/webpack/webpack).

## Usage

```js
var customLoader = require("custom-loader");

customLoader.loaders.myLoader = function() {
    // loader content
};

// or

customLoader.loaders = {
    loaderA: function() {},
    loaderB: function() {}
};
```

Then in webpack config:

```js
module: {
  loaders: [
    {test: /\.ext$/, loader: 'custom-loader?name=myLoader&otherQuery=value'}
  ]
}
```

If the default `name` key duplicated with other query parameter, you can change it:

```js
var customLoader = require("custom-loader");
customLoader.queryKey = "loader";

// then you can specify loader like this:
// custom-loader?loader=myLoader&otherQuery=value
```

## Without this package

Actually, you can put your loader function in a separate file, and directly reference it:

In `my-loader.js`

```js
module.exports = function myLoader() {

};
```

In `webpack.config.js`

```
var path = require("path");

module.exports = {
    // ...
    module: {
        loader: [
            {test: /\.ext$/, loader: path.join(__dirname, "my-loader.js")}
        ]
    }
    // ...
};

// or

module.exports = {
    // ...
    module: {
        loader: [
            {test: /\.ext$/, loader: "my-loader"}
        ]
    },
    resolveLoader: {
        alias: {
            "my-loader": path.join(__dirname, "my-loader.js")
        }
    },
    // ...
};
```

| Notice: there's a bug with resolveLoader.alias, see [#1289](https://github.com/webpack/webpack/issues/1289)

But this require you create a separate file for every loader, and was not so flexible.
So I create this package.
