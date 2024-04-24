import styles from "./LoginPage.module.scss";
import { FormInput } from "../../components/FormInput/FormInput";
import MainButton from "../../components/Button/Button";
import React, { useEffect, useState } from "react";
import api from "../../api/apiService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserToLocalStorage } from "../../utils/userUtilis";

function LoginPage() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");
  const [credentials, setCredentials] = useState({
    email: location.state ? location.state : "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await api.post("/auth", credentials);
      const { token } = response.data;

      if (token === null) {
        setFormError("Invalid email or password!");
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUserToLocalStorage(token);

      navigate("/", { state: "Logged in." });
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.log("Invalid email or password");
      } else {
        console.error("An error occurred during authentication:", error);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  });

  return (
    <section className={styles.login}>
      <h1 className={styles.loginHeader}>login</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          placeholder="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <span className={styles.formError}>{formError}</span>
        <span className={styles.loginLink}>forgot your password?</span>
        <MainButton
          text="sign in"
          className={styles.customMainButton}
          type="submit"
        />
        <Link to="/register">
          <span className={styles.loginLink}>create an account</span>
        </Link>
      </form>
    </section>
  );
}

export default LoginPage;
