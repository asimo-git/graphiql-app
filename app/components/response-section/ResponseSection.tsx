'use client';
import React from 'react';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { ResponseRestData } from '@/app/utils/types';

const ResponseSection = ({
  responseData,
}: {
  responseData: ResponseRestData | undefined;
}) => {
  return (
    <div className="rest__container">
      <div className="rest__item item-title">
        <span>Response</span>{' '}
      </div>
      <div className="rest__item">
        <span>
          Status: {responseData?.status} {responseData?.statusText}
        </span>{' '}
      </div>
      <div className="rest__item">
        <span>Body:</span>{' '}
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
