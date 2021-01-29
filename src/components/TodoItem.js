import React, { Component } from "react";
import './TodoItem.css';

// 이 클래스형 컴포넌트는 총 5가지의 props를 전달받는다
// text: todo 내용
// checked: 체크박스 상태
// id: todo의 고유 아이디
// onToggle: 체크박스를 켜고 끄는 함수
// onRemove: 아이템을 삭제하는 함수
class TodoItem extends Component {
  
  render() {
    const { text, checked, id, onToggle, onRemove } = this.props;
    console.log(id); //input 창에 값을 입력만 해도 랜더링이 되는 것을 알 수 있다. 불필요한 랜더링이 있는 것! => 라이프사이클 메소드를 이용하자 todoitemlist 컴포넌트에서!

    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div className="remove" onClick={(e) => { 
          e.stopPropagation(); // onToggle이 실행되지 않도록 함. 
          onRemove(id)}
        }>
          &times; {/* x 표시인 듯 */}
        </div>
        <div className={`todo-text ${checked ? 'checked' : ''}`}>
          <div>{text}</div>
        </div>
        {
          checked && (<div className="check-mark">✓</div>)
        }
      </div>  
    )
  }
}

export default TodoItem;

// 이 컴포넌트의 최상위 DOM 의 클릭 이벤트에는 onToggle을 넣었고, x가 있는 부분에는 onRemove 를 넣었다
// onRemove를 호출하는 곳에는 e.stopPropagation()도 같이 호출되는데
// 이 작업을 하지 않으면 x를 눌렀을 떄 onRemove 뿐만 아니라 해당 DOM 의 부모의 클릭 이벤트에 연결되어있는 onToggle도 실행이 되는데
// onRemove -> onToggle 순으로 실행이 되면서 코드가 의도치 않게 작동하여 삭제가 제대로 진행되지 않는다.
// e.stopPropagation() 는 이벤트의 "확산"을 멈춘다. 즉, 이 부분에 들어간 이벤트가 부모의 이벤트까지 전달되지 않도록한다.
// 따라서 onToggle은 실행되지 않고 onRemove만 실행이 된다.

// onToggle 과 onRemove 는 id를 파라미터로 넣으면 해당 id 를 가진 데이터를 업데이트한다.
// 파라미터를 넣어줘야 하기 때문에 onClick={() => onToggle(id)} 와 같이 작성했는데
// onClick={onToggle(id)} 라고 작성하면 안된다!!! 해당 함수가 랜더링 될 때 호출이 되기 떄문에 해당 함수가 호출되면 데이터가 변경되고
// 데이터가 변경되면 다시 리렌더링이 되고 그러면 다시 호출되고.. 무한 반복이 일어난다..

// todo-text 부분에는 checked 값에 따라 checked가 있으면 클래스명에 checked 라는 문자열을 넣어주었다. 없으면 빈값.
// `todo-text ${checked && 'checked'}` 와 "todo-text " + checked && 'checked' 가 같은 표현이다.
