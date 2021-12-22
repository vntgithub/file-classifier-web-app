import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FileTypeSelectExtract(props) {
    const {labels, setFileType, fileType} = props

    const handleChange = (event) => {
        setFileType(event.target.value);
    };

    return (
    <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">File type</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fileType}
            label="File type"
            onChange={handleChange}
        >
            {labels.map(item => <MenuItem value={item}>{item}</MenuItem>)}
        </Select>
        </FormControl>
    </Box>
    );
}