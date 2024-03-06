import React, { ChangeEvent, useState, KeyboardEvent, useEffect, memo } from "react";
import { FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { handleChangeDraggable } from "common/commonFunctions";
import { Simulate } from "react-dom/test-utils";
import { useSelector } from "react-redux";
import { selectAppError, selectTasks, selectTodolists } from "common/selectors";
import useSound from "use-sound";
// @ts-ignore
import clickSound from "assets/clickSound.mp3";
import { selectSound } from "common/selectors";
import { Sound } from "common/types";

type AddNewItemField = {
  todoId?: string;
  width: string;
  placeholder: string;
  addItem: (newItemTitle: string) => void;
  error: string | null;
};
const AddNewItemField = memo((props: AddNewItemField) => {
  console.log("AddNewItemField");

  const [content, setContent] = useState("");
  // const error = useSelector(selectAppError);

  // const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const [play] = useSound(clickSound);
  const sound = useSelector(selectSound);
  const playSound = (sound: Sound) => {
    if (sound === "on") {
      play();
    }
  };
  useEffect(() => {
    // if (!error) {
    setContent("");
    // }
  }, [tasks]);

  const addNewItem = () => {
    // console.log(props.error);
    props.addItem(content);
    playSound(sound);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };
  const handleEnterInputChange = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      addNewItem();
    }
  };
  return (
    <div style={{ textAlign: "center", margin: "auto", width: "100%" }}>
      {/*может быть вынести стили в отдельный файл?*/}
      <FormControl variant="outlined" sx={{ width: "100%", alignItems: "center" }}>
        <OutlinedInput
          placeholder={props.placeholder}
          sx={{
            width: props.width,
            minWidth: "300px",
            paddingRight: "12px",
            "& .MuiOutlinedInput-input": {
              color: "#e7e7e7",
              padding: "9px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#a486fc",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#a486fc",
            },
          }}
          onChange={handleInputChange}
          onKeyDown={handleEnterInputChange}
          value={content}
          onFocus={() => props.todoId && handleChangeDraggable(props.todoId, undefined, "false")}
          onBlur={() => props.todoId && handleChangeDraggable(props.todoId, undefined, "true")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="create new list"
                onClick={addNewItem}
                edge="end"
                sx={{
                  backgroundColor: "#a486fc",
                  borderRadius: "0 5px 5px 0",
                  color: "rgb(33 33 33)",
                  // background: "rgb(187,134,252)",
                  // background: "linear-gradient(124deg, rgba(187,134,252,1) 28%, rgba(29,222,203,1) 97%)",

                  transition: "all 0.3s",
                  "&:hover": { backgroundColor: "#a486fc", color: "#e6e6e6" },
                }}
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
});

export default AddNewItemField;
