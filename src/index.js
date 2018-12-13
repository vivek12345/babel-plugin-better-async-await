import template from '@babel/template';
import * as t from '@babel/types';

const buildPromiseFromAwait = template(`
  CALLER(ARGS).then(RESPONSE => {
    return [null, RESPONSE];
  })
  .catch(ERROR => {
    return [ERROR];
  });
`);

module.exports = function() {
  function awaitToPromiseMethod(caller, args) {
    const ast = buildPromiseFromAwait({
      CALLER: caller,
      RESPONSE: t.identifier('resp'),
      ARGS: args,
      ERROR: t.identifier('error')
    });
    const exp = ast;
    return exp;
  }
  function updatePath(path, left, right) {
    if (!t.isArrayPattern(left) || !t.isAwaitExpression(right)) return;
    const rightNodeOperation = right.argument;
    if (t.isCallExpression(rightNodeOperation)) {
      const callee = rightNodeOperation.callee;
      const args = rightNodeOperation.arguments;
      if (t.isMemberExpression(callee)) {
        const { object, property } = callee;
        const caller = `await ${object.name}.${property.name}`;
        path.replaceWith(awaitToPromiseMethod(caller, args));
      } else {
        const caller = `await ${callee.name}`;
        path.replaceWith(awaitToPromiseMethod(caller, args));
      }
    } else if (t.isIdentifier(rightNodeOperation)) {
      const caller = `await ${rightNodeOperation.name}`;
      path.replaceWith(awaitToPromiseMethod(caller, []));
    } else if (t.isNewExpression(rightNodeOperation)) {
      const args = rightNodeOperation.arguments;
      const caller = `await new ${rightNodeOperation.callee.name}`;
      path.replaceWith(awaitToPromiseMethod(caller, args));
    }
  }

  return {
    name: 'babel-plugin-better-async-await',
    visitor: {
      AwaitExpression: function(path) {
        let left, right;
        if (t.isAssignmentExpression(path.parent)) {
          left = path.parent.left;
          right = path.parent.right;
        } else if (t.isVariableDeclarator(path.parent)) {
          left = path.parent.id;
          right = path.parent.init;
        }
        updatePath(path, left, right);
      }
    }
  };
};
