import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppChat.css';

const WhatsAppChat = () => {
  const phoneNumber = "+2250575965968";
  const whatsappMessage = "Hello! I'm interested in your Smart TVs. Can you help me find what I'm looking for?";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-chat">
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppChat;
