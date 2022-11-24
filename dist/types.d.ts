import {ComputedRef, Ref, UnwrapNestedRefs, UnwrapRef} from 'vue-demi';

export interface IRulesList {
    required?: (value: string) => boolean;
    minLength?: (value: string, minLength: number) => boolean;
    maxLength?: (value: string, maxLength: number) => boolean;
    maxValue?: (value: number, maxValue: number) => boolean;
    email?: (value: string) => boolean;
    numeric?: (value: number) => boolean;
    date?: (value: string) => boolean;
}

export type TObjectModel = Record<string, { model: TModel; rules: TRule[] }>;
export type TModel = string | number | boolean | null | Date | Object | TObjectModel;
export type TValidateObjectRefModel = Record<string, { model: TModel; rules: TRule[] }>;

export type TSimpleRules = 'required' | 'email' | 'numeric' | 'date';
export type THardRules = 'minLength' | 'maxLength' | 'maxValue';
export type TRule = TSimpleRules | { type: THardRules; value: number };
export type TModelRule = 'required' | 'email' | 'numeric' | 'date' | 'minLength' | 'maxLength' | 'maxValue';

export type TValidatedItem<T> = {
    model: Ref<T>;
    isValid: Ref<boolean>;
    modelRules: UnwrapRef<Record<TModelRule, boolean>>;
};

export type TRules =
    | { [key in TSimpleRules]: Pick<IRulesList, key> }
    | {
    type: Pick<IRulesList, THardRules>;
    rule: TModelRule;
};

export type TValidatedObjectRef<T> = UnwrapNestedRefs<TValidatedReactiveObject<T>> & {
    __isValid: ComputedRef<boolean>;
    __clean: ComputedRef<UnwrapRef<T>>;
};

export type TValidatedReactiveObject<T> = {
    [P in keyof T]: TValidatedItem<T[P]>;
};

export { useValidate, useValidateObject } from "./index"