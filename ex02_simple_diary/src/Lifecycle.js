import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  //마운트와 같은데 return이 들어가면 언마운트

  useEffect(() => {
    console.log("Mount!");
    return () => {
      // Unmount 시점에 실행됨.
      console.log("Unmount!");
    };
  }, []);

  return <div>언마운트 테스트 컴퍼넌트</div>;
};

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <div>
        <button onClick={toggle}>ON/OFF</button>
        {isVisible && <UnmountTest />}
      </div>
    </div>
  );
};

export default Lifecycle;
