import { useState } from "react";
import Error from "../../components/Error/Error";
import "./Login.scss";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{ message: string; status: number } | null>(null);

  const handleLogin = async () => {
    setError(null);

    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      return console.log(await response.json());
    }

    setError({
      message: await response.json(),
      status: response.status
    })
  };

  return (
    <div className="global-page-container">
      <div className="login-container">
        <div className="login-title">Login</div>
        <div className="login-content">
          <div>
            <div>Username</div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <div>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Submit</button>
        </div>
      </div>
      {error && <Error error={error} />}
    </div>
  );
}
