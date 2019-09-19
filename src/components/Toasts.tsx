import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toast: {
            padding: theme.spacing(2),
            fontSize: theme.spacing(2),
            fontFamily: 'Muli, sans-serif',
            borderRadius: theme.spacing(1),
            boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)'
        },
    }),
);

const Toasts: React.FC = () => {
    const classes = useStyles()

    return (
        <ToastContainer
            toastClassName={classes.toast} 
            closeOnClick={false}
            closeButton={false} 
            newestOnTop
        />
    )
};

export default Toasts;