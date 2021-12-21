import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Scenario(props) {
    const {scenario, setScenario} = props

    const handleChange = (event) => {
        setScenario(event.target.value);
    };

    return (
    <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Scenario</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={scenario}
            label="Scenario"
            onChange={handleChange}
        >
            <MenuItem value={1}>Scenario 1: All 75 classes</MenuItem>
            <MenuItem value={2}>Scenario 2: Use-specific; 11</MenuItem>
            <MenuItem value={3}>Scenario 3 Media Carver - Photos &amp; Videos; 25</MenuItem>
            <MenuItem value={4}>Scenario 4: Coarse Photo Carver; 5)</MenuItem>
            <MenuItem value={5}>Scenario 5: Specialized JPEG Carver; 2</MenuItem>
            <MenuItem value={6}>Scenario 6: Camera-Specialized JPEG Carver; 2</MenuItem>
        </Select>
        </FormControl>
    </Box>
    );
}