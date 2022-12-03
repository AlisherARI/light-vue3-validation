import { expect, test } from "@jest/globals";
import { rulesList } from "../dist/validators"

const { required: isRequired } = rulesList

test('Hello is passed)', () => {
	expect(isRequired!("Hello")).toBe(true)
})

test('0 is passed)', () => {
	expect(isRequired!(0)).toBe(false)
})

test('false is passed)', () => {
	expect(isRequired!(false)).toBe(false)
})