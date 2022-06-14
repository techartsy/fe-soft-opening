import React from 'react';
import _ from 'lodash';
import Logo from '../../static/images/started.png'
import FrameTop from '../../static/images/frame-top.png'
import FrameBottom from '../../static/images/frame-bottom.png'
import classes from './style.module.scss';

const Started = ({ openInvitation, name }) => {
  return (
    <div className={classes.container}>
      <div className={classes.frameTop}>
        <img src={FrameTop} alt="Frame" />
      </div>
      <div className={classes.wraper}>
        <img src={Logo} alt="frame" />
      </div>
      {!_.isEmpty(name) &&
        <div className={classes.toWraper}>
          <p>Teruntuk</p>
          <p className={classes.to}>{name}</p>
        </div>
      }
      <div className={classes.btn} onClick={openInvitation}><strong>Buka Undangan</strong></div>
      <div className={classes.frameBottom}>
        <img src={FrameBottom} alt="Frame" />
      </div>
    </div>
  );
}

export default Started;
