import React, { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { handleChangeDraggable } from "common/commonFunctions";

type EditableSpanProps = {
  todoId: string;
  taskId?: string;
  content: string;
  changeTitle: (newTitle: string) => void;
  removeTask?: () => void;
};
const EditableSpan = (props: EditableSpanProps) => {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    setContent(props.content);
  }, [props.content]);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    handleChangeDraggable(props.todoId, props.taskId, "true");
    setEditMode(false);
    if (!content.trim().length && props.removeTask) {
      props.removeTask();
    } else {
      props.changeTitle(content);
    }
    //отправить новую таску на сервер, если она не пустая, если пустая, то удалить
  };
  const changeContent = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };
  const deactivateEditModeOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      deactivateEditMode();
    }
  };
  return (
    <>
      {editMode ? (
        <TextField
          value={content}
          onFocus={() => handleChangeDraggable(props.todoId, props.taskId, "false")}
          onBlur={deactivateEditMode}
          onKeyDown={deactivateEditModeOnEnter}
          variant="filled"
          onChange={changeContent}
          size={"small"}
          hiddenLabel
          sx={{
            input: {
              color: "#e7e7e7",
              backgroundColor: "#2e2e2e",
              boxShadow: "0 0 10px 0px #171717",
              borderRadius: "5px",
              // height: "40px",
              height: "100%",
              borderBottom: "none",
              padding: "0",
            },
          }}
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{content}</span>
      )}
    </>
  );
};

export default EditableSpan;
