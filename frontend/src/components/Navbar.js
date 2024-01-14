import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon size="2x" icon={faDumbbell} style={{ marginRight: '15px' }}/>
                    <h1>Gym Bro</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar;