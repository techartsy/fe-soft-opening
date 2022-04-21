import React, { useEffect, useState} from 'react';
import Song from '../../static/music/audio.mp4';
import Play from '../../static/icons/play.png';
import Pause from '../../static/icons/pause.png';
import classes from './style.module.scss';

const AudioPlayer = ({ isPlaying, setIsPlaying}) => {
  const [checked, setChecked] = useState(false);
  const [audio] = useState(new Audio(Song));
  // const [voice] = useState(new Audio(Vn));

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  const onClickBtn = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      setChecked(false);
    }
  }

  return (
    <div className={classes.audioContainer}>
      <img onClick={onClickBtn} src={isPlaying ? Pause : Play} alt="audio-player" />
    </div>
  );
};

export default AudioPlayer
