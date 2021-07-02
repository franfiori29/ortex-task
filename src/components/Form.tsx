import axios from "axios";
import { useState } from "react";

interface Props {
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  showModal?: boolean;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  setRefDisplay?: (tag: string) => void;
};

const Form: React.FC<Props> = ({ setShowModal, showModal, setLoggedIn, setRefDisplay }) => {
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
      if (showModal) {
        await axios.post("reset", credentials);
        alert("The password was changed successfully!");
        setLoggedIn!(true);
        setRefDisplay!("none");
      } else {
        await axios.post("login", credentials);
        alert("Successful login!")
      }
    } catch (err: any) {
      if (!err.response) return;
      if (err.response.status === 401) return alert("Wrong credentials");
      alert("There was a problem with our server, try again later");
    }
  };

  return (
    <div className="form-container">
      <div className="login-title">{showModal ? "RESET" : "LOGIN"}</div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          name="username"
          onChange={handleChange}
          required
          className="login-input" />
        <input
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required
          type="password"
          className="login-input" />
        {showModal && <input
          placeholder="New password"
          name="newPassword"
          onChange={handleChange}
          required
          type="password"
          className="login-input" />}
        {!showModal &&
          <button type="button" className="reset-password" onClick={() => setShowModal!(true)}>
            Reset password
          </button>}
        <button type="submit" className="login-input btn">Submit</button>
      </form>
    </div>
  )
}

export default Form;