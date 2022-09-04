import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Fade from 'react-reveal/Fade';
import Alert from '@material-ui/lab/Alert';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isIOS, isMobile } from 'react-device-detect';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

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
// import AudioComponent from '../../components/AudioPlayer';
import PopupProkes from '../../components/PopupProkes';
import PopupGiftConfirmation from '../../components/PopupGiftConfirmation';
import PopupVoiceRecognition from '../../components/PopupVoiceRecog';
import MessageImg from '../../static/images/message-img.png';
// import logo from '../../static/images/logo.png';
import calender from '../../static/icons/calender.png';
import time from '../../static/icons/time.png';
import Location from '../../static/icons/location.png';
import plane from '../../static/icons/plane.png';
import dropdown from '../../static/icons/dropdown.png';
import dropup from '../../static/icons/dropup.png';
import Mail from '../../static/icons/mail.png';
import whatsapp from '../../static/icons/whatsapp.png';
import instagram from '../../static/icons/instagram.png';
import colaboration from '../../static/icons/colaboration.png';
import closingImg from '../../static/images/closing-img.png';
import attendingImg from '../../static/images/attending-img.png';
import thirdQuoteImg from '../../static/images/third-quote-img.png';
import maleImg from '../../static/images/male.png';
import FemaleImg from '../../static/images/female.png';
import leafLeft from '../../static/images/leaf-left.png';
import leafRight from '../../static/images/leaf-right.png';
import rose from '../../static/images/rose.png';
import galleryIcon from '../../static/images/gallery/icon.png';
import galleryRose from '../../static/images/gallery/rose.png';
import galleryLogo from '../../static/images/gallery/logo.png';
import gallery1 from '../../static/images/gallery/1.png';
import gallery2 from '../../static/images/gallery/2.png';
import gallery3 from '../../static/images/gallery/3.png';
import gallery4 from '../../static/images/gallery/4.png';
import classes from './style.module.scss';
import Mask from '../../static/icons/mask.png';
import Distancing from '../../static/icons/distancing.png';
import Hand from '../../static/icons/hand.png';
import Temp from '../../static/icons/temperature.png';

const banner = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662237018/Invitation%20Assets/Mela%27s/Opening_avtbgv.webp';
const event = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662241878/Invitation%20Assets/Mela%27s/flowerBG_wdckmm.webp';
const btnLocation = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662241110/Invitation%20Assets/Mela%27s/location_ir4ord.webp';
const btnRundown = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662241110/Invitation%20Assets/Mela%27s/rundown_cvezff.webp';
const protocolBG = 'https://res.cloudinary.com/dwvzfit8v/image/upload/v1662246190/Invitation%20Assets/Mela%27s/bgFlower2_t2gzmq.webp';
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
  // const [showPopupProkes, setShowPopupProkes] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openPopupVoiceRecog, setOpenPopupVoiceRecog] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { width } = useWindowDimensions();
  let [popupCounter, setPopupCounter] = useState(0);
  let name = location?.search?.split('=')[1];
  name = name?.split('+').join(' ');

  var gapi = window.gapi;
  var CLIENT_ID = '545719587697-3b26seil317l47iehsuqb1l1a7i8r93k.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyAspcebNucyZ-lYgmuHOwyu3CNaqfk9CiY';
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

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

  const onStartRecognition = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'id'
    })
  }

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
        var event = {
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

        var request = gapi.client.calendar.events.insert({
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
    };
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
    };
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
        Hari: Math.floor(difference / (1000 * 60 * 60 * 24)) ? Math.floor(difference / (1000 * 60 * 60 * 24)) : '00',
        Jam: Math.floor((difference / (1000 * 60 * 60)) % 24) ? Math.floor((difference / (1000 * 60 * 60)) % 24) : '00',
        Menit: Math.floor((difference / 1000 / 60) % 60) !== 0 ? Math.floor((difference / 1000 / 60) % 60) : '00',
        Detik: Math.floor((difference / 1000) % 60) !== 0 ? Math.floor((difference / 1000) % 60) : '00'
      };
    } else {
      timeLeft = {
        Hari: '00',
        Jam: '00',
        Menit: '00',
        Detik: '00'
      };
    };
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
    };

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

  const goToMaps = () => {
    window.open('https://goo.gl/maps/MoCxeSH8Nk7gAnot8', '_blank');
  };

  const radioAttend = (e) => {
    setAttend(e.target.value);
  };

  const onChangeNote = (text) => {
    setNote(text);
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
        console.log(errMsg, '<<< errMsg callback')
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
          <img src={banner} alt="background" />
          <div className={classes.border} />
          <Fade delay={2000} duration={2000}>
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
        <div className={classes.topQuote}>
          <p>Agenda Soft Opening</p>
          <div className={classes.border} />
        </div>
        <div className={classes.bottomQuotesSection}>
          <div className={classes.quoteImg}>
            <img alt="brides" className={classes.image} src={event} />
          </div>
          <div className={classes.buttons}>
            <img className={classes.btn} src={btnLocation} onClick={goToMaps} alt='btn' />
            <img className={classes.btn} src={btnRundown} alt='btn' />
          </div>
        </div>
      </div>
    );
  };

  const covidProtocol = () => {
    return (
      <div className={classes.popupWrapper}>
        <div className={classes.prokesTitle}>
          <p>Protokol Kesehatan (Covid - 19)</p>
        </div>
        <div className={classes.prokesTop}>
          <div className={classes.iconWrapperPopup}>
            <img src={Mask} alt="mask" className={classes.iconProkes} />
            <p>Tamu undangan wajib mengenakan masker</p>
          </div>
          <div className={classes.iconWrapperPopup}>
            <img
              src={Hand}
              alt="washing-hand"
              className={classes.iconProkes}
            />
            <p>Cuci tangan menggunakan sabun atau hand sanitizer</p>
          </div>
        </div>
        <div className={classes.prokesBottom}>
          <div className={classes.iconWrapperPopup}>
            <img src={Temp} alt="temperatur" className={classes.iconProkes} />
            <p>Suhu tubuh normal dibawah 37,5 C</p>
          </div>
          <div className={classes.iconWrapperPopup}>
            <img
              src={Distancing}
              alt="social-distancing"
              className={classes.iconProkes}
            />
            <p>Menjaga jarak antar sesama minimal 1 meter</p>
          </div>
        </div>
        <div className={classes.appeal}>
          <p>Demi mendukung kesehatan bersama alangkah baiknya bagi para tamu undangan
            wajib mematuhi protokol kesehatan untuk mencegah penularan covid 19</p>
        </div>
      </div>
    );
  };

  const generateSecondQuoteSection = () => {
    return (
      <div className={classes.secondQuoteContainer}>
        <div className={classes.top}>
          <p>Putra & Dina</p>
        </div>
        <div className={classes.bottom}>
          <p>“Menikahlah dengan seseorang yang sanggup menerima kekuranganmu, dan Ia pun bersyukur atas kelebihanmu.
            Bangunlah rumah tangga bersama Ia yang siap untuk berjuang bersama menggapai Ridho-Nya.<br/>
            Serta yakinlah kamu bahwa surga semakin dekat saat kamu berada bersamanya.”</p>
          <img src={rose} alt="rose" />
        </div>

      </div>
    )
  }

  const generateThirdQuoteSection = () => {
    return (
      <div className={classes.thirdQuoteContainer}>
        <p>“ There is no more lovely, friendly, charming,<br />relationship or company than a good marriage ”
          - Martin Luther</p>
        <img src={thirdQuoteImg} alt="Third Quote" />
        <p>Tidak ada hubungan atau persatuan yang lebih indah, menyenangkan dan membahagiakan dari pada pernikahan yang baik</p>
      </div>
    );
  };

  const generateMaleBiography = () => {
    return (
      <div className={classes.maleBiography}>
        <img src={maleImg} alt="Male" />
        <div>
          <p className={classes.name}>Putra Nur Setiawan</p>
          <p className={classes.subName}>Putra ke - 2 dari 2 bersaudara<br/>
            anak dari<br/>
            Bapak Hari Prabowo & Ibu Yamah</p>
        </div>
      </div>
    )
  }

  const generateFemaleBiography = () => {
    return (
      <div className={classes.femaleBiography}>
        <img src={FemaleImg} alt="Female" />
        <div>
          <p className={classes.name}>Dina Novita Herawati</p>
          <p className={classes.subName}>Putri ke - 2 dari 4 bersaudara<br/>
            anak dari<br/>
            Bapak Wawan Erawan & Ibu Siti Mafrihah</p>
        </div>
      </div>
    );
  };

  const generateGallerySection = () => {
    return (
      <div className={classes.galleryContainer}>
        <div className={classes.iconWrapper}>
          <img src={galleryIcon} alt="Gallery Icon" />
        </div>
        <div className={classes.firstRow}>
          <div className={classes.left}>
            <img className={classes.rose} src={galleryRose} alt="Gallery Item" />
            <img src={gallery1} alt="Gallery Item" className={classes.firstImg} />
          </div>
          <img src={gallery2} alt="Gallery Item" className={classes.lastItem} />
        </div>
        <div className={classes.secondRow}>
          <img src={galleryLogo} alt="Gallery Logo" />
        </div>
        <div className={classes.thirdRow}>
          <img src={gallery3} alt="Gallery Item" className={classes.thirdImage}/>
          <img src={gallery4} alt="Gallery Item" className={classes.fourthImage}/>
        </div>
      </div>
    )
  }

  const eventDetail = () => {
    return (
      <div className={classes.eventContainer}>
        <div className={classes.bgWrapper}>
          <Fade delay={1000} duration={4000}>
            <div className={classes.greeting}>
              <p className={classes.greetingText}>
                Assalamu’alaikum Warahmatullahi Wabarakaatuh<br />
              </p>
              <p className={classes.subtitle}>
                Maha Suci Allah yang telah menciptakan<br/> makhluk-Nya berpasang-pasangan.<br />
                Ya Allah semoga Ridho-Mu tercurah mengiringi<br/>pernikahan kami
              </p>
            </div>
            <div className={classes.details}>
              <div className={classes.timesWraper}>
                <div className={classes.timeMobileWrapper}>
                  <p className={classes.event}>Tanggal</p>
                  <img src={calender} alt='calender' />
                  <p className={classes.time}>SABTU, 02 JULI 2022</p>
                </div>
                <div className={classes.timeMobileWrapper}>
                  <p className={classes.event}>Resepsi</p>
                  <img src={time} alt='time' />
                  <p className={classes.time}>Pukul 10.00 WIB s.d Selesai</p>
                </div>
              </div>
              <div className={classes.btnCalendarContainer}>
                <div className={classes.btnCalendarWrapper} onClick={addEvent}>
                  <p>Tambahkan ke Kalender</p>
                </div>
              </div>
            </div>
          </Fade>
          <Fade delay={1000} duration={4000}>
            <div className={classes.locationWraper}>
              <div className={classes.sectionLeft}>
                <img src={leafLeft} alt="leaf" />
              </div>
              <div className={classes.locationInfo}>
                <p className={classes.locationTitle}>Lokasi</p>
                <img src={Location} alt='location' />
                <p>
                Jalan Pondok Cabe 1<br/>RT 04, RW 04, No. 4 Kel. Pondok Cabe Ilir, Kec. Pamulang,<br/>Tangerang Selatan
                </p>
              </div>
              <div className={classes.sectionRight}>
                <img src={leafRight} alt="leaf" />
              </div>
            </div>
            <div onClick={goToMaps} className={classes.btnmap}>
              <p>Menuju Lokasi</p>
              <div className={classes.imageWrapper}>
                <img src={plane} alt='gotomap' />
              </div>
            </div>
          </Fade>
        </div>
      </div>
    );
  };

  const attendingSection = () => {
    return (
      <div className={classes.attendingContainer}>
        <div className={classes.titleContainer}>
          <p className={classes.title}>Reservation</p>
          <p className={classes.subtitle}>Please confirm your presence</p>
        </div>
        <div className={classes.attendingWraper}>
          <div className={classes.formWraper}>
            <div className={classes.dropdownSection} onClick={showFormAttending}>
              <p className={classes.formTitle}>Confirm Presence</p>
              <div className={classes.icon}>
                <img src={isShow ? dropup : dropdown} alt="dropdown" />
              </div>
            </div>
            <form className={`${classes.formContainer} ${!isShow ? classes.hide : classes.show}`} onSubmit={onSubmitRadios}>
              <div className={classes.inputForm}>
                <div className={classes.inputs}>
                  <input type='text' value={guestName} placeholder='Name' required onChange={(e) => setGuestName(e.target.value)} />
                  <select disabled={attend === 'absence'} name="pax" id="pax" value={pax} onChange={(e) => setPax(e.target.value)} >
                    <option value="1">1 Person</option>
                    <option value="2">2 Person</option>
                  </select>
                  <textarea type='text' placeholder='Message' value={note || transcript} onChange={(e) => onChangeNote(e.target.value)} />
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
          <Fade duration={3000}>
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
          <p className={classes.titleText}>Your Message</p>
        </div>
        <div className={classes.sectionTitle}>
          <p>We would like to express our gratitude</p>
        </div>
        <div className={classes.mainContent}>
          <div className={classes.rightSection}>
            <div className={classes.imgWrapper}>
              <img className={classes.image} src={messageLogo} alt="message" />
            </div>
            <div className={classes.messageWrapper}>
              {messages && messages.map((item, idx) => {
                return (
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
        <Fade duration={3000}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3966.2012016063263!2d106.7844201!3d-6.2371902!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f12cc0448597%3A0xe6ab93a55b6fc581!2sMel%C3%A1s%20Dining%20%26%20Lounge!5e0!3m2!1sid!2sid!4v1662298205386!5m2!1sid!2sid" width="400" height="300" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </Fade>
      </div>
    );
  };

  const footerSection = () => {
    return (
      <div className={classes.footerContainer}>
        <div className={classes.colaborationWrapper}>
          <p><em>In Colaboratation with:</em></p>
          <img alt="Techartsy Indonesia" src={footerLogo} className={classes.logo} onClick={contactOfficialWeb} />
        </div>
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
        {generateSecondQuoteSection()}
        {generateThirdQuoteSection()}
        {generateMaleBiography()}
        {generateFemaleBiography()}
        {generateGallerySection()}
        {eventDetail()}
        {attendingSection()}
        {generateMessageSection()}
        {googleMaps()}
        {footerSection()}
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