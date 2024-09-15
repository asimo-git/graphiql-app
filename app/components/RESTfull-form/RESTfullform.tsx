'use client';
import React, { useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './RESTfull.scss';
import 'react-json-view-lite/dist/index.css';
import { useState } from 'react';
import { FIELD_NAMES, METHODS } from '@/app/utils/constants';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ResponseData, RestFormData } from '@/app/utils/types';
import { makeApiRequest } from '@/app/utils/api-interaction';
import ResponseSection from '../response-section/ResponseSection';
import VariablesSection from '../variables-section/VariablesSection';
import { getAndRemoveDataFromLS, initialArray } from '@/app/utils/helpers';
import { parseWithVariables } from '@/app/utils/helpers';
import { useTranslation } from 'react-i18next';
import { updateURL } from '@/app/utils/update-url';
import { usePathname, useSearchParams } from 'next/navigation';
import { Editor } from '@monaco-editor/react';

const RESTfullForm = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const savedFormData: RestFormData | null = useMemo(() => {
    return getAndRemoveDataFromLS('currentFormData');
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<RestFormData>({
    defaultValues: {
      headers: savedFormData?.headers || [],
      variables: savedFormData?.variables || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });

  const [chooseField, setchooseField] = useState(true);
  const [responseData, setResponseData] = useState<ResponseData | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [arrayUrl, setArrayUrl] = useState(initialArray());

  const jsonEditorElement = useMemo(
    () => (
      <div className="body__editor json__editor">
        <Controller
          control={control}
          name="jsonBody"
          render={({ field }) => (
            <Editor
              height="300px"
              defaultLanguage="json"
              defaultValue={savedFormData?.jsonBody || ''}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              onMount={(editor) => {
                editor.onDidBlurEditorWidget(() =>
                  updateURL(FIELD_NAMES.BODY, editor.getValue())
                );
              }}
            />
          )}
        />
      </div>
    ),
    [control]
  );

  useEffect(() => {
    localStorage.setItem('arrayRequests', JSON.stringify(arrayUrl));
  }, [arrayUrl]);

  const onSubmit = async (data: RestFormData) => {
    setIsLoading(true);
    const { variables, ...rest } = data;

    let requestData = rest;

    if (variables) {
      requestData = parseWithVariables(requestData, variables);
    }

    setArrayUrl([
      ...arrayUrl,
      {
        url: `${pathname}?${searchParams.toString()}`,
        date: Date.now().toString(),
        formData: data,
      },
    ]);

    const response = await makeApiRequest(requestData);
    setResponseData(response);

    setIsLoading(false);
  };

  const { t } = useTranslation();

  return (
    <div className="rest__container">
      <h1 className="rest__title">{t('REST Client')}</h1>
      <form className="rest__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="rest__item">
          <Box className="rest__box fullwidth">
            <FormControl sx={{ width: '20%', marginRight: '2%' }}>
              <InputLabel id="demo-simple-select-label">
                {t('Method')}
              </InputLabel>
              <Select
                {...register('method')}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={savedFormData?.method || METHODS.GET}
                onChange={(event) => {
                  updateURL(FIELD_NAMES.METHOD, event.target.value);
                }}
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
              label={t('Endpoint URL')}
              variant="outlined"
              defaultValue={savedFormData?.endpoint || ''}
              error={!!errors.endpoint}
              helperText={errors.endpoint ? 'Endpoint is required' : ''}
              onBlur={(event) =>
                updateURL(FIELD_NAMES.ENDPOINT, event.target.value)
              }
            />

            <Button
              variant="contained"
              sx={{ width: '200px' }}
              type="submit"
              onClick={() => {}}
            >
              {t('Submit')}
            </Button>
          </Box>
        </div>

        <div className="rest__item">
          <span>{t('Headers')} </span>
          <Button
            variant="contained"
            sx={{ width: '200px', marginLeft: '2%' }}
            onClick={() => append({ key: '', value: '' })}
          >
            {t('Add Header')}
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
                onBlur={(event) => {
                  setValue(`headers.${index}.key`, event.target.value);
                  trigger(`headers.${index}.key`).then((valid) => {
                    const updatedFields = getValues('headers');
                    if (valid) updateURL(FIELD_NAMES.HEADERS, updatedFields);
                  });
                }}
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
                onBlur={(event) => {
                  setValue(`headers.${index}.value`, event.target.value);
                  trigger(`headers.${index}.value`).then((valid) => {
                    const updatedFields = getValues('headers');
                    if (valid) updateURL(FIELD_NAMES.HEADERS, updatedFields);
                  });
                }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  remove(index);
                  updateURL(FIELD_NAMES.HEADERS, fields);
                }}
                sx={{ width: '200px' }}
              >
                {t('Remove')}
              </Button>
            </div>
          ))}
        </div>

        <VariablesSection control={control} register={register} />

        <div className="rest__item">
          <span>{t('Body')} </span>
          <Button
            sx={{ margin: '2%', width: '200px' }}
            variant="contained"
            onClick={() => {
              setchooseField(true);
            }}
          >
            JSON
          </Button>
          <Button
            sx={{ margin: '2%', width: '200px' }}
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
              defaultValue={savedFormData?.textBody || ''}
              label="Body"
              variant="outlined"
              onBlur={(event) =>
                updateURL(FIELD_NAMES.BODY, event.target.value)
              }
            />
          )}
        </div>
      </form>
      <ResponseSection isLoading={isLoading} responseData={responseData} />
    </div>
  );
};

export default RESTfullForm;
