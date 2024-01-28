// import { useState, useEffect } from "react";
// import classNames from "classnames/bind";
import { MarkdownEditor } from "@remirror/react-editors/markdown";
// import style from "./MarkDownEditor.module.scss";

// interface Props {
//   // TODO: 텍스트 받는 부분
// }

const MarkDownEditor = () => (
  <MarkdownEditor
    theme={{
      color: {
        outline: "#d2d2d2",
      },
    }}
  />
);

export { MarkDownEditor };
