import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { signUp } from "aws-amplify/auth"; // ✅ FIX

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    fileUrl: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadImage = async () => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "sumang_upload");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dhc9vy4v2/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      const result = await res.json();
      return result.secure_url;
    } catch (error) {
      console.log("Image upload error:", error);
      throw new Error("Image upload failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      // ✅ 1. Upload image
      if (file) {
        imageUrl = await uploadImage();
      }

      // ✅ 2. Cognito Signup (FIXED)
      await signUp({
        username: form.email,
        password: form.password,
        options: {
          userAttributes: {
            email: form.email,
            name: form.name,
          },
        },
      });

      // ✅ 3. Save in backend
      await API.post("/signup", {
        ...form,
        fileUrl: imageUrl,
      });

      alert("Signup Successful! Please verify email");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.message || "Signup Failed");
    }
  };

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleSignup}
        className="col-md-4 mx-auto card p-4 shadow"
      >
        <h3 className="text-center mb-3">Signup</h3>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          className="form-control mb-2"
          onChange={handleFileChange}
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="img-fluid mb-2"
            style={{ height: "150px", objectFit: "cover" }}
          />
        )}

        <button className="btn btn-success w-100">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
