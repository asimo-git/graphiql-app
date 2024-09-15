import GraphQLPage from '@/app/GraphiQL/graphiql-page';
import { useAuthenticated } from '@/app/utils/Auth';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../app/utils/Auth', () => ({
  useAuthenticated: jest.fn(),
}));

jest.mock('../../app/components/GraphQLForm/GraphQLForm', () => {
  const MockGraphiQLForm = () => <div>GraphiQLForm</div>;
  MockGraphiQLForm.displayName = 'MockGraphiQLForm';
  return MockGraphiQLForm;
});

describe('GraphQLPage', () => {
  it('renders GraphQLPage if user is authenticated and not loading', () => {
    (useAuthenticated as jest.Mock).mockImplementation(() => ({
      user: { name: 'Test User' },
      isLoading: true,
    }));

    render(<GraphQLPage />);
    expect(screen.getByText('GraphiQLForm')).toBeInTheDocument();
  });

  it('does nothing if data is still loading', () => {
    (useAuthenticated as jest.Mock).mockImplementation(() => ({
      user: { name: 'Test User' },
      isLoading: false,
    }));

    const { container } = render(<GraphQLPage />);
    expect(container).toBeEmptyDOMElement();
  });

  it('redirects to home if not loading and user is null', async () => {
    (useAuthenticated as jest.Mock).mockImplementation(() => ({
      user: null,
      isLoading: false,
    }));

    render(<GraphQLPage />);

    expect(screen.queryByText('GraphiQLForm')).not.toBeInTheDocument();
  });
});
