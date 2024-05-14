import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("กรุณาใส่ชื่อผู้ใช้งาน");
      return;
    }

    if (!validateEmail(email)) {
      setError("กรุณากรอก Email ให้ถูกต้อง");
      return;
    }

    if (!password) {
      setError("กรุณาใส่รหัสผ่าน");
      return;
    }
    setError("");

    // SignUp API call
    try {
      
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,        
      });
      

      // Handle successful registration response
      if (response.data && response.data.erorr) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("มีErrorที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className=" w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">ลงทะเบียน</h4>

            <input
              type="text"
              placeholder="ชื่อบัญชี"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error} </p>}

            <button type="submit" className="btn-primary">
              สร้างบัญชี
            </button>

            <p className="text-sm text-center mt-4">
              มีบัญชีอยู่แล้ว?{" "}
              <Link to="/login" className=" font-medium text-primary underline">
                เข้าสู่ระบบ
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
