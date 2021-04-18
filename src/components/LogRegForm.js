function LogRegForm (props) {
    return (
    <div className="logreg">
      <div className="logreg__container">
        <h3 className="logreg__title">{props.title}</h3>
        <form onSubmit={props.submit} className="logreg__form" name="logreg__form" id="logreg__form" noValidate method="POST">
        {props.children}
        </form>
        <button onClick={props.click} type="submit" className="logreg__button" id={props.idButton} aria-label={props.ariaLabel}>{props.buttonText}</button>
      </div>
    </div>
    )}

export default LogRegForm