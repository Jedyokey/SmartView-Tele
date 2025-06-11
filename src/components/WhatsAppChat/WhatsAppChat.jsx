import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTVContext } from '../../context/TVContext';
import './WhatsAppChat.css';

const WhatsAppChat = () => {
  const { translations } = useTVContext();
  const phoneNumber = "+2250575965968";
  
  // Get the translated message or use default
  const whatsappMessage = translations?.whatsapp?.message || 
    "Hello! I'm interested in your Smart TVs. Can you help me find what I'm looking for?";
  
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <a 
      href={whatsappLink} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-chat"
      aria-label={translations?.whatsapp?.ariaLabel || "Chat on WhatsApp"}
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppChat;
