# base62str

[![Sponsor](https://img.shields.io/badge/Sponsor-❤️-ff69b4?style=for-the-badge&logo=github)](https://github.com/sponsors/felipecarrillo100)

Encode/Decode strings to Base62 strings. Useful to convert any string to an encoded string that only contains letters and numbers.

**[Live Demo](https://felipecarrillo100.github.io/base62str/)**

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
Or, directly in the browser with no build step, via a `<script>` tag (exposes a `Base62Str` global):
```html
<script src="https://unpkg.com/base62str/dist/index.global.js"></script>
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

## Donations & Sponsoring
Creating and maintaining open-source libraries is a passion of mine. If you find this library useful and it saves you time, please consider supporting its development. Your contributions help keep the project active and motivated!

Every bit of support—whether it's sponsoring on GitHub, a coffee, a star, or a shout-out, is deeply appreciated. Thank you for being part of the community!

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" name="buy-me-a-coffee" alt="Buy Me A Coffee" width="180">](https://buymeacoffee.com/felipecarrillo100)

[![Sponsor](https://img.shields.io/badge/Sponsor-❤️-ff69b4?style=for-the-badge&logo=github)](https://github.com/sponsors/felipecarrillo100)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?business=7X3JAPNBQTXZG&amount=5&no_recurring=0&item_name=NPM%2FGitHub+libraries&currency_code=USD)

[![QR](https://raw.githubusercontent.com/felipecarrillo100/bankgreen/main/QR_Code_5Euro.png)](https://www.paypal.com/donate/?business=7X3JAPNBQTXZG&amount=5&no_recurring=0&item_name=NPM%2FGitHub+libraries&currency_code=USD)

