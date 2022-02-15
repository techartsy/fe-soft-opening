import React from 'react';
import _ from 'lodash';
import pigura from '../../static/images/pigura.png';
import piguraSm from '../../static/images/pigura-sm.png';
import useWindowDimension from '../../utils/useWindowDimensions';
import classes from './style.module.scss';

const Started = ({ openInvitation, name }) => {
  const { width } = useWindowDimension();

  return (
    <div className={classes.container}>
      <div className={classes.wraper}>
        <img src={width === 'lg' ? pigura : piguraSm} alt="frame" />
      </div>
      {!_.isEmpty(name) &&
        <div className={classes.toWraper}>
          <p>Teruntuk</p>
          <p className={classes.to}>{name}</p>
          <p>Di tempat</p>
        </div>
      }
      <div className={classes.btn} onClick={openInvitation}><strong>Buka Undangan</strong></div>
    </div>
  );
}

export default Started;
