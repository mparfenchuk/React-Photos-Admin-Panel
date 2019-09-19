import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { getItemsRoutine } from '../ducks/routines';
import { State, Item, TriggerGetItems } from '../ducks/types';
import { initializeItem } from '../ducks/initializeItem';

import CreateItemDialog from './CreateItemDialog';
import UpdateItemDialog from './UpdateItemDialog';
import Toasts from './Toasts';
import Tooltip from './Tooltip';
import Pagination from './Pagination';
import PhotoCard from './PhotoCard';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
        },
        toolbar: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            padding: theme.spacing(2),
        },
        grow: {
            flexGrow: 1,
        },
        gridRoot: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        progress: {
            margin: theme.spacing(2),
        },
        fab: {
            position: 'fixed',
            top: 'auto',
            left: 'auto',
            right: theme.spacing(3),
            bottom: theme.spacing(3),
            margin: 0,
        }
    })
);

interface UpdateItemState {
    open: boolean
    initialValues: Item
};

const MainPage: React.FC = () => {
    const classes = useStyles()
    const dispatch = useDispatch<Dispatch<TriggerGetItems>>()
    
    const [openCreateItemDialog, setOpenCreateItemDialog] = useState<boolean>(false);
    const [openUpdateItemDialog, setOpenUpdateItemDialog] = useState<UpdateItemState>({
        open: false,
        initialValues: initializeItem()
    });

    const page = useSelector<State, number>(state => state.page)
    const totalPages = useSelector<State, number>(state => state.totalPages)
    const items = useSelector<State, Array<Item>>(state => state.items)
    const loading = useSelector<State, boolean>(state => state.loading)
    const error = useSelector<State, string | undefined>(state => state.error)

    useEffect(() => {
        dispatch(getItemsRoutine(1))
    }, [dispatch]);

    return (
        <>
            <CssBaseline />
            <Container 
                maxWidth="lg" 
                className={classes.container}
            >
                <Toolbar 
                    className={classes.toolbar} 
                    disableGutters
                >
                    <Typography 
                        variant="h6" 
                        className={classes.grow}
                    >
                        Photos Admin Panel
                    </Typography>
                </Toolbar>
                <Grid 
                    container 
                    className={classes.gridRoot}
                    justify={loading ? "center" : "flex-start"}
                    spacing={2}
                >
                    {loading && <CircularProgress className={classes.progress} />}
                    {!loading && items.length === 0 && <Grid item xs={12}>
                        <Typography>
                            There is no items...
                        </Typography>
                    </Grid>}
                    {error && <Grid item xs={12}>
                        <Typography color="error">
                            {error}
                        </Typography>
                    </Grid>}
                    {!loading && items.length > 0 && items.map(item => (
                        <Grid 
                            key={item.id} 
                            item 
                            xs={12} 
                            sm={6} 
                            md={4}
                        >
                            <Tooltip title={item.title} {...item.tooltip}>
                                <PhotoCard
                                    title={item.title}
                                    url={item.url}
                                    openDialog={() => setOpenUpdateItemDialog({ 
                                        initialValues: item, 
                                        open: true 
                                    })}
                                />
                            </Tooltip>
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.grow} />
                {totalPages !== 0 &&<Pagination
                    page={page}
                    pageCount={totalPages}
                    onPageChange={page => dispatch(getItemsRoutine(page.selected + 1))}
                />}
            </Container>
            <CreateItemDialog 
                open={openCreateItemDialog} 
                closeDialog={() => setOpenCreateItemDialog(false)}
            />
            <UpdateItemDialog 
                initialValues={openUpdateItemDialog.initialValues}
                open={openUpdateItemDialog.open} 
                closeDialog={() => setOpenUpdateItemDialog({ 
                    initialValues: initializeItem(), 
                    open: false 
                })}
            />
            <Fab
                className={classes.fab}
                color="secondary" 
                onClick={() => setOpenCreateItemDialog(true)}
            >
                <AddIcon />
            </Fab>
            <Toasts />
        </>
    )
};

export default MainPage;