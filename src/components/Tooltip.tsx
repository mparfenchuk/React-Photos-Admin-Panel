import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface StyleProps {
    color: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative'
        },
        tooltip: {
            position: 'absolute',
            zIndex: 1500,
        },
        bottom: {
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: theme.spacing(1)
        },
        top: {
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: theme.spacing(1)
        },
        left: {
            right: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            marginRight: theme.spacing(1)
        },
        right: {
            left: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            marginLeft: theme.spacing(1)
        },
        container: {
            color: 'white',
            background: (props: StyleProps) => props.color,
            padding: theme.spacing(1),
            borderRadius: theme.spacing(1),
            boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)'
        }
    }),
);

interface TooltipProps {
    position: string
    color: string
    title: string
}

const Tooltip: React.FC<TooltipProps> = ({ 
    children, 
    position = 'top', 
    color = '#000000', 
    title = 'Tooltip'
}) => {
    const classes = useStyles({ color })
    const [visibility, setVisibility] = useState<boolean>(false)

    const getClass = (position: string):string => {
        switch(position){
            case 'top':
                return classes.top
            case 'bottom':
                return classes.bottom
            case 'right':
                return classes.right
            case 'left':
                return classes.left
            default:
                return ''
        }
    }

    return (
        <div 
            className={classes.root}
            onMouseEnter={() => setVisibility(true)}
            onMouseLeave={() => setVisibility(false)}
        >
            {children}
            {visibility && <div className={clsx(classes.tooltip, getClass(position))}>
                <div className={classes.container}>
                    <Typography variant="caption">
                        {title}
                    </Typography>
                </div>
            </div>}
        </div>
    )
};

export default Tooltip;