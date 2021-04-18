import Header from './Header.js'
import LogRegForm from './LogRegForm.js'
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer.js'
import * as Auth from './Auth.js'
import InfoToolTip from './InfoTollTip.js'



function Register (props) {

  const [data, setData] = React.useState({
    email: '',
    password: ''
  });

 const [isOpen, setIsOpen] = React.useState(false);
 const [registeredIn, isRegisteredIn] = React.useState(false);
 const history = useHistory();
 
 function handleChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  
  function handleSubmit(e){
    e.preventDefault();
    setIsOpen(true);
    if (!data.email || !data.password){
      return;
    }
    
    Auth.register(data.email, data.password)
    .then((data) => {
      if (data){
        isRegisteredIn(true);
        setData({email: '', password: ''} ,() => {
          props.handleLogin();
        })
      } 
    })
    .catch((err) => {
      isRegisteredIn(false);
      console.log(err)});
  }

 
  function signUp () {
    history.push("/sign-in");
  }

  function signIn () {
    history.push("/sign-up");
  }


  return (
    <>
      <InfoToolTip isOpen={isOpen} setOpen={setIsOpen} registeredIn={registeredIn}/>
      <Header name="Войти" tip="register" signIn={signIn} signUp={signUp}/>
      <LogRegForm className="logreg__container" title="Регистрация" buttonText="Войти" submit={handleSubmit} click={handleSubmit}>
        <input onChange={handleChange} className="logreg__input" type="email" name="email" placeholder="Email" id="logreg__input_email" required />
        <input onChange={handleChange} className="logreg__input" type="password" name="password" placeholder="Пароль" id="logreg__input_password" required />
      </LogRegForm>
      <Link to="/sign-in" className="logreg__link">Уже зарегистрированы? Войти</Link>
      <Footer />
    </>
    )}

export default Register