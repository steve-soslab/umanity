import React, { FC, Fragment, useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import IconButton from "@mui/material/IconButton";
import { Tip } from "../types/tips";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";

type TableCommentsProps = {
  tip: Tip;
};

const TableComments: FC<TableCommentsProps> = ({ tip }) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen((state) => !state);
  const commentValues = Object.values(tip.runnerNames);
  const mappedComments = commentValues.map((data, index) => {
    const position = index + 1;
    const symbol = tip.tipMark[position];
    const name = tip.runnerNames[position];
    const comment = tip.eventComments[position];
    if (index === 18) return;
    return (
      <blockquote key={index} className="otro-blockquote">
        {comment}
        <br />
        <span>{`${position}. ${name} ${symbol}`}</span>
      </blockquote>
    );
  });
  return (
    <Fragment>
      <IconButton onClick={toggleOpen} color="success">
        <CommentIcon />
      </IconButton>

      <Modal open={open} onClose={toggleOpen}>
        <div
          style={{
            width: "40%",
            minWidth: "700px",

            margin: "10vh auto",
          }}
        >
          <p onClick={toggleOpen} className="closeButton">
            CLOSE
          </p>
          <Paper
            sx={{
              p: "20px",

              overflowY: "scroll",
              maxHeight: "500px",
            }}
          >
            <h2>COMMENTS:</h2>
            {mappedComments}
          </Paper>
        </div>
      </Modal>
    </Fragment>
  );
};

export default TableComments;
