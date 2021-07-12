import React,{useState} from 'react';
import EditorJs from 'react-editor-js';
import {EDITOR_JS_TOOLS} from "./EditorJsTool";
import './App.css';

function App() {
    const [data,setData]=useState({})
  return (
    <div className="App">
      <EditorJs data={data} tools={EDITOR_JS_TOOLS} onChange={(api, data) => {setData(data)}} />;

      <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
    </div>
  );
}

export default App;
