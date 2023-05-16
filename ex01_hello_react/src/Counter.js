import { useState } from "react";
import OddEvenResult from "./OddEvenResult";

const Counter = (props) => {
  //0부터 시작해서
  //+1씩 증가하거나
  //-1씩 감소한다.

  //비구조화 할당, 비구조화 분해
  //count는 상태변수
  //setCount는 상태변화함수(set + 변수이름(첫글자 대분자))
  //useState(0)에서 0은 count의 초기값
  const [count, setCount] = useState(props.initValue);

  //만약initValue가 없으면 undefined가 됨

  console.log(props.initValue);

  const onIncrease = () => {
    setCount(count + 1);
  };
  const onDecrease = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
      <OddEvenResult count={count} />
    </div>
  );
};

Counter.defaultProps = {
  initValue: 30,
};

export default Counter;
