'use client';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { GraphQLFormData, ResponseData } from '@/app/utils/types';
import ResponseSection from '../response-section/ResponseSection';
// import VariablesSection from '../variables-section/VariablesSection';
import styles from './GraphQLForm.module.scss';
import { Editor } from '@monaco-editor/react';
import { useTranslation } from 'react-i18next';
import { makeGraphQLApiRequest } from '@/app/utils/api-interaction';

const GraphQLForm = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<ResponseData | undefined>(
    undefined
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GraphQLFormData>({
    defaultValues: {
      query: 'query {}',
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });

  const onSubmit = async (data: GraphQLFormData) => {
    setIsLoading(true);
    try {
      const response = await makeGraphQLApiRequest(data);
      setResponseData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.graph__container}>
      <h1>GraphQL Client</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('endpoint', { required: true })}
          sx={{ width: '80%', marginTop: '1rem' }}
          id="outlined-basic"
          label="Endpoint URL"
          variant="outlined"
        />
        <TextField
          {...register('sdlEndpoint')}
          sx={{ width: '80%', marginTop: '1rem' }}
          id="outlined-basic"
          label="SDL URL"
          variant="outlined"
        />
        <div className={styles.graph__item}>
          <span>Headers:</span>{' '}
          <Button
            variant="contained"
            onClick={() => append({ key: '', value: '' })}
          >
            {t('Add Header')}
          </Button>
        </div>

        <div className={styles.graph__header_key}>
          {fields.map((field, index) => (
            <div key={field.id} className="rest__item fullwidth">
              <TextField
                {...register(`headers.${index}.key`)}
                sx={{ width: '40%', marginRight: '2%', height: '100%' }}
                label="Header Key"
                variant="outlined"
                error={!!errors.headers?.[index]?.key}
                helperText={
                  errors.headers?.[index]?.key ? 'Key is required' : ''
                }
              />
              <TextField
                {...register(`headers.${index}.value`)}
                sx={{ width: '40%', marginRight: '2%', height: '100%' }}
                label="Header Value"
                variant="outlined"
                error={!!errors.headers?.[index]?.value}
                helperText={
                  errors.headers?.[index]?.value ? 'Value is required' : ''
                }
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

        <h2>Query:</h2>
        <Controller
          name="query"
          control={control}
          render={({ field }) => (
            <Editor
              height="300px"
              defaultLanguage="graphql"
              value={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
        <h2>Variables:</h2>
        {/* <VariablesSection control={control} register={register} /> */}
        <Button
          type="submit"
          variant="contained"
          className="rest__button button"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Send Request'}
        </Button>
      </form>
      <ResponseSection isLoading={isLoading} responseData={responseData} />
    </div>
  );
};

export default GraphQLForm;
