import '../index.css'
import Header from '../components/Header.js'
import Main from '../components/Main.js'
import Footer from '../components/Footer.js'
import React from 'react'
import ImagePopup from '../components/ImagePopup.js'
import api from '../utils/api.js'
import EditProfilePopup from '../components/EditProfilePopup.js'
import EditAvatarPopup from '../components/EditAvatarPopup.js'
import AddPlacePopup from '../components/AddPlacePopup.js'
import {UserInfoContext} from '../contexts/CurrentUserContext.js'
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Login from './Login.js'
import Register from './Register.js'
import ProtectedRoute from './ProtectedRoute.js'
import * as Auth from './Auth.js'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(''); 
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({name:'', about:'', avatar:'', id:''});   
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
  function handleClick (evt) {
    if(evt.target.classList.contains('popup_active')) {
      closeAllPopups();
    }
  }
      
  function handleOnKeyDown (evt) {
    if(evt.key === 'Escape') {
      closeAllPopups();
    }
  }
  
  document.addEventListener('keydown', handleOnKeyDown);
  document.addEventListener('click', handleClick);
  return () => {
    document.removeEventListener('keydown', handleOnKeyDown);
    document.removeEventListener('click', handleClick);
    };
});

React.useEffect(() => {
  api.getAllCards()
    .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`упс, возникла ошибка! ${err}}`);
  })}, [])

React.useEffect(() => {
  api.getUserInfo()
    .then((data) => {
      setCurrentUser({name: data.name, about: data.about, avatar: data.avatar, id: data._id});
    })
    .catch((err) => {
      console.log(`упс, возникла ошибка! ${err}}`);
    })},[])

React.useEffect(() => {
    tokenCheck();
  }, [])
  

function handleEditAvatarClick() {
  setIsEditAvatarPopupOpen(true);
}
  
function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true);
}
  
function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
}

function handleImageClick() {
  setIsImagePopupOpen(true);
}

function closeAllPopups() {
  setIsEditAvatarPopupOpen(false);
  setIsEditProfilePopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setSelectedCard('');
  setIsImagePopupOpen(false);
}

function handleUpdateUser({name, about}) {
  api.postUserInfo(name, about)
    .then((res) => {
       setCurrentUser({name: res.name, about: res.about, avatar: res.avatar, id: res._id});
    })
    .catch((err) => {
      console.log(`упс, возникла ошибка! ${err}}`);})
  closeAllPopups();
}

function handleUpdateAvatar(avatar) {
  api.userAvatarUpdate(avatar)
    .then((res) => {
      setCurrentUser({name: res.name, about: res.about, avatar: res.avatar, id: res._id});
    })
    .catch((err) => {
      console.log(`упс, возникла ошибка! ${err}}`);})
  closeAllPopups();
}

function handleCardLike(card) {
  const isLiked = card.likesArr.some(i => i._id === currentUser.id);
  api.changeLikeCardStatus(card.idCard, !isLiked)
    .then((newCard) => {
      setCards(state => state.map((c) => c._id === card.idCard ? newCard : c))})
    .catch((err) => {
      console.log(`упс, возникла ошибка! ${err}}`);
    })
} 

function handleCardDelete(card) {
  api.removeCard(card.idCard)
    .then(() => {
      setCards((state) => state.filter((c) => (c._id !== card.idCard)))})
    .catch((err) => {
      console.log(`упс, возникла ошибка! ${err}`)})
}

function handleAddPicture(name, link) {
  api.addNewCard(name, link)
    .then((newCard) => {
      setCards([newCard, ...cards])})
    .catch((err) => {
      console.log(`упс, возникла ошибка! ${err}`)})
    closeAllPopups();
}

function handleLogin(){
  setLoggedIn(true);
}

function tokenCheck() {
  // если у пользователя есть токен в localStorage,
  // эта функция проверит валидность токена
    const token = localStorage.getItem('token');
  if (token){
    // проверим токен
    Auth.getContent(token).then((res) => {
      if (res){       
        console.log(res) // авторизуем пользователя
        setLoggedIn(true);
        setEmail(res.data.email);
        console.log(email)
          history.push("/main");
      }})}}

function signOut(){
  localStorage.removeItem('token');
  setLoggedIn(false);
  history.push('/sign-in');
  setEmail('');
}
      
function signUp () {
  history.push("/sign-in");
}

function signIn () {
  history.push("/sign-up");
}
    
   return (
    <UserInfoContext.Provider value={currentUser}>
      <body className="background">
        <div className="page">
          <Switch>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} setEmail={setEmail}/>
            </Route>
            <Route path="/sign-up">
              <Register loggedIn={loggedIn} handleLogin={handleLogin}/>
            </Route>
            <Route path="/main">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
              <Header signUp={signUp}  signIn={signIn} email={email}  loggedIn={loggedIn} name="Выйти" signOut={signOut} tip="signOut"/>
              <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick}  
              onAddPlace={handleAddPlaceClick} setSelectedCardOn={setSelectedCard} onImage={handleImageClick} card={selectedCard} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/> 
              <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} /> 
              <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} /> 
              <AddPlacePopup formName="form_add" formId="form_add" idButton="addButton" aria-Label="Добавить карточку"  buttonText="Создать" name="form_add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPicture}/> 
              <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>   
              <Footer /> 
            </Route>
            <Route path="*">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>
          <ProtectedRoute path="/" component={Main}/> 
          </Switch>
        </div>
      </body>
    </UserInfoContext.Provider>
    );
}

export default App;

