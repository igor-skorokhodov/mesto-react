import React from 'react'
import {UserInfoContext} from '../contexts/CurrentUserContext.js'

function EditAvatarPopup (props) {
  const [avatar, setAvatar] = React.useState(' ');
  const [comment, setComment] = React.useState(' ');
  const [url, isUrl] = React.useState(false);
  const currentUser = React.useContext(UserInfoContext);
  const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
    setComment(e.target.value);
    if (pattern.test(avatar)) {
      isUrl(true);}
    else {
      isUrl(false);
    }
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatar);
  }

React.useEffect(() => {
  setAvatar(currentUser.avatar);
    setComment('');
  }, [currentUser]); 

    return (
      <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
        <div className="popup__container">
          <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть окно" id="close_button_edit"></button>
          <h3 className="popup__title">Обновить аватар</h3>
          <form onSubmit={handleSubmit} className="popup__form-input" name="form_changeavatar" id="form_changeavatar" noValidate method="POST">
            <input onChange={handleChangeAvatar} value={comment} className="popup__form popup__form-input-error popup__form_info_name-avatar" type="url" name="avatar" placeholder="Ввести url аватара" id="popup__form-error_name-avatar" required />
            <span className="popup__form-error popup__form-error_name-avatar">{!url ? 'Введите корректный url' : '' }</span>
        </form>
        <button onClick={handleSubmit} type="submit" className="popup__add-button popup__submit" id="reductionSaveButton" aria-label="Сохранить">Сохранить</button>
        </div>
      </div>
    )}

export default EditAvatarPopup