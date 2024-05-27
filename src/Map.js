import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

// Fix the default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationSelector = () => {
    const [position, setPosition] = useState(null);
    const [locationName, setLocationName] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const fetchLocationOptions = async (query) => {
        if (query.length < 3) {
            setOptions([]);
            return;
        }

        setLoading(true);
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
        const data = await response.json();
        setOptions(data.map((place) => ({
            label: place.display_name,
            lat: place.lat,
            lon: place.lon,
        })));
        setLoading(false);
    };

    const handlePlaceSelect = (event, value) => {
        if (value) {
            const latlng = { lat: parseFloat(value.lat), lng: parseFloat(value.lon) };
            setPosition(latlng);
            setLocationName(value.label);
        }
    };

    const handleSaveLocation = () => {
        if (position) {
            const locationLink = `https://www.openstreetmap.org/?mlat=${position.lat}&mlon=${position.lng}&zoom=16`;
            console.log('Location:', locationName);
            console.log('Location Link:', locationLink);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Autocomplete
                freeSolo
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    fetchLocationOptions(newInputValue);
                }}
                options={options}
                getOptionLabel={(option) => option.label}
                onChange={handlePlaceSelect}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Location"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
            <MapContainer center={position || [51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {position && <Marker position={position}></Marker>}
            </MapContainer>
            {locationName && (
                <TextField
                    label="Selected Location"
                    value={locationName}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />
            )}
            <Button variant="contained" onClick={handleSaveLocation}>
                Save Location
            </Button>
            {position && (
                <Box>
                    <Typography variant="h6">Selected Location:</Typography>
                    <Typography>{locationName}</Typography>
                    <a
                        href={`https://www.openstreetmap.org/?mlat=${position.lat}&mlon=${position.lng}&zoom=16`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View on OpenStreetMap
                    </a>
                </Box>
            )}
        </Box>
    );
};

export default LocationSelector;
