import { useState } from "react";
import { confirmSignUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

function Verify() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      alert("Email and OTP required");
      return;
    }

    try {
      setLoading(true);

      const res = await confirmSignUp({
        username: email,
        confirmationCode: otp,
      });

      console.log(res);

      alert("Account verified successfully");

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    if (!email) {
      alert("Enter email first");
      return;
    }

    try {
      await resendSignUpCode({
        username: email,
      });

      alert("OTP sent again");
    } catch (err) {
      console.log(err);
      alert(err.message || "Failed to resend OTP");
    }
  };


  return (
    <form onSubmit={handleVerify}>
      <h2>Verify Account</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </button>
      <button type="button" onClick={handleResend}>
          Resend OTP
        </button>
    </form>
  );
}

export default Verify;
