import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function BlockSize(props) {
    const { blockSize, setBlockSize } = props

    const change = (e) => {
        setBlockSize(e.target.value)
    }
    return (
    <FormControl component="fieldset">
        <FormLabel component="legend">Block size input data</FormLabel>
        <RadioGroup onChange={change} value={blockSize} row aria-label="block-size" name="row-radio-buttons-group">
        <FormControlLabel value={4096} control={<Radio />} label="4096 bytes" />
        <FormControlLabel value={512} control={<Radio />} label="512 bytes" />
        </RadioGroup>
    </FormControl>
    );
}