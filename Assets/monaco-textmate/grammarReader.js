"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var plist = require("fast-plist");
var debug_1 = require("./debug");
var json_1 = require("./json");
function parseJSONGrammar(contents, filename) {
    if (debug_1.CAPTURE_METADATA) {
        return json_1.parse(contents, filename, true);
    }
    return JSON.parse(contents);
}
exports.parseJSONGrammar = parseJSONGrammar;
function parsePLISTGrammar(contents, filename) {
    if (debug_1.CAPTURE_METADATA) {
        return plist.parseWithLocation(contents, filename, '$vscodeTextmateLocation');
    }
    return plist.parse(contents);
}
exports.parsePLISTGrammar = parsePLISTGrammar;
//# sourceMappingURL=grammarReader.js.map