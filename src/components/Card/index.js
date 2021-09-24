import React from 'react';
import PropTypes from "prop-types";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import {
  useHistory,
} from "react-router-dom";
import './index.css';

const CardComponent = ({ data, onDeleteNote}) => {
    let history = useHistory();
    const onEditNote = async () => {
        history.push(`/editNote/${data?._id}`)
    }

    return (  
        <div className="card">
            <div className="header">
                    <Button onClick={onEditNote} variant="outlined" startIcon={<CreateIcon />} style={{marginRight: 10, color: '#2980B9', borderColor: '#2980B9', backgroundColor: 'white'}}>
                        Edit
                    </Button>
                    <Button onClick={onDeleteNote} variant="outlined" startIcon={<DeleteForeverIcon />} style={{color: '#E74C3C', borderColor: '#E74C3C', backgroundColor: 'white'}}>
                        Delete
                    </Button>
            </div>
            <div className="content">
                <div className="left-col">
                    {data.content}
                </div>
                <div className="right-col">
                </div>
            </div>
            {
                data && data.tags &&
                    <div className="tags">
                        <Stack direction="row" spacing={1}>
                            {
                                data.tags.map((tag)=> <Chip
                                    icon={<FaceIcon />} 
                                        label={tag}
                                        color="primary" 
                                    />)
                            }
                        </Stack>
                    </div>
            }
        </div>
)};

CardComponent.propTypes = {
    data: PropTypes.array,
    onDeleteNote: PropTypes.func,
};

export default CardComponent;