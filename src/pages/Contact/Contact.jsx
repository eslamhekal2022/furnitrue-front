import React, { useState } from 'react';
import './contact.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import WhatsAppButton from '../whatsApp/WhatsaAPP.jsx';

const Contact = () => {
  const [formData, setFormData] = useState({ message: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   const {data}=await axios.post(`${process.env.REACT_APP_API_URL}/addContact`,formData,{
    headers:{
        token:localStorage.getItem("token")
    }
   })
if(data.success){
    toast.success("good-Is-Flower")
}
} catch (error) {
setSuccessMessage('Server error.');
}
};

return (
    <div className="contact-container">
      <h2>Contact Us / Complaint</h2>
      <p>If you have any questions, feel free to reach out to us!</p>
<div className="contact-soical">
<WhatsAppButton/>
<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
<i className="fa-brands fa-facebook social-icon facebook"></i>

</a>
</div>
      <form className="contact-form" onSubmit={handleSubmit}>
       
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            placeholder="Type your message..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>

      {successMessage && <p className="message">{successMessage}</p>}
    </div>
  );
};

export default Contact;
