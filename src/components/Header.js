import Logo from '../images/logo.svg'
import { Link } from 'react-router-dom';

function Header (props) {
    function compareTips () {
        if (props.tip === "signOut") {
            props.signOut()
        }
        if (props.tip === "register") {
            props.signUp()
        }
        if (props.tip === "login") {
            props.signIn()
        }
    }
    return (
        <header className="header">
        <img className="header__logo" src={Logo} alt="лого"/>
        <div className="header__container">
            <p className="header__enter">{props.loggedIn ? props.email : ''}</p>
            <button className="header__button" onClick={compareTips}>{props.name}</button>
        </div>
        </header>
    )}

export default Header