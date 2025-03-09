import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  // Handle click on about link
  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('The Chronicle - A game to test your knowledge of historical timelines. Arrange events in chronological order from oldest to most recent. Created in 2025.');
  };
  
  // Handle click on contact link
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Contact us at: contact@playthechronicle.com');
  };
  
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 PlayTheChronicle.com | All rights reserved</p>
      <div className={styles.footerLinks}>
        <a href="#" onClick={handleAboutClick}>About</a>
        <a href="#" onClick={handleContactClick}>Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
