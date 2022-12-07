import { expect, test } from "@jest/globals";
import { rulesList } from "../dist"

const { alphaNum: isAlphaNum } = rulesList

test("Is 'Hello world' is alphabetic or numeric", () => {
	expect(isAlphaNum!('Hello world')).toBe(true)
})

test("Is 'Hello world 22' is alphabetic or numeric", () => {
	expect(isAlphaNum!('Hello world 22')).toBe(true)
})

test("Is empty string is alphabetic or numeric", () => {
	expect(isAlphaNum!('')).toBe(false)
})

test("Is '1999' is alphabetic or numeric", () => {
	expect(isAlphaNum!('1999')).toBe(true)
})