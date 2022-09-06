import React from 'react';
import classes from './style.module.scss';

const btn = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662235564/Invitation%20Assets/Mela%27s/btn_ihpama.webp';
const logo = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662437375/Invitation%20Assets/Mela%27s/logo_yzyogg.webp';
const info = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662437201/Invitation%20Assets/Mela%27s/date_iulncx.webp';

const Started = ({ openInvitation, name }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wraper}>
        <img className={classes.logo} src={logo} alt="Melas Dining" />
        <div className={classes.textWrapper}>
          {name && <p className={classes.name}>Dear<br/>{name}</p>}
          <p className={classes.invitingText}>You're Invited To Our</p>
        </div>
        <img className={classes.banner} src={info} alt="frame" />
        <p className={classes.instruction}>Click Button Below</p>
        <img className={classes.btn} src={btn} onClick={openInvitation} alt='btn' />
      </div>
    </div>
  );
}

export default Started;
