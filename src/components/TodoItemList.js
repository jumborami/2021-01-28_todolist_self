import React, { Component } from "react";
import TodoItem from "./TodoItem";

// 이 클래스형 컴포넌트는 3가지의 props를 받게 된다
// todos: todo 객체들이 들어있는 배열
// onToggle: 체크박스를 켜고 끄는 함수
// onRemove: 아이템을 삭제하는 함수
class TodoItemList extends Component {

  shouldComponentUpdate(nextProps, nextState) { // this.props.todos 와 nextProps.todos 를 비교해서 이 값이 다를 때만 리랜더링 하도록 설정
    return this.props.todos !== nextProps.todos;
  }

  render() {
    const { todos, onToggle, onRemove } = this.props;

    const todoList = todos.map(
      ({id, text, checked}) => ( // todos.map() 이라고 하는 것 대신 비구조화 할당으로 내부 값 한번에 가져옴
        <TodoItem 
          id={id}
          text={text}
          checked={checked}
          onToggle={onToggle}
          onRemove={onRemove}
          key={id}
        />
      )
    )
    return (
      <div>
        {todoList}
      </div>
    )
  }
}

export default TodoItemList;

// map 으로 배열을 랜더링할 때에는 key값이 꼭 필요하다.
// 없는 경우에는 map 함수의 두 번째 파라미터인 index 를 사용해도 되지만 권장하지 않는다.

// 위의 방식 대신에 아래와도 같이 할 수 있다
// {...todo} 라고 넣어주면, 내부의 값들이 모두 자동으로 props 로 설정이 된다
//const todoList = todos.map(
//  (todo) => (
//    <TodoItem
//      {...todos}
//      onToggle={onToggle}
//      onRemove={onRemove}
//      key={todo.id}
//    />
//  )
//)

// 생명주기 중 shouldComponentUpdate 는 컴포넌트가 리랜더링을 할지 말지를 정해준다.
// 이걸 따로 구현하지 않으면 언제나 true 를 반환하는데
// 만약 구현한다면 업데이트에 영향을 끼티는 조건을 return 해주면 된다.

// 이 작업물의 경우에는, todos 값이 바뀔 때 리랜더링하면 되니까
// this.props.todos 와 nextProps.todos 를 비교해서 이 값이 다를 때만 리랜더링 하도록 설정하면 된다