export type JsonValue = string | number | boolean | null | undefined | JsonArray | JsonMap;
export type JsonMap = {
    [key: string]: JsonValue;
};
export type JsonArray = JsonValue[];
export type Json = JsonArray | JsonMap;
