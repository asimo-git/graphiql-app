'use client';
import Link from 'next/link';
import './History-List.scss';

const HistoryList = () => {
  //let arrayRequest = localStorage.get('requests');
  const arrayRequest = [
    { url: 'http:www.google.com', date: Date.now() },
    { url: 'http:www.yandex.ru', date: Date.now() },
  ];

  return (
    <div className="history__container">
      <ul className="history__items">
        {arrayRequest
          .sort((a, b) => b.date - a.date)
          .map((request, index) => (
            <li className="history__item" key={index}>
              <Link href={request.url} className="history__name">
                {request.url}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HistoryList;
