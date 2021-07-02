import axios, { AxiosError } from "axios";
import { useState } from "react";

const LoginForm: React.FC = () => {
  const [credentials, setHadleCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHadleCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("login", credentials);
      alert("Successful login!")
    } catch (err: any) {
      if (!err.response) return;
      if (err.response.status === 401) return alert("Wrong credentials");
      alert("There was a problem with our server, try again later");
    }
  };

  return (
    <div className="form-container">
      <div className="login-title">LOGIN</div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={handleChange}
          name="username"
          value={credentials.username}
          required
          className="login-input" />
        <input
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={credentials.password}
          required
          type="password"
          className="login-input" />
        <button className="reset-password">Reset password</button>
        <input type="submit" className="login-input btn" />
      </form>
    </div>
  )
}

export default LoginForm;