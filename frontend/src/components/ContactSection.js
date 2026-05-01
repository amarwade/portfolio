import { useState } from "react";
import { sendContactMessage } from "../services/contactService";

const initialFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactSection() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState("idle");

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      await sendContactMessage(formData);
      setFormData(initialFormState);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section section-cv reveal-on-scroll">
      <h2 className="cv-section-title">Contact</h2>
      <p>Si vous souhaitez échanger davantage sur mon profil ou discuter d’une opportunité, je vous invite à me contacter via le formulaire prévu à cet effet.</p>

      <form className="contact-form" onSubmit={onSubmit}>
        <input
          required
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={onChange}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChange}
        />
        <input
          required
          name="subject"
          placeholder="Sujet"
          value={formData.subject}
          onChange={onChange}
        />
        <textarea
          required
          name="message"
          placeholder="Message"
          rows={5}
          value={formData.message}
          onChange={onChange}
        />
        <button className="button primary" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Envoi..." : "Envoyer"}
        </button>
      </form>

      {status === "success" ? <p>Message envoye avec succes.</p> : null}
      {status === "error" ? <p>Erreur lors de l'envoi. Reessaie plus tard.</p> : null}
    </section>
  );
}

export default ContactSection;
