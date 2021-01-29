import React from "react";
import './Form.css';

// 이 함수형 컴포넌트는 총 4가지의 props를 받아온다
// value: 인풋 내용
// onCreate: 버튼이 클릭될 때 실행될 함수
// onChange: 인풋 내용이 변경될 때 실행될 함수
// onKeyPress: 인풋에서 키를 입력할 때 실행될 함수. 나중에 Enter가 눌렸을 때 onCreate 를 한 것과 동일한 작업을 하기 위함
const Form = ({ value, onChange, onCreate, onKeyPress }) => {
  
  return (
    <div className="form">
      <input value={value} onChange={onChange} onKeyPress={onKeyPress} />
      <div className="create-button" onClick={onCreate} >
        추가
      </div>
    </div>
  )
};

export default Form;