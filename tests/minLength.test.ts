import { expect, test } from "@jest/globals";
import { rulesList } from "../dist"

const { minLength: isMinLength } = rulesList

test("Is 'Hello' string length is more or equal to 5", () => {
	expect(isMinLength!('Hello', 5)).toBe(true)
})

test("Is 'Hello' string length is more or equal to 8", () => {
	expect(isMinLength!('Hello', 8)).toBe(false)
})

test("Is 'Hello' string length is more or equal to 3", () => {
	expect(isMinLength!('Hello', 3)).toBe(true)
})

test("Is empty string length is more or equal to 5", () => {
	expect(isMinLength!('', 5)).toBe(false)
})