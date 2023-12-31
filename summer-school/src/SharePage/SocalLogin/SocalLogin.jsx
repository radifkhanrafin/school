import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvaiders/AuthProvaider';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const SocalLogin = () => {
    const { googleLogin } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {

        googleLogin()
            .then(result => {
                const loggedUser = result.user;
                const userinfo = { name: loggedUser.displayName, email: loggedUser.email, userProfile: loggedUser.photoURL, role: "student" };
                console.log(userinfo)

                fetch('https://summer-school-data.vercel.app/users', {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userinfo)
                })
                    .then(res => res.json())
                    .then((dataa) => {
                        navigate(from, { replace: true })
                        if (dataa.insertedId) {

                        }

                        console.log('dataa', dataa)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='p-3'>
            <button className='w-full flex justify-center items-center gap-2 capitalize  ' onClick={handleGoogleLogin}>
                <FaGoogle className='text-red-800 text-2xl' />
                continue with google
            </button>
        </div>
    );
};

export default SocalLogin;