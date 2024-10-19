import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import registerImage from "../../../assets/registerImage.jpg";
import "./register.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { getUserAuthen, registerApi } from "../../../config/api";
import { AuthContext } from "../../../components/context/auth.context";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const redirectTo = new URLSearchParams(location.search).get("redirect");
  const [registerLoading, setRegisterLoading] = useState(false);

  const navigate = useNavigate();

  //   Check Authentication
  const { setRoleId, setAuth } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true); // Hiển thị loading khi đang xử lý đăng ký

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      toast.error("Password does not match!!!");
      setRegisterLoading(false); // Dừng loading nếu có lỗi
      return;
    }

    try {
      // Gọi API đăng ký
      const res = await registerApi(name, email, password);

      // Kiểm tra nếu đăng ký thành công
      if (res && res.err === 0) {
        // Lưu access token vào localStorage
        localStorage.setItem("access_token", res.accessToken);

        // Cập nhật trạng thái xác thực
        setAuth({
          isAuthenticated: true,
        });

        // Gọi API lấy thông tin người dùng sau khi đăng ký thành công
        const userRes = await getUserAuthen();

        if (userRes && userRes.data && userRes.err === 0) {
          const { role_id } = userRes.data;
          localStorage.setItem("roleId", role_id);
          setRoleId(role_id);

          // Điều hướng theo vai trò của người dùng
          switch (role_id) {
            case 1: // admin
              navigate("/admin");
              break;
            case 2: // manager
              navigate("/manager");
              break;
            case 3: // staff
              navigate("/staff");
              break;
            case 4: // customer
              if (redirectTo) {
                navigate(redirectTo); // Điều hướng đến trang người dùng yêu cầu trước đó
              } else {
                navigate("/"); // Điều hướng đến trang mặc định
              }
              break;
            default:
              break;
          }
        } else {
          // Xử lý khi không lấy được thông tin người dùng
          toast.error("Failed to retrieve user information.");
        }
      } else {
        // Nếu đăng ký thất bại
        toast.error(res.message);
      }
    } catch (error) {
      // Xử lý lỗi nếu có lỗi xảy ra trong quá trình đăng ký hoặc lấy thông tin
      console.error("Registration error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      // Đảm bảo loading luôn được tắt dù có lỗi hay không
      setRegisterLoading(false);
      // Xóa form
      setEmail("");
      setPassword("");
      setName("");
      setConfirmPassword("");
    }
  };

  // Show password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Show confirm password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <ToastContainer />

      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex w-full max-w-4xl bg-white shadow-md rounded-md overflow-hidden h-auto">
          <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">Password</label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      className="eye-icon"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <FaEye className="eye-icon" onClick={handleShowPassword} />
                  )}
                </div>
              </div>
              <div className="form-control mt-4">
                <label className="label">Confirm Password</label>
                <div className="password-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="input input-bordered w-full password-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                  {showConfirmPassword ? (
                    <FaEyeSlash
                      className="eye-icon"
                      onClick={handleShowConfirmPassword}
                    />
                  ) : (
                    <FaEye
                      className="eye-icon"
                      onClick={handleShowConfirmPassword}
                    />
                  )}
                </div>
              </div>

              {!registerLoading ? (
                <button type="submit" className="btn btn-neutral w-full mt-6">
                  Register
                </button>
              ) : (
                <button className="btn btn-neutral w-full mt-6">
                  <span className="loading loading-spinner"></span>
                  loading
                </button>
              )}
            </form>
            <p className="text-center">
              Already have an account?{" "}
              <Link
                to={`/login?redirect=${redirectTo || window.location.pathname}`}
                className="text-black-500 font-bold"
              >
                Login
              </Link>
            </p>
          </div>

          <div className="hidden md:flex w-1/2">
            <img
              src={registerImage}
              alt="Register Illustration"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
