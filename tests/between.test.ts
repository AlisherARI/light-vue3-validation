import { expect, test } from "@jest/globals";
import { rulesList } from "../dist"

const { between: isBetween } = rulesList

test('Is 10 more then 5 and less then 15', () => {
	expect(isBetween!(10, [5, 15])).toBe(true)
})

test('Is 5 more then 8 and less then 15', () => {
	expect(isBetween!(5, [8, 15])).toBe(false)
})

test('Is 0 more then 0 and less then 4', () => {
	expect(isBetween!(0, [0, 4])).toBe(true)
})

test('Is -4 more then -5 and less then 4', () => {
	expect(isBetween!(-4, [-5, 4])).toBe(true)
})

test('Is -4 more then -2 and less then 4', () => {
	expect(isBetween!(-4, [-2, 4])).toBe(false)
})