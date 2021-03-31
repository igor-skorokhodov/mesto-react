import '../index.css'
import Header from '../components/Header.js'
import Main from '../components/Main.js'
import Footer from '../components/Footer.js'
import React from 'react'
import PopupWithForm from '../components/PopupWithForm.js'
import ImagePopup from '../components/ImagePopup.js'


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(''); 
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  
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

  return (
<body className="background">
  <div className="page">
<Header />
<Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} 
   onAddPlace={handleAddPlaceClick} setSelectedCardOn={setSelectedCard} onImage={handleImageClick}/>
<PopupWithForm idButton="avatarSaveButton" aria-Label="Обновить аватар"  buttonText="Сохранить" name="form_changeavatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
  <form class="popup__form-input" name="form_changeavatar" id="form_changeavatar" novalidate>
    <input class="popup__form popup__form-input-error popup__form_info_name-avatar" type="url" name="avatar" placeholder="Ввести url аватара" id="popup__form-error_name-avatar" required />
    <span class="popup__form-error popup__form-error_name-avatar"></span>
  </form>
</PopupWithForm>
<PopupWithForm idButton="redactionButton" aria-Label="Сохранить информацию в профиле"  buttonText="Сохранить" name="form_redaction" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
  <form class="popup__form-input" name="form_redaction" id="form_redaction" novalidate method="POST">
    <input class="popup__form popup__form_info_name" type="text" name="name" required id="popup__form-error_name" minlength="2" maxlength="40" placeholder="Имя"/>
    <span class="popup__form-error popup__form-error_name"></span>
    <input class="popup__form popup__form_info_job" type="text" name="job" required minlength="2" maxlength="200" id="popup__form-error_job" placeholder="Профессия"/>
    <span class="popup__form-error popup__form-error_job"></span>
  </form>
</PopupWithForm>
<PopupWithForm idButton="addButton" aria-Label="Добавить карточку"  buttonText="Создать" name="form_add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
  <form class="popup__form-input" name="form_add" id="form_add" novalidate>
    <input class="popup__form popup__form-input-error popup__form_info_name-picture" type="text" name="name_pic" placeholder="Название" id="popup__form-error_name-picture" minlength="2" maxlength="30" required/>
    <span class="popup__form-error popup__form-error_name-picture"></span>
    <input class="popup__form popup__form-input-error popup__form_info_url" type="url" name="link"  placeholder="Ссылка на картинку" id="popup__form-error_url" required/>
    <span class="popup__form-error popup__form-error_url"></span>
  </form>
</PopupWithForm>
<ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />  
<Footer />
  </div>
</body>
  );
}

export default App;

