import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { useEffect, useState } from "react";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        await axiosInstance.get("/"); // เรียก API เชื่อมต่อเซิร์ฟเวอร์หลัก
        console.log("เชื่อมต่อกับเซิร์ฟเวอร์ได้");
        setLoading(true);
      } catch (error) {
        console.error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้", error);
      }
    };

    checkServerConnection();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("กรุณากรอก Email ให้ถูกต้อง");
      return;
    }

    if (!password) {
      setError("กรุณาใส่รหัสผ่าน");
      return;
    }
    setError("");

    // Login API call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // Handle successful login response
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
      {!loading ? (
        <>
          <Navbar />
          <div className="flex items-center justify-center mt-28">
            <div className="w-96 border rounded bg-white px-7 py-10">
              <h1>Please wait a moment</h1>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className="flex items-center justify-center mt-28">
            <div className="w-96 border rounded bg-white px-7 py-10">
              <form onSubmit={handleLogin}>
                <h4 className="text-2xl mb-7">เข้าสู่ระบบ</h4>

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

                {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                <button type="submit" className="btn-primary">
                  เข้าสู่ระบบ
                </button>

                <p className="text-sm text-center mt-4">
                  ยังไม่ได้ลงทะเบียน?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary underline"
                  >
                    สร้างบัญชี
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
