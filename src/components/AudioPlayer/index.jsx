import React, { useEffect, useState} from 'react';
import Song from '../../static/music/bgm.mp3';
import classes from './style.module.scss';

const AudioPlayer = ({ isPlaying, setIsPlaying}) => {
  const [audio] = useState(new Audio(Song));
  const Pause = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662315911/Invitation%20Assets/Mela%27s/pause_vhfmki.webp';
  const Play = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662315911/Invitation%20Assets/Mela%27s/play_vhdg4x.webp';
  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  const onClickBtn = () => {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className={classes.audioContainer}>
      <img className={classes.icon} onClick={onClickBtn} src={isPlaying ? Pause : Play} alt="audio-player" />
    </div>
  );
};

export default AudioPlayer
