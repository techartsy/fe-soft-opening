import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
// import Mask from "../../static/icons/mask.png";
// import Distancing from "../../static/icons/distancing.png";
// import Hand from "../../static/icons/hand.png";
// import Temp from "../../static/icons/temperature.png";
// import popupBg from '../../static/images/popup-bg.png';
import schedule from '../../static/rundown/rundown';
import classes from "./style.module.scss";

console.log(schedule, '<<<<<<<<<<<<<<<<<<<<')

const logo = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662246190/Invitation%20Assets/Mela%27s/logos_ko9i4n.webp';
const title = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662304051/Invitation%20Assets/Mela%27s/rundownPOPUP_u1hqhi.webp';

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
      style={{
        fontFamily: "'Merienda', cursive",
        overflowY: "hidden",
      }}
    >
      <DialogContent
        dividers
        style={{
          backgroundColor: '#231F20',
          overflowY: "hidden",
          minHeight: '450px',
          backgroundPosition: 'center',
          borderRadius: '20px',
          border: '2px solid #BB792C'
        }}
      >
        <div className={classes.popupWrapper}>
          <div className={classes.ellipse}>
            <p className={classes.closeBTN} onClick={handleClose}>X</p>
          </div>
          <div className={classes.prokesTitle} onClose={handleClose}>
            <img src={logo} alt='logo' />
            <img src={title} alt='title' />
          </div>
          <div className={classes.rundown}>
            <div className={classes.titleWrapper}>
              <p className={classes.title}>
                Rundown
              </p>
              <div className={classes.border} />
            </div>
            <div className={classes.subRundown}>
              {schedule && schedule.map((item, idx) => {
                return (
                  <ul className={classes.ulWraper}>
                    <li className={classes.li} idx={idx}>{item.time} : {item.description}</li>
                  </ul>
                )
              })
              }
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default PopupProkes;
