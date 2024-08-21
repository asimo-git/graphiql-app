// header
'use client';
import * as React from 'react';
import Switch from '@mui/material/Switch';
import Image from 'next/image';
import './Header.scss';
import { Button } from '@mui/material';
export default function Header() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="header">
      <div className="header__container">
        <div>
          {' '}
          <Image
            width={150}
            height={50}
            alt="logo"
            src={'./rs_school_js.svg'}
          />
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
        <Button variant="contained" href="https://rs.school/">
          Sign in
        </Button>
      </div>
    </div>
  );
}
