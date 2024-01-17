import React, { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { handleChangeDraggable } from "common/commonFunctions";
import { appActions } from "app/appReducer";
import { useAppDispatch } from "app/store";

type EditableSpanProps = {
  todoId: string;
  taskId?: string;
  content: string;
  changeTitle: (newTitle: string) => void;
  removeTask?: () => void;
  isTodolistTitle?: boolean;
};
const EditableSpan = (props: EditableSpanProps) => {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    setContent(props.content);
  }, [props.content]);
  const dispatch = useAppDispatch();
  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    console.log("deactivateEditMode");
    handleChangeDraggable(props.todoId, props.taskId, "true");
    // setEditMode(false);
    if (!content.trim().length && props.removeTask) {
      props.removeTask();
    } else if (!content.trim().length) {
      setContent(props.content);
      setEditMode(false);
    } else if (content.length > 100) {
      // setContent(props.content);
      dispatch(appActions.setAppError({ error: "Text length shouldn`t be more that 100 characters" }));
    } else if (content !== props.content) {
      props.changeTitle(content);
      setEditMode(false);
    } else {
      setEditMode(false);
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
  const onFocusChangeHandler = () => {
    handleChangeDraggable(props.todoId, props.taskId, "false");
  };

  return (
    <>
      {editMode ? (
        <TextField
          autoFocus
          value={content}
          onFocus={onFocusChangeHandler}
          onBlur={deactivateEditMode}
          onKeyDown={deactivateEditModeOnEnter}
          variant="filled"
          onChange={changeContent}
          fullWidth={true}
          multiline={true}
          size={"small"}
          hiddenLabel
          sx={{
            textarea: {
              color: "#e7e7e7",
              backgroundColor: "#5e6db7",
              borderRadius: "5px",
              lineHeight: "normal",
              fontSize: "inherit",
              // boxShadow: "0px 0px 4px #a486fc",
              // height: "50%", - свойство высоты не работает
            },
            "& .MuiInputBase-multiline": {
              padding: "0",
            },
            "& .MuiFilledInput-input": {
              letterSpacing: "initial",
            },
            "& .MuiInputBase-root:before": {
              // borderBottom: "none",
              borderBottom: "1px solid transparent",
            },
          }}
        />
      ) : (
        <div
          onDoubleClick={activateEditMode}
          // style={props.isTodolistTitle ? {} : { flex: "1" }}
          style={
            props.isTodolistTitle
              ? { borderBottom: "1px solid transparent" }
              : { borderBottom: "0.9px solid transparent", flex: "1" }
          }
        >
          {content}
        </div>
      )}
    </>
  );
};

export default EditableSpan;
