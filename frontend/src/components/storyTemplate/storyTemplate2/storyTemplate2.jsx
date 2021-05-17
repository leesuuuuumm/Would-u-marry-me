import React from "react";
import api from "../../../service/api";
import { useState } from "react";
import TextEditor from "../textEditor";
import styles from "./storyTemplate2.module.css";
import ReactHtmlParser from "react-html-parser";

const StoryTemplate2 = () => {
  const [Img, setImg] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgInput, setImgInput] = useState(false);
  const [onTextEditor, setOnTextEditor] = useState(false);
  const [imageHoverCheck1, setImageHoverCheck1] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [textHoverCheck1, setTextHoverCheck1] = useState(true);

  const imageMouseOn1 = () => {
    setImageHoverCheck1(true);
  };

  const imageMouseOut1 = () => {
    setImageHoverCheck1(false);
  };

  const onImageChange = (e) => {
    setImgFile(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
    if (!imgInput) {
      setImgInput(!imgInput);
    }
  };

  const onTextInput = () => {
    setOnTextEditor(!onTextEditor);
    console.log("123");
  };

  const sendStory2 = () => {
    //axios
    let data = new FormData();
    data.append("firt", imgFile);
    // data.append("second", )
    data.append("storyId", 2);
    api
      .put("/story/second", data, {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        // story template 컴포넌트 끄는 bind함수?
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTextValue = (text) => {
    setTextValue(text);
    console.log("goodluck");
    console.log(textValue);
    setOnTextEditor(false);
  };

  const textMouseOn = () => {
    setTextHoverCheck1(false);
  };

  const textMouseOut = () => {
    setTextHoverCheck1(true);
  };

  return (
    <>
      <div className={styles["template-box"]}>
        {/* 첫번째 image box */}
        {/* 아무것도 입력 없을 때, */}
        {imgInput === false ? (
          <div className={styles["image-box"]}>
            <img src={Img} />
            <label className={styles["image-button"]}>
              <div className={styles["image-icon"]}>
                <i className="fas fa-camera"></i>
                <input
                  type="file"
                  className={styles["image-input"]}
                  onChange={onImageChange}
                />
              </div>
            </label>
          </div>
        ) : (
          // 입력 넣었을 때
          <div
            className={styles["input-image-box"]}
            onMouseEnter={imageMouseOn1}
            onMouseLeave={imageMouseOut1}
          >
            {/* hover X */}
            {imageHoverCheck1 === false ? (
              <label className={styles["input-image-done"]}>
                <img src={Img} className={styles["inputed-image"]} />
                <input
                  type="file"
                  className={styles["image-input"]}
                  onChange={onImageChange}
                />
              </label>
            ) : (
              // 이미지 넣고 hover O
              <label className={styles["input-image-done"]}>
                <img src={Img} className={styles["inputed-image-on"]} />
                <input
                  type="file"
                  className={styles["image-input"]}
                  onChange={onImageChange}
                />
                <div
                  className={styles["image-icon-done"]}
                  // onMouseOver={imageMouseOn1}
                >
                  <i className="fas fa-camera"></i>
                </div>
              </label>
            )}
          </div>
        )}

        <div
          className={styles["text-box"]}
          onMouseEnter={textMouseOn}
          onMouseLeave={textMouseOut}
        >
          {textValue === "" ? (
            <div className={styles["text-inside-box"]}>
              <button className={styles["text-button"]} onClick={onTextInput}>
                <div className={styles["text-icon"]}>
                  <i className="fas fa-pencil-alt"></i>
                </div>
              </button>
            </div>
          ) : (
            <>
              {/* 텍스트 입력하고 hover 안 할 때 */}
              {textHoverCheck1 === true ? (
                <div className={styles["text-editor-input"]}>
                  <div className={styles["text-area"]}>
                    {ReactHtmlParser(textValue)}
                  </div>
                </div>
              ) : (
                // text 입력하고 hover O
                <label className={styles["text-editor-input-on"]}>
                  <div className={styles["text-editor-on"]}>
                    <button
                      className={styles["text-button"]}
                      onClick={onTextInput}
                    >
                      <div className={styles["text-icon-on"]}>
                        <i className="fas fa-pencil-alt"></i>
                      </div>
                    </button>
                    <div className={styles["text-area"]}>
                      {ReactHtmlParser(textValue)}
                    </div>
                  </div>
                </label>
              )}
            </>
          )}
        </div>
        {/* {onTextEditor === false ? "" : <TextEditor></TextEditor>} */}
        {onTextEditor === false ? (
          ""
        ) : (
          <TextEditor
            getTextValue={getTextValue}
            className={styles["text-input"]}
          ></TextEditor>
        )}
      </div>
    </>
  );
};
export default StoryTemplate2;
