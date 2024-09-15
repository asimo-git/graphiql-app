import { useAuthenticated } from '@/app/utils/Auth';
import { render, screen } from '@testing-library/react';
import RESTfullPage from '@/app/RESTfull/restfull-page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../app/utils/Auth', () => ({
  useAuthenticated: jest.fn(),
}));

jest.mock('../../app/components/RESTfull-form/RESTfullform', () => {
  const MockRESTfullform = () => <div>RESTfullform</div>;
  MockRESTfullform.displayName = 'MockRESTfullform';
  return MockRESTfullform;
});

describe('RESTfullPage', () => {
  it('renders RESTfullPage if user is authenticated and not loading', () => {
    (useAuthenticated as jest.Mock).mockImplementation(() => ({
      user: { name: 'Test User' },
      isLoading: true,
    }));

    render(<RESTfullPage />);
    expect(screen.getByText('RESTfullform')).toBeInTheDocument();
  });

  it('does nothing if data is still loading', () => {
    (useAuthenticated as jest.Mock).mockImplementation(() => ({
      user: { name: 'Test User' },
      isLoading: false,
    }));

    const { container } = render(<RESTfullPage />);
    expect(container).toBeEmptyDOMElement();
  });

  it('redirects to home if not loading and user is null', async () => {
    (useAuthenticated as jest.Mock).mockImplementation(() => ({
      user: null,
      isLoading: false,
    }));

    render(<RESTfullPage />);

    expect(screen.queryByText('RESTfullform')).not.toBeInTheDocument();
  });
});
