# babel-plugin-better-async-await
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

> Write better async await and avoid the try catch statements

## 🚚 Installation

```sh
npm install --save-dev babel-plugin-better-async-await
```

or

```sh
yarn add babel-plugin-better-async-await --dev
```

## ⚡️ The problem solved

## 📒 Examples

**In**
```javascript
async function test() {
  const [err, resp] = await api.getData(5);
}

```

**Out**
```javascript
async function test() {
  const [err, resp] = await api.getData(5).then(resp => {
      return [null, resp];
  }).catch(error => {
      return [error];
  });
}
```
======================================

**In**
```javascript
async function test() {
  const [err, resp] = await getData(5);
}

```

**Out**
```javascript
async function test() {
  const [err, resp] = await getData(5).then(resp => {
      return [null, resp];
  }).catch(error => {
      return [error];
  });
}
```
======================================

**In**
```javascript
async function test() {
  const [err, resp] = await getData
}

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(true);
    }, 1000);
  });
}
```

**Out**
```javascript
async function test() {
  const [err, resp] = await getData().then(resp => {
      return [null, resp];
  }).catch(error => {
      return [error];
  });
}

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(true);
    }, 1000);
  });
}
```
======================================

**In**
```javascript
async function test() {
  const [err, resp] = await new Promise((resolve, reject) => {
    resolve(true);
  });
}

```

**Out**
```javascript
async function test() {
  const [err, resp] = await new Promise((resolve, reject) => {
    resolve(true);
  }).then(resp => {
      return [null, resp];
  }).catch(error => {
      return [error];
  });
}
```
======================================

**In**
```javascript
async function test() {
  const [err, resp] = await Promise.resolve(true);
}

```

**Out**
```javascript
async function test() {
  const [err, resp] = await Promise.resolve(true).then(resp => {
      return [null, resp];
  }).catch(error => {
      return [error];
  });
}
```
======================================

## ⭐ Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["babel-plugin-better-async-await"]
}
```

### Via CLI

```sh
babel --plugins babel-plugin-better-async-await script.js
```

### Via Node API

without options:
```js
require('babel-core').transform('code', {
  plugins: [
    'babel-plugin-better-async-await',
  ],
});
```

## 👍 Contribute

Show your ❤️ and support by giving a ⭐. Any suggestions and pull request are welcome !

### 📝 License

MIT © [viveknayyar](https://github.com/vivek12345)

## 👷 TODO

- [x] Complete README
- [ ] Add Examples and Demo
- [x] Test Suite

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/4931048?v=4" width="100px;"/><br /><sub><b>Vivek Nayyar</b></sub>](https://www.viveknayyar.in/)<br />[🐛](https://github.com/vivek12345/babel-plugin-better-async-await/issues?q=author%3Avivek12345 "Bug reports") [💻](https://github.com/vivek12345/babel-plugin-better-async-await/commits?author=vivek12345 "Code") [🎨](#design-vivek12345 "Design") [📖](https://github.com/vivek12345/babel-plugin-better-async-await/commits?author=vivek12345 "Documentation") [💡](#example-vivek12345 "Examples") [🤔](#ideas-vivek12345 "Ideas, Planning, & Feedback") [📦](#platform-vivek12345 "Packaging/porting to new platform") [🔌](#plugin-vivek12345 "Plugin/utility libraries") [⚠️](https://github.com/vivek12345/babel-plugin-better-async-await/commits?author=vivek12345 "Tests") [🔧](#tool-vivek12345 "Tools") [✅](#tutorial-vivek12345 "Tutorials") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!