import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import { createContext, useContext } from 'react';

const PreviousPathContext = createContext();

export default function Login(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    useEffect(() => {
        if (isLoggedIn) {
            router.back();
        }
    }, [isLoggedIn]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                  },
                redirect: 'follow',
                credentials: 'include', // Don't forget to specify this if you need cookies
                body : JSON.stringify({email,password})
            // await axios.post('http://localhost:5000/api/user/login', { email, password },{
                //withCredentials: true
              });
            if(res.status === 200) {
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return(
        <>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
        </>
    )
}