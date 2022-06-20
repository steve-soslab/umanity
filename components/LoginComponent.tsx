import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Auth } from "aws-amplify";
import Head from "next/head";
import { error } from "../types/error";
import { auth } from "../types/auth";
import emptyAuth from "../lib/emptyAuth";
import { user } from "../types/user";

type LoginProps = {
  setLoggedIn: (boolean: boolean) => void;
  error: error;
  setError: (data: error) => void;
  setUser: (state: user | null) => void;
};

type ForgotPassword = {
  forgot: boolean;
  username: string;
  code: string;
  new_password: string;
  step: number;
  stepZeroLoading: boolean;
  stepOneLoading: boolean;
};

const forgotPasswordBlank: ForgotPassword = {
  forgot: false,
  username: "",
  code: "",
  new_password: "",
  step: 0,
  stepZeroLoading: false,
  stepOneLoading: false,
};

const LoginComponent: React.FC<LoginProps> = ({
  setLoggedIn,
  error,
  setError,
  setUser,
}) => {
  const blankAuth = emptyAuth();
  const [auth, setAuth] = useState<auth>(blankAuth);
  const [loading, setLoading] = useState<boolean>(false);
  const [newPasswordRequired, setNewPasswordRequired] =
    useState<boolean>(false);
  const [forgotPassword, setForgotPassword] =
    useState<ForgotPassword>(forgotPasswordBlank);

  const toggleForgotPassword = () =>
    setForgotPassword({ ...forgotPassword, forgot: !forgotPassword.forgot });

  const sendForgotPasswordEmail = async (event) => {
    event.preventDefault();
    setForgotPassword({ ...forgotPassword, stepZeroLoading: true });
    Auth.forgotPassword(forgotPassword.username)
      .then((data) => {
        setForgotPassword({ ...forgotPassword, stepZeroLoading: false });
        return setForgotPassword({ ...forgotPassword, step: 1 });
      })
      .catch((err) => {
        setForgotPassword({ ...forgotPassword, stepZeroLoading: false });
        console.log(err);
      });
  };

  const setNewPassword = async (e) => {
    e.preventDefault();
    setForgotPassword({ ...forgotPassword, stepOneLoading: true });
    Auth.forgotPasswordSubmit(
      forgotPassword.username,
      forgotPassword.code,
      forgotPassword.new_password
    )
      .then((data) => {
        setForgotPassword({ ...forgotPassword, stepOneLoading: false });
        toggleForgotPassword();
      })
      .catch((err) => {
        setForgotPassword({ ...forgotPassword, stepOneLoading: false });
        console.log(err);
      });
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    if (auth.resetPassword.trim().length === 0) {
      setError({
        ...error,
        auth: "Please enter a new password",
      });
    }
    setLoading(true);
    try {
      const getUser = await Auth.signIn(auth.username, auth.password);
      const reset = await Auth.completeNewPassword(getUser, auth.resetPassword);
      setLoading(false);
      if (reset.username) {
        return setLoggedIn(true);
      }
      setError({
        ...error,
        auth: "Sorry there was an error, please try again later",
      });
    } catch (error) {
      setLoading(false);
      setError({
        ...error,
        auth: "Sorry there was an error, please try again later",
      });
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (
      auth.username.trim().length === 0 &&
      auth.password.trim().length === 0
    ) {
      return setError({ ...error, auth: "Please enter an email and password" });
    }
    if (auth.password.trim().length === 0) {
      return setError({ ...error, auth: "Please enter a password" });
    }
    if (auth.username.trim().length === 0) {
      return setError({ ...error, auth: "Please enter an email" });
    }
    setLoading(true);
    try {
      const login = await Auth.signIn(auth.username, auth.password);
      if (login.challengeName === "NEW_PASSWORD_REQUIRED") {
        setLoading(false);
        return setNewPasswordRequired(true);
      }

      const { attributes } = await Auth.currentAuthenticatedUser();
      if (attributes) {
        setLoading(false);
        setUser(attributes);
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
  }, [auth.username, auth.password]);

  if (forgotPassword.forgot) {
    return (
      <div className="login-page">
        <Head>
          <title>RACELAB | Umanity</title>
          <meta name="description" content="RACELAB tipping site for Umanity" />
          <link rel="icon" href="https://rlab.racelab.global/favicon.ico" />
        </Head>

        {forgotPassword.step === 0 && (
          <Paper
            component="form"
            onSubmit={sendForgotPasswordEmail}
            className="login-component"
          >
            <h2>Forgot Password</h2>
            <h6 className="error">{error.auth}</h6>

            <TextField
              onChange={(e) =>
                setForgotPassword({
                  ...forgotPassword,
                  username: e.target.value,
                })
              }
              label="Username"
              value={forgotPassword.username}
              sx={{ mb: 2 }}
              fullWidth
            />

            {forgotPassword.stepZeroLoading ? (
              <Button fullWidth variant="outlined">
                <CircularProgress size="1.4rem" />
              </Button>
            ) : (
              <Button type="submit" fullWidth variant="contained">
                RESET
              </Button>
            )}
          </Paper>
        )}
        {forgotPassword.step === 1 && (
          <Paper
            component="form"
            onSubmit={setNewPassword}
            className="login-component"
          >
            <h2>ENTER CONFIRMATION CODE AND NEW PASSWORD</h2>
            <h6 className="error">{error.auth}</h6>

            <TextField
              onChange={(e) =>
                setForgotPassword({
                  ...forgotPassword,
                  code: e.target.value,
                })
              }
              label="Verification code"
              value={forgotPassword.code}
              sx={{ mb: 2 }}
              fullWidth
              helperText="This is sent to your email"
            />
            <TextField
              onChange={(e) =>
                setForgotPassword({
                  ...forgotPassword,
                  new_password: e.target.value,
                })
              }
              type="password"
              label="New password"
              value={forgotPassword.new_password}
              sx={{ mb: 2 }}
              fullWidth
            />

            {forgotPassword.stepOneLoading ? (
              <Button fullWidth variant="outlined">
                <CircularProgress size="1.4rem" />
              </Button>
            ) : (
              <Button type="submit" fullWidth variant="contained">
                CONFIRM NEW PASSWORD
              </Button>
            )}
          </Paper>
        )}
      </div>
    );
  }

  if (newPasswordRequired) {
    return (
      <div className="login-page">
        <Head>
          <title>RACELAB | Umanity</title>
          <meta name="description" content="RACELAB tipping site for Umanity" />
          <link rel="icon" href="https://rlab.racelab.global/favicon.ico" />
        </Head>

        <Paper
          component="form"
          onSubmit={resetPasswordHandler}
          className="login-component"
        >
          <h2>Set a new password</h2>
          <h6 className="error">{error.auth}</h6>

          <TextField
            type="password"
            onChange={(e) =>
              setAuth({ ...auth, resetPassword: e.target.value })
            }
            label="Password"
            value={auth.resetPassword}
            sx={{ mb: 2 }}
            fullWidth
          />

          {loading ? (
            <Button fullWidth variant="outlined">
              <CircularProgress size="1.4rem" />
            </Button>
          ) : (
            <Button type="submit" fullWidth variant="contained">
              RESET
            </Button>
          )}
        </Paper>
      </div>
    );
  }
  return (
    <div className="login-page">
      <Head>
        <title>RACELAB | Umanity</title>
        <meta name="description" content="RACELAB tipping site for Umanity" />
        <link rel="icon" href="https://rlab.racelab.global/favicon.ico" />
      </Head>

      <Paper
        component="form"
        onSubmit={loginHandler}
        className="login-component"
      >
        <h2>Login</h2>
        <h6 className="error">{error.auth}</h6>
        <TextField
          onChange={(e) => setAuth({ ...auth, username: e.target.value })}
          label="Username"
          sx={{ mb: 2 }}
          fullWidth
          value={auth.username}
        />
        <TextField
          type="password"
          onChange={(e) => setAuth({ ...auth, password: e.target.value })}
          label="Password"
          value={auth.password}
          sx={{ mb: 2 }}
          fullWidth
        />
        {loading ? (
          <Button fullWidth variant="outlined">
            <CircularProgress size="1.4rem" />
          </Button>
        ) : (
          <Button type="submit" fullWidth variant="contained">
            LOGIN
          </Button>
        )}
        <p
          style={{ cursor: "pointer", fontSize: "12px" }}
          onClick={toggleForgotPassword}
        >
          Forgot your password?
        </p>
      </Paper>
    </div>
  );
};

export default LoginComponent;
