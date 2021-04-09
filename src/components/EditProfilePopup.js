import React from 'react'
import {UserInfoContext} from '../contexts/CurrentUserContext.js'

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
      <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
        <div className="popup__container">
          <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть окно" id="close_button_edit"></button>
          <h3 className="popup__title">Редактировать профиль</h3>
          <form onSubmit={handleSubmit} className="popup__form-input" name="Редактировать профиль" id="form_reduction" noValidate method="POST">
              <input className="popup__form popup__form_info_name" value={name} onChange={handleChangeName} type="text" name="name" required id="popup__form-error_name" minLength="2" maxLength="40" placeholder="Имя"/>
              <span className="popup__form-error popup__form-error_name"></span>
              <input className="popup__form popup__form_info_job" value={description} onChange={handleChangeDesription} type="text" name="job" required minLength="2" maxLength="200" id="popup__form-error_job" placeholder="Профессия"/>
              <span className="popup__form-error popup__form-error_job"></span>
          </form>
          <button onClick={handleSubmit} type="submit" className="popup__add-button popup__submit" id="reductionSaveButton" aria-label="Сохранить">Сохранить</button>
        </div>
      </div>
    )}

export default EditProfilePopup