import React from 'react';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>The Chronicle</h1>
      <p className={styles.tagline}>Test your knowledge of historical timelines</p>
    </header>
  );
};

export default Header;
