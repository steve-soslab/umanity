import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Auth } from "aws-amplify";
import Head from "next/head";
import { error } from "../types/error";

type LoginProps = {
  setLoggedIn: (boolean: boolean) => void;
  error: error;
  setError: (data: error) => void;
};

const LoginComponent: React.FC<LoginProps> = ({
  setLoggedIn,
  error,
  setError,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const loginHandler = async () => {
    if (email.trim().length === 0 && password.trim().length === 0) {
      return setError({ ...error, auth: "Please enter an email and password" });
    }
    if (password.trim().length === 0) {
      return setError({ ...error, auth: "Please enter a password" });
    }
    if (email.trim().length === 0) {
      return setError({ ...error, auth: "Please enter an email" });
    }
    setLoading(true);
    try {
      await Auth.signIn(email, password);
      const { attributes } = await Auth.currentAuthenticatedUser();
      if (attributes) {
        setLoading(false);
        return setLoggedIn(true);
      }
      return setLoading(false);
    } catch (error) {
      console.log(error);
      setError({
        ...error,
        auth: "Sorry, there was an error, please try again later",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    setError({ ...error, auth: "" });
  }, [email, password]);
  return (
    <div className="login-page">
      <Head>
        <title>RACELAB | Umanity</title>
        <meta name="description" content="RACELAB tipping site for Umanity" />
        <link rel="icon" href="https://rlab.racelab.global/favicon.ico" />
      </Head>

      <Paper className="login-component">
        <h2>Login</h2>
        <h6 className="error">{error.auth}</h6>
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
