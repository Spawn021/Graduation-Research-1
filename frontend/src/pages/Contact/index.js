import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import iconEmail from '~/assets/images/icons/email.png';
import iconPhone from '~/assets/images/icons/tel-1.png';
import iconAddress from '~/assets/images/icons/location.png';
import imageS2 from '~/assets/images/s2.png';

const cx = classNames.bind(styles);

function Contact() {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
   });

   const [errors, setErrors] = useState({});
   const [isSubmitted, setIsSubmitted] = useState(false);
   const validateForm = () => {
      let isValid = true;
      const newErrors = {};

      Object.keys(formData).forEach((key) => {
         if (!formData[key].trim()) {
            newErrors[key] = 'The field is required';
            isValid = false;
         }
      });

      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = 'The e-mail address entered is invalid';
         isValid = false;
      }

      setErrors(newErrors);
      return isValid;
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (validateForm()) {
         // Handle form submission logic here (e.g., send data to server)
         console.log('Form submitted successfully!');
         setIsSubmitted(true);
      } else {
         console.log('One or more fields have an error. Please check and try again.');
      }
   };

   const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
      setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('contact-container')}>
            <div className={cx('row')}>
               <div className={cx('item-box')}>
                  <img src={iconEmail} alt="email" />
                  <p>chien.trinhvan@hust.edu.vn</p>
               </div>
               <div className={cx('item-box')}>
                  <img src={iconPhone} alt="phone" />
                  <p>0123456789</p>
               </div>
               <div className={cx('item-box')}>
                  <img src={iconAddress} alt="address" />
                  <p>Phòng 408, Tòa B1 - SoICT, HUST</p>
               </div>
            </div>
            <div className={cx('row')}>
               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1862.3536621650976!2d105.84580757110551!3d21.004365998288698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac76827aaaab%3A0xf0580eb2ff0e1b64!2zVHLGsOG7nW5nIEPDtG5nIE5naOG7hyBUaMO0bmcgVGluIFRydXnhu4FuIFRow7RuZyAtIMSQ4bqhaSBI4buNYyBCw6FjaCBraG9hIEjDoCBu4buZaQ!5e0!3m2!1svi!2s!4v1706299227352!5m2!1svi!2s"
                  width="100%"
                  height="450"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>
            <div className={cx('row')}>
               <img className={cx('img-contact')} src={imageS2} alt="s2" />
               <div className={cx('input-form')}>
                  <div className={cx('input-box')}>
                     <label className={cx('text-form')} htmlFor="name">
                        Your name
                     </label>
                     <br />
                     <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter name..."
                        className={cx('input', { errorr: errors.name })}
                     />
                     {errors.name && <p className={cx('error')}>{errors.name}</p>}
                  </div>
                  <div className={cx('input-box')}>
                     <label className={cx('text-form')} htmlFor="email">
                        Your email
                     </label>
                     <br />
                     <input
                        type="text"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email..."
                        className={cx('input', { errorr: errors.email })}
                     />
                     {errors.email && <p className={cx('error')}>{errors.email}</p>}
                  </div>
                  <div className={cx('input-box')}>
                     <label className={cx('text-form')} htmlFor="subject">
                        Subject
                     </label>
                     <br />
                     <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter subject..."
                        className={cx('input', { errorr: errors.subject })}
                     />
                     {errors.subject && <p className={cx('error')}>{errors.subject}</p>}
                  </div>
                  <div className={cx('input-box')}>
                     <label className={cx('text-form')} htmlFor="message">
                        Your message (optional)
                     </label>
                     <br />
                     <textarea
                        type="text"
                        id="message"
                        placeholder="Write something..."
                        style={{ height: 200 + 'px' }}
                     />
                  </div>
                  <button className={cx('btn-submit')} onClick={handleSubmit}>
                     Submit
                  </button>
                  {isSubmitted && <p className={cx('success-submit')}>Form submitted successfully!</p>}
                  {Object.values(errors).some((error) => !!error) && (
                     <p className={cx('error-submit')}>One or more fields have an error. Please check and try again!</p>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Contact;
