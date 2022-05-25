import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Auth } from "aws-amplify";

const LoginComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const loginHandler = async () => {
    setLoading(true);
    try {
      await Auth.signIn(email, password);
      return setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <Paper className="login-component">
        <h2>Login</h2>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          sx={{ mb: 2 }}
          fullWidth
        />
        <TextField
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          sx={{ mb: 2 }}
          fullWidth
        />
        {loading ? (
          <Button fullWidth variant="outlined">
            <CircularProgress size="1.4rem" />
          </Button>
        ) : (
          <Button onClick={loginHandler} fullWidth variant="contained">
            LOGIN
          </Button>
        )}
      </Paper>
    </div>
  );
};

export default LoginComponent;
