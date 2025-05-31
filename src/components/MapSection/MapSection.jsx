import React from 'react';

const MapSection = () => {
  return (
    <div className="w-100 rounded overflow-hidden" style={{ height: '400px' }}>
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.9699408155086!2d-4.037173825911917!3d5.684915794112361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ebfe1a2c5bd5%3A0x59aa87b9e4d865be!2sRue%20Nimlin%20Fax-Clark%2C%20Abidjan%2C%20C%C3%B4te%20d'Ivoire!5e0!3m2!1sen!2sus!4v1714400000000!5m2!1sen!2sus"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="SmartView Télé Location"
        ></iframe>
    </div>
  );
};

export default MapSection;
