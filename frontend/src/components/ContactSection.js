import { useState, useEffect } from "react";
import { sendContactMessage } from "../services/contactService";

const initialFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const initialErrors = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactSection() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Le nom est requis";
        } else if (value.trim().length < 2) {
          error = "Le nom doit contenir au moins 2 caractères";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "L'email est requis";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Veuillez entrer une adresse email valide";
        }
        break;
      case "subject":
        if (!value.trim()) {
          error = "Le sujet est requis";
        } else if (value.trim().length < 3) {
          error = "Le sujet doit contenir au moins 3 caractères";
        }
        break;
      case "message":
        if (!value.trim()) {
          error = "Le message est requis";
        } else if (value.trim().length < 10) {
          error = "Le message doit contenir au moins 10 caractères";
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const onBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    return isValid;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus("loading");

    try {
      await sendContactMessage(formData);
      setFormData(initialFormState);
      setErrors(initialErrors);
      setTouched({});
      setStatus("success");
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="section section-cv reveal-on-scroll">
      <h2 className="cv-section-title">Contact</h2>
      <p>Si vous souhaitez échanger davantage sur mon profil ou discuter d'une opportunité, je vous invite à me contacter via le formulaire prévu à cet effet.</p>

      <form className="contact-form enhanced" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            required
            name="name"
            placeholder="Nom complet"
            value={formData.name}
            onChange={onChange}
            onBlur={onBlur}
            className={`form-input ${touched.name && errors.name ? 'error' : ''} ${touched.name && !errors.name && formData.name ? 'success' : ''}`}
          />
          {touched.name && errors.name && <span className="error-message">{errors.name}</span>}
          {touched.name && !errors.name && formData.name && <span className="success-icon">✓</span>}
        </div>

        <div className="form-group">
          <input
            required
            type="email"
            name="email"
            placeholder="Adresse email"
            value={formData.email}
            onChange={onChange}
            onBlur={onBlur}
            className={`form-input ${touched.email && errors.email ? 'error' : ''} ${touched.email && !errors.email && formData.email ? 'success' : ''}`}
          />
          {touched.email && errors.email && <span className="error-message">{errors.email}</span>}
          {touched.email && !errors.email && formData.email && <span className="success-icon">✓</span>}
        </div>

        <div className="form-group">
          <input
            required
            name="subject"
            placeholder="Sujet du message"
            value={formData.subject}
            onChange={onChange}
            onBlur={onBlur}
            className={`form-input ${touched.subject && errors.subject ? 'error' : ''} ${touched.subject && !errors.subject && formData.subject ? 'success' : ''}`}
          />
          {touched.subject && errors.subject && <span className="error-message">{errors.subject}</span>}
          {touched.subject && !errors.subject && formData.subject && <span className="success-icon">✓</span>}
        </div>

        <div className="form-group">
          <textarea
            required
            name="message"
            placeholder="Votre message..."
            rows={5}
            value={formData.message}
            onChange={onChange}
            onBlur={onBlur}
            className={`form-input ${touched.message && errors.message ? 'error' : ''} ${touched.message && !errors.message && formData.message ? 'success' : ''}`}
          />
          {touched.message && errors.message && <span className="error-message">{errors.message}</span>}
          {touched.message && !errors.message && formData.message && <span className="success-icon">✓</span>}
        </div>

        <button 
          className="submit-button" 
          type="submit" 
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <span className="loading-spinner"></span>
              Envoi en cours...
            </>
          ) : (
            "Envoyer le message"
          )}
        </button>
      </form>

      {status === "success" && (
        <div className="form-status success">
          <span className="status-icon">✓</span>
          <p>Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.</p>
        </div>
      )}
      
      {status === "error" && (
        <div className="form-status error">
          <span className="status-icon">✗</span>
          <p>Une erreur est survenue lors de l'envoi. Veuillez réessayer plus tard.</p>
        </div>
      )}
    </section>
  );
}

export default ContactSection;
