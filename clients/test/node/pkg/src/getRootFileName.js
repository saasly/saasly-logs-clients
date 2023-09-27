"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var getRootFilePath_1 = require("./getRootFilePath");
function getRootFileName(fileName) {
    if (typeof fileName !== "string") {
        return null;
    }
    else if (fileName.startsWith("file:/")) {
        var url = new URL(fileName);
        return url.pathname;
    }
    else {
        var rootPath = (0, path_1.dirname)((0, getRootFilePath_1.default)());
        return (0, path_1.relative)(rootPath, fileName);
    }
}
exports.default = getRootFileName;