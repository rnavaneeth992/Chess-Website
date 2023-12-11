import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Swal from "sweetalert2";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import { BASE_URL } from "../../../constants";
import Loading from "../../../components/loading";


export default function AlertDialog({ title, content, allowEdit, classID }) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [dialogText, setDialogText] = React.useState(content);
  const [loadingOpen, setLoadingOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setDialogText(event.target.value);
  };


  const saveFeedback = async (insID) => {
    try {
      setLoadingOpen(true);
      let response = await Axios.put(
        `${BASE_URL}/feedbackClass/${classID}`,
        { feedback: dialogText },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLoadingOpen(false);

      // console.log(response)
      if (response.status == 201) {
        console.log(response.data.result)

        // setRequests(filteredData);
      }
    } catch (err) {
      setLoadingOpen(false);

      if (!err.response) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Couldn't reach server",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
        });
      }
    }
    handleClose();
  };
  const toggleEdit = () => {
    // saveFeedback();
    setEdit(!edit)
  }

  return (
    <div>
      <button
        variant="contained"
        className="bg-primary text-white  text-sm p-1 rounded-md hover:border-purple-700 hover:bg-accent-primary_hover w-25 h-10"
        onClick={handleClickOpen}
      >
        {title}
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {edit && (
              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm rounded-lg border border-gray-300 text-black focus:border-purple-700" onChange={handleChange}>{dialogText}</textarea>
            )}
            {!edit && dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {edit && (
            <>
              <Button className="text-purple-700" onClick={toggleEdit}>Save</Button>
            </>
          )}

          {allowEdit && !edit && (<Button className="text-purple-700" onClick={toggleEdit}>Edit</Button>)}
          <Button className="text-purple-700" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Modal open={loadingOpen}>
        <Loading />
      </Modal>
    </div>
  );
}
