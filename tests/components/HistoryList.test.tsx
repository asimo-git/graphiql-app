import HistoryList from '@/app/components/History-list/HistoryList';
import { HistoryRequest } from '@/app/utils/types';
import { render, screen, fireEvent } from '@testing-library/react';

const mockLocalStorage = (items: HistoryRequest[]) => {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify(items));
  Storage.prototype.setItem = jest.fn();
};

interface MockLinkProps {
  children: React.ReactNode;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

jest.mock('next/link', () => {
  const MockLink = ({ children, href, onClick }: MockLinkProps) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('HistoryList', () => {
  it('should display empty state when no history is available', () => {
    mockLocalStorage([]);
    render(<HistoryList />);
    expect(
      screen.getByText(
        "You haven't executed any requests. It's empty here. Try:"
      )
    ).toBeInTheDocument();
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
  });

  it('should display history items when available', () => {
    const requests: HistoryRequest[] = [
      {
        url: '/rest-url',
        date: '1609459200000',
        formData: {
          method: 'GET',
          endpoint: 'https://api.example.com',
          headers: [],
        },
      },
      {
        url: '/graphql-url',
        date: '1609488000000',
        formData: {
          endpoint: 'https://api.graphql.com',
          query: 'test',
          variables: '',
          headers: [],
        },
      },
    ];
    mockLocalStorage(requests);
    render(<HistoryList />);
    expect(screen.getByText('History Requests')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('GRAPHQL')).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com')).toBeInTheDocument();
    expect(screen.getByText('https://api.graphql.com')).toBeInTheDocument();
  });

  it('should handle click on history item to set current form data', () => {
    const requests: HistoryRequest[] = [
      {
        url: '/rest-url',
        date: '1609459200000',
        formData: {
          method: 'GET',
          endpoint: 'https://api.example.com',
          headers: [],
        },
      },
    ];
    mockLocalStorage(requests);
    render(<HistoryList />);
    fireEvent.click(screen.getByText('https://api.example.com'));
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      'currentFormData',
      JSON.stringify(requests[0].formData)
    );
  });
});
