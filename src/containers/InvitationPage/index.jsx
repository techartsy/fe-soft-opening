import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import Alert from '@material-ui/lab/Alert';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isIOS, isMobile } from 'react-device-detect';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import gallery from '../../static/images/gallery/gallery';

import { ImMic } from "react-icons/im";

import useWindowDimensions from '../../utils/useWindowDimensions';
import {
  getAllGuest,
  submitRegistration,
  resetErrorPost,
  postGiftConfirmation,
  resetConfirmationError,
  resetConfirmationSuccess,
} from '../../store/actions';
import StartedComponent from '../../components/Started';
import AudioComponent from '../../components/AudioPlayer';
import PopupProkes from '../../components/PopupRundown';
import PopupGiftConfirmation from '../../components/PopupGiftConfirmation';
import PopupVoiceRecognition from '../../components/PopupVoiceRecog';
import ImageDetail from '../../components/ImageDetail';
import dropdown from '../../static/icons/dropdown.png';
import dropup from '../../static/icons/dropup.png';
import Mail from '../../static/icons/mail.png';
import classes from './style.module.scss';
import Mask from '../../static/icons/mask.png';
import Distancing from '../../static/icons/distancing.png';
import Hand from '../../static/icons/hand.png';
import Temp from '../../static/icons/temperature.png';

const banner = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662394216/Invitation%20Assets/Mela%27s/banner_niin8s.webp';
const event = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662433373/Invitation%20Assets/Mela%27s/event_fdnwsd.webp';
const btnCalender = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662308297/Invitation%20Assets/Mela%27s/btnCalender_kfqylo.webp';
const btnRundown = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662308297/Invitation%20Assets/Mela%27s/btnRundown_ufm73j.webp';
const footerLogo = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1658591749/Asset%20Techartsy%20Indonesia/Logo/Webp%20Format/Techartsy_Gold_qsdzz5.webp';
const messageLogo = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662246190/Invitation%20Assets/Mela%27s/logo_azw3sx.webp';

const InvitationPage = () => {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [address, setAddress] = useState('');
  const [attend, setAttend] = useState('present');
  const [pax, setPax] = useState('1');
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const [showPopupProkes, setShowPopupProkes] = useState(false);
  const [openRundown, setOpenRundown] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openPopupVoiceRecog, setOpenPopupVoiceRecog] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { width } = useWindowDimensions();
  let [popupCounter, setPopupCounter] = useState(0);
  let name = location?.search?.split('=')[1];
  name = name?.split('+').join(' ');

  let gapi = window.gapi;
  let CLIENT_ID = '545719587697-3b26seil317l47iehsuqb1l1a7i8r93k.apps.googleusercontent.com';
  let API_KEY = 'AIzaSyAspcebNucyZ-lYgmuHOwyu3CNaqfk9CiY';
  let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  let SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const messages = useSelector(state => state.invitationReducer.messages);
  const isError = useSelector(state => state.invitationReducer.isError);
  const confirmationErrorMessage = useSelector(state => state.invitationReducer.confirmationErrorMessage);
  const confirmationSuccess = useSelector(state => state.invitationReducer.confirmationSuccess);
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [note, setNote] = useState('' || transcript);
  // const text = useRef('')
  // const onSpeechResults = (value) => {
  //   // console.log('masuk func')
  //   text.current = text.current +' '+ value;
  //   setNote(text.current);
  //   // if (!_.isEmpty(note)) {
  //   //   setNote(`${note} ${transcript}`);
  //   // }
  // }
  
  const onStartRecognition = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'id'
    })
    // console.log(text);
    // onSpeechResults(transcript)
  }

  const clickedImage = (image) => {
    setSelectedImg(image);
    setOpenDetail(!openDetail);
  };

  const handleCloseImg = () => {
    setOpenDetail(!openDetail)
    setSelectedImg({});
  };

  const addEvent = () => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('opened'));
      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        let event = {
          'summary': 'Soft Opening Melas Dining & Lounge',
          'location': 'Jl. Pakubuwono VI No.77, RW.2, Gunung, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12120',
          'description': 'Soft Opening Invitation',
          'start': {
            'dateTime': '2022-09-15T12:00:00',
            'timeZone': 'Asia/Jakarta',
          },
          'end': {
            'dateTime': '2022-09-15T15:00:00',
            'timeZone': 'Asia/Jakarta',
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1'
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10},
            ],
          },
        };

        let request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })
        request.execute(response => {
          window.open(response.htmlLink)
        })
      })
    })
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  useEffect(() => {
    dispatch(getAllGuest())
  }, []);

  useEffect(() => {
    if (successAlert) {
      setTimeout(() => {
        setSuccessAlert(false)
        resetForm('');
      }, 3000);
    } else {
      setTimeout(() => {
        setErrorAlert(false);
        setErrorMessage('');
      }, 3000);
    }
  }, [errorAlert, successAlert])

  useEffect(() => {
    if (isError) {
      Toast.fire({
        icon: 'success',
        title: 'Pesan Terkirim',
        background: 'black',
      })
      setTimeout(() => {
        dispatch(resetErrorPost());
      }, 1000);
    }
  }, [isError])

  useEffect(() => {
    if (!_.isEmpty(confirmationErrorMessage)) {
      Toast.fire({
        icon: "error",
        title: `${confirmationErrorMessage}`,
        background: "black",
        color: "#fbd258",
        customClass: {
          container: 'swal-overlay'
        }
      });
      setTimeout(() => {
        dispatch(resetConfirmationError())
      }, 2000);
    }
  }, [confirmationErrorMessage])

  useEffect(() => {
    if (confirmationSuccess) {
      Toast.fire({
        icon: "success",
        title: "Konfirmasi Berhasil",
        background: "black",
        textColor: "#fbd258",
        customClass: {
          container: 'swal-overlay'
        }
      });
      setTimeout(() => {
        dispatch(resetConfirmationSuccess())
      }, 2000);
      setOpenConfirmation(!openConfirmation);
    }

  }, [confirmationSuccess])

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    let nextYear;
    let difference;
    if (isIOS) {
      nextYear = year;
      let fullDate = "2022-09-15 12:00:00";
      let date = new Date(fullDate);
      // In case its IOS, parse the fulldate parts and re-create the date object.
      if(Number.isNaN(date.getMonth())) {
        let arr = fullDate.split(/[- :]/);
        date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
      }
      difference = +date - +new Date();
    } else {
      nextYear = year;
      difference = +new Date(`09/15/${nextYear}/12:00`) - +new Date();
    }
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)) ? Math.floor(difference / (1000 * 60 * 60 * 24)) : '00',
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24) ? Math.floor((difference / (1000 * 60 * 60)) % 24) : '00',
        Minutes: Math.floor((difference / 1000 / 60) % 60) !== 0 ? Math.floor((difference / 1000 / 60) % 60) : '00',
        Seconds: Math.floor((difference / 1000) % 60) !== 0 ? Math.floor((difference / 1000) % 60) : '00'
      };
    } else {
      timeLeft = {
        Days: '00',
        Hours: '00',
        Minutes: '00',
        Seconds: '00'
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div className={classes.countdownItem}>
        <div className={classes.countdownTime}>
          <p className={classes.value}>{timeLeft[interval]}</p>
        </div>
        <div className={classes.countdownInterval}>
          <p className={classes.text}>{interval}{" "}</p>
        </div>
      </div>
    );
  });

  const handleOpenRundown = () => {
    setOpenRundown(!openRundown)
    setShowPopupProkes(!showPopupProkes);
  };

  const closePopupProkes = () => {
    setShowPopupProkes(!showPopupProkes);
  };

  const openInvitation = () => {
    setIsInvitationOpen(!isInvitationOpen);
    setIsPlaying(!isPlaying);
  };

  const handleConfirmation = () => {
    setOpenConfirmation(!openConfirmation);
  };

  const showFormAttending = () => {
    if (browserSupportsSpeechRecognition) {
      if (!isShow && popupCounter === 0) {
        setPopupCounter(popupCounter += 1)
        setOpenPopupVoiceRecog(!openPopupVoiceRecog);
      }
    }
    setIsShow(!isShow)
  };

  const radioAttend = (e) => {
    setAttend(e.target.value);
  };

  const onChangeNote = (text) => {
    setNote(text);
    resetTranscript();
    if (note.length === 0) {
      resetTranscript();
    }
  }

  const resetForm = () => {
    setGuestName('');
    setAddress('');
    setNote('');
    setPax('1');
    setAttend('present');
    resetTranscript();
    setErrorMessage('');
  }

  const onSubmitRadios = (e) => {
    e.preventDefault();

    const payload = {
      name: guestName,
      address: ' ',
      attend,
      message: note || transcript,
      pax: attend?.toLowerCase() === 'present' ? pax : '0',
    }
    dispatch(submitRegistration(
      payload,
      (errMsg) => {
        setErrorMessage(errMsg);
        setErrorAlert(true)
      },
      () => {
        setSuccessAlert(true);
        resetForm();
      }
    ));
  };

  const submitGiftConfirmation = (value) => {
    dispatch(postGiftConfirmation(value));
  };

  const contactWA = () => {
    window.open('https://wa.me/62895706454243?text=Hallo%20saya%20mau%20pesan%20Undangan%20...', '_blank')
  }

  const contactIG = () => {
    window.open('https://www.instagram.com/techartsy.indonesia/', '_blank')
  }

  const contactOfficialWeb = () => {
    window.open('https://techartsyindonesia.com/', '_blank')
  }

  const generateNewHeader = () => {
    return (
      <div className={classes.newHeader}>
        <div className={classes.backgroundImg}>
          <Fade duration={2500} delay={500}>
            <img src={banner} alt="background" />
          </Fade>
          <div className={classes.border} />
          <Fade delay={500} duration={2500}>
            <div className={classes.countdown}>
              {timerComponents.length && timerComponents}
            </div>
          </Fade>
        </div>
      </div>
    )
  }

  const generateFirstQuoteSection = () => {
    return (
      <div className={classes.firstQuoteContainer}>
        <Fade duration={2500} delay={500}>
          <div className={classes.topQuote}>
            <p>Mela's Dining Soft Opening</p>
            <div className={classes.border} />
          </div>
        </Fade>
        <div className={classes.bottomQuotesSection}>
          <Fade duration={2500} delay={1200}>
            <div className={classes.quoteImg}>
              <img alt="brides" className={classes.image} src={event} />
            </div>
          </Fade>
          <div className={classes.buttons}>
            <Flip top duration={2500} delay={1500}>
              <img className={classes.btn} src={btnCalender} onClick={addEvent} alt='btn' />
            </Flip>
            <Flip top duration={2500} delay={1800}>
              <img className={classes.btn} src={btnRundown} onClick={handleOpenRundown} alt='btn' />
            </Flip>
          </div>
        </div>
      </div>
    );
  };

  const covidProtocol = () => {
    return (
      <div className={classes.popupWrapper}>
        <Fade duration={2500} delay={500}>
          <div className={classes.prokesTitle}>
            <p>Covid 19 Protocol</p>
          </div>
        </Fade>
        <div className={classes.prokesTop}>
          <Fade duration={2500} delay={700}>
            <div className={classes.iconWrapperPopup}>
              <img src={Mask} alt="mask" className={classes.iconProkes} />
              <p>Wear your mask properly</p>
            </div>
          </Fade>
          <Fade duration={2500} delay={1200}>
            <div className={classes.iconWrapperPopup}>
              <img
                src={Hand}
                alt="washing-hand"
                className={classes.iconProkes}
              />
              <p>Wash your hand often with water & soap</p>
            </div>
          </Fade>
        </div>
        <div className={classes.prokesBottom}>
          <Fade duration={2500} delay={1800}>
            <div className={classes.iconWrapperPopup}>
              <img src={Temp} alt="temperatur" className={classes.iconProkes} />
              <p>Make sure your temperature around 37,5 C</p>
            </div>
          </Fade>
          <Fade duration={2500} delay={2400}>
            <div className={classes.iconWrapperPopup}>
              <img
                src={Distancing}
                alt="social-distancing"
                className={classes.iconProkes}
              />
              <p>Put distance between yourself and other people</p>
            </div>
          </Fade>
        </div>
        <Fade duration={2500} delay={3000}>
          <div className={classes.appeal}>
            <p><strong>Mela's Dining</strong> is commited to fighting<br/>the spread of <strong>COVID - 19</strong></p>
          </div>
        </Fade>
      </div>
    );
  };

  const galleries = () => {
    return (
      <div className={classes.galleryWrapper}>
        <Fade duration={2500} delay={500}>
          <div className={classes.top}>
            <p>Mela's Galleries</p>
            <div className={classes.border} />
          </div>
        </Fade>
        <div className={classes.bottom}>
          {gallery &&
            gallery.map((item, idx) => {
              return (
                <Fade duration={2500} delay={500}>
                  <img className={classes.imgGallery} src={item.img} idx={idx} alt='gallery' onClick={() => clickedImage(item)} />
                </Fade>
              )
            })
          }
        </div>
      </div>
    )
  }

  const attendingSection = () => {
    return (
      <div className={classes.attendingContainer}>
        <Fade duration={2000} delay={500}>
          <div className={classes.titleContainer}>
            <Fade top duration={2000} delay={500}>
              <p className={classes.title}>Reservation</p>
            </Fade>
            <Fade top duration={2000} delay={500}>
              <p className={classes.subtitle}>Please confirm your presence</p>
            </Fade>
          </div>
        </Fade>
        <div className={classes.attendingWraper}>
          <div className={classes.formWraper}>
            <Fade bottom duration={2000} delay={500}>
              <div className={classes.dropdownSection} onClick={showFormAttending}>
                <p className={classes.formTitle}>Confirm Presence</p>
                <div className={classes.icon}>
                  <img src={isShow ? dropup : dropdown} alt="dropdown" />
                </div>
              </div>
            </Fade>
            <form className={`${classes.formContainer} ${!isShow ? classes.hide : classes.show}`} onSubmit={onSubmitRadios}>
              <div className={classes.inputForm}>
                <div className={classes.inputs}>
                  <input type='text' value={guestName} placeholder='Name' required onChange={(e) => setGuestName(e.target.value)} />
                  <select disabled={attend === 'absence'} name="pax" id="pax" value={pax} onChange={(e) => setPax(e.target.value)} >
                    <option value="1">1 Person</option>
                    <option value="2">2 Person</option>
                  </select>
                  <textarea type='text' placeholder='Message' value={!_.isEmpty(transcript) ? `${note} ${transcript}` : `${note}${transcript}`} onChange={(e) => onChangeNote(e.target.value)} />
                  {browserSupportsSpeechRecognition &&
                    <div className={classes.iconContainer}>
                      <div
                        onTouchStart={onStartRecognition}
                        onMouseDown={onStartRecognition}
                        onTouchEnd={SpeechRecognition.stopListening}
                        onMouseUp={SpeechRecognition.stopListening}
                        className={classes.micWrapper}
                      >
                        <ImMic className={classes.mic} />
                      </div>
                    </div>}
                </div>
              </div>
              <div onChange={radioAttend} className={classes.radiosInput}>
                <div className={classes.inputs}>
                  <p>Confirm</p>
                  <div className={classes.radioWrapper}>
                    <div className={classes.radioItem}>
                      <input className={classes.radioItem} type='radio' name='attend' checked={attend === 'present'} value='present' required ></input>
                      <label for='attend'>Yes, I will come</label>
                    </div>
                    <div className={classes.radioItem}>
                      <input className={classes.radioItem} type='radio' name='attend' checked={attend === 'absence'} value='absence' required></input>
                      <label for='attend'>Sorry, I can't come</label>
                    </div>
                  </div>
                </div>
                <button type='submit' className={classes.btnSend}>Send</button>
              </div>
            </form>
          </div>
          <Fade duration={2500} delay={500}>
            <div className={classes.expressionSection}>
              <img src={messageLogo} alt="Icon" />
            </div>
          </Fade>
        </div>
      </div >
    );
  };

  const generateMessageSection = () => {
    return (
      <div className={classes.messageSectionContainer}>
        <div className={classes.title}>
          <Fade left duration={2000} delay={500}>
            <p className={classes.titleText}>Your Message</p>
          </Fade>
        </div>
        <div className={classes.sectionTitle}>
          <Fade right duration={2000} delay={500}>
            <p>We would like to express our gratitude</p>
          </Fade>
        </div>
        <div className={classes.mainContent}>
          <div className={classes.rightSection}>
            <div className={classes.imgWrapper}>
              <Fade duration={2000} delay={1000}>
                <img className={classes.image} src={messageLogo} alt="message" />
              </Fade>
            </div>
            <div className={classes.messageWrapper}>
              {messages && messages.map((item, idx) => {
                return (
                  <Fade bottom duration={2000} delay={idx <= 3 ? idx*600 : 800}>
                    <div className={classes.messageItemWrapper} key={idx}>
                      <div className={classes.avatar}>
                        <img src={Mail} alt='avatar' />
                      </div>
                      <div className={classes.messageShape}>
                        <div className={classes.outerTriangle}>
                          <div className={classes.innerTriangle} />
                        </div>
                        <div className={classes.messageBubble}>
                          <div className={classes.name}>
                            {item.name}...
                          </div>
                          <div className={classes.message}>
                            {item.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fade>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const googleMaps = () => {
    return (
      <div className={classes.googleMapsContainer}>
        <Fade left duration={2000} delay={200}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3966.2012016063263!2d106.7844201!3d-6.2371902!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f12cc0448597%3A0xe6ab93a55b6fc581!2sMel%C3%A1s%20Dining%20%26%20Lounge!5e0!3m2!1sid!2sid!4v1662298205386!5m2!1sid!2sid" width="350" height="300" style={{border:0, borderRadius: '16px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </Fade>
      </div>
    );
  };

  const footerSection = () => {
    return (
      <div className={classes.footerContainer}>
        <Fade duration={2000} delay={200}>
          <div className={classes.colaborationWrapper}>
            <Fade duration={2000} delay={1000}>
              <p><em>In Colaboration with</em></p>
            </Fade>
            <Fade duration={2000} delay={1500}>
              <img alt="Techartsy Indonesia" src={footerLogo} className={classes.logo} onClick={contactOfficialWeb} />
            </Fade>
          </div>
        </Fade>
      </div >
    );
  };

  const generateInvitation = () => {
    return (
      <div className={classes.invitationContainer}>
        {
          errorAlert &&
          <Alert
            severity="error"
            style={{
              position: 'fixed',
              zIndex: 5,
              marginTop: (isMobile || width === 'sm') ? '7%' : '2%',
              left: (isMobile || width === 'sm') ? 10 : '35%',
              right: (isMobile || width === 'sm') && 10,
              width: (isMobile || width === 'sm') ? '85%' : '30%'}}>
            {!_.isEmpty(errorMessage) ? errorMessage : 'Oops, something went wrong. Please try again'}
          </Alert>
        }
        {
          successAlert &&
          <Alert
            severity="success"
            style={{
              position: 'fixed',
              zIndex: 5,
              marginTop: (isMobile || width === 'sm') ? '7%' : '2%',
              left: (isMobile || width === 'sm') ? 10 : '35%',
              right: (isMobile || width === 'sm') && 10,
              width: (isMobile || width === 'sm') ? '85%' : '30%'}}>
            Thank you for your registration
          </Alert>
        }
        {generateNewHeader()}
        {generateFirstQuoteSection()}
        {covidProtocol()}
        {galleries()}
        {attendingSection()}
        {generateMessageSection()}
        {googleMaps()}
        {footerSection()}
        <AudioComponent isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        <PopupProkes open={showPopupProkes} handleClose={closePopupProkes} />
        <PopupGiftConfirmation
          open={openConfirmation}
          handleClose={handleConfirmation}
          submitGiftConfirmation={submitGiftConfirmation}
          confirmationSuccess={confirmationSuccess}
        />
        <PopupVoiceRecognition
          open={openPopupVoiceRecog}
          handleClose={() => setOpenPopupVoiceRecog(!openPopupVoiceRecog)}
        />
        {
          openDetail &&
          <ImageDetail
          selectedImg={selectedImg}
          handleClose={handleCloseImg} />
        }
      </div>
    );
  };
  return (
    <div className={classes.container}>
      {!isInvitationOpen ? <StartedComponent openInvitation={openInvitation} name={name} /> : generateInvitation()}
    </div>
  );
};

export default InvitationPage;
