"use strict";

var utils = require("loader-utils");

function customLoader() {
    var query = utils.parseQuery(this.query);
    var loaderName = query[customLoader.queryKey];
    var loaderFunc = customLoader.loaders[loaderName];
    loaderFunc.apply(this, arguments);
}

customLoader.queryKey = "name";
customLoader.loaders = {};

module.exports = customLoader;
