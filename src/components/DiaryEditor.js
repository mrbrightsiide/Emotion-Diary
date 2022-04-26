import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import EmotionItem from "./EmotionItem";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import { DiaryDispatchContext } from "./../App.js";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_caption: "완전 좋아요",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_caption: "좋아요",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_caption: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_caption: "별로에요",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_caption: "끔찍해요",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate } = useContext(DiaryDispatchContext);
  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    onCreate(date, content, emotion);
    navigate("/", { replace: true });
  };

  const navigate = useNavigate();
  return (
    <div className="DiaryEditor">
      <div>
        <MyHeader
          headText={"새 일기 쓰기"}
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
