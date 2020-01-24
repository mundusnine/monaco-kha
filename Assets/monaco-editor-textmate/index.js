"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monaco_textmate_1 = require("monaco-textmate");
const tm_to_monaco_token_1 = require("./tm-to-monaco-token");
class TokenizerState {
    constructor(_ruleStack) {
        this._ruleStack = _ruleStack;
    }
    get ruleStack() {
        return this._ruleStack;
    }
    clone() {
        return new TokenizerState(this._ruleStack);
    }
    equals(other) {
        if (!other ||
            !(other instanceof TokenizerState) ||
            other !== this ||
            other._ruleStack !== this._ruleStack) {
            return false;
        }
        return true;
    }
}
/**
 * Wires up monaco-editor with monaco-textmate
 *
 * @param monaco monaco namespace this operation should apply to (usually the `monaco` global unless you have some other setup)
 * @param registry TmGrammar `Registry` this wiring should rely on to provide the grammars
 * @param languages `Map` of language ids (string) to TM names (string)
 */
function wireTmGrammars(monaco, registry, languages, editor) {
    return Promise.all(Array.from(languages.keys())
        .map(async (languageId) => {
        const grammar = await registry.loadGrammar(languages.get(languageId));
        monaco.languages.setTokensProvider(languageId, {
            getInitialState: () => new TokenizerState(monaco_textmate_1.INITIAL),
            tokenize: (line, state) => {
                const res = grammar.tokenizeLine(line, state.ruleStack);
                return {
                    endState: new TokenizerState(res.ruleStack),
                    tokens: res.tokens.map(token => ({
                        ...token,
                        // TODO: At the moment, monaco-editor doesn't seem to accept array of scopes
                        scopes: editor ? tm_to_monaco_token_1.TMToMonacoToken(editor, token.scopes) : token.scopes[token.scopes.length - 1]
                    })),
                };
            }
        });
    }));
}
exports.wireTmGrammars = wireTmGrammars;
//# sourceMappingURL=index.js.map