import React, { useRef, useReducer } from "react";
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

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
  //CREAT
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  // REMOVE
  const onRemove = (targetID) => {
    dispatch({ type: "REMOVE", targetID });
  };
  // EDIT
  const onEdit = (targetID, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetID,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <MyHeader
              headText={"App"}
              leftChild={
                <MyButton
                  text={"왼쪽버튼"}
                  onClick={() => alert("왼쪽버튼클릭")}
                />
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
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
