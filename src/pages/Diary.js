import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <h1>this is diary</h1>
    </>
  );
};

export default Diary;
