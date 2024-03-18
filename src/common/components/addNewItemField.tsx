import React, { ChangeEvent, KeyboardEvent, memo, useEffect, useState } from "react";
import { FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { selectSound, selectTasks } from "common/selectors";
import useSound from "use-sound";
// @ts-ignore
import clickSound from "assets/clickSound.mp3";
import { Sound } from "common/types";

type AddNewItemFieldProps = {
  todoId?: string;
  width: string;
  placeholder: string;
  addItem: (newItemTitle: string) => void;
  error: string | null;
};
const AddNewItemField = memo((props: AddNewItemFieldProps) => {
  console.log("AddNewItemField");
  const [content, setContent] = useState("");
  let [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const tasks = useSelector(selectTasks);
  const sound = useSelector(selectSound);
  useEffect(() => {
    setContent("");
  }, [tasks]);
  const [play] = useSound(clickSound);
  const playSound = (sound: Sound) => {
    if (sound === "on") {
      play();
    }
  };
  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });
  const addNewItem = () => {
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
    <div
      style={{
        textAlign: "center",
        margin: "auto",
        width: screenWidth > 550 ? props.width : "240px",
      }}
    >
      <FormControl variant="outlined" sx={{ width: "100%", alignItems: "center" }}>
        <OutlinedInput
          placeholder={props.placeholder}
          sx={{
            width: "100%",
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
