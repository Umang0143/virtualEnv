import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Signup</h2>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label>Name</label>
            <input 
              type="text" 
              name="name"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Upload Image</label>
            <input 
              type="file" 
              name="image"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-100">
            Signup
          </button>

        </form>
      </div>
    </div>
  );
}

export default SignUp;