import React from 'react';
import classes from './style.module.scss';

const ImageDetail = (props) => {
	const { open, selectedImg, handleClose } = props;
  return (
		<div className={classes.container}>
			<div className={classes.image}>
				image
			</div>
		</div>
	);
};

export default ImageDetail;
