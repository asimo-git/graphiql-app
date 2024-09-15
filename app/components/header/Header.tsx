'use client';
import * as React from 'react';
import Switch from '@mui/material/Switch';
import Image from 'next/image';
import './Header.scss';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import i18n from './../../utils/local';

import { useCallback, useEffect, useState, useRef } from 'react';
import { logout, auth } from '@/app/services/firebase';
import { useRouter } from 'next/navigation';
import { useAuthenticated } from '@/app/utils/Auth';
import Routes from '@/app/utils/routes';

export default function Header() {
  const [checked, setChecked] = useState<boolean>(true);
  const { t } = useTranslation();
  const router = useRouter();

  const { user, isLoading } = useAuthenticated();

  const [buttonText, setButtonText] = useState('Sign in');

  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 150) {
          setIsSticky(true);
        }
        if (window.scrollY === 0) {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const translationKey = user ? 'Sign out' : 'Sign in';
    setButtonText(translationKey);
  }, [user]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newLanguage = event.target.checked ? 'ru' : 'en';
      i18n.changeLanguage(newLanguage);
      setChecked(event.target.checked);
    },
    []
  );
  const handleClick = () => {
    if (isLoading) {
      if (user) {
        logout(auth);
      } else {
        router.push(Routes.Authentication);
      }
    }
  };
  return (
    <>
      {' '}
      {isLoading && (
        <header ref={headerRef} className={`${isSticky ? 'sticky' : 'header'}`}>
          <div className="header__contain">
            <div className="header__logo">
              <Link href="/">
                <Image width={50} height={50} alt="logo" src={'/logo.png'} />
                <span>{t('Soft')}</span>
              </Link>
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
              href={Routes.Registration}
              className={
                user
                  ? 'header__button button unvisible'
                  : ' header__button button'
              }
            >
              {t('Sign Up')}
            </Button>
          </div>
        </header>
      )}
    </>
  );
}
