/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { get, del } from '../../helper/fetch';
import Box from '@mui/material/Box';
import Card from '../../components/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
  useHistory,
} from "react-router-dom";

const ListPage = () => {
    const [notes, setNotes] = useState([]);
    const [selectedRow, setSelectedRow] = useState({});
    let history = useHistory();
    useEffect(async () => {
        loadData();
    },[]);

    const loadData = async () => {
        const newNote = await get('note');
        setNotes(newNote?.data.notes);
    }

    const onDeleteNote = async (noteId) => {
        await del(`note/${noteId}`);
        loadData();
    }


    return (  <>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        {
            notes && notes.map((note)=><Card data={note} onDeleteNote={() => onDeleteNote(note._id)} />)
        }
        </Box>
        </>
)};

ListPage.propTypes = {
};

export default ListPage;