import React from 'react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { RestFormData } from '@/app/utils/types';
import { useTranslation } from 'react-i18next';

const VariablesSection = ({
  control,
  register,
}: {
  control: Control<RestFormData>;
  register: UseFormRegister<RestFormData>;
}) => {
  const { t } = useTranslation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variables',
  });

  return (
    <>
      <div className="rest__item">
        <span>{t('Variables')}</span>
        <Button
          variant="contained"
          onClick={() => append({ key: '', value: '' })}
        >
          {t('Add Variable')}
        </Button>
      </div>

      <div className="rest__item">
        {fields.map((field, index) => (
          <div key={field.id} className="rest__item fullwidth">
            <TextField
              {...register(`variables.${index}.key`)}
              sx={{ width: '40%', marginRight: '2%', height: '100%' }}
              label={t('Variable Key')}
              variant="outlined"
            />
            <TextField
              {...register(`variables.${index}.value`)}
              sx={{ width: '40%', marginRight: '2%', height: '100%' }}
              label={t('Variable Value')}
              variant="outlined"
            />
            <Button
              variant="contained"
              onClick={() => remove(index)}
              sx={{ width: '16%' }}
            >
              {t('Remove')}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default VariablesSection;
