import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const history = useHistory(); // Initialize useHistory

  const submitLogin = async (e:any) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post(
        "http://localhost:5000/users-api/Authentication/login",
        {
          userName: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        sessionStorage.setItem("access-token", response.data.token);
        console.log("Successful login");
        history.push("/Test");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setCheck(true);
    }
  };

  return (
    <div className="container" id="main">
      <img className="registerImg" src="../assets/LoginSVG.svg" alt="Login Image" />
      <div className="signup">
        <form onSubmit={submitLogin} className="loginForm">
          <h1 className="HelloSlogan">Hello again!</h1>
          <p>Log hier in met jouw account.</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Name"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {check && <div style={{ color: "red" }}>De ingevulde gegevens zijn niet juist.</div>}
          <button type="submit" className="loginBtn">Login</button>
        </form>
        <button onClick={() => (window.location.href = "/")} className="loginBtn">
          Terug naar Home
        </button>
      </div>
    </div>
  );
}

export default Login;
