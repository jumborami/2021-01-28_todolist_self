import React, { Component } from "react";
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form";
import TodoItemList from "./components/TodoItemList";


// form 컴포넌트에서 필요한 기능들을 파악하여, 그 부모 컴포넌트인 App 에 메소드로 만들어준다.
// App 컴포넌트에서 필요한 기능들을 메소드로 구현하고, 이를 상태의 input 값과 함께 form 컴포넌트로 전달한다.

// todos 안에 있는 객체들을 화면에 보여주기 위해서, todos 배열을 컴포넌트 배열로 변환해야 한다 (map 사용)
// App 컴포넌트에서 TodoItemList 컴포넌트로 todos 를 전달한다.
// 그리고 TodoItemList 컴포넌트에서 객체배열을 컴포넌트 배열로 변환한다.
// todolist 컴포넌트에서 필요한 기능들을 파악하여, 그 부모 컴포넌트인 App 에 메서드로 만들어준다.
// App 컴포넌트에서 필요한 기능들을 메서드로 구현하고, 이를 todolist 컴포넌트로 전달한다.

class App extends Component {
  id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정
 
  state={
    input: '',
    todos: [
      { id: 0, text: '리액트', checked: true },
      { id: 1, text: 'sass', checked: false },
      { id: 2, text: '타입스크립트', checked: false }
    ]
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({ // 인풋 비우고
      input: '',
      // concat 을 사용하여 배열에 추가. concat()은 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환한다.(기존 배열 변경 x)
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    })
  }

  handleKeyPress = (e) => {
    //눌린 키가 Enter 면 handleCreate 호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기 / 직접 수정하면 안 됨!!
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    })
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id) // filter()는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
    })
  } // 파라미터로 받아온 id와 동일하지 않는 id 들만을 모아 배열을 새로 생성해서 그걸 todos로 바꿔주는 것. 그럼 해당 id는 배열에서 빠지니까 삭제가 되는 것.

  render() {
    const { input, todos } = this.state;
    const { handleChange, handleCreate, handleKeyPress, handleToggle, handleRemove } = this;
    return (
      <TodoListTemplate form={(
        <Form 
          value = {input}
          onChange = {handleChange}
          onCreate = {handleCreate}
          onKeyPress = {handleKeyPress}
        />)}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
      </TodoListTemplate>
    );
  }
}

export default App;


// 리액트 state 에서 배열을 다룰 떄는 절대로 push() 를 사용하면 안된다!
// push를 통하여 데이터를 추가하면 배열에 값이 추가되긴 하지만 가르키는 배열이 똑같기 때문에 비교를 할 수 없다.
// 나중에 최적화를 하게 될 때, 배열을 비교하여 리랜더링을 방지하게 되는데 push는 이것이 가능하지 않다. (기존 배열 자체를 갈아 엎는다는 뜻인 듯.)
// 반면 concat 은 새 배열을 만들기 때문에 괜찮다.

// 배열을 다룰 때 push를 사용하면 안되는 것과 마찬가지로 배열을 업데이트할 때도 직접 배열의 값을 수정하면 안된다!
// 때문에 전개 연산자를 통하여 업데이트해야 할 배열 혹은 객체의 내용을 복사해주어야 한다.

// handleToggle 함수는 다음과 같이 구현할 수도 있다
//handleToggle = (id) => {
// const { todos } = this.state;
//  const index = todos.findIndex(todo => todo.id === id);
//  const selected = todos[index];
//  this.setState({
//    todos: [
//      ...todos.slice(0, index),
//      {
//        ...selected,
//        checked: !selected.checked
//      },
//      ...todos.slice(index + 1, todos.length)
//    ]
//  })
//}

// slide() 메서드는 배열의 처음부터 끝까지(end는 미포함)에 대한 복사본을 새로운 배열 객ㅊ에로 반환한다. 원본 배열은 바뀌지 않는다.