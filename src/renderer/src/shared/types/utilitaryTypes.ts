/**
 * Get the keys of an object that give a specific type.
 */
export type KeysLeadingToType<T extends object, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
