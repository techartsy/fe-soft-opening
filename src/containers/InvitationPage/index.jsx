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
  resetConfirmationSuccess,
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
import logo from '../../static/images/logo.png';
import calender from '../../static/icons/calender.png';
import time from '../../static/icons/time.png';
import Location from '../../static/icons/location.png';
import plane from '../../static/icons/plane.png';
import dropdown from '../../static/icons/dropdown.png';
import dropup from '../../static/icons/dropup.png';
import Mail from '../../static/icons/mail.png';
import whatsapp from '../../static/icons/whatsapp.png';
import instagram from '../../static/icons/instagram.png';
import techartsy from '../../static/icons/techartsy.png';
import colaboration from '../../static/icons/colaboration.png';
import closingImg from '../../static/images/closing-img.png';
import attendingImg from '../../static/images/attending-img.png';
import thirdQuoteImg from '../../static/images/third-quote-img.png';
import maleImg from '../../static/images/male.png';
import FemaleImg from '../../static/images/female.png';
import quotesImg from '../../static/images/quotes-img.png';
import rose from '../../static/images/rose.png';
import headerImg from '../../static/images/header.png';
import galleryIcon from '../../static/images/gallery/icon.png';
import galleryRose from '../../static/images/gallery/rose.png';
import galleryLogo from '../../static/images/gallery/logo.png';
import gallery1 from '../../static/images/gallery/1.png';
import gallery2 from '../../static/images/gallery/2.png';
import gallery3 from '../../static/images/gallery/3.png';
import gallery4 from '../../static/images/gallery/4.png';
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
  const wording = '1271003800';
  const giftAddress = 'Kp. Bunihayu, RT 05, RW 02, Desa Bunihayu, Kec. Jalancagak, Kab. Subang, Jawa Barat';
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
          'summary': 'Putra & Dina Wedding Day',
          'location': 'Kp. Bunihayu, RT 05, RW 02, Desa Bunihayu, Kec. Jalancagak, Kab. Subang, Jawa Barat',
          'description': 'Wedding Invitation',
          'start': {
            'dateTime': '2022-05-14T09:00:00',
            'timeZone': 'Asia/Jakarta',
          },
          'end': {
            'dateTime': '2022-05-14T15:23:00',
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
      let fullDate = "2022-05-14 09:00:00";
      let date = new Date(fullDate);
      // In case its IOS, parse the fulldate parts and re-create the date object.
      if(Number.isNaN(date.getMonth())) {
        let arr = fullDate.split(/[- :]/);
        date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
      }
      difference = +date - +new Date();
    } else {
      nextYear = year;
      difference = +new Date(`05/14/${nextYear}/09:00`) - +new Date();
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
          <p className={classes.text}>{interval}{" "}</p>
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
    window.open('https://goo.gl/maps/m1Evh7XhbbEjGoc96', '_blank');
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
      pax: attend?.toLowerCase() === 'present' ? '1' : '0',
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
          <img src={headerImg} alt="background" />
        </div>
        <Fade delay={2000} duration={2000}>
          <div className={classes.countdown}>
            {timerComponents.length && timerComponents}
          </div>
        </Fade>
      </div>
    )
  }

  const generateFirstQuoteSection = () => {
    return (
      <div className={classes.firstQuoteContainer}>
        <div className={classes.topQuote}>
          <p>“ There is no more lovely, friendly, charming,<br />relationship or company than a good marriage ”
          - Martin Luther</p>
        </div>
        <div className={classes.bottomQuotesSection}>
          <div className={classes.quoteImg}>
            <img alt="brides" className={classes.image} src={quotesImg} />
          </div>
          <div className={classes.bottomQuote}>
            <p>Tidak ada hubungan atau persatuan yang lebih indah, menyenangkan dan membahagiakan dari pada pernikahan yang baik</p>
          </div>
        </div>
      </div>
    );
  };

  const generateSecondQuoteSection = () => {
    return (
      <div className={classes.secondQuoteContainer}>
        <div className={classes.top}>
          <p>Dina & Putra</p>
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
              <div className={classes.calender}>
                <img src={calender} alt='calender' />
                <p>
                  SABTU, 14 MEI 2022
                </p>
              </div>
              <div className={classes.btnCalendarWrapper} onClick={addEvent}>
                <p>Tambahkan ke Kalender</p>
              </div>
              <div className={classes.timesWraper}>
                <div className={classes.timeMobileWrapper}>
                  <p className={classes.event}>Akad</p>
                  <img src={time} alt='time' />
                  <p className={classes.time}>Pukul 09.00 WIB s.d Selesai</p>
                </div>
                <div className={classes.timeMobileWrapper}>
                  <p className={classes.event}>Resepsi</p>
                  <img src={time} alt='time' />
                  <p className={classes.time}>Pukul 10.00 WIB s.d Selesai</p>
                </div>
              </div>
            </div>
          </Fade>
          <Fade delay={1000} duration={4000}>
            <div className={classes.locationWraper}>
              <img src={Location} alt='location' />
              <p>
                Kp. Bunihayu, RT 05, RW 02, Desa Bunihayu,<br/>Kec. Jalancagak, Kab. Subang, Jawa Barat
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
              <img src={attendingImg} alt="Icon" />
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
            <p className={classes.titleGift}>Hadiah Pernikahan</p>
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
                Nama : Dina Novita Herawati <br />
                Alamat : Kp. Bunihayu, RT 05, RW 02, Desa Bunihayu,<br />Kec. Jalancagak, Kab. Subang, Jawa Barat
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

  const closingSeparator = () => {
    return (
      <div className={classes.closingSeparator}>
        <img src={closingImg} alt="closing" />
      </div>
    )
  }

  const closingSection = () => {
    return (
      <div className={classes.closingSectionContainer}>
        <Fade duration={3000}>
          <div className={classes.leftSection}>
            <img src={logo} alt="icon" className={classes.invitationLogo} />
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
        <div className={classes.colaborationWrapper}>
          <img alt="colaboration" src={colaboration} className={classes.colaborationText} />
          <img alt="colaboration" src={techartsy} className={classes.logo} onClick={contactOfficialWeb} />
        </div>
        <div className={classes.footerTitle}>
          <img className={classes.contact} onClick={contactWA} src={whatsapp} alt="whatsapp" />
          <img className={classes.contact} onClick={contactIG} src={instagram} alt="instagram" />
        </div>
      </div >
    );
  };

  const generateInvitation = () => {
    return (
      <div className={classes.invitationContainer}>
        {generateNewHeader()}
        {generateFirstQuoteSection()}
        {generateSecondQuoteSection()}
        {generateThirdQuoteSection()}
        {generateMaleBiography()}
        {generateFemaleBiography()}
        {generateGallerySection()}
        {eventDetail()}
        {attendingSection()}
        {generateMessageSection()}
        {giftSection()}
        {closingSeparator()}
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