import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Fade from 'react-reveal/Fade';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isIOS } from 'react-device-detect';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

import {
  getAllGuest,
  submitRegistration,
  resetErrorPost,
  postGiftConfirmation,
  resetConfirmationError,
  resetConfirmationSuccess
} from '../../store/actions';
import useWindowDimensions from '../../utils/useWindowDimensions';
import StartedComponent from '../../components/Started';
import AudioComponent from '../../components/AudioPlayer';
import PopupProkes from '../../components/PopupProkes';
import PopupGiftConfirmation from '../../components/PopupGiftConfirmation';
import MessageImg from '../../static/images/message-img.png';
import wingribbon from '../../static/images/ribbon.png';
import creditcard from '../../static/images/creditcard.svg';
import numbercopy from '../../static/images/numbercopy.png';
import logoGold from '../../static/images/logoGold.png';
import logoSm from '../../static/images/logo-sm.png';
import calender from '../../static/icons/calender.png';
import time from '../../static/icons/time.png';
import Location from '../../static/icons/location.png';
import plane from '../../static/icons/plane.png';
import dropdown from '../../static/icons/dropdown.png';
import dropup from '../../static/icons/dropup.png';
import Mail from '../../static/icons/mail.png';
import whatsapp from '../../static/icons/whatsapp.png';
import bioMale from '../../static/images/bio-male.png';
import bioFemale from '../../static/images/bio-female.png';
import invocation from '../../static/images/invocation.png';
import frameMale from '../../static/images/frame-male.png';
import frameFemale from '../../static/images/frame-female.svg';
import gallery1 from '../../static/images/gallery/1.png';
import gallery2 from '../../static/images/gallery/2.png';
import gallery3 from '../../static/images/gallery/3.png';
import gallery4 from '../../static/images/gallery/4.png';
import gallery5 from '../../static/images/gallery/5.png';
import gallery7 from '../../static/images/gallery/7.png';
import gallery8 from '../../static/images/gallery/8.png';
import gallery9 from '../../static/images/gallery/9.png';
import gallery10 from '../../static/images/gallery/10.png';
import gallery11 from '../../static/images/gallery/11.png';
import Icon from '../../static/images/icon.svg';
import classes from './style.module.scss';

const InvitationPage = () => {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowGift, setIsShowGift] = useState(false);
  const [closeGift, setCloseGift] = useState(true);
  const [guestName, setGuestName] = useState('');
  const [address, setAddress] = useState('');
  const [attend, setAttend] = useState('');
  const [note, setNote] = useState('');
  const [showPopupProkes, setShowPopupProkes] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [notif, setNotif] = useState('');
  const [gifNotif, setGiftNotif] = useState('');
  const wording = '3750073262';
  const giftAddress = 'JL. Veteran No. 16A. Pancoran, Jakarta Selatan, DKI Jakarta 12760';
  const dispatch = useDispatch();
  const location = useLocation();
  let name = location?.search?.split('=')[1];
  name = name?.split('+').join(' ');
  const { width } = useWindowDimensions();

  var gapi = window.gapi;
  var CLIENT_ID = '545719587697-3b26seil317l47iehsuqb1l1a7i8r93k.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyAspcebNucyZ-lYgmuHOwyu3CNaqfk9CiY';
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const messages = useSelector(state => state.invitationReducer.messages);
  const isError = useSelector(state => state.invitationReducer.isError);
  const confirmationErrorMessage = useSelector(state => state.invitationReducer.confirmationErrorMessage);
  const confirmationSuccess = useSelector(state => state.invitationReducer.confirmationSuccess);
  const copyText = () => {
    navigator.clipboard.writeText(wording)
    setNotif('Copied')
    setTimeout(() => {
      setNotif('')
    }, 3000)
  }

  const addEvent = () => {
    console.log('masuk')
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
          'summary': 'Wedding Invitation',
          'location': 'UPN Campus veterans, Jalan RS. Fatmawati Raya, Pondok Labu, Depok City, Jakarta',
          'description': 'Wedding Invitation',
          'start': {
            'dateTime': '2022-03-12T09:00:00',
            'timeZone': 'Asia/Jakarta',
          },
          'end': {
            'dateTime': '2022-03-12T11:00:00',
            'timeZone': 'Asia/Jakarta',
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
          ],
          // 'attendees': [
          //   {'email': 'lpage@example.com'},
          //   {'email': 'sbrin@example.com'},
          // ],
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
          alert(JSON.stringify(response))
          console.log(response, '<< response')
          window.open(response.htmlLink)
        })
      })
    })
  };


  const copyAddress = () => {
    navigator.clipboard.writeText(giftAddress);
    setGiftNotif('Copied');
    setTimeout(() => {
      setGiftNotif('');
    }, 3000);
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
      let fullDate = "2022-03-12 09:00:00";
      let date = new Date(fullDate);
      // In case its IOS, parse the fulldate parts and re-create the date object.
      if(Number.isNaN(date.getMonth())) {
        let arr = fullDate.split(/[- :]/);
        date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
      }
      difference = +date - +new Date();
    } else {
      nextYear = year;
      difference = +new Date(`03/12/${nextYear}/09:00`) - +new Date();
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
          {timeLeft[interval]}
        </div>
        <div className={classes.countdownInterval}>
          {interval}{" "}
        </div>
      </div>
    );
  });

  const closePopupProkes = () => {
    setShowPopupProkes(!showPopupProkes);
  };

  const openInvitation = () => {
    setIsInvitationOpen(!isInvitationOpen);
    setShowPopupProkes(!showPopupProkes);
    setIsPlaying(!isPlaying);
  };

  const handleConfirmation = () => {
    setOpenConfirmation(!openConfirmation);
  };

  const showFormAttending = () => {
    setIsShow(!isShow)
  };

  const showGiftInfo = () => {
    if (isShowGift) {
      setIsShowGift(!isShowGift)
      setTimeout(() => {
        setCloseGift(!closeGift)
      }, 1500);
    } else {
      setIsShowGift(!isShowGift)
      setCloseGift(!closeGift)
    };
  };

  const goToMaps = () => {
    window.open('https://goo.gl/maps/krBpHqyXQH7aaET86', '_blank');
  };

  const radioAttend = (e) => {
    setAttend(e.target.value);
  };

  const onSubmitRadios = (e) => {
    e.preventDefault();

    const payload = {
      name: guestName,
      address,
      attend,
      message: note,
      pax: '',
    }
    dispatch(submitRegistration(payload, Toast.fire({
      icon: 'success',
      title: 'Pesan Terkirim',
      background: 'black',
      color: '#fbd258',
    })));
    setGuestName('');
    setAddress('');
    setNote('');
  };

  const submitGiftConfirmation = (value) => {
    dispatch(postGiftConfirmation(value));
  };

  const contactWA = () => {
    window.open('https://wa.me/62895706454243?text=Hallo%20saya%20mau%20pesan%20Undangan%20...', '_blank')
  }

  const generateHeader = () => {
    return (
      <div className={classes.header}>
        <Fade delay={2000} duration={2000}>
          <div className={classes.countdown}>
            {timerComponents.length && timerComponents}
          </div>
        </Fade>
        {/* <button onClick={addEvent}>Add Event Google Calendar</button> */}
      </div>
    );
  };


  const generateBiography = () => {
    return (
      <div className={classes.biographyContainer}>
        <div className={classes.bioMaleWrapper}>
          <img src={bioMale} alt="male" className={classes.maleImage} />
          <div className={classes.contentWrapper}>
            <div className={classes.bioTitle}>
              <p>Adhy Irawan</p>
            </div>
            <div className={classes.bioDesc}>
              <p>Hanya suara burung yang kau dengar dan tak pernah kaulihat burung itu tapi tahu burung itu ada di sana.
                Hanya desir angin yang kaurasa dan tak pernah kaulihat angin itu tapi percaya angin itu di sekitarmu.
                Hanya doaku yang bergetar malam ini dan tak pernah kaulihat siapa aku tapi yakin aku ada dalam dirimu.</p>
            </div>
          </div>
        </div>
        <div className={classes.biofemaleWrapper}>
          <img src={bioFemale} alt="male" className={classes.maleImage} />
          <div className={classes.contentWrapper}>
            <div className={classes.bioTitle}>
              <p>Yenny</p>
            </div>
            <div className={classes.bioDesc}>
              <p>Teruntuk calon Ibu Mertuaku,
                  Mungkin aku terlahir dari keluarga yang sederhana, orangtuaku bukanlah orang penting yang banyak dihormati oranglain.
                  Tapi, mereka adalah orang baik..
                  Mereka membesarkanku dalam kesederhanaan dan penuh cinta, mungkin aku memang jauh akan dari kata sempurna untuk menjadi menantumu tapi satu hal yang ibu perlu tau bahwa aku mencintai putramu dengan sederhana dan tulus seperti orangtuaku mencintaiku..</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const generateInvocation = () => {
    return (
      <div className={classes.invocationContainer}>
        <img src={invocation} alt="invocation" />
      </div>
    );
  };

  const generateBrides = () => {
    return (
      <div className={classes.bridesContainer}>
        <div className={classes.left}>
          <div className={classes.desc}>
            <p className={classes.first}>Adhy Irawan</p>
            <p className={classes.second}>Putra Bapak Sukim Narman</p>
            <p className={classes.third}>& Ibu Jumenah</p>
          </div>
          <img src={frameMale} alt="brides" />
        </div>
        <div className={classes.right}>
          <img src={frameFemale} alt="brides" />
          <div className={classes.desc}>
            <p className={classes.first}>Yenny Tsara Azizah</p>
            <p className={classes.second}>Putri Bapak Andi Ajiz</p>
            <p className={classes.third}>& Ibu Hartiyani</p>
          </div>
        </div>
      </div>
    );
  };

  const generateGallery = () => {
    return (
      <div className={classes.galleryContainer}>
        <div className={classes.topContent}>
          <Fade delay={1000} duration={4000}>
            <div className={classes.upper}>
              <img src={gallery1} alt="gallery" className={classes.imageUpperLeft}/>
              <img src={gallery2} alt="gallery" className={classes.imageUpperRight} />
            </div>
          </Fade>
          <Fade delay={1800} duration={4000}>
            <div className={classes.lower}>
              <img src={gallery3} alt="gallery" className={classes.imageLowerLeft} />
              <img src={gallery4} alt="gallery" className={classes.imageLowerRight} />
            </div>
          </Fade>
        </div>
        <div className={classes.midContent}>
          <Fade delay={2800} duration={4000}>
            <div className={classes.left}>
              <div className={classes.top}>
                <img src={gallery5} alt="gallery" className={classes.imageMidLeftTop} />
              </div>
              <img src={gallery7} alt="gallery" className={classes.imageMidLeftBottom} />
            </div>
          </Fade>
          <Fade delay={3800} duration={4000}>
            <div className={classes.right}>
              <div className={classes.top}>
                <img src={gallery8} alt="gallery" className={classes.imageMidRightTop} />
              </div>
              <img src={gallery9} alt="gallery" className={classes.imageMidRightBottom} />
            </div>
          </Fade>
        </div>
        {/* <Fade delay={1000} duration={4000}> */}
          <div className={classes.bottomContent}>

            <div className={classes.upper}>
          <Fade delay={3800} duration={4000}>
              <img src={gallery10} alt="gallery" className={classes.bottomUpperTop} />
            </Fade>

            <Fade delay={2800} duration={4000}>
              <img src={gallery11} alt="gallery" className={classes.bottomUpperBottom} />
            </Fade>
            </div>
          </div>
        {/* </Fade> */}

      </div>
    );
  };

  const eventDetail = () => {
    return (
      <div className={classes.event}>
        <div className={classes.bgWrapper}>
          <Fade delay={1000} duration={4000}>
            <div className={classes.greeting}>
              <p>
                Assalamu'alaikum Warahmatullahi Wabarakatuh<br />
              </p>
              <p className={classes.subtitle}>
                Maha Suci Allah {width !== 'lg' && <br />} yang telah menciptakan makhluk-Nya berpasang-pasangan. <br />
                Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami
              </p>
            </div>
            <div className={classes.details}>
              <div className={classes.titleWraper}>
                <p className={classes.title}>AKAD & RESEPSI</p>
              </div>
              <div className={classes.calender}>
                <img src={calender} alt='calender' />
                <p>
                  SABTU, 12 MARET 2022
                </p>
              </div>
              <div className={classes.btnCalendarWrapper} onClick={addEvent}>
                <p>Tambahkan ke Kalender</p>
              </div>
              <div className={classes.timesWraper}>
                <div className={classes.timeMobileWrapper}>
                  <img src={time} alt='time' />
                  <p>AKAD</p>
                  <div className={classes.separator} />
                  <p>09.00 - 09.40 WIB</p>
                </div>
                <div className={classes.timeMobileWrapper}>
                  <img src={time} alt='time' />
                  <p>RESEPSI</p>
                  <div className={classes.separator} />
                  <p>12.00 - 15.00 WIB</p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
        <Fade delay={1000} duration={4000}>
          <div className={classes.locationWraper}>
            <img src={Location} alt='location' />
            <p>
              JL. Veteran No. 16A. Pancoran, Kota Jakarta Selatan,
              DKI Jakarta 12760
            </p>
          </div>
          <div onClick={goToMaps} className={classes.btnmap}>
            <p>Menuju Lokasi</p>
            <div className={classes.imageWrapper}>
              <img src={plane} alt='gotomap' />
            </div>
          </div>
        </Fade>
      </div>
    );
  };

  const attendingSection = () => {
    return (
      <div className={classes.attendingContainer}>
        <p className={classes.title}>"UCAPAN & DOA"</p>
        <div className={classes.attendingWraper}>
          <div className={classes.formWraper}>
            <div className={classes.dropdownSection} onClick={showFormAttending}>
              <p className={classes.formTitle}>Konfirmasi Kehadiran</p>
              <div className={classes.icon}>
                <img src={isShow ? dropup : dropdown} alt="dropdown" />
              </div>
            </div>
            <form className={`${classes.formContainer} ${!isShow ? classes.hide : classes.show}`} onSubmit={onSubmitRadios}>
              <div className={classes.inputForm}>
                <div className={classes.inputs}>
                  <input type='text' value={guestName} placeholder='Nama' required onChange={(e) => setGuestName(e.target.value)} />
                  <input type='text' placeholder='Alamat' value={address} required onChange={(e) => setAddress(e.target.value)} />
                  <textarea type='text' placeholder='Kirim Ucapan & Doa' value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
              </div>
              <div onChange={radioAttend} className={classes.radiosInput}>
                <div className={classes.inputs}>
                  <p>Konfirmasi</p>
                  <div className={classes.radioWrapper}>
                    <div className={classes.radioItem}>
                      <input className={classes.radioItem} type='radio' name='attend' value='present' required ></input>
                      <label for='attend'>Akan Hadir</label>
                    </div>
                    <div className={classes.radioItem}>
                      <input className={classes.radioItem} type='radio' name='attend' value='absence' required></input>
                      <label for='attend'>Berhalangan Hadir</label>
                    </div>
                  </div>
                </div>
                <button type='submit' className={classes.btnSend}>Kirim Ucapan</button>
              </div>
            </form>
          </div>
          <Fade duration={3000}>
            <div className={classes.expressionSection}>
              <img src={Icon} alt="Icon" />
            </div>
          </Fade>
        </div>
      </div >
    );
  };

  const generateMessageSection = () => {
    return (
      <div className={classes.messageSectionContainer}>
        <div className={classes.sectionTitle}>
          <p>Ucapan & Doa kamu</p>
        </div>
        <div className={classes.mainContent}>
          <Fade duration={3000}>
            {/* <div className={classes.leftSection}>
              <img src={Icon} alt="icon" />
            </div> */}
          </Fade>
          <div className={classes.rightSection}>
            <div className={classes.imgWrapper}>
              <img className={classes.image} src={MessageImg} alt="message" />
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

  const giftSection = () => {
    return (
      <div className={classes.giftContainer}>
        <div className={classes.giftWraper}>
          <div className={classes.tittleRibbon}>
            <p className={classes.titleGift}>"Hadiah Pernikahan"</p>
            <img className={classes.ribbon} src={wingribbon} alt="wing" />
          </div>
          <div className={classes.dropdownSection} onClick={showGiftInfo}>
            <p className={classes.title}>Kirim Hadiah</p>
            <div className={classes.icon}>
              <img src={isShowGift ? dropup : dropdown} alt='dropdown' />
            </div>
          </div>
          <div className={`${classes.giftInfoWraper} ${isShowGift ? classes.showGift : classes.hideGift} ${closeGift ? classes.closeGift : ''}`}>
            <div className={classes.imageDetail}>
              <img className={classes.card} src={creditcard} alt="credit-card" />
              <div className={classes.copyWraperTop}>
                <img className={classes.copy} src={numbercopy} onClick={copyText} alt="copy-text" />
                <p className={classes.notifCopyTop}>{notif}</p>
              </div>
            </div>
            <div className={classes.infoWrapper}>
              <p className={classes.infoTitle}>Alamat Pengiriman Hadiah Fisik</p>
              <p className={classes.infoDetail}>
                Nama : Yenny Tsara Azizah <br />
                Alamat : JL. Veteran No. 16A. Pancoran,<br />Jakarta Selatan,<br />DKI Jakarta 12760
              </p>
              <div className={classes.copyWraper}>
                <img className={classes.copy} src={numbercopy} onClick={copyAddress} alt="copy-text" />
                <p className={classes.notifCopy}>{gifNotif}</p>
              </div>
            </div>
            <p className={classes.closingStatement}>
              Silakan konfirmasi kirim hadiah spesial kamu
            </p>
            <div className={classes.btnConfirmation} onClick={handleConfirmation}>klik disini</div>
          </div>
        </div>
      </div>
    );
  };

  const closingSection = () => {
    return (
      <div className={classes.closingSectionContainer}>
        <Fade duration={3000}>
          <div className={classes.leftSection}>
            <img src={Icon} alt="icon" />
          </div>
          <div className={classes.closingSentenceWrapper}>
            <p>
              Kehadiran & doa Anda<br/> adalah berkah, kehormatan & kebahagiaan bagi kami.<br/>
              Kami mengatakan dari hati kami yang terdalam, atas perhatian Anda<br/>
              Terima kasih
            </p>
          </div>
        </Fade>
      </div>
    );
  };

  const footerSection = () => {
    return (
      <div className={classes.footerContainer}>
        <div className={classes.footerTitle} onClick={contactWA}>
          <img className={classes.brand} alt='techartsyGold' src={width === 'lg' ? logoGold : logoSm} />
          <img className={classes.contact} src={whatsapp} alt="whatsapp" />
        </div>
      </div >
    );
  };

  const generateInvitation = () => {
    return (
      <div className={classes.invitationContainer}>
        {generateHeader()}
        {generateBiography()}
        {generateInvocation()}
        {generateBrides()}
        {generateGallery()}
        {eventDetail()}
        {attendingSection()}
        {giftSection()}
        {generateMessageSection()}
        {closingSection()}
        {footerSection()}
        <AudioComponent isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        <PopupProkes open={showPopupProkes} handleClose={closePopupProkes} />
        <PopupGiftConfirmation
          open={openConfirmation}
          handleClose={handleConfirmation}
          submitGiftConfirmation={submitGiftConfirmation}
          confirmationSuccess={confirmationSuccess}
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