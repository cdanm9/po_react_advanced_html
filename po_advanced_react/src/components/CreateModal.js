import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography  from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import Snackbar from '@mui/material/Snackbar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [openModal, setOpenModal] = React.useState(false);

  // const [state, setState] = React.useState({
  //   vertical: 'bottom',
  //   horizontal: 'center',
  // });
  // const { vertical, horizontal } = state;

  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);


  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Button type="submit" onClick={handleOpen}>Submit</Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Information
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Plant Created Successfully!
          </Typography>
        </Box> */}
          <Box sx={{ ...style, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '200px' }}>
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Information
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Plant Created Successfully!
              </Typography>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button variant="contained" color="primary" onClick={handleCloseModal}>
                Close
              </Button>   
            </Box>
          </Box>
      </Modal>
    </div>
  );
}