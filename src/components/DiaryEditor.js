import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import EmotionItem from "./EmotionItem";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import { DiaryDispatchContext } from "./../App.js";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <div>
        <MyHeader
          headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
        />
      </div>
      <section>
        <h2>오늘은 언제인가요?</h2>
        <div className="input_box">
          <input
            className="input_date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            type="date"
          />
        </div>
      </section>
      <section>
        <h2>오늘의 감정</h2>
        <div className="inpu_box emotion_list_wrapper">
          {emotionList.map((it) => (
            <EmotionItem
              onClick={handleClickEmotion}
              key={it.emotion_id}
              {...it}
              isSelected={it.emotion_id === emotion}
            />
          ))}
        </div>
      </section>
      <section>
        <h2>오늘의 일기</h2>
        <div className="input_box text_wrapper">
          <textarea
            ref={contentRef}
            placeholder="오늘은 어땠나요?"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
      </section>
      <section className="control_box">
        <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
        <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit} />
      </section>
    </div>
  );
};
export default DiaryEditor;
