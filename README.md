# **Vue 3 validation hooks**

Fully typed form validation hooks for vue 3.
## Installation

```shell
npm i -S light-vue3-validation
```

## Usage
### Validate single form item
For validating a single item you have to import a `useValidate` hook\
  `useValidate` hook returns a reactive typed object
```typescript
reactive({
    model: Ref<T>;
    isValid: Ref<boolean>;
    modelRules: UnwrapRef<Record<TModelRule, boolean>>;
})
```
```vue
<template>
  <form @submit.prevent="submitForm">
    ...
    <input
        type="number"
        v-model="userIncome.model"
        class="input"
    />
    <p v-if="userIncomeError" class="input_error-message">{{ userIncomeError }}</p>
    ...
  </form>
</template>

<script setup lang="ts">
  import { computed } from "vue"
  import { useValidate } from "light-vue3-validation"
  
  const userIncome = useValidate<number>(0, ['required', 'numeric', { type: 'maxValue', value: 2000 }])
  
  const userIncomeError = computed<boolean | string>(() => {
    if (!userIncome.modelRules.required) return 'User income field is required'
    if (!userIncome.modelRules.numeric) return 'User income must be a numeric'
    if (!userIncome.modelRules.maxValue) return 'User income must be a equal or less then 2000$'
    return false
  })

  const submitForm = () => {
    if (userIncome.isValid) {
      // Do something ...
    }
  }
</script>
```

### Validate an object
For validating an object import a `useValidateObject` hook\
`useValidateObject` hook returns a reactive typed object
```typescript
reactive({
    ...validatedFields,
    __isValid: boolean,
    __clean: // Clean object without model
})
```

```vue
<template>
  <form @submit.prevent="submitForm">
    ...
    <div class="mb-4">
      <input id="name" type="text" v-model="user.name.model" />
      <p v-if="userNameErrors" class="input_error-message">{{ userNameErrors }}</p>
    </div>
    
    <div class="mb-4">
      <input type="tel" v-model="user.name.model" />
      <p v-if="userPhoneErrors" class="input_error-message">{{ userPhoneErrors }}</p>
    </div>
    
    <div class="mb-4">
      <input type="text" v-model="user.role.model" />
      <p v-if="userRoleErrors" class="input_error-message">{{ userRoleErrors }}</p>
    </div>
    ...
  </form>
</template>

<script setup lang="ts">
  import { computed } from "vue"
  import { useValidateObject } from "light-vue3-validation"
  
  type User = {
    name: string
    phone: number
    role: 'Admin' | 'User'
  };
  
  const user = useValidateObject<User>({
    name: { model: '', rules: ['required'] },
    phone: { model: '', rules: ['required', 'numeric', { type: 'minLength', value: 9 }] },
    role: { model: '', rules: ['required'] }
  })

  const userNameErrors = computed<boolean | string>(() => {
    if (!user.modelRules.name.required) return 'Name is required'
    return false
  })
  const userPhoneErrors = computed<boolean | string>(() => {
    if (!user.modelRules.phone.required) return 'Phone is required'
    if (!user.modelRules.phone.numeric) return 'Phone must a numeric'
    if (!user.modelRules.phone.minLength) return 'Phone must be at least 9 digits'
    return false
  })
  const userRoleErrors = computed<boolean | string>(() => {
    if (!user.modelRules.role.required) return 'Role is required'
    return false
  })

  const submitForm = () => {
    if (user.__isValid) {
      // Do something ...
    }
  }
</script>
```

**If some filed in your object not need validation just write an empty array in rules `{ model: '', rules: [] }`**

### Also, you can use it without typescript, just don't write a types
_Errors object in `useValidate` hooks will be soon_

## `useValidate` retrun
Key | Value
--- | ---
`model` | Generic `<T>` 
`isValid` | `boolean`
`modelRules` | An object with key of validation keyword `required, numeric etc...` and value of `boolean`

## `useValidateObject` return
key | Value
--- | ---
Keys of your object | Keys wrapped by `useValidate` hook ` key: { model: ..., isValid: ..., modelRules: { ... } } `
`__isValid` | `boolean`. Returns `true` if all `isValid` keys of your object items becomes `true`
`__clean` | Returns `computed` **clean object** that you passed to hook with no wrapping by `useValidate` hook for each key

## Rules
Rule name | Properties
--- | ---
`alpha` | Accepts only alphabetic characters (a-z and A-Z). Numbers will be failed
`alphaNum` | Accepts only alphabetic and numeric characters (a-z A-Z 0-9)
`between` | Accepts an array of range that your number will be. Example `[10, 30]`. Your number will be valid if it in this range
`email` | Accepts a string which is email
`ipAddress` | Accepts a string like `###.###.###.###`
`maxLength` | Accepts a string which length is less then max value you passed
`minLength` | Accepts a string which length is more then min value you passed
`maxValue` | Accepts a number which is less then max value you passed
`minValue` | Accepts a number which is more then min value you passed
`numeric` | Accepts only number 0-9
`required` | Accepts anything and will be failed if model is empty

