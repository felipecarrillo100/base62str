# base62str
Encode/Decode strings to Base62 strings. Useful to convert any string to an encoded string that only contains letters and numbers.

## How to install:
npm install base62str

## How to include
```javascript
import Base62Str from "base62str";
```
## To use
### Create an instance
First create an instance: 
```javascript
  const base62 = Base62Str.createInstance();  
```  
If you prefer you can create an instance with inverted CharacterSet:  
```javascript
  const base62 = Base62Str.createInstanceWithInvertedCharacterSet();
```
### Encoding:
```javascript
   const encodedString = base62.encodeStr("Hello World!");
   // encodedString => T8dgcjRGkZ3aysdN
```
### Decoding:
```javascript
   const decodedString = base62.decodeStr(encodedString);
   // decodedString => Hello World!
```
