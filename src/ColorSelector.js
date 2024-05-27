import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import {SketchPicker} from "react-color";

const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange'];

const ColorSelector = ({selectedColor, setSelectedColor}) => {
    // const [anchorEl, setAnchorEl] = useState(null);
    //
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    //
    // const handleClose = (color) => {
    //     setAnchorEl(null);
    //     if (color) {
    //         setSelectedColor(color);
    //     }
    // };
    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    return (
        <div>
            <SketchPicker
                color={selectedColor}
                onChangeComplete={setSelectedColor}
            />
            {/*<Button variant="contained" onClick={handleClick}>*/}
            {/*    {selectedColor ? `Selected Color: ${selectedColor}` : 'Select a Color'}*/}
            {/*</Button>*/}
            {/*<Menu*/}
            {/*    anchorEl={anchorEl}*/}
            {/*    open={Boolean(anchorEl)}*/}
            {/*    onClose={() => handleClose(null)}*/}
            {/*>*/}
            {/*    {colors.map((color) => (*/}
            {/*        <MenuItem key={color} onClick={() => handleClose(color)}>*/}
            {/*            {color}*/}
            {/*        </MenuItem>*/}
            {/*    ))}*/}
            {/*</Menu>*/}
        </div>
    );
};

export default ColorSelector;
