import { expect, test } from "@jest/globals";
import { rulesList } from "../dist/validators"

const { maxLength: isMaxLength } = rulesList

test("Is 'Hello' string length is less or equal to 5", () => {
	expect(isMaxLength!('Hello', 5)).toBe(true)
})

test("Is 'Hello' string length is less or equal to 8", () => {
	expect(isMaxLength!('Hello', 8)).toBe(true)
})

test("Is 'Hello' string length is less or equal to 3", () => {
	expect(isMaxLength!('Hello', 3)).toBe(false)
})

test("Is empty string length is less or equal to 5", () => {
	expect(isMaxLength!('', 5)).toBe(true)
})