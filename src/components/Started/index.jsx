import React from 'react';
import classes from './style.module.scss';

const banner = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662394216/Invitation%20Assets/Mela%27s/banner_niin8s.webp';
const btn = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662235564/Invitation%20Assets/Mela%27s/btn_ihpama.webp';

const Started = ({ openInvitation, name }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wraper}>
        <img className={classes.banner} src={banner} alt="frame" />
        <p className={classes.instruction}>Click Button Below</p>
        <img className={classes.btn} src={btn} onClick={openInvitation} alt='btn' />
      </div>
    </div>
  );
}

export default Started;
