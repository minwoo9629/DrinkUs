## 리덕스 모듈 만들기

### 리덕스 모듈이란

- JS 파일
  - 액션 타입
  - 액션 생성함수
  - 리듀서



### Ducks 패턴

- 리듀서와 액션 관련 코드들을 하나의 파일에 몰아서 작성



### counter 모듈 만들기

#### modules/counter.js

```javascript
/* 액션 타입 만들기 */
// Ducks 패턴을 따를 땐 액션의 이름에 접두사 넣기
// WHY? 다른 모듈과 액션 이름 중복 방지

const SET_DIFF = 'counter/SET_DIFF'
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'


/* 액션 생성함수 만들기 */
// 액션 생성함수 만들고 export로 내보내기
export const setDiff = diff => ({ type: SET_DIFF, diff })
export const increase = () => ({ type: INCREASE })
export const decrease = () => ({ type: DECREASE })


/* 초기 상태 선언 */
const initialState = {
    number: 0,
    diff: 1
}


/* 리듀서 선언 */
// 리듀서는 export default로 내보내기
export default function counter(state = initialState, action) {
    switch (action.type) {
        case SET_DIFF:
            return {
                ...state,
                diff: action.diff
            }
        case INCREASE:
            return {
                ...state,
                number: state.number + state.diff
            }
        case DECREASE:
            return {
                ...state,
                number: state.number - state.diff
            }
        default:
            return state
    }
}
```

### todos 모듈 만들기

#### modules/todos.js

```javascript
/* 액션 타입 선언 */
const ADD_TODO = 'todos/ADD_TODO'
const TOGGLE_TODO = 'todos/TOGGLE_TODO'

/* 액션 생성함수 선언 */
let nextId = 1  // todo 데이터에서 사용할 고유 id
export const addTodo = text => ({
    type: ADD_TODO,
    todo: {
        id: nextId++,  // 새 항목을 추가하고 nextId 값에 1을 더해준다
        text
    }
})

export const toggleTodo = id => ({
    type: TOGGLE_TODO,
    id
})


/* 초기 상태 선언 */
// 리듀서의 초기 상태는 꼭 객체타입일 필요가 없다
// 배열도 되고, 원시 타입(숫자, 문자열, 불리언) 이어도 상관 없다
const initialState = [
    /* 배열 안에 넣을 것 예시
    {
        id: 1,
        text: '예시',
        done: false
    }
    */
]

export default function todos(state = initialState, action) {
    switch(action.type) {
        case ADD_TODO:
            return state.concat(action.todo)
        case TOGGLE_TODO:
            return state.map(
                todo =>
                todo.id === action.id  // id가 일치하면
                ? {...todo, done: !todo.done }  // done 값을 반전시키고
                :todo  // 아니라면 그대로 둠
            )
        default:
            return state
    }
}
```





### 루트 리듀서 만들기

**루트 리듀서란?**

- 한 프로젝트에 여러 리듀서가 있을때 하나로 합쳐서 사용하는데, 이때 합쳐진 리듀서

- HOW?

  리덕스 내장함수인 `combineReducers` 사용

```javascript
import { combineReducers } from 'redux'
import counter from './counter'
import todos from './todos'

const rootReducer = combineReducers({
    counter,
    todos
})

export default rootReducer
```



**리덕스 스토어 만들기**

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux'
import rootReducer from './modules'

const store = createStore(rootReducer)  // 스토어 만들기
console.log(store.getState())  // 스토어의 상태 확인

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```







### 리액트 프로젝트에 리덕스 적용하기

```bash
$ yarn add react-redux
```

- `npm add react-redux`



```js
...
import { Provider } from 'react-redux'
...

...
  <Provider store={store}>
    <App />
  </Provider>
...
```

- Provider로 store를 넣어서 App을 감싸면 우리가 렌더링하는 모든 컴포넌트가 리덕스 스토어에 접근 할 수 있다



