'use client';
import './History-List.scss';
import { HistoryRequest, HistoryURL } from '@/app/utils/types';
import { decodeRequest } from '@/app/utils/helpers';
import { useEffect, useState } from 'react';
import Routers from '../../utils/routes';
import Link from 'next/link';

const HistoryList = () => {
  const [emptyArray, setEmptyArray] = useState(true);

  const arrayLocalStorage: HistoryRequest[] =
    JSON.parse(localStorage.getItem('arrayRequests') as string) || [];

  const arrayRequest: HistoryURL[] = arrayLocalStorage.map((el) => ({
    urlTo: el.url,
    ...decodeRequest(el),
    date: el.date,
  }));

  useEffect(() => {
    if (arrayLocalStorage.length === 0) {
      setEmptyArray(false);
    }
  }, [arrayLocalStorage.length]);

  return (
    <div className="history__container">
      {emptyArray && (
        <>
          <h1 className="history__title"> History Requests </h1>
          <ul className="history__items">
            {arrayRequest
              .sort((a, b) => Number(b.date) - Number(a.date))
              .map((request, index) => (
                <li className="history__item" key={index}>
                  <span className="history__span">{request.method}</span>
                  <Link
                    href={{ pathname: '/RESTfull', query: request.urlTo }}
                    className="history__link"
                  >
                    {request.encodedUrl}
                  </Link>
                </li>
              ))}
          </ul>
        </>
      )}
      {!emptyArray && (
        <>
          <h1 className="history__title">
            You haven&#39;t executed any requests. It&#39;s empty here. Try
          </h1>
          <Link href={Routers.RESTfull} className="history__link">
            REST Client
          </Link>
          <Link href={Routers.GraphiQL} className="history__link">
            GraphiQL Client
          </Link>
        </>
      )}
    </div>
  );
};

export default HistoryList;
