
function PopupWithForm (props) {
    return (
        <div onk className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
        <div className="popup__container">
          <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть окно" id="close_button_edit"></button>
          <h3 className="popup__title">{props.title}</h3>
          <form className="popup__form-input" name="form_redaction" id={props.name} noValidate method="POST">
            <input className="popup__form popup__form_info_name" type="text" name="name" required id="popup__form-error_name" minLength="2" maxLength="40" placeholder="Имя"/>
            <span className="popup__form-error popup__form-error_name"></span>
            <input className="popup__form popup__form_info_job" type="text" name="job" required minLength="2" maxLength="200" id="popup__form-error_job" placeholder="Профессия"/>
            <span className="popup__form-error popup__form-error_job"></span>
            <button type="submit" className="popup__submit-button popup__submit" aria-label="Сохранить информацию в профиле">Сохранить</button>
          </form>
        </div>
      </div>
    )}

export default PopupWithForm