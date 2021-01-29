import React from 'react';
import './TodoListTemplate.css';

//함수형 컴포넌트. 파라미터로 props 두가지를 받는다. form은 인풋과 버튼이 들어간 컴포넌트를 렌더링할 때 사용. children은 <TodoListTemplate> 여기! </TodoListTemplate> 사이에 들어온다
const TodoListTemplate = ({ form, children }) => { 
  return (
    <main className="todo-list-template">
      <div className="title">
        오늘 할 일
      </div>
      <section className="form-wrapper">
        { form }
      </section>
      <section className="todos-wrapper">
        { children }
      </section>
    </main>
  )
};

export default TodoListTemplate;