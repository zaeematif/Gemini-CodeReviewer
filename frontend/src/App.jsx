import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import "./App.css";
import { highlight } from 'prismjs/components/prism-core';
import axios from 'axios'
import Markdown from "react-markdown";

function App() {
  const [count, setCount] = useState(0);
  const [code, setCode] = useState(`function sum (){
  return a+b
}`);

    const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const reviewCode = async () => {
    const response = await axios.post("http://localhost:3300/ai/get-review", {code});

    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={code => highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                height:"100%",
                width:"100%"
              }}
            />
          </div>
          <div className="review" onClick={() => reviewCode()}>Code Review</div>
        </div>
        <div className="right"><Markdown
        >{review}</Markdown></div>
      </main>
    </>
  );
}

export default App;
