import React, { useEffect, useState} from 'react';
import Song from '../../static/music/apocalypse.mp3';
import Naif from '../../static/music/naif.mp4';
import Vn from '../../static/music/vn.m4a';
import Play from '../../static/icons/play.png';
import Pause from '../../static/icons/pause.png';
import classes from './style.module.scss';

const AudioPlayer = ({ isPlaying, setIsPlaying}) => {
  const [checked, setChecked] = useState(false);
  const [audio] = useState(new Audio(Song));
  const [voice] = useState(new Audio(Vn));

  const changeBackground = () => {
    if (window.scrollY >= 1951 && window.scrollY <= 4389) {
      audio.pause();
      voice.play();
      setChecked(true);
    } else {
      voice.pause();
      if (checked) {
        audio.play();
      }
    }
  }

  useEffect(() => {
    changeBackground()
    // window.addEventListener("scroll", changeBackground)
  })

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
