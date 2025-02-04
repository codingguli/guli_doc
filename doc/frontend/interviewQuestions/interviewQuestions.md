# 前端面试题

:::info JSON.stringify 有哪些参数？

- 1 个参数，会过滤掉 undefined

```js
const obj = {
  name: "测试一下",
  age: 20,
  info: {
    a: undefined,
    b: undefined,
  },
};

// 1个参数，会过滤掉undefined
const obj1 = JSON.stringify(obj);
// 2个参数，回调函数
const obj2 = JSON.stringify(obj, (key, value) => {
  if (typeof value === "number") {
    return;
  }
  return value;
});
// 2个参数，过滤key
const obj3 = JSON.stringify(obj, ["name", "age"]);

// 3个参数，间隔符
const obj4 = JSON.stringify(obj, null, 2);
```

:::

:::info 完整的防抖函数都有哪些功能？

```js
_.debouned(
  () => {
    console.log("触发了", 111);
  },
  1000,
  {
    leading: true, // 首次触发
    trailing: true, // 结尾触发
  }
);
```

:::

:::info 柯里化函数？

```js
function sum(a, b, c) {
  return a + b + c;
}

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

console.log("测试数据1", curry(sum)(1)(2)(3));
console.log("测试数据2", curry(sum)(1)(2, 3));
console.log("测试数据3", curry(sum)(1, 2, 3));
```

:::

:::info 前端优化方面，你会采取什么方式？

:::