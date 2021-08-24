const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

const keys = [];
const regexp = pathToRegexp("/foo/:page/:id", keys);
console.log("regexp=");
console.log(regexp);
// console.log(keys);
// console.log(regexp.exec("/foo/page/ID"));

const rExp = /^\/foo(?:\/([^\/#\?]+?))(?:\/([^\/#\?]+?))[\/#\?]?$/i;
console.log("/foo/hello/world/".match(rExp));
