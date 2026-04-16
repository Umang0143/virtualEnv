import { useState } from "react";
import { Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    // ✅ STEP 1: Login
    await signIn({
      username: form.email,
      password: form.password,
    });

    // ✅ STEP 2: Token lo
    const session = await fetchAuthSession();

    const idToken = session.tokens.idToken.toString();
    const accessToken = session.tokens.accessToken.toString();

    console.log("ID TOKEN:", idToken);
    console.log("ACCESS TOKEN:", accessToken);

    // ✅ Save token
    localStorage.setItem("token", idToken);

    alert("Login Successful");

    navigate("/dashboard");
  } catch (err) {
    console.log(err);

    // ✅ Already login case
    if (err.name === "UserAlreadyAuthenticatedException") {
      const session = await fetchAuthSession();
      const token = session.tokens.idToken.toString();

      localStorage.setItem("token", token);

      navigate("/dashboard");
    } 
    else if (err.name === "UserNotConfirmedException") {
      alert("Please verify your email first");
      navigate("/verify");
    } 
    else if (err.name === "NotAuthorizedException") {
      alert("Invalid email or password");
    } 
    else {
      alert(err.message || "Login Failed");
    }
  }
};

  return (
    <Container className="mt-5">
      <Col lg={4} className="mx-auto">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-3">Login</h3>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">Remember me</label>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-2">
              Sign In
            </button>

            <Link to="/signup" className="btn btn-secondary w-100">
              Signup
            </Link>
          </form>
        </div>
      </Col>
    </Container>
  );
}
