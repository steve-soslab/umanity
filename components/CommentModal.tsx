import React, { FC, useState, Fragment } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import SaveIcon from "@mui/icons-material/Save";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import { Tip } from "../types/tips";

const commentIcon = {
  width: "60px",
  display: "flex",
  justifyContent: "center",
  alignSelf: "center",
};

type CommentModalProps = {
  tip: Tip;
  setTip: (data: Tip) => void;
  position: "FirstComment" | "SecondComment" | "ThirdComment" | "comments";
  eventComment?: boolean;
};

const CommentModal: FC<CommentModalProps> = ({
  tip,
  setTip,
  position,
  eventComment,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const toggleModal = () =>
    setOpen((state) => {
      if (!state === true) {
        setValue(tip[position]);
      } else {
        setValue("");
      }
      return !state;
    });
  const submitHandler = (e) => {
    e.preventDefault();
    if (position === "FirstComment") {
      setTip({ ...tip, FirstComment: value });
    }
    if (position === "SecondComment") {
      setTip({ ...tip, SecondComment: value });
    }
    if (position === "ThirdComment") {
      setTip({ ...tip, ThirdComment: value });
    }
    if (position === "comments") {
      setTip({ ...tip, comments: value });
    }
    setOpen(false);
  };
  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  return (
    <React.Fragment>
      {eventComment ? (
        <Fab
          onClick={toggleModal}
          color={tip.comments.trim() !== "" ? "success" : "primary"}
          variant="extended"
        >
          <EditIcon sx={{ mr: 1 }} />
          Event Comment
        </Fab>
      ) : (
        <div style={commentIcon}>
          {tip[position].trim() === "" ? (
            <IconButton onClick={toggleModal}>
              <ChatBubbleOutlineIcon />
            </IconButton>
          ) : (
            <Zoom in={tip[position].trim() !== ""}>
              <IconButton onClick={toggleModal}>
                <CheckCircleOutlineIcon color="success" />
              </IconButton>
            </Zoom>
          )}
        </div>
      )}
      <Modal open={open} onClose={toggleModal}>
        <div
          style={{
            width: "40%",
            minWidth: "550px",

            margin: "30vh auto",
          }}
        >
          <p onClick={toggleModal} className="closeButton">
            CLOSE
          </p>

          <Paper
            component="form"
            onSubmit={submitHandler}
            sx={{
              display: "flex",
              alignItems: "center",

              m: "0 auto",
            }}
          >
            <InputBase
              fullWidth
              sx={{ ml: 1, flex: 1, p: 1 }}
              placeholder="Enter in your comments"
              onChange={changeHandler}
              value={value}
              multiline
              rows={4}
            />
            <Divider sx={{ height: 50, m: 0.5 }} orientation="vertical" />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SaveIcon />
            </IconButton>
          </Paper>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default CommentModal;
