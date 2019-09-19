import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { Formik, FormikProps } from 'formik';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { addItemRoutine } from '../ducks/routines';
import { TriggerAddItem, Item } from '../ducks/types';
import { tooltipPositions } from '../ducks/tooltipPositions';
import { validation } from '../ducks/validation';
import { initializeItem } from '../ducks/initializeItem';

import ColorPicker from './ColorPicker';
import Dropzone from './Dropzone';

interface CreateItemProps {
    open: boolean
    closeDialog: () => void
};

const CreateItemDialog: React.FC<CreateItemProps> = ({ 
    open, 
    closeDialog 
}) => {
    const dispatch = useDispatch<Dispatch<TriggerAddItem>>()

    return (
        <Dialog 
            open={open} 
            onClose={closeDialog}
            maxWidth="sm"
            fullWidth
            aria-labelledby="form-dialog"
        >
            <DialogTitle aria-labelledby="form-dialog-title">
                Create New Item
            </DialogTitle>
            <Formik
                initialValues={initializeItem()}
                validationSchema={validation}
                onSubmit={(values: Item) => {
                    dispatch(addItemRoutine(values))
                    closeDialog()
                }}
            >
                {({ 
                    isValid, 
                    handleSubmit, 
                    handleChange, 
                    handleBlur, 
                    values, 
                    errors, 
                    touched, 
                    setFieldValue
                }: FormikProps<Item>) => (
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <DialogContent>
                            <Dropzone 
                                name="url"
                                setFieldValue={setFieldValue} 
                                url={values.url} 
                            />
                            <TextField
                                name="title"
                                type="text"
                                label="Photo title"
                                placeholder="Photo title"
                                margin="normal"
                                fullWidth
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                helperText={touched.title ? errors.title : ""}
                                error={touched.title && Boolean(errors.title)}
                            />
                            <ColorPicker
                                name="tooltip.color"
                                label="Tooltip color"
                                placeholder="Tooltip color"
                                setFieldValue={setFieldValue}
                                handleBlur={handleBlur} 
                                value={values.tooltip.color}
                                touched={touched.tooltip && touched.tooltip.color}
                                error={errors.tooltip && errors.tooltip.color}
                            />
                            <TextField
                                name="tooltip.position" 
                                type="text"
                                label="Tooltip position"
                                placeholder="Tooltip position"
                                margin="normal"
                                fullWidth
                                select
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                value={values.tooltip.position}
                                helperText={touched.tooltip && touched.tooltip.position ? 
                                    errors.tooltip && errors.tooltip.position 
                                    : ""}
                                error={touched.tooltip && touched.tooltip.position 
                                    && Boolean(errors.tooltip && errors.tooltip.position)}
                            >
                                {tooltipPositions.map(option => (
                                    <MenuItem 
                                        key={option.value} 
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                type="button" 
                                color="secondary"
                                onClick={closeDialog}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit"
                                color="primary"
                                disabled={!isValid}
                            >
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    )
};

export default CreateItemDialog;