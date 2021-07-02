import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<Props> = ({ setShow, show, setLoggedIn }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [credentials, setHadleCredentials] = useState({
    username: "",
    password: "",
    newPassword: "",
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
      alert("The password was changed successfully!");
      if (!ref.current) return;
      setLoggedIn(true);
      ref.current.style.display = "none";
    } catch (err: any) {
      if (!err.response) return;
      if (err.response.status === 401) return alert("Wrong credentials");
      alert("There was a problem with our server, try again later");
    }
  };

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.display = show ? "block" : "none";
  }, [show])

  return (
    <div id="myModal" className="modal" ref={ref}>
      <div className="modal-content">
        <span className="close" onClick={() => setShow(false)} >
          &times;
        </span>
        <div className="form-container">
          <div className="login-title">RESET</div>
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
            <input
              placeholder="New password"
              name="newPassword"
              onChange={handleChange}
              required
              type="password"
              className="login-input" />
            <button type="submit" className="login-input btn">Submit</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Modal;