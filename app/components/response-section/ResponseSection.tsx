'use client';
import React from 'react';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { ResponseRestData } from '@/app/utils/types';
import './ResponseSection.scss';
import { useTranslation } from 'react-i18next';

const ResponseSection = ({
  responseData,
}: {
  responseData: ResponseRestData | undefined;
}) => {
  const { t } = useTranslation();
  return (
    <div className="rest__container">
      <div className="rest__item item-title">
        <span>{t('Response')}</span>{' '}
      </div>
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
    </div>
  );
};

export default ResponseSection;
