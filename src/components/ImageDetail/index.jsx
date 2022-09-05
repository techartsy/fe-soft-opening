import React from 'react';
import classes from './style.module.scss';

const ImageDetail = ({ selectedImg, handleClose }) => {
  return (
			<div className={classes.imageDetailContainer}>
        <div className={classes.overlayX} onClick={handleClose}>

					<div className={classes.closeIcon} onClick={handleClose}>
						&#10006;
					</div>
				</div>
        <div className={classes.image}>
          <img src={selectedImg.img} alt="Ikatik" />
        </div>
      </div>
	);
};

export default ImageDetail;
