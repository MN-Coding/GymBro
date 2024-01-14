import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {

    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon size="2x" icon={faDumbbell} style={{ marginRight: '15px' }}/>
                    <h1>Gym Bro</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                    )}
                    {!user && (<div>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </div>)}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;