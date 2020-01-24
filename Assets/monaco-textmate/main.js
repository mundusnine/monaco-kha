"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var registry_1 = require("./registry");
var grammarReader_1 = require("./grammarReader");
var theme_1 = require("./theme");
var grammar_1 = require("./grammar");
var DEFAULT_OPTIONS = {
    getGrammarDefinition: function (scopeName) { return null; },
    getInjections: function (scopeName) { return null; }
};
/**
 * The registry that will hold all grammars.
 */
var Registry = /** @class */ (function () {
    function Registry(locator) {
        if (locator === void 0) { locator = DEFAULT_OPTIONS; }
        this._locator = locator;
        this._syncRegistry = new registry_1.SyncRegistry(theme_1.Theme.createFromRawTheme(locator.theme));
        this.installationQueue = new Map();
    }
    /**
     * Change the theme. Once called, no previous `ruleStack` should be used anymore.
     */
    Registry.prototype.setTheme = function (theme) {
        this._syncRegistry.setTheme(theme_1.Theme.createFromRawTheme(theme));
    };
    /**
     * Returns a lookup array for color ids.
     */
    Registry.prototype.getColorMap = function () {
        return this._syncRegistry.getColorMap();
    };
    /**
     * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
     * Please do not use language id 0.
     */
    Registry.prototype.loadGrammarWithEmbeddedLanguages = function (initialScopeName, initialLanguage, embeddedLanguages) {
        return this.loadGrammarWithConfiguration(initialScopeName, initialLanguage, { embeddedLanguages: embeddedLanguages });
    };
    /**
     * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
     * Please do not use language id 0.
     */
    Registry.prototype.loadGrammarWithConfiguration = function (initialScopeName, initialLanguage, configuration) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._loadGrammar(initialScopeName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.grammarForScopeName(initialScopeName, initialLanguage, configuration.embeddedLanguages, configuration.tokenTypes)];
                }
            });
        });
    };
    /**
     * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
     */
    Registry.prototype.loadGrammar = function (initialScopeName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._loadGrammar(initialScopeName)];
            });
        });
    };
    Registry.prototype._loadGrammar = function (initialScopeName, dependentScope) {
        if (dependentScope === void 0) { dependentScope = null; }
        return __awaiter(this, void 0, void 0, function () {
            var prom;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // already installed
                        if (this._syncRegistry.lookup(initialScopeName)) {
                            return [2 /*return*/, this.grammarForScopeName(initialScopeName)];
                        }
                        // installation in progress
                        if (this.installationQueue.has(initialScopeName)) {
                            return [2 /*return*/, this.installationQueue.get(initialScopeName)];
                        }
                        prom = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var grammarDefinition, rawGrammar, injections, deps;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._locator.getGrammarDefinition(initialScopeName, dependentScope)];
                                    case 1:
                                        grammarDefinition = _a.sent();
                                        if (!grammarDefinition) {
                                            throw new Error("A tmGrammar load was requested but registry host failed to provide grammar definition");
                                        }
                                        if ((grammarDefinition.format !== 'json' && grammarDefinition.format !== 'plist') ||
                                            (grammarDefinition.format === 'json' && typeof grammarDefinition.content !== 'object' && typeof grammarDefinition.content !== 'string') ||
                                            (grammarDefinition.format === 'plist' && typeof grammarDefinition.content !== 'string')) {
                                            throw new TypeError('Grammar definition must be an object, either `{ content: string | object, format: "json" }` OR `{ content: string, format: "plist" }`)');
                                        }
                                        rawGrammar = grammarDefinition.format === 'json'
                                            ? typeof grammarDefinition.content === 'string'
                                                ? grammarReader_1.parseJSONGrammar(grammarDefinition.content, 'c://fakepath/grammar.json')
                                                : grammarDefinition.content
                                            : grammarReader_1.parsePLISTGrammar(grammarDefinition.content, 'c://fakepath/grammar.plist');
                                        injections = (typeof this._locator.getInjections === 'function') && this._locator.getInjections(initialScopeName);
                                        rawGrammar.scopeName = initialScopeName;
                                        deps = this._syncRegistry.addGrammar(rawGrammar, injections);
                                        return [4 /*yield*/, Promise.all(deps.map(function (scopeNameD) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    try {
                                                        return [2 /*return*/, this._loadGrammar(scopeNameD, initialScopeName)];
                                                    }
                                                    catch (error) {
                                                        throw new Error("While trying to load tmGrammar with scopeId: '" + initialScopeName + "', it's dependency (scopeId: " + scopeNameD + ") loading errored: " + error.message);
                                                    }
                                                    return [2 /*return*/];
                                                });
                                            }); }))];
                                    case 2:
                                        _a.sent();
                                        resolve(this.grammarForScopeName(initialScopeName));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.installationQueue.set(initialScopeName, prom);
                        return [4 /*yield*/, prom];
                    case 1:
                        _a.sent();
                        this.installationQueue.delete(initialScopeName);
                        return [2 /*return*/, prom];
                }
            });
        });
    };
    /**
     * Get the grammar for `scopeName`. The grammar must first be created via `loadGrammar` or `loadGrammarFromPathSync`.
     */
    Registry.prototype.grammarForScopeName = function (scopeName, initialLanguage, embeddedLanguages, tokenTypes) {
        if (initialLanguage === void 0) { initialLanguage = 0; }
        if (embeddedLanguages === void 0) { embeddedLanguages = null; }
        if (tokenTypes === void 0) { tokenTypes = null; }
        return this._syncRegistry.grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes);
    };
    return Registry;
}());
exports.Registry = Registry;
exports.INITIAL = grammar_1.StackElement.NULL;
//# sourceMappingURL=main.js.map