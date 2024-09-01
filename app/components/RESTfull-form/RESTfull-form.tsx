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
import ResponseSection from '../response-section/response-section';

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
    ),
    [control]
  );

  const onSubmit = async (data: RestFormData) => {
    const response = await makeApiRequest(data);
    setResponseData(response);
  };

  return (
    <div className="rest__container">
      <h1 className="rest__title">REST Client</h1>
      <form className="rest__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="rest__item">
          <Box className="rest__box">
            <FormControl sx={{ width: '20%', marginRight: '10%' }}>
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
              sx={{ width: '50%', marginRight: '10%' }}
              id="outlined-basic"
              label="Endpoint URL"
              variant="outlined"
              error={!!errors.endpoint}
              helperText={errors.endpoint ? 'Endpoint is required' : ''}
            />

            <Button
              variant="contained"
              className="rest__button button"
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
            className="rest__button button"
            onClick={() => append({ key: '', value: '' })}
          >
            Add Header Button
          </Button>
        </div>

        <div className="rest__item fullwidth">
          {fields.map((field, index) => (
            <div key={field.id} className="rest__item fullwidth">
              <TextField
                {...register(`headers.${index}.key`)}
                sx={{ width: '45%' }}
                label="Header Key"
                variant="outlined"
                error={!!errors.headers?.[index]?.key}
                helperText={
                  errors.headers?.[index]?.key ? 'Key is required' : ''
                }
              />
              <TextField
                {...register(`headers.${index}.value`)}
                sx={{ width: '45%' }}
                label="Header Value"
                variant="outlined"
                error={!!errors.headers?.[index]?.value}
                helperText={
                  errors.headers?.[index]?.value ? 'Value is required' : ''
                }
              />
              <Button variant="contained" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
        <div className="rest__item">
          <span>Body: </span>
          <Button
            sx={{ marginRight: '1%' }}
            variant="contained"
            className="rest__button button"
            onClick={() => {
              setchooseField(true);
            }}
          >
            JSON
          </Button>
          <Button
            variant="contained"
            className="rest__button button"
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
              {...register('textBody')}
              sx={{ width: '50%', marginRight: '10%' }}
              id="outlined-basic"
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
