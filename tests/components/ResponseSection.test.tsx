import React from 'react';
import { render, screen } from '@testing-library/react';
import ResponseSection from '@/app/components/response-section/ResponseSection';

describe('ResponseSection Component', () => {
  const mockResponseData = {
    status: 200,
    statusText: 'OK',
    body: { data: 'Test' },
  };

  it('should render without crashing when responseData is undefined', () => {
    render(<ResponseSection isLoading={false} responseData={undefined} />);
    expect(screen.getByText(/Response/)).toBeInTheDocument();
    expect(screen.getByText(/Status:/)).toHaveTextContent('Status:');
    expect(screen.getByText(/Body:/)).toBeInTheDocument();
  });

  it('should display the correct status and status text when responseData is provided', () => {
    render(
      <ResponseSection isLoading={false} responseData={mockResponseData} />
    );
    expect(screen.getByText(/Status:/)).toHaveTextContent('Status: 200 OK');
  });

  it('should display JSON view correctly when responseData is provided', () => {
    render(
      <ResponseSection isLoading={false} responseData={mockResponseData} />
    );
    expect(screen.getByText(/"Test"/)).toBeInTheDocument();
  });
});
