import { IOnigCaptureIndex } from 'onigasm';
export declare function clone<T>(something: T): T;
export declare function mergeObjects(target: any, ...sources: any[]): any;
export declare class RegexSource {
    static hasCaptures(regexSource: string): boolean;
    static replaceCaptures(regexSource: string, captureSource: string, captureIndices: IOnigCaptureIndex[]): string;
}
