"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var grammar_1 = require("./grammar");
var SyncRegistry = /** @class */ (function () {
    function SyncRegistry(theme) {
        this._theme = theme;
        this._grammars = {};
        this._rawGrammars = {};
        this._injectionGrammars = {};
    }
    SyncRegistry.prototype.setTheme = function (theme) {
        var _this = this;
        this._theme = theme;
        Object.keys(this._grammars).forEach(function (scopeName) {
            var grammar = _this._grammars[scopeName];
            grammar.onDidChangeTheme();
        });
    };
    SyncRegistry.prototype.getColorMap = function () {
        return this._theme.getColorMap();
    };
    /**
     * Add `grammar` to registry and return a list of referenced scope names
     */
    SyncRegistry.prototype.addGrammar = function (grammar, injectionScopeNames) {
        this._rawGrammars[grammar.scopeName] = grammar;
        var includedScopes = {};
        grammar_1.collectIncludedScopes(includedScopes, grammar);
        if (injectionScopeNames) {
            this._injectionGrammars[grammar.scopeName] = injectionScopeNames;
            injectionScopeNames.forEach(function (scopeName) {
                includedScopes[scopeName] = true;
            });
        }
        return Object.keys(includedScopes);
    };
    /**
     * Lookup a raw grammar.
     */
    SyncRegistry.prototype.lookup = function (scopeName) {
        return this._rawGrammars[scopeName];
    };
    /**
     * Returns the injections for the given grammar
     */
    SyncRegistry.prototype.injections = function (targetScope) {
        return this._injectionGrammars[targetScope];
    };
    /**
     * Get the default theme settings
     */
    SyncRegistry.prototype.getDefaults = function () {
        return this._theme.getDefaults();
    };
    /**
     * Match a scope in the theme.
     */
    SyncRegistry.prototype.themeMatch = function (scopeName) {
        return this._theme.match(scopeName);
    };
    /**
     * Lookup a grammar.
     */
    SyncRegistry.prototype.grammarForScopeName = function (scopeName, initialLanguage, embeddedLanguages, tokenTypes) {
        if (!this._grammars[scopeName]) {
            var rawGrammar = this._rawGrammars[scopeName];
            if (!rawGrammar) {
                return null;
            }
            this._grammars[scopeName] = grammar_1.createGrammar(rawGrammar, initialLanguage, embeddedLanguages, tokenTypes, this);
        }
        return this._grammars[scopeName];
    };
    return SyncRegistry;
}());
exports.SyncRegistry = SyncRegistry;
//# sourceMappingURL=registry.js.map