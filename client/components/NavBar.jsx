import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../assets/icon.png';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { useDispatch } from 'react-redux';
import { getStack , selectStack } from '../reducers/deckSlice';
// import { getAll } from '../reducers/boardslice';

const useStyles = makeStyles(() => ({
  button: {
    marginLeft: 'auto',
  },
  // button2: {
  //   marginRight: 'auto',
  // },
  dropMenu: {
    marginRight: 'auto',
    minWidth: 120,
  }
}));

const NavBar = ({ logout }) => {
  
  const { button, button2 , dropMenu} = useStyles();
  const dispatch = useDispatch();
  
  const handleClick = (e) => {
    let val = e.target.value
    dispatch(selectStack(val))
  }
  useEffect(() => {
    fetch('/server/cards')
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(getStack(data));
      })
      .catch(err => console.log(err))
  })

  return (
    <div >
      <AppBar position="static" color="#e8eaf6">
        <Toolbar>
          <IconButton edge="start">
            <img src={logo} onClick={logout} className="logo" /> 
          </IconButton>
          <FormControl className={dropMenu}>
            <InputLabel>Stacks</InputLabel>
            <Select value ={3} onChange={handleClick}>
              <MenuItem value ={0}>MERN</MenuItem>
              <MenuItem value ={1}>NERP</MenuItem>
              <MenuItem value ={2}>MEAN</MenuItem>
            </Select>
          </FormControl>
          {/* <Button className={button2} onClick={handleClick}>
            Add Cards
          </Button> */}
          <Button className={button} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
