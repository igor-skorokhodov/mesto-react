import React from 'react'
import {UserInfoContext} from '../contexts/CurrentUserContext.js'

function Card (props) {
  const currentUser = React.useContext(UserInfoContext);
  
function handleClick() {
    props.onCardClick({url: props.url, name: props.name});
    props.clickOnImage();
  }  

function handleLikeClick () {
  props.onCardLike(props);
}

function handleDeleteClick () {
  props.onCardDelete(props);
}
  // Определяем, являемся ли мы владельцем текущей карточки
const isOwn = props.cardOwner === currentUser.id;
// Создаём переменную, которую после зададим в `className` для кнопки удаления
const cardDeleteButtonClassName = (`element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`); 

// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = props.likesArr.some(i => i._id === currentUser.id);
// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = (`element__heart ${isLiked ? 'element__heart_anabled' : ''}`); 
 

    return (
    
    <article className="element">
           <div>
             <img className="element__picture" src={props.url} onClick={handleClick} alt={props.name} />
             <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" aria-label="Удалить карточку"></button>
           </div>
           <div className="element__container"> 
             <h3 className="element__title">{props.name}</h3>
             <div className="element__container_likes">
               <button className={cardLikeButtonClassName} onClick={handleLikeClick}  type="button" aria-label="Лайк"></button>
               <p className="element__likes">{props.likes}</p>
             </div>
           </div>
         </article>
    ) 
}

export default Card