import React from 'react';
import ReactPaginate from 'react-paginate';
import clsx from 'clsx';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pagination: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        container: {
            display: 'flex',
            alignItems: 'center',
            listStyle: 'none',
            fontSize: '20px',
            padding: 0,
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
        pageElement: {
            margin: theme.spacing(1),
            cursor: 'pointer'
        },
        defaultCursor: {
            cursor: 'default'
        },
        iconOpacity:{
            opacity: 0.26,
        },
        pageLink: {
            display: 'flex',
            padding: `0 ${theme.spacing(1)}px`,
            outline: 'none',
            borderRadius: '2px',
        },
        pageWithBorder: {
            border: 'solid 1px #c8c7cc'
        },
        activeLink: {
            backgroundColor: '#efeff4',
        },
    })
);

interface SelectedPage {
    selected: number
};

interface PaginationProps {
    page: number
    pageCount: number
    onPageChange: (page: SelectedPage) => void
};

const Pagination: React.FC<PaginationProps> = ({ 
    page, 
    pageCount, 
    onPageChange 
}) => {
    const classes = useStyles()

    return (
        <div className={classes.pagination}>
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                previousLabel={<ArrowLeftIcon />}
                nextLabel={<ArrowRightIcon />}
                breakLabel={'...'}
                breakClassName={classes.pageElement}
                breakLinkClassName={classes.pageLink}
                onPageChange={onPageChange}
                initialPage={0}
                forcePage={page - 1}
                disableInitialCallback
                containerClassName={classes.container}
                pageClassName={classes.pageElement}
                pageLinkClassName={clsx(classes.pageLink, classes.pageWithBorder)}
                activeClassName={classes.defaultCursor}
                activeLinkClassName={classes.activeLink}
                previousClassName={classes.pageElement}
                previousLinkClassName={classes.pageLink}
                nextClassName={classes.pageElement}
                nextLinkClassName={classes.pageLink}
                disabledClassName={clsx(classes.defaultCursor, classes.iconOpacity)}
            />
        </div>
    )
}

export default Pagination;