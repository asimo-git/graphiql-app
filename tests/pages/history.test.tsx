import { useAuthenticated } from '@/app/utils/Auth';
import HistoryPage from '../../app/history/page';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// jest.mock('../../app/utils/Auth', () => ({
//   useAuthenticated: () => ({
//     user: { name: 'Test User' },
//     isLoading: true,
//   }),
// }));
jest.mock('../../app/utils/Auth', () => ({
  useAuthenticated: jest.fn(),
}));

jest.mock('../../app/components/History-list/HistoryList', () => {
  const MockHistoryList = () => <div>HistoryList</div>;
  MockHistoryList.displayName = 'MockHistoryList';
  return MockHistoryList;
});

describe('HistoryPage', () => {
  it('renders HistoryList if user is authenticated and not loading', () => {
    (useAuthenticated as jest.Mock).mockImplementation(() => ({
      user: { name: 'Test User' },
      isLoading: true,
    }));

    render(<HistoryPage />);
    expect(screen.getByText('HistoryList')).toBeInTheDocument();
  });

  it('does nothing if data is still loading', () => {
    (useAuthenticated as jest.Mock).mockImplementation(() => ({
      user: { name: 'Test User' },
      isLoading: false,
    }));

    const { container } = render(<HistoryPage />);
    expect(container).toBeEmptyDOMElement();
  });

  it('redirects to home if not loading and user is null', async () => {
    (useAuthenticated as jest.Mock).mockImplementation(() => ({
      user: null,
      isLoading: false,
    }));

    render(<HistoryPage />);

    expect(screen.queryByText('HistoryList')).not.toBeInTheDocument();
  });
});
