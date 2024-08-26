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
import { auth, logout } from '@/app/services/firebase';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [checked, setChecked] = React.useState(true);
  const { t } = useTranslation();
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    {
      if (!checked) {
        i18n.changeLanguage('ru');
      } else {
        i18n.changeLanguage('en');
      }
    }
    setChecked(event.target.checked);
  };
  const handleClick = () => {
    logout(auth);
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLogined', 'false');
      localStorage.setItem('name', '');
    }
    router.push('/');
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
          href="https://rs.school/"
          className="header__button button"
        >
          {t('Sign in')}
        </Button>
        <Button
          variant="contained"
          className="header__button button"
          onClick={handleClick}
        >
          {t('Log Out')}
        </Button>
      </div>
    </header>
  );
}
