import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../Page.css";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import watermark from "../assets/3.png";
import Alert from "@mui/material/Alert";

const Page = (props) => {
  const [content, setContent] = useState("<h1>This is a title</h1>");
  const editorRef = useRef(null);
  const [isSaveHidden, setIsSaveHidden] = useState(true);
  const [pageName, setPageName] = useState("");
  const [notebookName, setNotebookName] = useState("");

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
        setPageName(
          document._snapshot.docChanges[0].doc.data.value.mapValue.fields.title
            .stringValue
        );
        setNotebookName(
          document._snapshot.docChanges[0].doc.data.value.mapValue.fields
            .notebookName.stringValue
        );
      };
      getObject();
    }
  }, [props.pageSelected, props.lastEditNameTime]);

  const _savePage = () => {
    setContent(editorRef.current.getContent());
    const pageRef = doc(db, "pages", props.pageSelected);
    updateDoc(pageRef, { content: editorRef.current.getContent() });
    setIsSaveHidden(false);
    setTimeout(() => {
      setIsSaveHidden(true);
    }, 2000);
  };

  return (
    <div>
      <div className={props.pageSelected ? "hide-text watermark" : "watermark"}>
        <img src={watermark} alt="Watermark" className="watermark" />
      </div>
      <div className={props.pageSelected ? "" : "hide-editor"}>
        <div className="page-buttons">
          <h2 className="note-book-page">{`${notebookName} - ${pageName}`}</h2>
          <div className={isSaveHidden ? "save-hidden" : ""}>
            <Alert size="small" severity="success">
              Your document was saved.
            </Alert>
          </div>
          <Button
            sx={{ mt: 1.5, mb: 1.5 }}
            variant="contained"
            onClick={_savePage}
            startIcon={<SaveIcon />}
          >
            Save
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
