import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function signup() {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            {error && <p className="error">{error}</p>}
            <input type="email" placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder="confirmPassword"
                value={confirmPassword}
                onChange={e => setconfirmPassword(e.target.value)} />

            <button onClick={signup}> Sign Up</button>
            <Link to="/login"> If you already have an account? Log In</Link>
        </div>
    )
}