import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {UserData} from "./types/user.interface";
import useUser from "./useUSer";


export default function NavBar() {
    const { isLoading, user } = useUser() as UserData;
    const navigate = useNavigate();

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/articles">Articles</Link></li>
                {isLoading ? (
                    <li>Loading...</li>
                ) : (
                    <>
                        {user && (
                            <li style={{ color: 'lightgreen' }}>
                                Logged in as {user.email}
                            </li>
                        )}
                        <li>
                            {user ? (
                                <button onClick={() => signOut(getAuth())}>Log Out</button>
                            ) : (
                                <button onClick={() => navigate('/login')}>Sign In</button>
                            )}
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
