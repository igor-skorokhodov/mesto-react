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

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(''); 
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({name:'', about:'', avatar:'', id:''});   
  const [cards, setCards] = React.useState([]);
  
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

  return (
    <UserInfoContext.Provider value={currentUser}>
      <body className="background">
        <div className="page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} 
            onAddPlace={handleAddPlaceClick} setSelectedCardOn={setSelectedCard} onImage={handleImageClick} card={selectedCard} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <AddPlacePopup formName="form_add" formId="form_add" idButton="addButton" aria-Label="Добавить карточку"  buttonText="Создать" name="form_add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPicture}/>
          <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />  
          <Footer />
        </div>
      </body>
    </UserInfoContext.Provider>
    );
}

export default App;

