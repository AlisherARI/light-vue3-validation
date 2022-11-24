# **Vue 3 validation hooks**

Fully typed form validation hooks for vue 3.
## Installation

```shell
npm install light-vue3-validation
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
  <formc @submit.prevent="submitForm">
    ...
    <input
        type="number"
        v-model="userIncome.model"
        class="input"
    />
    <p v-if="userIncomeError" class="input_error-message">{{ userIncomeError }}</p>
    ...
  </formc>
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
    name: { model: '', ['required'] },
    phone: { model: '', ['required', 'numeric', { type: 'minLength', value: 9 }] },
    role: { model: '', ['required'] }
  })

  const userNameErrors = computed<boolean | string>(() => {
    if (!user.name.required) return 'Name is required'
    return false
  })
  const userPhoneErrors = computed<boolean | string>(() => {
    if (!user.phone.required) return 'Phone is required'
    if (!user.phone.numeric) return 'Phone must a numeric'
    if (!user.phone.minLength) return 'Phone must be at least 9 digits'
    return false
  })
  const userRoleErrors = computed<boolean | string>(() => {
    if (!user.role.required) return 'Role is required'
    return false
  })

  const submitForm = () => {
    if (user.__isValid) {
      // Do something ...
    }
  }
</script>
```

### Also, you can use it without typescript, just don't write a types
_Errors object in `useValidate` hooks will be soon_

## `useValidate` retrun
Key | Value
--- | ---
model | Generic `<T>` 
isValid | `boolean`
modelRules | An object with key of validation keyword `required, numeric etc...` and value of `boolean`

## `useValidateObject` return
key | Value
--- | ---
Keys of your object | Keys wrapped by `useValidate` hook ` key: { model: ..., isValid: ..., modelRules: { ... } } `
__isValid | `boolean`. Returns `true` if all `isValid` keys of your object items becomes `true`
__clean | Returns `computed` **clean object** that you passed to hook with no wrapping by `useValidate` hook for each key

