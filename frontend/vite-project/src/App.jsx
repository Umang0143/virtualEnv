import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="container">
      <div
        className="row justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div className="col-md-4">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary w-100" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
