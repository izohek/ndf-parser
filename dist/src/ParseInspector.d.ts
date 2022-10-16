declare type KeyPath = string[];
export declare function inspect(object: any, path: KeyPath, index?: number): string | undefined;
export declare function keyPathFromString(kpString: string): KeyPath | null;
export {};
