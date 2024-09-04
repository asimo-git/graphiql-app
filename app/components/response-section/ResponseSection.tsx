'use client';
import React from 'react';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { ResponseRestData } from '@/app/utils/types';
import './ResponseSection.scss';
import { CircularProgress } from '@mui/material';

const ResponseSection = ({
  responseData,
  isLoading,
}: {
  responseData: ResponseRestData | undefined;
  isLoading: boolean;
}) => {
  return (
    <div className="rest__container">
      <div className="rest__item item-title">
        <span>Response</span>{' '}
      </div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="rest__item">
            <span>
              Status: {responseData?.status} {responseData?.statusText}
            </span>{' '}
          </div>
          <div className="rest__item response-body">
            <span>Body:</span>{' '}
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
