import { expect, test } from "@jest/globals";
import { rulesList } from "../dist/validators"

const { numeric: isNumeric } = rulesList

test('29 is passed', () => {
	expect(isNumeric!(29)).toBe(true)
})

test('0 is passed', () => {
	expect(isNumeric!(0)).toBe(true)
})
