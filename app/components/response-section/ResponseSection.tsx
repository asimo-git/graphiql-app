'use client';
import React from 'react';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { ResponseData } from '@/app/utils/types';
import './ResponseSection.scss';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ResponseSection = ({
  responseData,
  isLoading,
}: {
  responseData: ResponseData | undefined;
  isLoading: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div className="rest__container">
      <div className="rest__item item-title">
        <span>{t('Response')}</span>{' '}
      </div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="rest__item">
            <span>
              {t('Status')}: {responseData?.status} {responseData?.statusText}
            </span>{' '}
          </div>
          <div className="rest__item response-body">
            <span>{t('Body')}:</span>{' '}
            <JsonView
              data={responseData?.body || {}}
              shouldExpandNode={allExpanded}
              style={defaultStyles}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ResponseSection;
