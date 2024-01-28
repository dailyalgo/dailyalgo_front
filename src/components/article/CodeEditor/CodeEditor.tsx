import { useState, useRef } from "react";
import classNames from "classnames/bind";
import Editor, { Monaco, loader } from "@monaco-editor/react";
import style from "./CodeEditor.module.scss";

const cx = classNames.bind(style);

interface Props {
  defaultValue?: string;
  language: string;
  customOption?: { [key: string]: any };
  handleChange?: (value: string) => void;
}

const CodeEditor = ({ defaultValue, language, customOption, handleChange }: Props) => {
  const [editorContent, setEditorContent] = useState(defaultValue); // Example: Repeat content to create overflow

  loader.init().then((monaco) => {
    monaco.editor.defineTheme("custom-theme", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#f6f6f6",
      },
    });
  });

  const editorRef = useRef(null);

  const handleEditorChange = (value: any) => {
    setEditorContent(value);
    // register("codeEditor", { onChange: value });
    if (handleChange) handleChange(value);
    // TODO: 해당 로직 수정 필요, 부적절하게 늘어남
    const lineHeight = 19; // 디폴트 테마 line-height
    const totalLines = value.split("\n").length;
    const requiredHeight = lineHeight * totalLines;

    // Set the calculated height for the editor container
    const container = document.getElementById("editor-container");

    if (container && requiredHeight > 300 && requiredHeight < 600) {
      container.style.height = `${requiredHeight}px`;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleEditorDidMount(editor: any, _: Monaco) {
    editorRef.current = editor;
  }

  const option = {
    value: editorContent,
    minimap: {
      enabled: false,
    },
    scrollbar: {
      vertical: "hidden" as const,
    },
    overflow: "hidden",
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    automaticLayout: true,
    theme: "custom-theme",
    handleMouseWheel: false,

    ...customOption,
  };

  return (
    <div id="editor-container" className={cx("code-editor-wrap")}>
      <Editor
        height="100%"
        language={language || "javascript"}
        defaultValue={defaultValue}
        // eslint-disable-next-line react/jsx-no-bind
        onMount={handleEditorDidMount}
        options={option}
        onChange={handleEditorChange}
        theme="custom-theme"
      />
    </div>
  );
};

export { CodeEditor };
