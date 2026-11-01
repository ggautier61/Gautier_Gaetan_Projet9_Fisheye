"use client";

import { useState } from "react";
import styles from "../../page.module.css";
import ContactModal from "./ContactModal";

type ContactSectionProps = {
  photographerName: string;
};

export default function ContactSection({ photographerName }: ContactSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.contactButton}
        onClick={() => setIsOpen(true)}
      >
        Contactez-moi
      </button>

      <ContactModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        photographerName={photographerName}
      />
    </>
  );
}
