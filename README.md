# Emotion Diary
- ReactJS를 사용하여 만든 감정일기장입니다.</br>

## Link
https://sia-emotiondiary-project.firebaseapp.com/

## Description
**파일 구조**
```bash
├── src
│   ├── components
│   ├── pages
│   └── util
├── App.js
└── index.js
``` 

**구현**
- localStorage를 활용하여 일기 data를 저장했습니다.
- context를 활용하여 DiaryStateContext에는 일기 data를, DiaryDispatchContext에는 dispatch함수를 전역으로 공급하였습니다.
```javascript
return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className='App'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
  ```
  -useReducer를 사용하여 일기의 상태관리 로직을 분리하였습니다.
  
  **기능**
- 일기 생성
- 일기 삭제
- 일기 날짜 변경/일기 내용 수정
