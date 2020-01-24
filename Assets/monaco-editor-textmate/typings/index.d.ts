import { Registry } from 'monaco-textmate';
import * as monacoNsps from 'monaco-editor';
/**
 * Wires up monaco-editor with monaco-textmate
 *
 * @param monaco monaco namespace this operation should apply to (usually the `monaco` global unless you have some other setup)
 * @param registry TmGrammar `Registry` this wiring should rely on to provide the grammars
 * @param languages `Map` of language ids (string) to TM names (string)
 */
export declare function wireTmGrammars(monaco: typeof monacoNsps, registry: Registry, languages: Map<string, string>, editor?: monacoNsps.editor.ICodeEditor): Promise<void[]>;
