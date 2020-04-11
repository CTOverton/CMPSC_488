import React from 'react'
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const TagBoard = ({tags, setTags}) => {
    const classes = useStyles();

    const handleDelete = (key) => {
        setTags(tags.filter(tag => tag.key !== key));
    };

    return (
        <div className={classes.root}>
            {tags.map((tag, index) =>
                <Chip
                    key={tag.key}
                    label={tag.label}
                    index={index}
                    onDelete={() => handleDelete(tag.key)}
                    className={classes.chip}
                />
            )}
        </div>
    );
};

export default TagBoard