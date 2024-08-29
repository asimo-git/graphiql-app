import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const RESTfullForm = () => {
  const [Method, setMethod] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setMethod(event.target.value as string);
  };
  return (
    <main className="main">
      <div className="rest__container">
        <h1 className="rest__title">REST Client</h1>
        <Box>
          <FormControl sx={{ width: '20%', marginRight: '10%' }}>
            <InputLabel id="demo-simple-select-label">Method</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Method}
              label="Method"
              onChange={handleChange}
            >
              <MenuItem value={10}>GET</MenuItem>
              <MenuItem value={20}>POST</MenuItem>
              <MenuItem value={30}>PUT</MenuItem>
              <MenuItem value={40}>PATCH</MenuItem>
              <MenuItem value={50}>DELETE</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ width: '70%' }}
            id="outlined-basic"
            label="Endpoint URL"
            variant="outlined"
          />
        </Box>
      </div>
    </main>
  );
};

export default RESTfullForm;
