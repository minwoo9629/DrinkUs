## 리덕스 사용 준비

```bash
$ npx create-react-app learn-redux

$ npm add redux
```



```js
// exercise.js

import { createStore } from 'redux'

// createStore는 스토어를 만들어주는 함수
// 리액트 프로젝트에서는 단 하나의 스토어를 만든다


/* 리덕스에서 관리 할 상태 정의 */
const initialState = {
    counter: 0,
    text: '',
    list: []
}


/* 액션 타입 정의(대문자) */
// 액션 타입이 변경될 경우를 대비(유지보수 용이)
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'
const CHANGE_TEXT = 'CHANGE_TEXT'
const ADD_TO_LIST = 'ADD_TO_LIST'



/* 액션 생성함수 정의(camelCase) */
function increase() {
    return {
        type: INCREASE // 액션 객체에는 type 값이 필수
    }
}

// 화살표 함수가 더 간단하니 추천!
const decrease = () => ({
    type: DECREASE
})

const changeText = text => ({
    type: CHANGE_TEXT,
    text
})

const addToList = item => ({
    type: ADD_TO_LIST,
    item
})


/* 리듀서 만들기 (!!불변성 꼭 지켜주기!!) */

function reducer(state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            return {
                ...state,
                counter: state.counter + 1
            }
        case DECREASE: 
            return {
                ...state,
                counter: state.counter - 1
            }
        case ADD_TO_LIST:
            return {
                ...state,
                list: state.list.concat(action.item)
            }
        default:
            return state
    }
}


/* 스토어 만들기 */
const store = createStore(reducer)

console.log(store.getState()) // 현재 store 안에 있는 state 조회

// 스토어 안에 있는 state가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
    const state = store.getState()
    console.log(state)
}

const unsubscribe = store.subscribe(listener)
console.log(unsubscribe)

// 액션 dispatch
store.dispatch(increase())
store.dispatch(decrease())
store.dispatch(changeText('하이하이'))
store.dispatch(addToList({ id: 1, text: '안뇽'}))
```

