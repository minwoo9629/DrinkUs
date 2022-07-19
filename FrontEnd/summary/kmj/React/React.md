- `npm  start`로 브라우저를 열려고 시도

  > *react-scripts'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는 배치 파일이 아닙니다.*
  >
  > 라는 에러 메시지가 뜬다면

  - ``npm install -save read-scripts` 로 해결가능





React JS와 ReactDOM 코드 import

```html
<script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
```

React JS는 element를 생성하고 event listener를 더하는 것을 도와준다 => interactive power

ReactDOM

- React element들을 가져다가 HTMl로 바꾼다
  - body에 비어있는 div 생성
    - ReactDOM이 React element들을 가져다놓을 곳



CreateElement를 안 쓴다!!

JSX: JavaScript를 확장한 문법

- HTML 코드와 유사



브라우저에서 오류가 남

=> Babel을 써야 한다

- JSX로 적은 코드를 브라우저가 이해할 수 있는 형태로 바꿔준다

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
```

​		= () => : arrow function





컴포넌트의 첫 글자는 반드시 대문자여야 한다

```html
const Container = (
      <div>
        <Title /> <Button />
      </div>
    )
```



JSX는 어플리케이션을 여러 가지 작은 요소로 나누어 관리할 수 있게 해준다





## Understanding State

state: 데이터가 저장되는 곳



## setState

```html
React.useState()
```

--> console창에 [undefined, f] == [초기값, 함수]

```html
const x = [1, 2, 3]
const [a, b, c] = x
```

a는 1, b는 2, c는 3

- JS의 문법



```html
const root = document.getElementById("root")
    function App() {
      const [counter, setCounter] = React.useState(0)
      const onClick = () => {
        setCounter(counter + 1)
      }
      return(
        <div>
          <h3>Total clicks: {counter}</h3>
          <button onClick={onClick}>Click me</button>
        </div>
      )
    }
    ReactDOM.render(<App />, root)
```







modifier 함수를 가지고 state를 변경할 때 컴포넌트 전체가

새로운 값을 가지고 재생성 된다

컴포넌트란? function App



**state가 바뀌면 리렌더링이 일어난다**



### 폴더

src폴더

- 모든 파일들을 넣을 폴더

index.js

- ReactDOM, document.getElementById 등 이 있다



creat-react-app은 어플리케이션을 가지고 여기 index.html 안에 넣어주도록 설정되어 있음



마우스 우클릭 후 Inspect들어가면 'static/js' 들이 있는데 이는 실제로 index.html에 존재하지 않는다



### create-react-app의 장점 및 특징

- Auto-Reload(자동 재실행)

  - App.js

    ```js
    function App() {
        return (
        ...
        <p> ~~~ </p>)
    }
    ```

    p 태그안에 내용을 바꿔주고 저장하면 화면의 내용이 바뀜!



```html
<button class="Button_btn__-f8Nl">Continue</button>
```

creact-react-app은 무작위적인 랜덤 class를 갖는다





## useEffect

***특정 코드의 실행을 제한하고 싶어! --> component가 맨 처음 render될 때에만!***

useEffect

- 두 개의 argument를 가지는 function
  - 첫 번째 argument: 우리가 딱 한 번만 실행하고 싶은 코드
  - 두 번째 argument: dependencies == react.js가 지켜보아야 하는 것들



***특정한 부분만이 변화했을 때, 원하는 코드들을 실행할 수 있는 방법을 배우고 싶어!***

` useEffect(() => {console.log("SEARCH FOR", keyword)}, [keyword])`

- 'keyword'가 변화할 때 코드를 실행할 거라고 react.js에게 알려준다

` useEffect(() => {if (keyword !== "" && keyword.length > 5) {console.log("SEARCH FOR", keyword)}}, [keyword])`

- 'keyword'가 비어있지 않고 keyword의 길이가 5보다 길 때 검색을 하겠다

