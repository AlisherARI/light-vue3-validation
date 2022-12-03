import { expect, test } from "@jest/globals";
import { rulesList } from "../dist/validators"

const { email: isEmail } = rulesList

test('Empty string is passed', () => {
	expect(isEmail!("")).toBe(false)
})

test('testmail24@mail.com is passed', () => {
	expect(isEmail!("testmail24@mail.com")).toBe(true)
})

test('Email with no @ symbol is passed (testmail24mail.com)', () => {
	expect(isEmail!("testmail24mail.com")).toBe(false)
})

test('Email with space is passed (testmail24 @mail.com)', () => {
	expect(isEmail!("testmail24 @mail.com")).toBe(false)
})

test('No full email is passed testmail24@mai (testmail24@mai)', () => {
	expect(isEmail!("testmail24@mai")).toBe(false)
})

test('Email with forbidden symbols are passed (¶§ª¶ªºª•@mail.com)', () => {
	expect(isEmail!("¶§ª¶ªºª•@mail.com")).toBe(false)
})

test('Valid email is passed (valid.email_is@mail.com)', () => {
	expect(isEmail!("valid.email_is@mail.com")).toBe(true)
})
