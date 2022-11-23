import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import parse from "html-react-parser";
import "../Page.css";
import Button from "@mui/material/Button";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import watermark from "../assets/3.png";
import { async } from "@firebase/util";

const Page = (props) => {
  const [content, setContent] = useState("<h1>This is a title</h1>");
  const editorRef = useRef(null);

  useEffect(() => {
    if (props.pageSelected !== "") {
      const pageRef = collection(db, "pages");
      const singlePage = query(pageRef, where("ref", "==", props.pageSelected));
      const getObject = async () => {
        const document = await getDocs(singlePage);
        setContent(
          document._snapshot.docChanges[0].doc.data.value.mapValue.fields
            .content.stringValue
        );
      };
      getObject();
    }
  }, [props.pageSelected]);

  const _savePage = () => {
    setContent(editorRef.current.getContent());
    const pageRef = doc(db, "pages", props.pageSelected);
    updateDoc(pageRef, { content: editorRef.current.getContent() });
  };

  const _deletePage = () => {
    const pageRef = doc(db, "pages", props.pageSelected);
    deleteDoc(pageRef);
    props.resetPage();
  };

  return (
    <div>
      <div className={props.pageSelected ? "hide-text watermark" : "watermark"}>
        <img src={watermark} alt="Watermark" className="watermark" />
      </div>
      <div className={props.pageSelected ? "" : "hide-editor"}>
        <div className="page-buttons">
          <Button variant="outlined" size="small" onClick={_savePage}>
            Save
          </Button>
          <Button variant="outlined" size="small" onClick={_deletePage}>
            Delete
          </Button>
        </div>
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
              // "print",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              // "paste",
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
