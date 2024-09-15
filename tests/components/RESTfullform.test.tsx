import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RESTfullForm from '@/app/components/RESTfull-form/RESTfullform';
import { makeApiRequest } from '@/app/utils/api-interaction';

jest.mock('@/app/utils/api-interaction', () => ({
  makeApiRequest: jest.fn().mockResolvedValue({
    status: 200,
    statusText: 'OK',
    body: { data: 'Test' },
  }),
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/path',
  useSearchParams: () => {
    const searchParams = new URLSearchParams();
    searchParams.set('key', 'value');
    return [searchParams, jest.fn()];
  },
}));

describe('RESTfullForm Component', () => {
  it('should render correctly', () => {
    render(<RESTfullForm />);
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByLabelText('Method')).toBeInTheDocument();
    expect(screen.getByLabelText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should handle form submission and displays response section', async () => {
    render(<RESTfullForm />);

    // fireEvent.mouseDown(screen.getByLabelText('Method'));
    // const postOption = screen.getByRole('option', { name: 'POST' });
    // fireEvent.click(postOption);
    const endpointInput = screen.getByLabelText('Endpoint URL');
    fireEvent.change(endpointInput, {
      target: { value: 'https://test.com/data' },
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(makeApiRequest).toHaveBeenNthCalledWith(1, {
        method: 'GET',
        endpoint: 'https://test.com/data',
        headers: [],
        jsonBody: undefined,
      });
    });
    await screen.findByText('Status: 200 OK');
  });

  it('should allow to add and remove headers', async () => {
    render(<RESTfullForm />);

    fireEvent.click(screen.getByText('Add Header'));
    expect(screen.getAllByLabelText('Header Key').length).toBe(1);
    expect(screen.getAllByLabelText('Header Value').length).toBe(1);

    fireEvent.click(screen.getByText('Remove'));
    expect(screen.queryByLabelText('Header Key')).toBeNull();
  });
});
