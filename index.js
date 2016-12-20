"use strict";

var utils = require("loader-utils");

function customLoader() {
    var query = utils.parseQuery(this.query);
    var loaderName = query[customLoader.queryKey];

    delete query[customLoader.queryKey];
    var context = Object.assign({}, this, { query: "?" + JSON.stringify(query) });

    var loaderFunc = customLoader.loaders[loaderName];
    return loaderFunc.apply(context, arguments);
}

customLoader.queryKey = "name";
customLoader.loaders = {};

module.exports = customLoader;
