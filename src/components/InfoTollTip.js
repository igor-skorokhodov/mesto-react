import React from 'react'
import Galka from '../images/galka.svg'
import Krestik from '../images/krestik.svg'
import { useHistory } from 'react-router-dom';


function InfoToolTip (props) {
  const history = useHistory();

  function closeInfoToolTip() {
    props.setOpen(false);
  }

  React.useEffect(() => {
    function handleClick (evt) {
      if(evt.target.classList.contains('infotooltip_active')) {
          props.setOpen(false);
        if (props.registeredIn) {
          history.push('/sign-in');
        }
      }
    }
        
    function handleOnKeyDown (evt) {
      if(evt.key === 'Escape') {
        props.setOpen(false);
        if (props.registeredIn) {
          history.push('/sign-in');
          }
      }
    }
    
    document.addEventListener('keydown', handleOnKeyDown);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keydown', handleOnKeyDown);
      document.removeEventListener('click', handleClick);
      };
  });

    return (
        <div className={`infotooltip ${props.isOpen ? 'infotooltip_active' : ''}`}>
        <div className="infotooltip__container">
            <button className="popup__close-button popup__close-button_position-tool" onClick={closeInfoToolTip} type="button" aria-label="Закрыть окно" id="close_button_edit"></button>
          <img className="infotooltip__pic" src={props.registeredIn ? Galka : Krestik }></img>
          <p className="infotooltip__text">{props.registeredIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
        </div>
      </div>
    )}

export default InfoToolTip