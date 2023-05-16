import { useRef, useState } from "react";

const DiaryItem = ({
  onDelete,
  id,
  author,
  content,
  emotion,
  created_date,
  onEdit,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  //수정모드 전환
  const toggleIsEdit = () => setIsEdit(!isEdit);
  //수정중인 일기내용 임시저장용
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  //일기 삭제
  const handleDelete = () => {
    if (window.confirm(`${id + 1}번째 일기를 삭제할까요?`)) {
      onDelete(id);
    }
  };

  //수정모드 취소
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  //수정 완료
  const handleEdit = () => {
    //유효성체크
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleDelete}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
