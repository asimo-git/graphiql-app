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

describe('RESTfullForm Component', () => {
  it('should render correctly', () => {
    render(<RESTfullForm />);
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByLabelText('Method')).toBeInTheDocument();
    expect(screen.getByLabelText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('should handle form submission and displays response section', async () => {
    render(<RESTfullForm />);

    fireEvent.mouseDown(screen.getByLabelText('Method'));
    const postOption = screen.getByRole('option', { name: 'POST' });
    fireEvent.click(postOption);
    const endpointInput = screen.getByLabelText('Endpoint URL');
    fireEvent.change(endpointInput, {
      target: { value: 'https://test.com/data' },
    });
    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(makeApiRequest).toHaveBeenNthCalledWith(1, {
        method: 'POST',
        endpoint: 'https://test.com/data',
        headers: [],
        jsonBody: undefined,
      });
    });
    await screen.findByText('Status: 200 OK');
  });

  it('should allow to add and remove headers', async () => {
    render(<RESTfullForm />);

    fireEvent.click(screen.getByText('Add Header Button'));
    expect(screen.getAllByLabelText('Header Key').length).toBe(1);
    expect(screen.getAllByLabelText('Header Value').length).toBe(1);

    fireEvent.click(screen.getByText('Remove'));
    expect(screen.queryByLabelText('Header Key')).toBeNull();
  });
});
