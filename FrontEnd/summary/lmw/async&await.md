`async & await` 는 프로미스를 기반으로 동작한다.

`async & await` 를 사용하면 프로미스의 `then / catch / finally` 후속 처리 메서드에 콜백 함수를 전달해서 후속 처리할 필요 없이 마치 **동기 처리처럼** 프로미스를 사용할 수 있다.

<aside>
💡 즉, 프로미스의 후속 처리 메소드 없이 마치 동기 처리처럼 프로미스 처리 결과를 반환하도록 구현할 수 있다.

</aside>

## async & await 기본 문법

```jsx
async function 함수명() {
  await 비동기처리메서드명();
}
```

`jsonplaceholder` 사이트의 예제를 이용해 `async & await` 를 구현해보자.

```jsx
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

// {userId: 1, id: 1, title: 'delectus aut autem', completed: false}

async function fetchFunc() {
  const URL = "https://jsonplaceholder.typicode.com/todos/1";
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
}

fetchFunc();

// {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
```

## async 함수

`await` 키워드는 반드시 `async` 함수 내부에서 사용해야 한다.

`async` 함수는 `async` 키워드를 사용해 정의하며 언제나 프로미스를 반환한다.

`async` 함수가 명시적으로 프로미스를 반환하지 않더라도 암묵적으로 반환값을 `resolve` 하는 프로미스를 반환한다.

```jsx
// 함수 선언문
async function callCat(catName) {
  return catName;
}
// 무지
callCat("무지").then((data) => console.log(data));

// 함수 표현식
const callCat2 = async function (catName) {
  return catName;
};
// 막지
callCat2("막지").then((data) => console.log(data));

// 화살표 함수
const callCat3 = async (catName) => catName;
// 코비
callCat3("코비").then((data) => console.log(data));

// method
const Obj = {
  async callCat(catName) {
    return catName;
  },
};
// 먼지
Obj.callCat("먼지").then((data) => console.log(data));
```

## await 키워드

`await` 키워드는 프로미스가 `settled` 상태(비동기 처리가 수행된 상태)가 될 때까지 대기하다가

`settled` 상태가 되면 프로미스가 `resolve` 한 처리 결과를 반환한다.

```jsx
async function fetchFunc() {
  const URL = "https://jsonplaceholder.typicode.com/todos/1";
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
}

fetchFunc();
```

1. `fetch` 함수가 수행한 `HTTP` 요청에 대한 서버의 응답이 도착해서 `fetch` 함수가 반환한 프로미스가 `settled` 상태가 될때까지 대기한다.
2. 프로미스가 `settled` 상태가 되면 프로미스가 `resolve` 한 처리 결과가 `response` 변수에 할당된다.

## 에러처리

`async & await` 에서 에러 처리는 `try ... catch` 문을 사용할 수 있다.

```jsx
const errorTest = async () => {
  try {
    const response = await fetch("https://none.url");
    const data = await response.data();
    console.log(data);
  } catch (error) {
    console.log(`try... catch를 이용한 에러처리 : ${error}`);
  }
};

// try... catch를 이용한 에러처리 : TypeError: Failed to fetch
errorTest();
```

`async` 함수는 발생한 에러를 `reject` 하는 프로미스를 반환한다.

따라서 `catch` 후속 처리 메서드를 사용해 에러를 캐치할 수 있다.

```jsx
const errorCatch = async () => {
  const response = await fetch("https://none.url");
  const data = await response.data();
  return data;
};

// Failed to fetch
errorCatch()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```