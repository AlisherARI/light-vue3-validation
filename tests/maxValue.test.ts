import { expect, test } from "@jest/globals";
import { rulesList } from "../dist"

const { maxValue: isMaxValue } = rulesList

test('Is 388 is less then 400', () => {
	expect(isMaxValue!(388, 400)).toBe(true)
})

test('Is 500 is less then 400', () => {
	expect(isMaxValue!(500, 400)).toBe(false)
})

test('Is 10 is less then 0', () => {
	expect(isMaxValue!(10, 0)).toBe(false)
})

test('Is 0 is less then 10', () => {
	expect(isMaxValue!(0, 10)).toBe(true)
})

test('Is 0 is less then 0', () => {
	expect(isMaxValue!(0, 0)).toBe(true)
})