import { expect, test } from "@jest/globals";
import { rulesList } from "../dist/validators"

const { ipAddress: isIpAddress } = rulesList

test('Is 210.110 ip address', () => {
	expect(isIpAddress!('210.110')).toBe(false)
})

test('Is 255 ip address', () => {
	expect(isIpAddress!('255')).toBe(false)
})

test('Is y.y.y.y ip address', () => {
	expect(isIpAddress!('y.y.y.y')).toBe(false)
})

test('Is 255.0.0.y ip address', () => {
	expect(isIpAddress!('255.0.0.y')).toBe(false)
})

test('Is 666.10.10.20 ip address', () => {
	expect(isIpAddress!('666.10.10.20')).toBe(false)
})

test('Is 33.3333.33.3 ip address', () => {
	expect(isIpAddress!('33.3333.33.3')).toBe(false)
})

test('Is 192.168.0.1 ip address', () => {
	expect(isIpAddress!('192.168.0.1')).toBe(true)
})

test('Is 110.234.52.124 ip address', () => {
	expect(isIpAddress!('110.234.52.124')).toBe(true)
})

test('Is 115.42.150.37 ip address', () => {
	expect(isIpAddress!('115.42.150.37')).toBe(true)
})