import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
// import BalloonEditor from "@ckeditor/ckeditor5-build-inline";
import styles from "./textEditor.module.css";
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

const editorConfiguration = {
  // plugins: [Bold, Italic],
  // toolbar: ["bold", "italic"],
  toolbar: ["heading", "|", "bold", "italic", "|", "link"],
  // place,
};

const TextEditor = (props) => {
  const [editorInput, setEditorInput] = useState("");

  const inputCheck = () => {
    setEditorInput();
  };
  const sendTextValue = () => {
    props.getTextValue(editorInput);
    console.log(editorInput);
  };
  return (
    <div className={styles.textEditor}>
      <CKEditor
        // className={styles["text-area"]}
        editor={ClassicEditor}
        // editor={BalloonEditor}
        config={editorConfiguration}
        data="내용을 입력해주세요"
        onInit={(editor) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const textInput = editor.getData();
          console.log({ event, editor, textInput });
          setEditorInput(textInput);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      ></CKEditor>
      <button className={styles["submit-button"]} onClick={sendTextValue}>
        submit
      </button>
    </div>
  );
};
export default TextEditor;
