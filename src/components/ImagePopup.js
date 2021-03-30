function ImagePopup (props) {

    return (
        <div id="picture" className={`popup ${props.card ? 'popup_active' : ''}`}>
        <div className="popup__container popup__container-picture">
          <button onClick={props.onClose} className="popup__close-button popup__close-button_position" type="button" aria-label="Закрыть окно" id="close_button_picture"></button>
          <img className="popup__picture" src={props.card.url} alt="Развернутая картика" />
          <p className="popup__sign">{props.card.name}</p>
        </div>
      </div>
    )}

export default ImagePopup