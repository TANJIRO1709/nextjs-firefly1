"use client";
import React from "react";
import EditorContext from "./editorContext";
import { useState } from "react";

function EditorState({children}) {
  const [isEditing, setIsEditing] = useState(true);
  const [roomModel, setRoomModel] = useState(null);
  const [model, setModel] = useState(null);
  const [singleRoom, setSingleRoom] = useState(null);

  return (
    <EditorContext.Provider
      value={{
        roomModel,
        setRoomModel,
        isEditing,
        setIsEditing,
        model,
        setModel,
        singleRoom,
        setSingleRoom,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export default EditorState;
