
import React from 'react';
import './App.css';
import listPage from './page/list';
import notePage from './page/note';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { del } from './helper/fetch';
import HomeIcon from '@mui/icons-material/Home';
import AddCommentIcon from '@mui/icons-material/AddComment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function App() {
  const onDeleteAllNote = async () => {
      await del('note');
      window.location.href = '/list';
  }
  return (
    <Router>
      <div className="App">
          <div className="app-container">
          <header>
            <div className="left-col">
              <div className="title">Note Taking App</div>
              <div className="description">Web Interface</div>
            </div>
            <Stack direction="row" spacing={2} style={{marginTop: 10}}>
              <Button variant="contained" startIcon={<HomeIcon />}  onClick={() => window.location.href = '/list'}>Home</Button>
              <Button variant="outlined" startIcon={<AddCommentIcon />} onClick={() => window.location.href = '/createNote'}>Create New</Button>
              <Button variant="contained" startIcon={<HighlightOffIcon />} onClick={onDeleteAllNote}>Delete All</Button>
            </Stack>
          </header>

          <Switch>
              <Route path='/list' component={listPage}/>
              <Route path='/createNote' component={notePage}/>
              <Route path='/editNote/:id' component={notePage}/>
              <Route component={listPage}/>
          </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
