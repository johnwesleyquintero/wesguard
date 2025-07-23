declare module "class-variance-authority" {
  import type {
    ClassProp,
    OmitUndefined,
    VariantProps as CVA_VariantProps,
  } from "class-variance-authority/dist/types";
  export type VariantProps<T extends (...args: any) => any> =
    CVA_VariantProps<T>;
  export const cva: <T extends Record<string, Record<string, ClassProp>>>(
    base?: ClassProp,
    config?: {
      variants?: T;
      defaultVariants?: {
        [K in keyof T]?: OmitUndefined<keyof T[K]>;
      };
      compoundVariants?: T extends Record<string, infer V>
        ? Array<
            {
              [K in keyof T]?: OmitUndefined<keyof T[K]>;
            } & {
              class: ClassProp;
              className?: ClassProp;
            }
          >
        : never;
    },
  ) => (
    props?: {
      [K in keyof T]?: OmitUndefined<keyof T[K]> | null;
    } & {
      class?: ClassProp;
      className?: ClassProp;
    },
  ) => string;
}
