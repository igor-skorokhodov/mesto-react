import React from 'react'

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
      <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
        <div className="popup__container">
          <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть окно" id="close_button_edit"></button>
          <h3 className="popup__title">Новое место</h3>
          <form onSubmit={handleAddPlaceSubmit} className="popup__form-input" name="form_addCard" id="form_addCard" noValidate method="POST">
            <input onChange={handleAddNameCard} value={commentName} className="popup__form popup__form-input-error popup__form_info_name-picture" type="text" name="name_pic" placeholder="Название" id="popup__form-error_name-picture" minLength="2" maxLength="30" required/>
            <span className="popup__form-error popup__form-error_name-picture"></span>
            <input onChange={handleAddUrlCard} value={commentUrl} className="popup__form popup__form-input-error popup__form_info_url" type="url" name="link"  placeholder="Ссылка на картинку" id="popup__form-error_url" required/>
            <span className="popup__form-error popup__form-error_url"></span>
        </form>
        <button onClick={handleAddPlaceSubmit} type="submit" className="popup__add-button popup__submit" id="reductionSaveButton" aria-label="Сохранить">Сохранить</button>
        </div>
      </div>
    )}

export default EditAvatarPopup