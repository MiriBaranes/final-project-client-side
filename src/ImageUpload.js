import React, { useEffect, useState } from 'react';
import { Button, TextField, Box, Grid, Card, CardMedia, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import { getCookie } from "./apiFunc";
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const commonStyles = {
    backgroundColor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
   padding:2
};


const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (getCookie("userId")) {
            fetchImages();
        }
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/images/user-images/${getCookie("userId")}`);
            setImages(response.data);
        } catch (error) {
            console.error('There was an error fetching the images!', error);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const resizedFile = await resizeImage(file, 800, 300); // Resize to 800x600
            setSelectedFile(resizedFile);
        }
    };

    const resizeImage = (file, maxWidth, maxHeight) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    const resizedFile = new File([blob], file.name, {
                        type: file.type,
                        lastModified: Date.now(),
                    });
                    resolve(resizedFile);
                }, file.type);
            };
        });
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('userId', getCookie("userId"));

        try {
            const response = await axios.post('http://localhost:8080/api/images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data);
            setSelectedFile(null);
            fetchImages(); // Refresh images after successful upload
        } catch (error) {
            console.error('There was an error uploading the image!', error);
        }
    };

    const handleRemove = async (imageId) => {
        try {
            const response = await axios.post('http://localhost:8080/api/images/remove-image', null, {
                params: { imageId: imageId }
            });
            alert(response.data);
            fetchImages(); // Refresh images after successful removal
        } catch (error) {
            console.error('There was an error removing the image!', error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">

            <Button
                variant="contained"
                component="label"
                margin="normal"
            >
                <FileUploadIcon>
                </FileUploadIcon>
                <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                />
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!selectedFile || !getCookie("userId")}
                margin="normal"
            >
                Upload
            </Button>
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center"
                maxWidth="100%"
            >
                {images.map((image, index) => (
                    <Box sx={{ ...commonStyles, borderRadius: '16px' }} key={image.id} display="flex" alignItems="center" margin={1}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="auto"
                                style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                                image={`data:image/png;base64,${(image.data)}`}
                                alt={image.filename}
                            />
                            <Typography variant="body2" color="textSecondary" component="p">
                                {image.filename}
                            </Typography>
                            <DeleteIcon onClick={() => handleRemove(image.id)} />
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ImageUpload;
