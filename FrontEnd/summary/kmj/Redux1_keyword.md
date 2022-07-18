## 리덕스에서 사용되는 키워드

### 액션  (Action)

- 상태에 어떤 **변화가 필요할 때**

- `type` 필드는 필수, 그 외에는 상관 X

- ```js
  {
    type: "ADD_TODO",
    data: {
      id: 0,
      text: "리덕스 배우기"
    }
  }
  ```

- ```js
  {
    type: "CHANGE_INPUT",
    text: "안녕하세요"
  }
  ```



### 액션 생성함수 (Action Creator)

- **액션을 만드는 함수**
- 파라미터를 받아와서 액션 객체 형태로 만들어준다

- WHY?

  컴포넌트에서 쉽게 액션을 발생시키기 위해

  - `export` 키워드를 붙여서 다른 파일에서 불러온다



### 리듀서 (Reducer)

- **변화를 일으키는 함수**

- 두 가지 파라미터를 받아온다

  ```js
  function render(state, action) {
      // 상태 업데이트 로직
      return alteredState
  }
  ```

  - `state` `현재의 상태`와 `action` `전달 받은 액션` 을 참고해 **새로운 상태를 만들어서 반환**

  ```js
  function counter(state, action) {
    switch (action.type) {
      case 'INCREASE':
        return state + 1;
      case 'DECREASE':
        return state - 1;
      default:
        return state;
    }
  }
  ```

  - **`default` 시에는 기존 `state`를 그대로 반환해야 한다**





### 스토어 (Store)

- 1 App 1 Store
- 현재의 앱 상태, 리듀서, + a(내장함수)



### 디스패치 (dispatch)

- 스토어의 내장함수 중 하나

- **액션을 발생시키는 것**

  액션을 파라미터로 전달한다 ex)`dispatch(action)`

- dispatch 호출 --> store에서 reducer 함수 실행 --> 새로운 상태 or default



### 구독 (subscribe)

- 스토어의 내장함수 중 하나
- *subscribe 함수에 특정 함수를 전달해주면, 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출된다*(??)
- *react-redux 라는 라이브러리에서 제공하는 `connect` 함수 또는 `useSelector` Hook 을 사용하여 리덕스 스토어의 상태에 구독한다*(???)