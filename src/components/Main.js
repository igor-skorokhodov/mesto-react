import React from 'react'
import api from '../utils/Api.js'
import Avatarpen from '../images/pen_avatar.svg';




function Main (props) {
  const [userName, setUserName] = React.useState('1');
  const [userDescription, setUserDescription] = React.useState('2');
  const [userAvatar, setUserAvatar] = React.useState('3');


  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      });
  }, [])

    return (
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
    )}

export default Main