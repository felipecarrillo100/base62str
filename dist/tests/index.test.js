"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../src/index"));
var base62 = index_1.default.createInstance();
test('Test 1: should encode the string to base62', function () {
    expect(base62.encodeStr("Hello World!")).toBe("T8dgcjRGkZ3aysdN");
});
test('Test 2: should encode the string to base62', function () {
    expect(base62.decodeStr("T8dgcjRGkZ3aysdN")).toBe("Hello World!");
});
