import React from 'react'
import {UserInfoContext} from '../contexts/CurrentUserContext.js'
import PopupWithForm from '../components/PopupWithForm.js'

function EditProfilePopup (props) {
  const currentUser = React.useContext(UserInfoContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDesription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

React.useEffect(() => {
  setName(currentUser.name);
  setDescription(currentUser.about);
  }, [currentUser]); 

    return (
      <PopupWithForm buttonText="Сохранить" name={props.name} isOpen={props.isOpen} onClose={props.onClose} title="Редактировать профиль" submit={handleSubmit} click={handleSubmit}> 
        <input className="popup__form popup__form_info_name" value={name} onChange={handleChangeName} type="text" name="name" required id="popup__form-error_name" minLength="2" maxLength="40" placeholder="Имя"/>
        <span className="popup__form-error popup__form-error_name"></span>
        <input className="popup__form popup__form_info_job" value={description} onChange={handleChangeDesription} type="text" name="job" required minLength="2" maxLength="200" id="popup__form-error_job" placeholder="Профессия"/>
        <span className="popup__form-error popup__form-error_job"></span>
      </PopupWithForm>
   )}

export default EditProfilePopup