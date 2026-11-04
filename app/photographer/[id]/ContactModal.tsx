"use client";

import { useEffect } from "react";
import "./ContactModal.css";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  photographerName: string;
};

export default function ContactModal({
  photographerName,
  isOpen,
  onClose,
}: ContactModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  console.log({
    Prénom: formData.get("firstname"),
    Nom: formData.get("lastname"),
    Email: formData.get("email"),
    Message: formData.get("message"),
  });
}

  if (!isOpen) {
    return null;
  }

  return (
    <div id="contact-modal">
      <div
        className="contact-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="contact-dialog"
      >
        <button
          type="button"
          className="contact-close"
          onClick={onClose}
          aria-label="Fermer"
        >
          &times;
        </button>

        <h2 id="contact-modal-title" className="contact-title">
          Contactez-moi
          <br />
          {photographerName}
        </h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-field">
            <label htmlFor="contact-firstname">Prénom</label>
            <input
              id="contact-firstname"
              name="firstname"
              type="text"
              required
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-lastname">Nom</label>
            <input id="contact-lastname" name="lastname" type="text" required />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" required />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-message">Votre message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
            />
          </div>

          <button type="submit" className="contact-submit">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
