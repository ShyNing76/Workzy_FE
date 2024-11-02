import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../components/context/auth.context";
import { getUserAuthen } from "../../../config/api";
import { encryptRoleId } from "../../../utils/encryptRoleId";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setRoleId, setAuth } = useContext(AuthContext); // Sử dụng context để cập nhật trạng thái

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const token = searchParams.get("token");

      if (token) {
        try {
          // Lưu token vào localStorage
          localStorage.setItem("access_token", token);

          setAuth({
            isAuthenticated: true,
          });

          // Gọi API lấy thông tin người dùng
          const userRes = await getUserAuthen();

          if (userRes && userRes.data && userRes.err === 0) {
            const { role_id } = userRes.data;

            const encryptedRoleId = encryptRoleId(role_id);

            localStorage.setItem("roleId", encryptedRoleId);
            setRoleId(role_id); // int

            // Điều hướng người dùng dựa trên role_id
            switch (role_id) {
              case 1: {
                navigate("/admin");
                break;
              }
              case 2: {
                navigate("/manager");
                break;
              }
              case 3: {
                navigate("/staff");
                break;
              }
              case 4: {
                navigate("/");
                break;
              }
              default:
                break;
            }
          } else {
            toast.error("Error fetching user information.");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error during Google login:", error);
          toast.error("Google login failed.");
          navigate("/login");
        }
      } else {
        toast.error("Google login failed.");
        navigate("/login");
      }
    };

    // Gọi hàm bất đồng bộ
    handleGoogleCallback();
  }, [searchParams, navigate, setAuth]);

  return <span className="loading loading-spinner"></span>;
};

export default GoogleCallback;
