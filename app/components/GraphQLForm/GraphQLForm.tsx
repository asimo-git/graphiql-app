'use client';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { JsonEditor, JsonData } from 'json-edit-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ResponseRestData, RestFormData } from '@/app/utils/types';
import ResponseSection from '../response-section/ResponseSection';
import VariablesSection from '../variables-section/VariablesSection';
import styles from './GraphQLForm.module.scss';

const GraphQLForm = () => {
  const [jsonDataQuery, setJsonDataQuery] = useState<JsonData>({
    key1: 'value1',
    key2: 'value2',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<
    ResponseRestData | undefined
  >(undefined);

  const handleSetJsonDataQuery = (data: JsonData) => {
    setJsonDataQuery(data);
  };

  const {
    register,
    control,
    // formState: { errors },
  } = useForm<RestFormData>();

  const handleQuerySubmit = async () => {
    setIsLoading(true);
    try {
      // const response = await fetch('');
      setResponseData(undefined);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.graph__container}>
      <h1>GraphQL Client</h1>
      <TextField
        sx={{ width: '80%', marginTop: '1rem' }}
        id="outlined-basic"
        label="Endpoint URL"
        variant="outlined"
      />
      <TextField
        sx={{ width: '80%', marginTop: '1rem' }}
        id="outlined-basic"
        label="SDL URL"
        variant="outlined"
      />
      <div className={styles.graph__item}>
        <span>Headers:</span>{' '}
        <Button
          variant="contained"
          className="rest__button button"
          onClick={() => {}}
        >
          Add Header Button
        </Button>
      </div>
      <div className={styles.graph__header_key}>
        <TextField
          sx={{ width: '45%', marginRight: '10%' }}
          id="outlined-basic"
          label="Header Key"
          variant="outlined"
        />{' '}
        <TextField
          sx={{ width: '45%' }}
          id="outlined-basic"
          label="Header Value"
          variant="outlined"
        />
      </div>
      <h2>Query:</h2>
      <JsonEditor data={jsonDataQuery} setData={handleSetJsonDataQuery} />
      <h2>Variables:</h2>
      <VariablesSection control={control} register={register} />
      <Button
        variant="contained"
        className="rest__button button"
        onClick={handleQuerySubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Send Request'}
      </Button>
      <ResponseSection isLoading={isLoading} responseData={responseData} />
    </div>
  );
};

export default GraphQLForm;
