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
import TextField from "@mui/material/TextField";

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
  runnerNames: { competitor: { name: string; competitor_id: number } }[];
};

const CommentModal: FC<CommentModalProps> = ({
  tip,
  setTip,
  position,
  eventComment,
  runnerNames,
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

  /*return (
    <React.Fragment>
      {eventComment ? (
        <Fab
          onClick={toggleModal}
          color={tip.comments.trim() !== "" ? "success" : "primary"}
          variant="extended"
        >
          <EditIcon sx={{ mr: 1 }} />
          Comments
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
  );*/
  return (
    <React.Fragment>
      <Fab
        onClick={toggleModal}
        color={tip.comments.trim() !== "" ? "success" : "primary"}
        variant="extended"
        sx={{ fontSize: "12px", width: "22%" }}
      >
        <EditIcon sx={{ mr: 1 }} />
        Comments
      </Fab>

      <Modal open={open} onClose={toggleModal}>
        <div
          style={{
            width: "90%",
            minWidth: "850px",

            margin: "10vh auto",
          }}
        >
          <p onClick={toggleModal} className="closeButton">
            CLOSE
          </p>

          <Paper
            component="form"
            onSubmit={submitHandler}
            sx={{
              m: "0 auto",
              p: 2,
              maxHeight: "650px",
              overflowX: "scroll",
            }}
          >
            <h2>Event comments</h2>
            <div
              style={{
                display: "flex",
                gap: "10px",

                width: "100%",
              }}
            >
              <div style={{ flex: 1 }}>
                {runnerNames[0] && (
                  <TextField
                    key={runnerNames[0].competitor.competitor_id}
                    label={`${1}. ${runnerNames[0].competitor.name} ${
                      tip.tipMark[1]
                    }`}
                    value={tip.eventComments[0]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          0: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[2] && (
                  <TextField
                    key={runnerNames[2].competitor.competitor_id}
                    label={`${3}. ${runnerNames[2].competitor.name} ${
                      tip.tipMark[3]
                    }`}
                    value={tip.eventComments[2]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          2: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[4] && (
                  <TextField
                    key={runnerNames[4].competitor.competitor_id}
                    label={`${5}. ${runnerNames[4].competitor.name} ${
                      tip.tipMark[5]
                    }`}
                    value={tip.eventComments[4]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          4: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[6] && (
                  <TextField
                    key={runnerNames[6].competitor.competitor_id}
                    label={`${7}. ${runnerNames[6].competitor.name} ${
                      tip.tipMark[7]
                    }`}
                    value={tip.eventComments[6]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          6: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[8] && (
                  <TextField
                    key={runnerNames[8].competitor.competitor_id}
                    label={`${9}. ${runnerNames[8].competitor.name} ${
                      tip.tipMark[9]
                    }`}
                    value={tip.eventComments[8]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          8: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[10] && (
                  <TextField
                    key={runnerNames[10].competitor.competitor_id}
                    label={`${11}. ${runnerNames[10].competitor.name} ${
                      tip.tipMark[11]
                    }`}
                    value={tip.eventComments[10]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          10: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[12] && (
                  <TextField
                    key={runnerNames[12].competitor.competitor_id}
                    label={`${13}. ${runnerNames[12].competitor.name} ${
                      tip.tipMark[13]
                    }`}
                    value={tip.eventComments[12]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          12: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[14] && (
                  <TextField
                    key={runnerNames[14].competitor.competitor_id}
                    label={`${15}. ${runnerNames[14].competitor.name} ${
                      tip.tipMark[15]
                    }`}
                    value={tip.eventComments[14]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          14: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[16] && (
                  <TextField
                    key={runnerNames[16].competitor.competitor_id}
                    label={`${17}. ${runnerNames[16].competitor.name} ${
                      tip.tipMark[17]
                    }`}
                    value={tip.eventComments[0]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          16: e.target.value,
                        },
                      })
                    }
                  />
                )}
              </div>
              <div style={{ flex: 1 }}>
                {runnerNames[1] && (
                  <TextField
                    key={runnerNames[1].competitor.competitor_id}
                    label={`${2}. ${runnerNames[1].competitor.name} ${
                      tip.tipMark[2]
                    }`}
                    value={tip.eventComments[1]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          1: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[3] && (
                  <TextField
                    key={runnerNames[3].competitor.competitor_id}
                    label={`${4}. ${runnerNames[3].competitor.name} ${
                      tip.tipMark[4]
                    }`}
                    value={tip.eventComments[3]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          3: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[5] && (
                  <TextField
                    key={runnerNames[5].competitor.competitor_id}
                    label={`${6}. ${runnerNames[5].competitor.name} ${
                      tip.tipMark[6]
                    }`}
                    value={tip.eventComments[5]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          5: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[7] && (
                  <TextField
                    key={runnerNames[7].competitor.competitor_id}
                    label={`${8}. ${runnerNames[7].competitor.name} ${
                      tip.tipMark[8]
                    }`}
                    value={tip.eventComments[7]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          7: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[9] && (
                  <TextField
                    key={runnerNames[9].competitor.competitor_id}
                    label={`${10}. ${runnerNames[9].competitor.name} ${
                      tip.tipMark[10]
                    }`}
                    value={tip.eventComments[9]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          9: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[11] && (
                  <TextField
                    key={runnerNames[11].competitor.competitor_id}
                    label={`${12}. ${runnerNames[11].competitor.name} ${
                      tip.tipMark[12]
                    }`}
                    value={tip.eventComments[11]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          11: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[13] && (
                  <TextField
                    key={runnerNames[13].competitor.competitor_id}
                    label={`${14}. ${runnerNames[13].competitor.name} ${
                      tip.tipMark[14]
                    }`}
                    value={tip.eventComments[13]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          13: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[15] && (
                  <TextField
                    key={runnerNames[15].competitor.competitor_id}
                    label={`${16}. ${runnerNames[15].competitor.name} ${
                      tip.tipMark[16]
                    }`}
                    value={tip.eventComments[15]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          15: e.target.value,
                        },
                      })
                    }
                  />
                )}
                {runnerNames[17] && (
                  <TextField
                    key={runnerNames[17].competitor.competitor_id}
                    label={`${18}. ${runnerNames[17].competitor.name} ${
                      tip.tipMark[18]
                    }`}
                    value={tip.eventComments[17]}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setTip({
                        ...tip,
                        eventComments: {
                          ...tip.eventComments,
                          17: e.target.value,
                        },
                      })
                    }
                  />
                )}
              </div>
            </div>
            <TextField
              label="Event comment"
              value={tip.eventComments.event}
              onChange={(e) =>
                setTip({
                  ...tip,
                  eventComments: {
                    ...tip.eventComments,
                    event: e.target.value,
                  },
                })
              }
              fullWidth
            />
          </Paper>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default CommentModal;
