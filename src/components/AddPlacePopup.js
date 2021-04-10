import React from 'react'
import PopupWithForm from '../components/PopupWithForm.js'

function EditAvatarPopup (props) {
  const [nameCard, setNameCard] = React.useState('');
  const [urlCard, setUrlCard] = React.useState('');
  const [commentName, setCommentName] = React.useState('');
  const [commentUrl, setCommentUrl] = React.useState('');

  function handleAddNameCard(e) {
    setNameCard(e.target.value);
    setCommentName(e.target.value)
  }
  
  function handleAddUrlCard(e) {
    setUrlCard(e.target.value);
    setCommentUrl(e.target.value)
  }
  
  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace(nameCard, urlCard);
    setCommentName('');
    setCommentUrl('');
  }
    return (
    <PopupWithForm buttonText="Сохранить" name={props.name} isOpen={props.isOpen} onClose={props.onClose} title="Добавить место" submit={handleAddPlaceSubmit} click={handleAddPlaceSubmit}> 
      <input onChange={handleAddNameCard} value={commentName} className="popup__form popup__form-input-error popup__form_info_name-picture" type="text" name="name_pic" placeholder="Название" id="popup__form-error_name-picture" minLength="2" maxLength="30" required/>
      <span className="popup__form-error popup__form-error_name-picture"></span>
      <input onChange={handleAddUrlCard} value={commentUrl} className="popup__form popup__form-input-error popup__form_info_url" type="url" name="link"  placeholder="Ссылка на картинку" id="popup__form-error_url" required/>
      <span className="popup__form-error popup__form-error_url"></span>
    </PopupWithForm>
    )}

export default EditAvatarPopup