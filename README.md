# base62str
Encode/Decode strings to Base62 strings. Useful to convert any string to an encoded string that only contains letters and numbers.

## How to install:
npm install base62str

## How to include
```javascript
import Base62Str from "base62str";
```
If you want to use the library in nodejs then use require as follows:
```javascript
const Base62Str = require("base62str").default;
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
