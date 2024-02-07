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

## Donations
Creating these libraries is my hobie. If you consider my work useful to you, please consider buying me a coffee. Your contribution keeps me motivated to created and maintain these useful libraries.


[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?business=7X3JAPNBQTXZG&amount=5&no_recurring=0&item_name=NPM%2FGitHub+libraries&currency_code=USD)

[![QR](https://raw.githubusercontent.com/felipecarrillo100/bankgreen/main/QR_Code_5Euro.png)](https://www.paypal.com/donate/?business=7X3JAPNBQTXZG&amount=5&no_recurring=0&item_name=NPM%2FGitHub+libraries&currency_code=USD)

