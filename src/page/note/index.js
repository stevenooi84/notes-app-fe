
import React, { useState, useEffect } from 'react';
import { get, put, post } from '../../helper/fetch';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './index.css';

const NotePage = () => {

    const [tag, setTag] = useState('');
    const [data, setData] = useState({});
    const { id } = useParams();
    let history = useHistory();

    const handleDelete = (value) => {
      setData({content: data.content, tag : data.tag.filter(item => item !== value)});
    }
    useEffect(async () => {
      if (id) {
        const value = await get(`note/${id}`);
        setData({ content: value.data.content, tag: value.data.tags})
      }
    },[]);

    const setContent = (value) => {
      setData({content: value, tags : data.tags});
    }

    const onAddTag = () => {
      let newTags = data.tag || [];
      newTags.push(tag);
      setData({content: data.content, tag : newTags});
    }

    const onClick = async () => {
      if (id) {
        await put(`note/${id}`, {
          "content": data.content,
          "tags": data.tag
         });
      } else {
        await post('note', {
          "content": data.content,
          "tags": data.tag
         });
      }
      history.push('/list');
    }
    return (  
        <Box className="note" sx={{ display: 'flex', flexDirection: 'column'}} data-testid="box">
          <div className="content">
            <div className="title">Content:</div>
            <TextField 
              style={{width: '100%'}}
              multiline
              rows={4}
              data-testid="textfield-content"
              value={data.content}
              className="textfield"
              onChange={(e) => setContent(e.target.value)}
            /> 
          </div>
          <div className="tag">
            <div className="title">Tag:<span>
                    <Button onClick={onAddTag} variant="outlined" startIcon={<AddCircleIcon />} style={{margin: '0px 10px', color: '#2980B9', borderColor: '#2980B9', backgroundColor: 'white'}}>
                        Add
                    </Button></span></div>
            <TextField data-testid="textfield-tag" value={tag} className="textfield" onChange={(e) => setTag(e.target.value)}/> 
            
            <Stack direction="row" spacing={1} style={{margin: '10px 0px'}}>
                            {
                                data && data.tag && data.tag.map((tag)=> <Chip
                                    icon={<FaceIcon />} 
                                        label={tag}
                                        color="primary" 
                                        onDelete={() => handleDelete(tag)}
                                    />)
                            }
                        </Stack>
            
            <Button data-testid="button-submit" className="button-submit" variant="contained" onClick={onClick}>Submit</Button>
          </div>
        </Box>
)};

NotePage.propTypes = {
};

export default NotePage;