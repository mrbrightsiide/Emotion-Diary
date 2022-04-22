import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Components
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetID);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"App"}
          // 컴포넌트 자체를 프롬스로 넘기면 코드의 줄을 줄여줄 수 있음
          // ctrl+l 한줄전체선택..절대 안 까먹어..
          leftChild={
            <MyButton text={"왼쪽버튼"} onClick={() => alert("왼쪽버튼클릭")} />
          }
          rightChild={
            <MyButton
              text={"오른쪽버튼"}
              onClick={() => alert("오른쪽버튼클릭")}
            />
          }
        />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/new" element={<New />}></Route>
          <Route path="/diary/:id" element={<Diary />}></Route>
          <Route path="/edit" element={<Edit />}></Route>
        </Routes>
        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼클릭")}
          type={"positive"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼클릭")}
          type={"negative"}
        />
        <MyButton text={"버튼"} onClick={() => alert("버튼클릭")} />
      </div>
    </BrowserRouter>
  );
}

export default App;
