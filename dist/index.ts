import {computed, reactive, Ref, ref, UnwrapNestedRefs, UnwrapRef, watch} from 'vue';
import {
    IRulesList,
    TValidateObjectRefModel,
    TRule,
    TModelRule,
    TValidatedItem,
    TValidatedReactiveObject,
    TValidatedObjectRef,
    TRules,
} from './types';

const rulesList: IRulesList = {
    /**
     *  Check if field is required (is not empty)
     */
    required: value => !!value,

    /**
     *  Check if value is not less than minimal length
     */
    minLength: (value, minLength) => value.length >= minLength,

    /**
     * Check if value is not more than max length
     */
    maxLength: (value, maxLength) => value.length <= maxLength,

    /**
     * Check if value is not more then max value
     */
    maxValue: (value, maxValue) => !(maxValue < value),

    /**
     * Test value for email by regular expression
     */
    email: value => /^\w+@[a-zA-Z_]+?\.?[a-z]+\.[a-zA-Z]{2,10}$/.test(value),

    /**
     * Check if value is a number
     */
    numeric: value => !isNaN(Number(value)),

    /**
     * Check if value is a Date
     */
    date: value => {
        const valueDate = new Date(value);
        const timeInMilliSecond = valueDate.valueOf();
        const isInvalidDate = isNaN(timeInMilliSecond);
        return !isInvalidDate;
    },
};

/**
 * Validation hook for single variable
 */
function useValidate<T>(model: T, rules: TRule[]): UnwrapRef<TValidatedItem<T>> {
    const localRules: TRules = {} as TRules;

    // Get input rules from global rules list and copy them to local rules
    rules.forEach(rule => {
        if (typeof rule === 'string') {
            localRules[rule] = rulesList[rule];
        } else {
            localRules[rule.type] = {
                type: rulesList[rule.type],
                rule: rule.value,
            };
        }
    });

    // v-model will be bind with this variable
    const value = ref<T>(model);
    // Rules object that returns key as rule name and value as boolean
    const modelRules = reactive<Record<TModelRule, boolean>>({} as Record<TModelRule, boolean>);
    // Is variable valid or not
    const isValid = ref<boolean>(false);

    watch(
        value,
        () => {
            // Loop through local rules array and run validation functions
            for (const rule in localRules) {
                if (typeof localRules[rule] === 'object') {
                    modelRules[rule] = localRules[rule].type(value.value, localRules[rule].rule);
                } else {
                    modelRules[rule] = localRules[rule](value.value);
                }
            }
            // Check if all rules are valid
            isValid.value = Object.values(modelRules).every(rule => rule);
        },
        {immediate: true}
    );

    return reactive<TValidatedItem<T>>({
        model: value as Ref<T>,
        isValid,
        modelRules,
    });
}

/**
 * Validation hook for object
 */
function useValidateObject<T>(model: TValidateObjectRefModel): UnwrapNestedRefs<TValidatedObjectRef<T>> {
    const modelKeys: (keyof T)[] = Object.keys(model) as (keyof T)[];
    const validatedFields = reactive<TValidatedReactiveObject<T>>({} as TValidatedReactiveObject<T>);

    for (let keyIndex = 0; keyIndex < modelKeys.length; ++keyIndex) {
        const key = modelKeys[keyIndex] as string;
        validatedFields[key] = useValidate(model[key].model, model[key].rules);
    }

    const cleanObject = ref<T>({} as T);

    const clean = computed<UnwrapRef<T>>(() => {
        Object.keys(validatedFields).forEach(key => {
            cleanObject.value[key] = validatedFields[key].model;
        });
        return cleanObject.value;
    });

    const isValid = computed<boolean>(() => modelKeys.every(key => validatedFields[key].isValid));

    return reactive<TValidatedObjectRef<T>>({
        ...validatedFields,
        __isValid: isValid,
        __clean: clean,
    });
}

module.exports = {
    useValidate,
    useValidateObject
}