import React from 'react'
import api from '../utils/api.js'
import Avatarpen from '../images/pen_avatar.svg'
import Card from '../components/Card.js'

function Main (props) {
  const [userName, setUserName] = React.useState('1');
  const [userDescription, setUserDescription] = React.useState('2');
  const [userAvatar, setUserAvatar] = React.useState('3');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(`упс, возникла ошибка! ${err}}`);
        api.getAllCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(`упс, возникла ошибка! ${err}}`);
  })}, [])})

  React.useEffect(() => {
    api.getAllCards()
      .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(`упс, возникла ошибка! ${err}}`);
  })}, [])

    return (
  <>
  <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
          <img className="profile__avatar" onClick={props.onEditAvatar} src={userAvatar} alt="аватарка"/>
          <img className="profile__avatar-pen" onClick={props.onEditAvatar} src={Avatarpen} alt="картинка смены профиля"/>
          </div>
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="Редактировать профиль"></button>
          <p className="profile__profession">{userDescription}</p>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace} type="submit" aria-label="Добавить место"></button>
      </section>      
  </main>
     <div className="elements">
     {cards.map((card) => { 
         return (
         <>
         <div key={card._id}> 
         <Card name={card.name} url={card.link} likes={card.likes.length} onCardClick={props.setSelectedCardOn} clickOnImage={props.onImage}/>
         </div>
         </>
         )})}
     </div>   
</>)}

export default Main