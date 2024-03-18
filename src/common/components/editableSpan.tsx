import React, { ChangeEvent, useEffect, useState } from "react";
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
  const dispatch = useAppDispatch();
  useEffect(() => {
    setContent(props.content);
  }, [props.content]);
  const activateEditMode = () => {
    setEditMode(true);
    handleChangeDraggable(props.taskId, "false");
  };
  const deactivateEditMode = () => {
    handleChangeDraggable(props.taskId, "true");
    if (!content.trim().length && props.removeTask) {
      props.removeTask();
    } else if (!content.trim().length) {
      setContent(props.content);
      setEditMode(false);
    } else if (content.length > 100) {
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

  return (
    <>
      {editMode ? (
        <TextField
          autoFocus
          value={content}
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
              borderRadius: "5px",
              lineHeight: "normal",
              textAlign: props.isTodolistTitle ? "center" : "start",
              fontSize: props.isTodolistTitle ? "30px" : "inherit",
              height: "100%",
            },
            "& .MuiInputBase-multiline": {
              padding: "0",
              height: "100%",
              backgroundColor: "transparent",
            },
            "& .MuiFilledInput-input": {
              letterSpacing: "initial",
              height: "100%",
            },
            "& .MuiInputBase-root:before": {
              borderBottom: "1px solid transparent",
            },
          }}
        />
      ) : (
        <div
          onDoubleClick={activateEditMode}
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
