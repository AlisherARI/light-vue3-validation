import {ComputedRef, Ref, UnwrapNestedRefs, UnwrapRef} from 'vue-demi';

export declare interface IRulesList {
    required?: (value: string) => boolean;
    minLength?: (value: string, minLength: number) => boolean;
    maxLength?: (value: string, maxLength: number) => boolean;
    maxValue?: (value: number, maxValue: number) => boolean;
    email?: (value: string) => boolean;
    numeric?: (value: number) => boolean;
    date?: (value: string) => boolean;
}

export declare type TObjectModel = Record<string, { model: TModel; rules: TRule[] }>;
export declare type TModel = string | number | boolean | null | Date | Object | TObjectModel;
export declare type TValidateObjectRefModel = Record<string, { model: TModel; rules: TRule[] }>;

export declare type TSimpleRules = 'required' | 'email' | 'numeric' | 'date';
export declare type THardRules = 'minLength' | 'maxLength' | 'maxValue';
export declare type TRule = TSimpleRules | { type: THardRules; value: number };
export declare type TModelRule = 'required' | 'email' | 'numeric' | 'date' | 'minLength' | 'maxLength' | 'maxValue';

export declare type TValidatedItem<T> = {
    model: Ref<T>;
    isValid: Ref<boolean>;
    modelRules: UnwrapRef<Record<TModelRule, boolean>>;
};

export declare type TRules =
    | { [key in TSimpleRules]: Pick<IRulesList, key> }
    | {
    type: Pick<IRulesList, THardRules>;
    rule: TModelRule;
};

export declare type TValidatedObjectRef<T> = UnwrapNestedRefs<TValidatedReactiveObject<T>> & {
    __isValid: ComputedRef<boolean>;
    __clean: ComputedRef<UnwrapRef<T>>;
};

export declare type TValidatedReactiveObject<T> = {
    [P in keyof T]: TValidatedItem<T[P]>;
};

export declare function useValidate<T>(model: T, rules: TRule[]): UnwrapRef<TValidatedItem<T>>
export declare function useValidateObject<T>(model: TValidateObjectRefModel): UnwrapNestedRefs<TValidatedObjectRef<T>>
