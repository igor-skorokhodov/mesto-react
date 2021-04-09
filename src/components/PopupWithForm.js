function PopupWithForm (props) {
    return (
      <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
        <div className="popup__container">
          <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть окно" id="close_button_edit"></button>
          <h3 className="popup__title">{props.title}</h3>
          <form className="popup__form-input" name={props.formName} id={props.formId} novalidate method="POST">
          {props.children}
          </form>
          <button type="submit" className="popup__add-button popup__submit" id={props.idButton} aria-label={props.ariaLabel}>{props.buttonText}</button>
        </div>
      </div>
    )}

export default PopupWithForm