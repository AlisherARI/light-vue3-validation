import { expect, test } from "@jest/globals";
import { rulesList } from "../dist/validators"

const { minValue: isMinValue } = rulesList

test('Is 388 is more then 100', () => {
	expect(isMinValue!(388, 100)).toBe(true)
})

test('Is 233 is more then 400', () => {
	expect(isMinValue!(233, 400)).toBe(false)
})

test('Is 0 is more then 10', () => {
	expect(isMinValue!(0, 10)).toBe(false)
})

test('Is 10 is more then 0', () => {
	expect(isMinValue!(10, 0)).toBe(true)
})

test('Is 0 is more then 0', () => {
	expect(isMinValue!(0, 0)).toBe(true)
})