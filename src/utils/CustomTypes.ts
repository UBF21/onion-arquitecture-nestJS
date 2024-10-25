export type RelationKeys<T> = {
    [K in keyof T]: T[K] extends object ? K : never;
}[keyof T];

type IdField<T> = {
    [K in keyof T]: K extends `id${string}` ? K : never;
  }[keyof T];