import '../index.css'
import Header from '../components/Header.js'
import Main from '../components/Main.js'
import Footer from '../components/Footer.js'
import React from 'react';
import Card from '../components/Card.js'
import api from '../utils/Api.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(''); 
 
  React.useEffect(() => {
    api.getAllCards()
      .then((data) => {
        setCards(data);
      })
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

function closeAllPopups() {
  setIsEditAvatarPopupOpen(false);
  setIsEditProfilePopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setSelectedCard('');
}

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

  return (
<body className="background">
  <div className="page" onClick={handleClick}>
  {document.addEventListener("keydown", handleOnKeyDown)}
   <Header />
   <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} 
   onAddPlace={handleAddPlaceClick} />
    <div className="elements">
    {cards.map((card) => { 
        return (
        <>
        <div key={card.id}> 
        <Card name={card.name} url={card.link} likes={card.likes.length} onCardClick={setSelectedCard}/>
        </div>
        </>
        )})}
    </div>   
<PopupWithForm name="form_changeavatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
<PopupWithForm name="form_redaction" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
<PopupWithForm name="form_add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
<ImagePopup card={selectedCard} onClose={closeAllPopups}/>
<Footer />
  </div>
</body>
  );
}

export default App;

