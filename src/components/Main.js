import React from 'react'
import Avatarpen from '../images/pen_avatar.svg'
import Card from '../components/Card.js'
import {UserInfoContext} from '../contexts/CurrentUserContext.js'

function Main (props) {
  const currentUser = React.useContext(UserInfoContext);

    return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__container">
            <div className="profile__avatar-container">
              <img className="profile__avatar" onClick={props.onEditAvatar} src={currentUser.avatar} alt="аватарка"/>
              <img className="profile__avatar-pen" onClick={props.onEditAvatar} src={Avatarpen} alt="картинка смены профиля"/>
            </div>
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="Редактировать профиль"></button>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" onClick={props.onAddPlace} type="submit" aria-label="Добавить место"></button>
        </section>      
      </main>
      <>
    <div className="elements">
     {props.cards.map((card) => { 
         return (
         <Card key={card._id} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} name={card.name} url={card.link} likes={card.likes.length} likesArr={card.likes} onCardClick={props.setSelectedCardOn} clickOnImage={props.onImage} idCard={card._id} cardOwner={card.owner._id}/>
         )})}
     </div>
     </>   
    </>)}

export default Main