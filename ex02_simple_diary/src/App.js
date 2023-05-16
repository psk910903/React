import { useRef, useState, useEffect } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

//객체 배열을 변수로 갖는다.
// const dummyList = [
//   {
//     id: 1,
//     author: "홍길동",
//     content: "하이 1",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "변사또",
//     content: "하이 2",
//     emotion: 2,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "이몽룡",
//     content: "하이 3",
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    //async : 비동기적처리
    const res = await fetch(
      //await : "https://jsonplaceholder.typicode.com/comments" 통신이 끝날때까지 기다렸다가 콘솔로그를 찍는다.
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime() + 1,
        id: dataId.current++,
      };
    });

    setData(initData);
    console.log(res);
  };

  //마운트시 실행됨.
  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    //기존 data를 복사해주고, 새 일기를 가장 위로 배치한다.
    setData([newItem, ...data]);
  };
  const onDelete = (targetId) => {
    // == : 값비교, 객체-주소비교(얕은 비교)
    // === : 값비교, 객체-값비교(깊은 비교)
    const newDiaryList = data.filter((item) => item.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : item
      )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onDelete={onDelete} diaryList={data} />
    </div>
  );
}

export default App;
