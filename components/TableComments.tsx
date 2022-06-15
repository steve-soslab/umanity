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
  return (
    <Fragment>
      {tip.FirstComment === "" &&
      tip.SecondComment === "" &&
      tip.ThirdComment === "" &&
      tip.comments === "" ? (
        <IconButton disabled color="primary">
          <CommentsDisabledIcon />
        </IconButton>
      ) : (
        <IconButton onClick={toggleOpen} color="success">
          <CommentIcon />
        </IconButton>
      )}
      <Modal open={open} onClose={toggleOpen}>
        <Paper
          sx={{
            width: "40%",
            minWidth: "550px",
            p: "20px",
            m: "30vh auto",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h2>COMMENTS:</h2>
          {tip.FirstComment !== "" && <p>1st: {tip.FirstComment}</p>}
          {tip.SecondComment !== "" && <p>2nd: {tip.SecondComment}</p>}
          {tip.ThirdComment !== "" && <p>3rd: {tip.ThirdComment}</p>}
          {tip.comments !== "" && <p>Event Comment: {tip.comments}</p>}
        </Paper>
      </Modal>
    </Fragment>
  );
};

export default TableComments;
