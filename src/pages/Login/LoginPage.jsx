import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import loginImage from "/src/assets/loginImage.jpg"

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault()
        console.log("Submit data: ", email, password);
        navigate("/")
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="flex w-full max-w-4xl bg-white shadow-md rounded-md overflow-hidden h-auto">
                    <div className="hidden md:flex w-1/2 h-auto">
                        <img src={loginImage} alt="Login Illustration" className="object-cover w-full h-full"/>
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
                                <input
                                    type="password"
                                    className="input input-bordered w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-neutral w-full mt-6">
                                Login
                            </button>
                            <div className="divider">OR</div>
                            <button className="btn w-full">
                                Login With Google
                            </button>
                        </form>
                        <p className="text-center">
                            Don’t have an account?{' '}
                            <Link to="/register" className="text-black-500 font-bold">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )

}

export default LoginPage