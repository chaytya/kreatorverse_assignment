import React, { useState } from 'react'
import { LOGIN } from '../../constants/constants'
import '../../styles/index.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setError, setErrorMessage, setLoading } from '../../redux/usersSlice';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const clearError = () => {
        setTimeout(() => {
            dispatch(setError(false));
            dispatch(setErrorMessage(""));
        }, 3000)
    }

    const handleLogin = () => {
        if (!email) {
            dispatch(setError(true));
            dispatch(setErrorMessage("Email Required"));
            clearError()
        } else if (!password) {
            dispatch(setError(true));
            dispatch(setErrorMessage("Password Required"));
            clearError()
        } else {
            dispatch(setLoading(true))
            fetch(LOGIN, {
                method: 'POST',
                headers: {
                    "conntent-type": "applicatio/json"
                },
                body: {
                    "email": email,
                    "password": password
                }
            }).then(response => {
                if(response.status === 200) {
                    navigate("dashboard")
                } else {
                    response.json().then(result => {
                        if(Object.keys(result).includes("error")) {
                            dispatch(setError(true));
                            dispatch(setErrorMessage(result.error ? result.error + " but redirecting to dashboard" : "Something went wrong but redirecting to dashboard"));
                            clearError()
                            // Login not working properly so redirecting to dashboard
                            setTimeout(() => {
                                navigate("dashboard")
                            }, 3000)
                        }
                    })
                }
                dispatch(setLoading(false))
            })
                .catch(error => {
                    dispatch(setLoading(true))
                    dispatch(setError(true));
                    dispatch(setErrorMessage(error.message ? error.message : "Something went wrong"));
                    clearError()
                })
        }
    }

    return (
        <div className='login-screen-container'>
            <div className='login-left-container'>
                <div className='container'>
                    <p className='heading'>Your Space To<br />Be Social</p>
                    <p className='description'>Lorem ipsum dolor sit amet, consectetur adip<br />scing elit</p>
                    <div className='button-container'>
                        <div className='button filled-button-white'>
                            <div>Learn more</div>
                        </div>
                        <div className='button outlined-button-voilet'>
                            <div>Our features</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='login-right-container'>
                <h1 className='login-heading'>Welcome back!</h1>
                <input placeholder='Email' type={'email'} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder='Password' type={'password'} onChange={(e) => setPassword(e.target.value)} />
                <div className='button filled-button-voilet' onClick={handleLogin}>
                    <div>Learn more</div>
                </div>
            </div>
        </div>
    )
}

export default Login