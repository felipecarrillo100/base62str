import Base62Str from "../src/index";

const base62 = Base62Str.createInstance();


test('Test 1: should encode the string to base62', () => {
    expect(base62.encodeStr("Hello World!")).toBe("T8dgcjRGkZ3aysdN");
})

test('Test 2: should encode the string to base62', () => {
    expect(base62.decodeStr("T8dgcjRGkZ3aysdN")).toBe("Hello World!");
})