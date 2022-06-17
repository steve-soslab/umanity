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
        <div
          style={{
            width: "40%",
            minWidth: "550px",

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
            {tip.FirstComment !== "" && (
              <blockquote className="otro-blockquote">
                {tip.FirstComment}
                <br />
                <span>1st: {tip.FirstName}</span>
              </blockquote>
            )}
            {tip.SecondComment !== "" && (
              <blockquote className="otro-blockquote">
                {tip.SecondComment}
                <br />
                <span>2nd: {tip.SecondName}</span>
              </blockquote>
            )}
            {tip.ThirdComment !== "" && (
              <blockquote className="otro-blockquote">
                {tip.ThirdComment}
                <br />
                <span>3rd: {tip.ThirdName}</span>
              </blockquote>
            )}
            {tip.comments !== "" && (
              <blockquote className="otro-blockquote">
                {tip.comments}
                <br />
                <span>Event Comment: </span>
              </blockquote>
            )}
          </Paper>
        </div>
      </Modal>
    </Fragment>
  );
};

export default TableComments;
