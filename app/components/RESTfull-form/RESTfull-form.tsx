'use client';
import React, { ReactElement } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './RESTfull.scss';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { JsonEditor } from 'json-edit-react';
import { useEffect, useState } from 'react';
import { METHODS } from '@/app/utils/constants';
import Editor from './TextEditor';

const RESTfullForm = () => {
  const [Method, setMethod] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setMethod(event.target.value as string);
  };

  const [jsonData, setJsonData] = useState({});

  const [chooseField, setchooseField] = useState(true);

  useEffect(() => setJsonData(jsonData), [jsonData]);

  const [elementContent, setElementContent] = useState<ReactElement | null>(
    null
  );

  const [txtContent, settxtContent] = useState<ReactElement | null>(null);

  useEffect(() => {
    const element = <JsonEditor data={jsonData} setData={setJsonData} />;
    if (element) {
      setElementContent(element);
    }
  }, [jsonData, setJsonData]);

  useEffect(() => {
    const element = <Editor />;
    if (element) {
      settxtContent(element);
    }
  }, [chooseField]);

  return (
    <div className="rest__container">
      <h1 className="rest__title">REST Client</h1>
      <form className="rest__form">
        <div className="rest__item">
          <Box className="rest__box">
            <FormControl sx={{ width: '20%', marginRight: '10%' }}>
              <InputLabel id="demo-simple-select-label">Method</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Method}
                label="Method"
                onChange={handleChange}
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
              sx={{ width: '50%', marginRight: '10%' }}
              id="outlined-basic"
              label="Endpoint URL"
              variant="outlined"
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
            onClick={() => {}}
          >
            Add Header Button
          </Button>
        </div>
        <div className="rest__item fullwidth">
          {' '}
          <TextField
            sx={{ width: '45%' }}
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
          {chooseField ? elementContent : txtContent}
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
      <div className="rest__item item-title">
        <span>Response</span>{' '}
      </div>
      <div className="rest__item">
        <span>Status:</span>{' '}
      </div>
      <div className="rest__item">
        <span>Body:</span>{' '}
        <JsonView
          data={jsonData}
          shouldExpandNode={allExpanded}
          style={defaultStyles}
        />
      </div>
    </div>
  );
};

export default RESTfullForm;
