import React from 'react';
import styles from './styles.module.css';

export const Header = ({ title }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>{title}</h1>
    </header>
  );
};