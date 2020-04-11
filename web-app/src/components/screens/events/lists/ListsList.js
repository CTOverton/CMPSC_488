import React, {useState} from 'react'
import List from "@material-ui/core/List";
import EventsListItem from "../EventsListItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import AddIcon from '@material-ui/icons/Add';
import TextField from "@material-ui/core/TextField";
import uniqid from 'uniqid';

const Item = ({item, index, onRemove}) => {
    return (
        <Draggable draggableId={item.key} index={index}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <ListItem>
                        <IconButton edge="start" aria-label="drag">
                            <DragHandleIcon />
                        </IconButton>
                        <ListItemText
                            primary={item.label}
                            // secondary={}
                        />
                        <ListItemSecondaryAction onClick={onRemove}>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </div>

            )}
        </Draggable>
    )
};

const ListsList = ({list, setList}) => {
    const [inputs, setInputs] = React.useState({
        new: ''
    });

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {return;}
        if (result.destination.index === result.source.index) {return;}

        const items = reorder(
            list,
            result.source.index,
            result.destination.index
        );

        setList(items);
    };

    const handleChange = prop => event => {
        const value = event.target.value;
        setInputs({ ...inputs, [prop]: value })
    };

    const handleAdd = e => {
        e.preventDefault();
        if (inputs.new !== '') {
            setList([...list, {key: uniqid(), label: inputs.new}]);
            setInputs({new: ''})
        }
    };

    const handleRemove = (key) => {
        setList(list.filter(item => item.key !== key));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <List>
                            <ListItem>
                                <form noValidate autoComplete="off" onSubmit={handleAdd}>
                                    <TextField
                                        id="list-input"
                                        label="Add new list"
                                        // variant="filled"
                                        value={inputs.new}
                                        onChange={handleChange('new')}
                                    />
                                    {/*<ListItemText
                                    primary={'Input'}
                                    // secondary={}
                                />*/}
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="Add" type="submit">
                                            <AddIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </form>

                            </ListItem>
                            {list.map((item, index) =>
                                <Item item={item} index={index} key={item.key} onRemove={() => handleRemove(item.key)}/>
                            )}
                        </List>
                        {provided.placeholder}
                    </div>
                    )}
            </Droppable>
        </DragDropContext>
    );
};

export default ListsList
/*

{list.map((item, index) =>
    <ListItem key={index}>
        <ListItemText
            primary={item}
            // secondary={}
        />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
)}
{/!*            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>*!/}

            */
