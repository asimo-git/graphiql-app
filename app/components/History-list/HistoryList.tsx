'use client';
import './History-List.scss';
import { HistoryRequest, HistoryURL } from '@/app/utils/types';
import { decodeRequest } from '@/app/utils/helpers';
import { useEffect, useState } from 'react';
import Routers from '../../utils/routes';
import Link from 'next/link';

const HistoryList = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [historyRequests, setHistoryRequests] = useState<HistoryURL[]>([]);

  useEffect(() => {
    const storedRequests: HistoryRequest[] =
      JSON.parse(localStorage.getItem('arrayRequests') as string) || [];

    const arrayRequest: HistoryURL[] = storedRequests.map((request) => ({
      urlTo: request.url,
      ...decodeRequest(request),
      date: request.date,
    }));

    if (arrayRequest.length > 0) {
      setIsEmpty(false);
      arrayRequest.sort((a, b) => Number(b.date) - Number(a.date));
    }

    setHistoryRequests(arrayRequest);
  }, []);

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
              <li className="history__item" key={request.urlTo + index}>
                <span className="history__span">{request.method}</span>
                <Link href={request.urlTo} className="history__link">
                  {request.encodedUrl}
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
