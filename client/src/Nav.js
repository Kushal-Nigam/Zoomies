import { Link } from 'react-router-dom';

const Nav = () => {
    
    return (
        <nav className="Nav">
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
            )
        }
        
        export default Nav