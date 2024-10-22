import React, { useContext, useState, useEffect } from "react";
import '../style/footer.css';
import LogoScrolled from '../img/podval.gif';
import Ls from '../img/человек 500.svg';
import tg from '../img/телеграм.svg';
import vk from '../img/Вконтакте.svg';
import { Link, useLocation } from 'react-router-dom';
import privacyPolicy from '../file/Политика асатаг.pdf';
import LoginForm from '../page/Form'; 
import { Context } from '..';
import {getAll} from '../http/footerApi'
import { observer } from "mobx-react-lite";

const Footer = observer (() => {
  const {footer} = useContext(Context)

  useEffect ( ()=> {
    getAll().then(data => footer.setFooter(data))
  }, []) 

  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const handleLoginClick = () => {
    setIsLoginFormOpen(true); // Show the login form
};

const closeLoginForm = () => {
    setIsLoginFormOpen(false); // Hide the login form
};

const item = footer.footer[0];
  return (
    <>
    <footer className="footer">
      <div className="left">
      <img src={LogoScrolled} alt="Logo" className="logo" />
 
        
        <div className="contact-info">
          <p>{item?.telephoneOne}</p>
          <p>{item?.telephoneTwo}</p>
          <p>{item?.Email}</p>
        
        </div>
        <p className="copyright">
         <span> © 2024 ASATAG. Все права защищены.</span> &emsp;&emsp;&emsp;&emsp; <a href={privacyPolicy} download>
            Политика обработки персональных данных
          </a>
        </p>
      </div>

      <div className="right">
        <ul className="links">
        <Link to='/delivery'>Доставка</Link>
        <Link to='/news'>Новости</Link>
        <Link to='/contacts'>Контакты</Link>
       
          
        </ul>
        <p>&emsp;</p>
        <p>&emsp;</p>
        <p>&emsp;</p>
        <p>&emsp;</p>
        <div className="social-media">
        <span className="timefoot">{item?.time}</span> &emsp;&emsp;&emsp;&emsp;
          <img src={Ls} alt="Social" className="social-icon"  onClick={handleLoginClick} />
          <a href="https://t.me/+RmKsDFeoLSk3NjU6" target="_blank" rel="noopener noreferrer">
        <img src={tg} alt="Telegram" className="social-icon" />
    </a>
          <a href="https://vk.com/asatag" target="_blank" rel="noopener noreferrer">
        <img src={vk} alt="VK" className="social-icon" />
    </a>
        </div>
      </div> 
    </footer>
     {isLoginFormOpen && <LoginForm onClose={closeLoginForm} />}
     </>
  );
});

export default Footer;
