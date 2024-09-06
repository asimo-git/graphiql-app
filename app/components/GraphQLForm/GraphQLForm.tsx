'use client';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { JsonEditor, JsonData } from 'json-edit-react';
import { useState } from 'react';
import styles from './GraphQLForm.module.scss';

const GraphQLForm = () => {
  const [jsonDataQuery, setJsonDataQuery] = useState<JsonData>({
    key1: 'value1',
    key2: 'value2',
  });
  const [jsonDataVariables, setJsonDataVariables] = useState<JsonData>({
    key1: 'value1',
    key2: 'value2',
  });

  const handleSetJsonDataQuery = (data: JsonData) => {
    setJsonDataQuery(data);
  };
  const handleSetJsonDataVariables = (data: JsonData) => {
    setJsonDataVariables(data);
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
      <JsonEditor
        data={jsonDataVariables}
        setData={handleSetJsonDataVariables}
      />
    </div>
  );
};

export default GraphQLForm;
