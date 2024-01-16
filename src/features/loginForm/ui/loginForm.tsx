import React, { useEffect } from "react";
import { Formik } from "formik";
import { DataForLogin } from "common/types";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { store, useAppDispatch } from "app/store";
import { authThunks } from "features/loginForm/model/authReducer";
import s from "./loginForm.module.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthorized } from "common/selectors";

const validateFunc = (values: DataForLogin) => {
  const errors: { email?: string; password?: string } = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className={s.loginForm}>
      <section className={s.formInputsBlock}>
        <h1>Sign in</h1>

        <Formik
          initialValues={{ email: "", password: "", rememberMe: true }}
          validate={validateFunc}
          onSubmit={(values, actions) => {
            dispatch(authThunks.login(values)).finally(() => {
              actions.setSubmitting(false);
            });
          }}
        >
          {(formik) => {
            const isEmailError = !!(formik.touched.email && formik.errors.email);
            const isPasswordError = !!(formik.touched.password && formik.errors.password);
            return (
              <form onSubmit={formik.handleSubmit} autoComplete="on">
                <FormControl>
                  <FormGroup>
                    <TextField
                      label="Email"
                      margin="normal"
                      {...formik.getFieldProps("email")}
                      error={isEmailError}
                      type="email"
                      name="email" // Добавленный атрибут
                      autoComplete={"email"}
                      id="email"
                    />
                    {isEmailError && <p className={s.error}>{formik.errors.email}</p>}
                    <TextField
                      type="password"
                      label="Password"
                      margin="normal"
                      {...formik.getFieldProps("password")}
                      error={isPasswordError}
                      name="password" // Добавленный атрибут
                      id="password"
                    />
                    {isPasswordError && <p className={s.error}>{formik.errors.password}</p>}
                    <FormControlLabel
                      label={"Remember me"}
                      control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
                    />
                    <Button
                      type={"submit"}
                      variant={"contained"}
                      disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
                      color={"primary"}
                    >
                      Login
                    </Button>
                  </FormGroup>
                </FormControl>
              </form>
            );
          }}
        </Formik>
      </section>
      <div className={s.divider}></div>

      <section className={s.formDescription}>
        <p>
          To log in get registered{" "}
          <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
            here
          </a>
        </p>
        <p>or use common test </p>
        <p> account credentials:</p>
        <p> Email: free@samuraijs.com</p>
        <p>Password: free</p>
      </section>
    </div>
  );
};

export default LoginForm;
