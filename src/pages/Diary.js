import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();
  // 이게무슨..이게정확히 어떻게 id를 꺼내오고있는걸까. 분할할당법인가?
  console.log(id);
  return (
    <>
      <h1>this is diary</h1>
    </>
  );
};

export default Diary;
