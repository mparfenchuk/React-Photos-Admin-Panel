import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { Formik, FormikProps } from 'formik';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';

import { updateItemRoutine, deleteItemRoutine } from '../ducks/routines';
import { TriggerUpdateItem, TriggerDeleteItem, Item } from '../ducks/types';
import { tooltipPositions } from '../utils/tooltipPositions';
import { validation } from '../utils/validation';

import ColorPicker from './ColorPicker';
import Dropzone from './Dropzone';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        leftIcon: {
            marginRight: theme.spacing(1),
        },
        grow: {
            flexGrow: 1,
        },
    })
);

interface UpdateItemProps {
    initialValues: Item
    open: boolean
    closeDialog: () => void
};

const UpdateItemDialog: React.FC<UpdateItemProps> = ({ 
    initialValues, 
    open, 
    closeDialog 
}) => {
    const classes = useStyles()
    const dispatch = useDispatch<Dispatch<TriggerUpdateItem | TriggerDeleteItem>>()

    return (
        <Dialog 
            open={open} 
            onClose={closeDialog}
            maxWidth="sm"
            fullWidth
            aria-labelledby="form-dialog"
        >
            <DialogTitle aria-labelledby="form-dialog-title">
                Update Item
            </DialogTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={(values: Item) => {
                    dispatch(updateItemRoutine(values))
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
                                onClick={() => {
                                    dispatch(deleteItemRoutine(values))
                                    closeDialog()
                                }}
                            >
                                <DeleteIcon className={classes.leftIcon} />
                                Delete
                            </Button>
                            <div className={classes.grow}/>
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
                                Update
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    )
};

export default UpdateItemDialog;