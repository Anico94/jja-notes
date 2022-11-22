import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import parse from "html-react-parser";
import "../Page.css";
import Button from "@mui/material/Button";

const Page = () => {
  const [editor, setEditor] = useState(true);
  const [content, setContent] = useState(`<h1>Insert Title Here</h1>`);

  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };

  console.log(content);

  const _convertToHTML = () => {
    setContent(editorRef.current.getContent());
    setEditor(false);
  };

  const _convertToText = () => {
    setEditor(true);
  };

  return (
    <div>
      <div className="page-buttons">
        <Button variant="outlined" size="small" onClick={log}>
          Log editor content
        </Button>
        <Button variant="outlined" size="small" onClick={_convertToHTML}>
          Convert to html
        </Button>
        <Button variant="outlined" size="small" onClick={_convertToText}>
          Convert back to editor
        </Button>
      </div>
      <div className={editor ? "hide-text" : ""}>{parse(content)}</div>
      <div className={editor ? "" : "hide-editor"}>
        <Editor
          apiKey={process.env.REACT_APP_TINY_API_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={content}
          init={{
            selector: "textarea",
            height: 500,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "print",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "paste",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help | image | table",
            image_title: true,

            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
    </div>
  );
};

export default Page;
