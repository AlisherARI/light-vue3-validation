# **Validating ref**
Accepts this rules
```typescript
'required' | 'email' | 'numeric' | 'date' | 'minLength' | 'maxLength';
```
Returns an object
```typescript
return reactive({
  model,      // Value that you must assign to v-model
  isValid,    // Bacome true if all rules becomes true
  modelRules, // An object that have a rules state,
              // For example, { required: true, minLength: false }
});
```

Test it:  [Demo](https://alisherari.github.io/simple-vue3-validation/)

## **Installation**
```shell
npm install -S light-vue3-validation
```

## **How to use it**

### **First**
Import `validateRef` function
```javascript
import { validateRef } from "light-vue3-validation"
```

### **Second**
Assign this function to your variable and put two parameters
* First is your model
* Second is your validations
```javascript
setup() {
  ...
  const phone = validateRef('', ['required', 'numeric', { type: "maxLength", value: 12 }])
  ...
}
```
If your validating data is an object do something like this
```javascript
import { reactive } from "vue"

const user = reactive({
  phone: validateRef('', ['required', { type: 'minLength', value: 12 }]),
  password: validateRef('', ['required', { type: 'minLength', value: 6 }]),
  remember_me: ref(true),
})
```

### **Third**
Assign variable's `model` value to your `v-model`
```html
<input ... v-model="phone.model" ... />
```

## That's all

Now you can control you variable and set messages you need by `modelRules` object parameters
