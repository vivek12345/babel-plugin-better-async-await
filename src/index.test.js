import pluginTester from 'babel-plugin-tester';
import babelPluginBetterAsyncAwait from './index';

pluginTester({
  plugin: babelPluginBetterAsyncAwait,
  tests: [
    {
      title: 'promise with identifier',
      code: `
        async function test() {
          const [err, resp] = await promise;
        }
      `,
      output: `
        async function test() {
          const [err, resp] = await promise().then(resp => {
            return [null, resp];
          }).catch(error => {
            return [error];
          });
        }
      `
    },
    {
      title: 'promise with member expression and args',
      code: `
        async function test() {
          const [err, resp] = await api.getData(4);
        }
      `,
      output: `
        async function test() {
          const [err, resp] = await api.getData(4).then(resp => {
            return [null, resp];
          }).catch(error => {
            return [error];
          });
        }
      `
    },
    {
      title: 'promise with a call expression',
      code: `
        async function test() {
          const [err, resp] = await getData(4);
        }
      `,
      output: `
        async function test() {
          const [err, resp] = await getData(4).then(resp => {
            return [null, resp];
          }).catch(error => {
            return [error];
          });
        }
      `
    },
    {
      title: 'promise with a new expression',
      code: `
        async function test() {
          const [err, resp] = await new Promise((resolve, reject) => {
            resolve(true);
          });
        }
      `,
      output: `
        async function test() {
          const [err, resp] = await new Promise((resolve, reject) => {
            resolve(true);
          }).then(resp => {
            return [null, resp];
          }).catch(error => {
            return [error];
          });
        }
      `
    },
    {
      title: 'promise with a just a promise and resolve',
      code: `
        async function test() {
          const [err, resp] = await Promise.resolve(true);
        }
      `,
      output: `
        async function test() {
          const [err, resp] = await Promise.resolve(true).then(resp => {
            return [null, resp];
          }).catch(error => {
            return [error];
          });
        }
      `
    },
    {
      title: 'promise with left side not an array expression',
      code: `
        async function test() {
          const resp = await api.getData();
        }
      `,
      output: `
        async function test() {
          const resp = await api.getData();
        }
      `
    },
    {
      title: 'promise with left side an assignment expression',
      code: `
        async function test() {
          let err, resp;
          [err, resp] = await api.getData();
        }
      `,
      output: `
        async function test() {
          let err, resp;
          [err, resp] = await api.getData().then(resp => {
            return [null, resp];
          }).catch(error => {
            return [error];
          });
        }
      `
    }
  ]
});
