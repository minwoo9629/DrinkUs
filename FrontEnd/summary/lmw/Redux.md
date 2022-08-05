## Redux란?

> A Predictable State Container for JS Apps
> 어플리케이션의 복잡성을 낮추어 작성한 코드가 어떤 결과를 가져올지 예측가능하게 만들어 주는 도구이다.

## Redux를 왜 사용할까?

> 컴포넌트간의 `state` 가 넘나들면서 수정하기에 어렵기 때문에 좀 더 용이하다.
> 그렇다면 `state` 가 특정 컴포넌트에 종속적이라면 그 컴포넌트 내에서 `state` 를 사용한다.
> `Redux` 를 사용한다 해서 `state` 를 무조건 사용하지 않는다는 것은 아니다.

## action

> `action` 은 `redux` 에서 `state` 를 어떻게 바꿀 것인지에 대한 행위를 정의한다.
> 코드의 중복과 가독성을 위해 `action` 객체를 `return` 하는 `creator` 함수를 작성하는 것이 좋다.
> `action Creator` -> `initialState` 또는 기존 `state` 중심으로 생각
> 내가 기존 `state`를 어떻게 바꿀 것인가에 대해 생각을 하자

```jsx
const logIn = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};
```

## dispatch

> `action` 을 실행한다.

## Store

> `state` 를 관리하는 곳, 데이터 묶음

```jsx
// createStore 안에는 Reducer가 들어가야함
const store = createStore(reducer, initialState);
```

## Reducer

> `reducer` 는 함수이며 새로운 객체를 만들어 `state` 를 새로운 객체로 대체한다.

```jsx
const reducer = (prevState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...prevState,
        user: action.data,
      };
    case "LOG_OUT":
      return {
        ...prevState,
        user: null,
      };
    case "ADD_POST":
      return {
        ...prevState,
        posts: [...prevState.posts, action.data],
      };
    default:
      return prevState;
  }
};
```

## subscribe

> 우리에게 `store` 안에 있는 변화들을 알 수 있게 해준다.

## Redux를 이용한 `state` 관리 일반적인 `state` 사용하는 것이 좋을까

> 컴포넌트간의 이동하는 `state` 의 경우 `Redux` 를 통해 관리하고 하나의 컴포넌트 안에서만 또는 부모 자식 관계안에서는 일반적인 `state` 로 관리한다.
