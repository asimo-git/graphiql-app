import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { RestFormData } from '@/app/utils/types';
import VariablesSection from '@/app/components/variables-section/VariablesSection';

describe('VariablesSection Component', () => {
  const renderWithFormProvider = () => {
    const Wrapper = () => {
      const methods = useForm<RestFormData>({
        defaultValues: {
          variables: [{ key: '', value: '' }],
        },
      });

      return (
        <FormProvider {...methods}>
          <VariablesSection
            control={methods.control}
            register={methods.register}
          />
        </FormProvider>
      );
    };

    return render(<Wrapper />);
  };

  it('should render the component correctly', () => {
    renderWithFormProvider();

    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByText('Add Variable')).toBeInTheDocument();
  });

  it('should add a new variable when "Add Variable" button is clicked', () => {
    renderWithFormProvider();

    fireEvent.click(screen.getByText('Add Variable'));

    expect(screen.getAllByLabelText('Variable Key')).toHaveLength(2);
    expect(screen.getAllByLabelText('Variable Value')).toHaveLength(2);
  });

  it('should remove a variable when "Remove" button is clicked', () => {
    renderWithFormProvider();

    fireEvent.click(screen.getByText('Add Variable'));

    const removeButtons = screen.getAllByText('Remove');
    expect(removeButtons).toHaveLength(2);

    fireEvent.click(removeButtons[0]);

    expect(screen.getAllByLabelText('Variable Key')).toHaveLength(1);
    expect(screen.getAllByLabelText('Variable Value')).toHaveLength(1);
  });
});
