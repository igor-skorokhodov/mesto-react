import React from 'react'



function Card (props) {

  function handleClick() {
    props.onCardClick({url: props.url, name: props.name});
  }  

    return (
    <>
    <article className="element">
           <div>
             <img className="element__picture" src={props.url} onClick={handleClick} alt={props.name} />
             <button className="element__trash" type="button" aria-label="Удалить карточку"></button>
           </div>
           <div className="element__container"> 
             <h3 className="element__title">{props.name}</h3>
             <div className="element__container_likes">
               <button className="element__heart" type="button" aria-label="Лайк"></button>
               <p className="element__likes">{props.likes}</p>
             </div>
           </div>
         </article>
    </>) 
}

export default Card