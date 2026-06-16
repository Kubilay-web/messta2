"use client"
import React, { Fragment, useRef,  } from "react";
import SunEditor from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";

interface SunEditorOptions {
  buttonList?: string[][]; // Add buttonList to the options interface
  defaultTag?: string;
  minHeight?: string;
  showPathLabel?: boolean;
  font?: string[];
  defaultStyle?: string;
  // You can add any other options supported by the SunEditor
}

interface SunEditorProps {
  width?: string | any;
  height?: string | any;
  placeholder?: string;
  autofocus?: boolean;
  setplugin?: boolean;
  setcontent?: string;
  appendcontent?: string;
  defaultstyle?: string;
  disable?: boolean;
  hide?: boolean;
  hidetoolbar?: boolean;
  disabletoolbar?: boolean;
  onLoad?: string;
  defaulContent?: string;
  onScroll?: (event: UIEvent) => void;
  onClick?: (event: MouseEvent) => void;
  // Updated onCopy handler type
  onCopy?: (event: ClipboardEvent, clipboardData: DataTransfer | null) => boolean; // Adjusted type
  onCut?: (event: ClipboardEvent, clipboardData: DataTransfer | null) => boolean;
  setoptions?: SunEditorOptions;
}

const SunEditorComponent: React.FC<SunEditorProps> = ({
  width,
  height,
  placeholder,
  autofocus,
  setplugin,
  setcontent,
  appendcontent,
  defaultstyle,
  disable,
  hide,
  hidetoolbar,
  disabletoolbar,
  defaulContent,
  setoptions,
}) => {

  
  const editor = useRef<SunEditorCore | null>(null); // Initialize with null

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const handleChange = (content: string) => {
    console.log("Content changed:", content);
  };

  // Other event handlers...

  const editorOptions: SunEditorOptions = {
    ...setoptions,  // Merge setoptions provided through props
  };

  return (
    <Fragment>
      <SunEditor
        setOptions={editorOptions}
        getSunEditorInstance={getSunEditorInstance}
        width={width}
        height={height}
        placeholder={placeholder}
        autoFocus={autofocus}
        setAllPlugins={setplugin}
        setContents={setcontent}
        appendContents={appendcontent}
        setDefaultStyle={defaultstyle}
        disable={disable}
        hide={hide}
        hideToolbar={hidetoolbar}
        disableToolbar={disabletoolbar}
        defaultValue={defaulContent}
        onChange={handleChange}
        // Other event handlers...
      />
    </Fragment>
  );
};

export default SunEditorComponent;
