import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'inline-flex', 
            width: '100%'
        },
        picker: {
            position: 'absolute', 
            zIndex: 1500,
            marginBottom: theme.spacing(6),
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 0
        },
        background: {
            position: 'fixed', 
            top: 0, 
            right: 0, 
            bottom: 0, 
            left: 0
        },
    })
);

interface ColorPickerProps {
    name: string
    label: string
    placeholder: string,
    setFieldValue: (field: string, value: string) => void
    handleBlur: (e: React.FocusEvent<any>) => void
    value: string,
    touched?: boolean,
    error?: string
};

const ColorPicker: React.FC<ColorPickerProps> = ({ 
    name,
    label,
    placeholder,
    setFieldValue, 
    handleBlur, 
    value,
    touched,
    error
}) => {
    const classes = useStyles()
    const [picker, showPicker] = useState(false)

    return (
        <div className={classes.root}>
            <TextField
                name={name}
                label={label}
                placeholder={placeholder}
                margin="normal"
                fullWidth
                value={value}
                onClick={() => showPicker(true)}
                onBlur={handleBlur} 
                helperText={touched ? error : ""}
                error={touched && Boolean(error)}
                InputProps={{
                    readOnly: true,
                    style: { 
                        color: value === '' ? '#000000' : value 
                    } 
                }}
            />
            {picker && <div className={classes.picker}>
                <div 
                    className={classes.background} 
                    onClick={() => showPicker(false)} 
                />
                <ChromePicker 
                    disableAlpha
                    color={value}
                    onChangeComplete={
                        color =>  setFieldValue(name, color.hex)
                    }
                />
            </div>}
        </div>
    )
};

export default ColorPicker;