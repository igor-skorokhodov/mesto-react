import Header from './Header.js'
import LogRegForm from './LogRegForm.js'
import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import Footer from '../components/Footer.js'
import * as Auth from './Auth.js'



function Login (props) {

  const [data, setData] = React.useState({
    email: '',
    password: ''
  });

  const [clearingInput, setClearingInput] = React.useState('');

  const history = useHistory();
 
  function handleChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  
  function handleSubmit(e){
    e.preventDefault()
    if (!data.email || !data.password){
      return;
    }
    props.setEmail(data.email);
    setClearingInput('');
    Auth.authorize(data.email, data.password)
      .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
        setData({email: '', password: ''});
        props.handleLogin();
        history.push('/');
      }  
    })
    .catch(err => console.log(err));
  }
  
  React.useEffect(() => {
    setClearingInput('');
    }, []);

  function signUp () {
    history.push("/sign-in");
    }
  function signIn () {
    history.push("/sign-up");
  }


  return (
    <>
      <Header name="Регистрация" tip="login" signIn={signIn} signUp={signUp}/>
      <LogRegForm title="Вход" buttonText="Войти" submit={handleSubmit} click={handleSubmit} >
        <input onChange={handleChange} value={data.email} className="logreg__input" type="email" name="email" placeholder="Email" id="logreg__input_email" required />
        <input onChange={handleChange} value={data.password} className="logreg__input" type="password" name="password" placeholder="Пароль" id="logreg__input_password" required />
      </LogRegForm>
      <Footer />
    </>
    )}

export default Login