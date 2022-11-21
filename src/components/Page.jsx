import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Page = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  console.log(process.env.REACT_APP_TINY_API_KEY);
  return (
    <>
      <Editor
        apiKey={process.env.REACT_APP_TINY_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={`<h1>This is the initial content of the editor.</h1>`}
        init={{
          selector: "textarea",
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount image",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help | image",
          image_title: true,

          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
};

export default Page;
