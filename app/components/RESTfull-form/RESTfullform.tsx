'use client';
import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './RESTfull.scss';
import 'react-json-view-lite/dist/index.css';
import { JsonEditor } from 'json-edit-react';
import { useState } from 'react';
import { METHODS } from '@/app/utils/constants';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ResponseRestData, RestFormData } from '@/app/utils/types';
import { makeApiRequest } from '@/app/utils/api-interaction';
import ResponseSection from '../response-section/ResponseSection';
import VariablesSection from '../variables-section/VariablesSection';
import { parseWithVariables } from '@/app/utils/helpers';

const RESTfullForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RestFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });

  const [chooseField, setchooseField] = useState(true);
  const [responseData, setResponseData] = useState<
    ResponseRestData | undefined
  >(undefined);

  const jsonEditorElement = useMemo(
    () => (
      <div className="body__editor json__editor">
        <Controller
          control={control}
          name="jsonBody"
          render={({ field: { onChange, value } }) => (
            <JsonEditor
              data={value || {}}
              setData={(newValue) => onChange(newValue)}
            />
          )}
        />
      </div>
    ),
    [control]
  );

  const onSubmit = async (data: RestFormData) => {
    const { variables, jsonBody, ...rest } = data;

    let requestData = {
      ...rest,
      jsonBody: jsonBody ? JSON.stringify(jsonBody) : undefined,
    };
    console.log(variables);

    if (variables) {
      requestData = parseWithVariables(requestData, variables);
    }
    console.log(requestData);
    const response = await makeApiRequest(requestData);
    setResponseData(response);
  };

  return (
    <div className="rest__container">
      <h1 className="rest__title">REST Client</h1>
      <form className="rest__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="rest__item">
          <Box className="rest__box fullwidth">
            <FormControl sx={{ width: '20%', marginRight: '2%' }}>
              <InputLabel id="demo-simple-select-label">Method</InputLabel>
              <Select
                {...register('method')}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={METHODS.GET}
                label="Method"
              >
                <MenuItem value={METHODS.GET}>GET</MenuItem>
                <MenuItem value={METHODS.POST}>POST</MenuItem>
                <MenuItem value={METHODS.PUT}>PUT</MenuItem>
                <MenuItem value={METHODS.PATCH}>PATCH</MenuItem>
                <MenuItem value={METHODS.DELETE}>DELETE</MenuItem>
                <MenuItem value={METHODS.HEAD}>HEAD</MenuItem>
                <MenuItem value={METHODS.OPTIONS}>OPTIONS</MenuItem>
              </Select>
            </FormControl>
            <TextField
              {...register('endpoint', { required: true })}
              sx={{ width: '60%', marginRight: '2%' }}
              id="outlined-basic"
              label="Endpoint URL"
              variant="outlined"
              error={!!errors.endpoint}
              helperText={errors.endpoint ? 'Endpoint is required' : ''}
            />

            <Button
              variant="contained"
              sx={{ width: '16%' }}
              type="submit"
              onClick={() => {}}
            >
              Send
            </Button>
          </Box>
        </div>

        <div className="rest__item">
          <span>Headers:</span>{' '}
          <Button
            variant="contained"
            onClick={() => append({ key: '', value: '' })}
          >
            Add Header
          </Button>
        </div>

        <div className="rest__item">
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
                Remove
              </Button>
            </div>
          ))}
        </div>

        <VariablesSection control={control} register={register} />

        <div className="rest__item">
          <span>Body: </span>
          <Button
            sx={{ margin: '2%', width: '16%' }}
            variant="contained"
            onClick={() => {
              setchooseField(true);
            }}
          >
            JSON
          </Button>
          <Button
            sx={{ margin: '2%', width: '16%' }}
            variant="contained"
            onClick={() => {
              setchooseField(false);
            }}
          >
            TXT
          </Button>
          {chooseField ? (
            jsonEditorElement
          ) : (
            <TextField
              sx={{ minHeight: '100px' }}
              className="body__editor"
              {...register('textBody')}
              id="outlined-basic"
              multiline
              label="Body"
              variant="outlined"
            />
          )}
          {chooseField ? (
            <div className="rest__point">
              for work with item json: the first icon copy to clipboard, the
              second edit, the third delete
            </div>
          ) : (
            ''
          )}
        </div>
      </form>
      <ResponseSection responseData={responseData} />
    </div>
  );
};

export default RESTfullForm;
