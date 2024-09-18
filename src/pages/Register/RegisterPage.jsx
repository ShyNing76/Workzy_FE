import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import registerImage from "/src/assets/registerImage.jpg"

const RegisterPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [flag, setFlag] = useState(false)

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setFlag(true);
            return;
        }
        setFlag(false);
        console.log("Submit data: ", email, password, name)
        navigate("/login")
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="flex w-full max-w-4xl bg-white shadow-md rounded-md overflow-hidden h-auto">
                    <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md">
                        {
                            flag &&
                            <div role="alert" className="alert alert-error">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>Passwords do not match!</span>
                            </div>
                        }


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
                                <input
                                    type="password"
                                    className="input input-bordered w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <div className="form-control mt-4">
                                <label className="label">Confirm Password</label>
                                <input
                                    type="password"
                                    className="input input-bordered w-full"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-neutral w-full mt-6">
                                Register
                            </button>
                        </form>
                        <p className="text-center">
                            Already have an account?{' '}
                            <Link to="/login" className="text-black-500 font-bold">Login</Link>
                        </p>
                    </div>

                    <div className="hidden md:flex w-1/2">
                        <img src={registerImage} alt="Register Illustration" className="object-cover w-full h-full"/>
                    </div>
                </div>
            </div>


        </>
    )
}

export default RegisterPage