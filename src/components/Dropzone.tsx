import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';

import { apiCall } from '../utils/emulateUploading';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dropzone: {
            height: 180,
            padding: theme.spacing(1),
            cursor: 'pointer',
            border: `1px dashed ${theme.palette.divider}`,
            outline: 'none !important',
        },
        photoPreview: {
            maxHeight: '100%',  
            maxWidth: '100%', 
            objectFit: 'cover',
            width: '100%',
            height: 180,
            position: 'absolute',  
            top: 0, 
            left: 0,
            zIndex: 0
        },
        loadingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 'inherit',
            position: 'absolute',  
            top: 0, 
            left: 0,
            zIndex: 1500
        }
    })
);

interface DropzoneProps {
    name: string
    url: string
    setFieldValue: (field: string, value: string) => void
};

const Dropzone: React.FC<DropzoneProps> = ({ 
    name, 
    url, 
    setFieldValue 
}) => {
    const classes = useStyles()
    const [error, setError] = useState<string | undefined>()
    const [loading, setLoading] = useState<boolean>(false)
    const onDrop = useCallback(async acceptedFiles => {
        setError(undefined)
        setLoading(true)
        try {
            // save image on server and return url
            const url = await apiCall(acceptedFiles[0])
            setFieldValue(name, url)
        } catch(error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [name, setFieldValue])

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        accept: 'image/*',
        onDrop
    })

    return (
        <FormControl fullWidth>
            <div {...getRootProps({ className: classes.dropzone })}>
                <input {...getInputProps()} />
                {!loading && !Boolean(url) && <Typography>
                    Drag 'n' drop some photo here or click to select photo*
                </Typography>}
                {url && <img
                    className={classes.photoPreview}
                    src={url}
                    alt="Preview"
                />}
                {loading && <div className={classes.loadingContainer}>
                    <CircularProgress />
                </div>}
            </div>
            {error && <FormHelperText error filled>
                {error}
            </FormHelperText>}
        </FormControl>
    )
};

export default Dropzone;