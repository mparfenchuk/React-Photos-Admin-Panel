import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        media: {
            height: 180,
        },
    })
);

interface PhotoCardProps {
    title: string
    url: string
    openDialog: () => void
};

const PhotoCard: React.FC<PhotoCardProps> = ({ 
    title, 
    url, 
    openDialog 
}) => {
    const classes = useStyles()

    return (
        <Card onClick={openDialog}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={url}
                    title={title}
                />
                <CardContent>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};

export default PhotoCard;