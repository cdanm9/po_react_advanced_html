import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';   
// import { createPlant } from "api";
import {createPlant, getTableData } from "api";
import CreateModal from "components/CreateModal";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Tooltip title="Create">
        <IconButton>
          <AddIcon onClick={handleClickOpen}/>
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const oSuccessResponse=await createPlant(formJson)   
              
              const _items = await getTableData({
                $top: 5,
                $skip: 0
              });    
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Create Plant</DialogTitle>  
        <DialogContent>
          {/* <DialogContentText>
            Enter Code
          </DialogContentText> */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="code"
            name="code"
            label="Enter Code"   
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Enter Name"   
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="city"
            name="city" 
            label="Enter City"   
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button type="submit">Submit</Button> */}
          <CreateModal/>   
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}