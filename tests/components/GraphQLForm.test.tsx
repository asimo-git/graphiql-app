import GraphiQLForm from '@/app/components/GraphQLForm/GraphQLForm';
import { makeGraphQLApiRequest } from '@/app/utils/api-interaction';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  usePathname: () => '/test-path',
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('@/app/utils/api-interaction', () => ({
  makeGraphQLApiRequest: jest.fn().mockResolvedValue({
    data: { response: 'Test Response' },
  }),
}));

jest.mock('@/app/utils/helpers', () => ({
  getAndRemoveDataFromLS: jest.fn().mockReturnValue({}),
  initialArray: jest.fn().mockReturnValue([]),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('GraphiQLForm Component', () => {
  beforeEach(() => {
    render(<GraphiQLForm />);
  });

  it('renders correctly', () => {
    expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
    expect(screen.getByLabelText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('handles form submission and displays response section', async () => {
    const endpointInput = screen.getByLabelText('Endpoint URL');
    fireEvent.change(endpointInput, {
      target: { value: 'https://graphql.org/swapi-graphql' },
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(makeGraphQLApiRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          endpoint: 'https://graphql.org/swapi-graphql',
        })
      );
    });
  });

  it('adds and removes headers correctly', () => {
    fireEvent.click(screen.getByText('Add Header'));
    expect(screen.getAllByLabelText('Header Key').length).toBe(1);
    fireEvent.click(screen.getByText('Remove'));
    expect(screen.queryByLabelText('Header Key')).toBeNull();
  });
});
