import React, { useContext, useEffect } from 'react';
import Store from '../componenets/Store';
import '../style/Contacts.css';
import Shkal from '../componenets/Shkal';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import {getAllinfo, getAlluser} from '../http/contactApi'

const Contacts = observer(() => {
  const {contact} = useContext(Context)

  useEffect ( ()=> {
    getAllinfo().then(data => contact.setInfocon(data));
    getAlluser().then(data => contact.setUsercon(data));
  }, [])
  return (
    <>
    <div className="header">
    <div className="title-block"> 
          <h1>Контакты</h1>
          <p className="pod">На связи 24/7</p>
        </div>
        </div>
      <div className="contacts-container">
      {contact.infocon.map((item, index) => (
            <div className="contact-block">
            <h2>{item.name}</h2>
            <div className="contact-details">
              <div>
                <p><strong>Адрес:</strong></p> 
                <p>{item.adress}</p>
              </div>
              <div>
                <p><strong>Телефон:</strong></p>
                <p><a href={`tel:+${item.telephone}`} className='color pod'>{item.telephone}</a></p>
              </div>
              <div>
                <p><strong>Почта:</strong></p>
                <p><a href={`mailto:${item.email}`}>{item.email}</a></p>
              </div>
            </div>
          </div>
          ))}
        

        <div class="partnership-form">
        <h2>Желаете стать нашим партнером?</h2>
  <form>
    <div class="form-container">
      <div class="form-fields">
        <div class="form-group">
          <label for="name">Имя Отчество</label>
          <input type="text" id="name" />
        </div>
        <div class="form-group">
          <label for="phone">Телефон</label>
          <input type="tel" id="phone" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" />
        </div>
      </div>
      <button type="submit" class="submit-button">Отправить</button>
    </div>
    <p>Наш менеджер свяжется с Вами в ближайшее время.</p>
  </form>
</div>
      </div>
      <div className="employee-cards">        
          <div className="card-container">
          {contact.usercon.map((user, index) => (
            <div className="employee-card">
            <img src={process.env.REACT_APP_API_URL + user.img} alt="Employee Name" className='employee-img'/>
            <div className="employee-info">
              <h3>{user.name}</h3>
              <p className='pod'>{user.post}</p>
            </div>
          </div>
          ))}
            
          </div>
        </div>
     
      <Store /> 
      <Shkal/> 
    </>
  );
});

export default Contacts;
