export type JsonPrimitive = null | string | number | boolean;

export type JsonSerializable =
  | JsonPrimitive
  | JsonSerializable[]
  | {
      [key: string]: JsonSerializable;
    };
