import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userGoogleLogin } from "../../services/slices/auth/googleLogin";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';


const GoogleLogin = () => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate()

    // Function to initiate Google login by redirecting to backend's Google login route
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google'; // Adjust the URL to match your backend Google auth route
    };

    // Handle the callback response when Google redirects back to the app
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token: any = queryParams.get('token');
        const userId: any = queryParams.get('userId');

        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);

        if (token && userId) {
            dispatch(userGoogleLogin({ token, userId }))
                .then((res: any) => {
                    console.log(res, "res")
                    navigate("/")
                })

        } else {
            console.error("OAuth callback missing token or userId");
        }
    }, [dispatch]);

    return (
        <>
            <button className="googleButton"
                onClick={handleGoogleLogin}
            ><GoogleIcon className="me-2" /> Sign In with google
            </button>
        </>
    );
};

export default GoogleLogin;
