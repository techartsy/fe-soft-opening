import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { ImMic } from "react-icons/im";
import classes from "./style.module.scss";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const PopupProkes = withStyles(styles)((props) => {
  const { open, handleClose } = props;
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      hideBackdrop
      style={{
        backgroundColor: 'rgba(147, 163, 140, 0.15)', /*dim the background*/
        fontFamily: "'Poppins', sans-serif",
        overflowY: "hidden",
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      PaperProps={{
        style: {
          borderRadius: '20px',
          border: '2px solid #BB792C'
        },
      }}
    >
      <DialogContent
        dividers
        style={{
          backgroundColor: '#343534',
          overflowY: "hidden",
          backgroundPosition: 'center',
        }}
      >
        <div className={classes.popupWrapper}>
          <div className={classes.prokesTitle} onClose={handleClose}>
            <p>Send your message with voice:</p>
          </div>
          <div className={classes.content}>
            <ol>
              <li>Press and hold Mic icon ( <ImMic className={classes.iconMic} /> ) at the bottom of message column</li>
              <li>Say the message you want to convey</li>
              <li>Your message will automatically write by your voice</li>
            </ol>
          </div>
          <div className={classes.closePopupBtn} onClick={handleClose}>
            <p>Lanjutkan</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default PopupProkes;
