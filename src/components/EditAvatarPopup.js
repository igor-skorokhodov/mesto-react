import React from 'react'
import {UserInfoContext} from '../contexts/CurrentUserContext.js'
import PopupWithForm from '../components/PopupWithForm.js'

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
    <PopupWithForm buttonText="Сохранить" name={props.name} isOpen={props.isOpen} onClose={props.onClose} title="Обновить аватар" submit={handleSubmit} click={handleSubmit}> 
      <input onChange={handleChangeAvatar} value={comment} className="popup__form popup__form-input-error popup__form_info_name-avatar" type="url" name="avatar" placeholder="Ввести url аватара" id="popup__form-error_name-avatar" required />
      <span className="popup__form-error popup__form-error_name-avatar"></span>
    </PopupWithForm>
    )}

export default EditAvatarPopup