import { expect, test } from "@jest/globals";
import { rulesList } from "../dist"

const { alpha: isAlpha } = rulesList

test("Is 'Hello world' is alphabetic", () => {
	expect(isAlpha!('Hello world')).toBe(true)
})

test("Is 'Hello world 22' is alphabetic", () => {
	expect(isAlpha!('Hello world 22')).toBe(false)
})

test("Is empty string is alphabetic", () => {
	expect(isAlpha!('')).toBe(false)
})

test("Is '1999' is alphabetic", () => {
	expect(isAlpha!('1999')).toBe(false)
})