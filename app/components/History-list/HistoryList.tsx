'use client';
import './History-List.scss';
import {
  GraphQLFormData,
  HistoryRequest,
  RestFormData,
} from '@/app/utils/types';
import { useEffect, useState } from 'react';
import Routers from '../../utils/routes';
import Link from 'next/link';

const HistoryList = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [historyRequests, setHistoryRequests] = useState<HistoryRequest[]>([]);

  useEffect(() => {
    const storedRequests: HistoryRequest[] =
      JSON.parse(localStorage.getItem('arrayRequests') as string) || [];

    // const arrayRequest: HistoryURL[] = storedRequests.map((request) => ({
    //   urlTo: request.url,
    //   ...decodeRequest(request),
    //   date: request.date,
    // }));

    if (storedRequests.length > 0) {
      setIsEmpty(false);
      storedRequests.sort((a, b) => Number(b.date) - Number(a.date));
    }

    setHistoryRequests(storedRequests);
  }, []);

  const handleClick = (formData: RestFormData | GraphQLFormData) => {
    localStorage.setItem('currentFormData', JSON.stringify(formData));
  };

  return (
    <div className="history__container">
      {isEmpty ? (
        <>
          <h1 className="history__title">
            You haven&#39;t executed any requests. It&#39;s empty here. Try:
          </h1>
          <Link href={Routers.RESTfull} className="history__link">
            REST Client
          </Link>
          <Link href={Routers.GraphiQL} className="history__link">
            GraphiQL Client
          </Link>
        </>
      ) : (
        <>
          <h1 className="history__title">History Requests</h1>
          <ul className="history__items">
            {historyRequests.map((request, index) => (
              <li className="history__item" key={request.url + index}>
                <span className="history__span">
                  {'method' in request.formData
                    ? request.formData.method
                    : 'GRAPHQL'}
                </span>
                <Link
                  href={request.url}
                  onClick={() => handleClick(request.formData)}
                  className="history__link"
                >
                  {request.formData.endpoint}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default HistoryList;
