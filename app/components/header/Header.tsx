// header
'use client';
import * as React from 'react';
import Switch from '@mui/material/Switch';
import Image from 'next/image';
import './Header.scss';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import i18n from './../../utils/local';
import { useCallback, useEffect, useState } from 'react';
import { logout } from '@/app/services/firebase';
import { useRouter } from 'next/navigation';
import { useAuthenticated } from '@/app/utils/Auth';

export default function Header() {
  const [checked, setChecked] = useState<boolean>(true);
  const { t } = useTranslation();
  const router = useRouter();
  const user = useAuthenticated();

  const [buttonText, setButtonText] = useState('Sign in');
  useEffect(() => {
    const translationKey = user ? 'Sign out' : 'Sign in';
    setButtonText(t(translationKey));
  }, [user]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newLanguage = event.target.checked ? 'ru' : 'en';
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', event.target.checked ? 'en' : 'ru');
      }
      i18n.changeLanguage(newLanguage);
      setChecked(event.target.checked);
    },
    []
  );
  const handleClick = () => {
    if (user) {
      logout();
    } else {
      router.push('/authentication');
    }
  };
  return (
    <header className="header">
      <div className="header__container box">
        <div className="header__logo">
          <Link href="./" />{' '}
          <Image width={50} height={50} alt="logo" src={'/logo.jpg'} />
          <span>{t('Soft')}</span>
        </div>
        <div className="header__switch">
          {' '}
          {checked ? 'EN' : 'RU'}
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
        <Button
          variant="contained"
          className="header__button button"
          onClick={handleClick}
        >
          {t(buttonText)}
        </Button>
        <Button
          variant="contained"
          href=""
          className={
            user ? 'header__button button unvisible' : ' header__button button'
          }
        >
          {t('Sign Up')}
        </Button>
      </div>
    </header>
  );
}
