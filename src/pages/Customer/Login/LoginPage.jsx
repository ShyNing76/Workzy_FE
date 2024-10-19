import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import loginImage from "../../../assets/loginImage.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./loginPage.scss";
import { toast, ToastContainer } from "react-toastify";
import { getUserAuthen, loginApi } from "../../../config/api";
import { AuthContext } from "../../../components/context/auth.context";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = new URLSearchParams(location.search).get("redirect");
  const env_backend = import.meta.env.VITE_BACKEND_URL;
  const [loginLoading, setLoginLoading] = useState(false);

  //   Check Authentication
  const { setRoleId, setAuth } = useContext(AuthContext);

  // Show password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);

    const res = await loginApi(email, password);

    if (res && res.err === 0) {
      localStorage.setItem("access_token", res.accessToken);
      setAuth({
        isAuthenticated: true,
      });

      const userRes = await getUserAuthen();

      if (userRes && userRes.data && userRes.err == 0) {
        const { role_id } = userRes.data;
        localStorage.setItem("roleId", role_id);
        setRoleId(role_id);

        switch (role_id) {
          case 1: {
            //admin
            navigate("/admin");
            break;
          }
          case 2: {
            //manager
            navigate("/manager");
            break;
          }
          case 3: {
            //staff
            navigate("/staff");
            break;
          }
          case 4: {
            //customer
            if (redirectTo) {
              navigate(redirectTo); // Điều hướng trở lại trang hiện tại sau khi đăng nhập
            } else {
              navigate("/"); // Hoặc điều hướng đến trang mặc định
            }
            break;
          }
          default:
            break;
        }
      }
    } else {
      toast.error(res?.message);
      setEmail("");
      setPassword("");
    }

    setLoginLoading(false);
  };

  // Handle Login With Google
  const handleLoginWithGoogle = async () => {
    window.location.href = `${env_backend}api/v1/auth/google`;
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex w-full max-w-4xl bg-white shadow-md rounded-md overflow-hidden h-auto">
          <div className="hidden md:flex w-1/2 h-auto">
            <img
              src={loginImage}
              alt="Login Illustration"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 space-y-4 bg-white shadow-md rounded-md flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-control">
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

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              {!loginLoading ? (
                <button type="submit" className="btn btn-neutral w-full mt-6">
                  Login
                </button>
              ) : (
                <button className="btn btn-neutral w-full mt-6">
                  <span className="loading loading-spinner"></span>
                  loading
                </button>
              )}
            </form>
            <div className="divider">OR</div>
            <button className="btn w-full" onClick={handleLoginWithGoogle}>
              <FcGoogle className="scale-150 mr-2" /> Login With Google
            </button>
            <p className="text-center">
              Don’t have an account?{" "}
              <Link
                to={`/register?redirect=${
                  redirectTo || window.location.pathname
                }`}
                className="text-black-500 font-bold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
