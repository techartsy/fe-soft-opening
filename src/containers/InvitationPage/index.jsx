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
// import AudioComponent from '../../components/AudioPlayer';
import PopupProkes from '../../components/PopupProkes';
import PopupGiftConfirmation from '../../components/PopupGiftConfirmation';
import Azmi from '../../static/images/azmi.png';
import Ridwan from '../../static/images/ridwan.png';
import Male from '../../static/images/male.png';
import Female from '../../static/images/female.png';
import WingTop from '../../static/images/wing-top.png';
import WingBottom from '../../static/images/wing-bottom.png';
import Frame from '../../static/images/frame.png';
import wingg from '../../static/images/wingg.png';
import topevent from '../../static/images/topevent.png';
import gunungan from '../../static/images/gunungan.png';
import MessageImg from '../../static/images/message-img.png';
import ClosingWing from '../../static/images/closing-wing.png';
import wingribbon from '../../static/images/ribbon.png';
import rosegift from '../../static/images/rosegift.png';
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
import Story from '../../static/images/story.png';
import ThirdImageSM from '../../static/images/thirdimage-sm.png';
import bioMale from '../../static/images/bio-male.png';
import bioFemale from '../../static/images/bio-female.png';
import invocation from '../../static/images/invocation.png';
import frameMale from '../../static/images/frame-male.png';
import frameFemale from '../../static/images/frame-female.png';
import gallery1 from '../../static/images/gallery/1.png';
import gallery2 from '../../static/images/gallery/2.png';
import gallery3 from '../../static/images/gallery/3.png';
import gallery4 from '../../static/images/gallery/4.png';
import gallery5 from '../../static/images/gallery/5.png';
import gallery6 from '../../static/images/gallery/6.png';
import gallery7 from '../../static/images/gallery/7.png';
import gallery8 from '../../static/images/gallery/8.png';
import gallery9 from '../../static/images/gallery/9.png';
import Icon from '../../static/images/icon.png';
import EventIcon from '../../static/images/event-icon.png';
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
  const wording = '1570005756763';
  const giftAddress = 'Kp. Babakan RT.001/002 Ds. Cisungsang Kec. Cibeber, Kab. Lebak, Banten. 42394';
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
    window.open('https://goo.gl/maps/gLzmCKcPg8m8AQdM8', '_blank');
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

  const generateHeader = () => {
    return (
      <div className={classes.header}>
        <Fade delay={2000} duration={3000}>
          <div className={classes.headerAnimation}>
            <div className={classes.headerTitle}>
              <p className={classes.titleTop}>Krisdiansyah</p>
              <p className={classes.titleMid}>&</p>
              <p className={classes.titleBottom}>Azmi</p>
            </div>
          </div>
        </Fade>
        <div className={classes.countdown}>
          {timerComponents.length && timerComponents}
        </div>
        {/* <button onClick={addEvent}>Add Event Google Calendar</button> */}
      </div >
    );
  };

  const generateStory = () => {
    return (
      <div className={classes.storySection}>
        <div className={classes.storyWrapper}>
          <div className={classes.story}>
            <Fade when={!showPopupProkes} left duration={3000}>
              <p>Hidup memberimu banyak pilihan, kau harus memilih yang terbaik, pilihan yang tidak membuatmu menyesalinya,</p>
            </Fade>
            <Fade when={!showPopupProkes} left duration={3000}>
              <p className={classes.quoteAuthor}>- Yashvardan Raichand -</p>
            </Fade>
          </div>
        </div>
        <div className={classes.imageWrapper}>
          <img src={Ridwan} alt='Brides' />
        </div>
      </div>
    );
  };

  const generateSecondStory = () => {
    return (
      <div className={classes.secondStoryContainer}>
        <div className={classes.imageWrapper}>
          <img src={Azmi} alt="Brides" />
        </div>
        <div className={classes.storyWrapper}>
          <div className={classes.story}>
            <Fade when={!showPopupProkes} right duration={3000}>
              <p>Karena hati tidak perlu memilih, ia selalu tahu ke mana harus berlabuh,</p>
            </Fade>
            <Fade when={!showPopupProkes} right duration={3000}>
              <p className={classes.quoteAuthor}>~ Dee Lestari ~</p>
            </Fade>
          </div>
        </div>
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
              <p>Biografi</p>
              <p>Adgy Irawan</p>
            </div>
            <div className={classes.bioDesc}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi mattis sagittis aliquet volutpat arcu lorem amet. Nibh pellentesque feugiat est, sed augue sit et. Diam mi, nisi, neque senectus et. Mauris, imperdiet sodales magna nibh odio scelerisque dapibus purus tellus. Velit mi pellentesque diam cursus nam varius. Ornare sagittis, amet, non ultricies. A</p>
            </div>
          </div>
        </div>
        <div className={classes.biofemaleWrapper}>
          <img src={bioFemale} alt="male" className={classes.maleImage} />
          <div className={classes.contentWrapper}>
            <div className={classes.bioTitle}>
              <p>Biografi</p>
              <p>Yenny</p>
            </div>
            <div className={classes.bioDesc}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi mattis sagittis aliquet volutpat arcu lorem amet. Nibh pellentesque feugiat est, sed augue sit et. Diam mi, nisi, neque senectus et. Mauris, imperdiet sodales magna nibh odio scelerisque dapibus purus tellus. Velit mi pellentesque diam cursus nam varius. Ornare sagittis, amet, non ultricies. A</p>
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

  const generatePoemSection = () => {
    return (
      <div className={classes.poemContainer}>
        <div className={classes.poemTitle}>
          <p>Puisi</p>
        </div>
        <div className={classes.poemWrapper}>
          <div className={classes.top}>
            <p>Hanya suara burung yang kau dengar
              dan tak pernah kaulihat burung itu
              tapi tahu burung itu ada di sana
            </p>
          </div>
          <div className={classes.mid}>
            <p>
              Hanya desir angin yang kaurasa
              dan tak pernah kaulihat angin itu
              tapi percaya angin itu di sekitarmu
            </p>
          </div>
          <div className={classes.bottom}>
            <p>
              Hanya doaku yang bergetar malam ini
              dan tak pernah kaulihat siapa aku
              tapi yakin aku ada dalam dirimu
            </p>
          </div>
        </div>
      </div>
    );
  };

  const generateBrides = () => {
    return (
      <div className={classes.bridesContainer}>
        <div className={classes.left}>
          <div className={classes.desc}>
            <p>Adhy Irawan</p>
            <p>Putra Ketiga Bapak H. Padma Sujatma (Alm)</p>
            <p>&</p>
            <p>Ibu Hj. Ihat Suprihatin</p>
          </div>
          <img src={frameMale} alt="brides" />
        </div>
        <div className={classes.right}>
          <img src={frameFemale} alt="brides" />
          <div className={classes.desc}>
            <p>Yenny Tsara Azizah</p>
            <p>Putri Bungsu Bapak Muhammad Syarif (Alm)</p>
            <p>&</p>
            <p>Ibu Tetty Herawati</p>
          </div>
        </div>
      </div>
    );
  };

  const generateGallery = () => {
    return (
      <div className={classes.galleryContainer}>
        <div className={classes.topContent}>
          <div className={classes.upper}>
            <img src={gallery1} alt="gallery" />
            <img src={gallery2} alt="gallery" />
          </div>
          <div className={classes.lower}>
            <img src={gallery3} alt="gallery" />
            <img src={gallery4} alt="gallery" />
          </div>
        </div>
        <div className={classes.bottomContent}>
          <div className={classes.left}>
            <div className={classes.top}>
              <img src={gallery5} alt="gallery" />
              <img src={gallery6} alt="gallery" />
            </div>
            <img src={gallery7} alt="gallery" />
          </div>
          <div className={classes.right}>
            <div className={classes.top}>
              <img src={gallery8} alt="gallery" />
            </div>
            <img src={gallery9} alt="gallery" />
          </div>
        </div>
        <div className={classes.topContent}>
          <div className={classes.upper}>
            <img src={gallery1} alt="gallery" />
            <img src={gallery2} alt="gallery" />
          </div>
          <div className={classes.lower}>
            <img src={gallery3} alt="gallery" />
            <img src={gallery4} alt="gallery" />
          </div>
        </div>
      </div>
    );
  };

  const secondImageSection = () => {
    return (
      <div className={classes.paralaxx}>
        <div className={classes.paralaxxWraper}>
        </div>
      </div>
    );
  };

  const iosSecondImageSection = () => {
    return (
      <div className={classes.iosSecondImageSection}>
        <img src={Story} className={classes.secondImageIOS} alt="secondary" />
      </div>
    );
  };

  const summarySection = () => {
    return (
      <div className={classes.summary}>
        <div className={classes.bg}>
          <div className={classes.summaryWraper}>
            <Fade duration={4000}>
              <div className={classes.title}>
                <p>
                  Cerita Kita
                </p>
              </div>
              <div className={classes.summaryAnimation}>
                <p className={classes.summarySection}>
                  Kali pertama berjumpa<br />
                  Adalah saat senyum lebih bisa dipahami daripada kalimat manusia, <br />
                  Sementara secangkir kopi hitam engkau hidangkan di meja, <br />
                  Ku ikuti ayunan langkahmu yang menari <br />
                  Diiringi derit bunyi lantai kayu malam itu.<br /><br />
                  Dibalik celah sesekali kau curi pandang kepadaku,<br />
                  Sementara kusiapkan taktik untuk merebut hatimu.<br />
                  Tak butuh waktu lama, rasa kita ternyata sama<br />
                  Sama-sama saling mencinta, sama-sama bosan pacaran<br />
                  Pun dengan berbagai drama yang itu-itu saja<br /><br />
                  Ku adukan kepada orangtua, aku ingin engkau saja<br />
                  Awal bulan depan, di tahun yang masih belia<br />
                  Kupinang engkau dengan maskawin alakadarnya.
                </p>
              </div>
              <img src={wingg} alt='wingBottom' />
            </Fade>
          </div>
        </div>
      </div>
    );
  };

  const generateBridesProfile = () => {
    return (
      <div className={classes.bridesProfileContainer}>
        <div className={classes.wingWrapper}>
          <img className={classes.image} src={WingTop} alt="wing" />
        </div>
        <div className={classes.profileWrapper}>
          <Fade left duration={3000}>
            <div className={classes.card}>
              <img className={classes.bridesImage} src={Female} alt="brides" />
              <div className={classes.profileInfo}>
                <p className={classes.bridess}>Silmiati Azmi</p>
                <p className={classes.parents}>Putri Bungsu dari{width === 'lg' && <br />} Bapak Muhammad Syarif (Alm) & Ibu Tetty Herawati</p>
              </div>
            </div>
          </Fade>
          <Fade right duration={3000}>
            <div className={classes.card}>
              <img className={classes.bridesImage} src={Male} alt="brides" />
              <div className={classes.profileInfo}>
                <p className={classes.bridess}>Ridwan Krisdiansyah</p>
                <p className={classes.parents}>Putra Ketiga dari{width === 'lg' && <br />} Bapak H. Padma Sujatma (Alm) & Ibu Hj. Ihat Suprihatin</p>
              </div>
            </div>
          </Fade>
        </div>
        <div className={classes.wingWrapper}>
          <img className={classes.image} src={WingBottom} alt="wing" />
        </div>
      </div>
    );
  };

  const eventDetail = () => {
    return (
      <div className={classes.event}>
        <Fade delay={1000} duration={4000}>
          <img className={classes.topEvent} src={EventIcon} alt='top' />
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
                MINGGU, 09 JANUARI 2022
              </p>
            </div>
            <div className={classes.btnCalendarWrapper}>
              <p>Tambahkan ke Kalender</p>
            </div>
            <div className={classes.timesWraper}>
              {width === 'lg' ? (
                <>
                  <div className={classes.time}>
                    <img src={time} alt='time' />
                    <p>AKAD : PUKUL 09.00 WIB</p>
                  </div>
                  <div className={classes.time}>
                    <img src={time} alt='time' />
                    <p>
                      RESEPSI : PUKUL 10.00 WIB s/d Selesai
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className={classes.timeMobileWrapper}>
                    <img src={time} alt='time' />
                    <p>AKAD</p>
                    <div className={classes.separator} />
                    <p>10.00 WIB - SELESAI</p>
                  </div>
                  <div className={classes.timeMobileWrapper}>
                    <img src={time} alt='time' />
                    <p>RESEPSI</p>
                    <div className={classes.separator} />
                    <p>10.00 WIB - SELESAI</p>
                  </div>
                </>
              )}
            </div>
            <div className={classes.locationWraper}>
              <img src={Location} alt='location' />
              <p>
                KP. MULYASARI, RT. 01 RW. 02 DS. CIKADU KEC. CIBEBER KAB. LEBAK. BANTEN.
              </p>
            </div>
            <div onClick={goToMaps} className={classes.btnmap}>
              <p>Menuju Lokasi</p>
              <div className={classes.imageWrapper}>
                <img src={plane} alt='gotomap' />
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  };

  const thirdImageSeparator = () => {
    return (
      <div>
        <div className={classes.thirdImageSection}>
          <div className={classes.paralaxxWraper}></div>
        </div>
      </div>
    );
  };

  const iosThirdImageSeparator = () => {
    return (
      <div>
        <div className={classes.iosThirdImageSeparator}>
          <img src={ThirdImageSM} alt="" className={classes.thirdImage} />
        </div>
      </div>
    );
  };

  // const generatePoemSection = () => {
  //   return (
  //     <div className={classes.poemSectionContainer}>
  //       <div className={classes.poemContainer}>
  //         <div className={classes.bg}>
  //           <img src={Frame} alt="frame" />
  //         </div>
  //         <div className={classes.poemWrapper}>
  //           <Fade duration={4000}>
  //             <div className={classes.poemTop}>
  //               <p>Mama yang tercinta</p>
  //               <p>Akhirnya kutemukan juga jodohku</p>
  //               <p>Seseorang bagai kau</p>
  //               <p>Sederhana dalam tingkah dan bicara</p>
  //               <p>Serta sangat menyayangiku</p>
  //             </div>
  //             <div className={classes.poemMid}>
  //               <p>Mama</p>
  //               <p>Burung dara jantan nakal yang sejak dulu kau pelihara</p>
  //               <p>Kini terbang dan menemui jodohnya</p>
  //             </div>
  //             <div className={classes.poemBottom}>
  //               <p>Mama</p>
  //               <p>Aku telah menemukan jodohku</p>
  //               <p>Janganlah engkau cemburu</p>
  //               <p>Hendaklah hatimu yang baik itu mengerti</p>
  //               <p>Pada waktunya</p>
  //               <p>Aku mesti kau lepas pergi</p>
  //             </div>
  //           </Fade>
  //           <Fade bottom duration={3000}>
  //             <p className={classes.author}>W.S. Rendra</p>
  //           </Fade>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

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
              <img src={Icon} alt="gunungan" />
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
            <div className={classes.leftSection}>
              <img src={gunungan} alt="gunungan" />
              <p>“ Seutas Doa & Ucapan Untuk Kedua Mempelai ”</p>
            </div>
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
              <div className={classes.copyWraper}>
                <img className={classes.copy} src={numbercopy} onClick={copyText} alt="copy-text" />
                <p className={classes.notifCopy}>{notif}</p>
              </div>
            </div>
            <div className={classes.infoWrapper}>
              <p className={classes.infoTitle}>Alamat Pengiriman Hadiah Fisik</p>
              <p className={classes.infoDetail}>
                Nama : Ridwan Krisdiansyah <br />
                Alamat : Kp. Babakan RT.001/002 Ds. Cisungsang Kec. Cibeber,<br />Kab. Lebak, Banten. 42394
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
        <p className={classes.colaboration}>In Colaboration</p>
        <img className={classes.brand} alt='techartsyGold' src={width === 'lg' ? logoGold : logoSm} />
        <a
          rel="noreferrer"
          href="https://wa.me/62895706454243?text=Hallo%20saya%20mau%20pesan%20Undangan%20..."
          target="_blank">
          <img className={classes.contact} src={whatsapp} alt="whatsapp" />
        </a>
      </div >
    );
  };

  const generateInvitation = () => {
    return (
      <div className={classes.invitationContainer}>
        {generateHeader()}
        {generateBiography()}
        {generateInvocation()}
        {generatePoemSection()}
        {generateBrides()}
        {generateGallery()}
        {/* {generateStory()}
        {generateSecondStory()} */}
        {/* {!isIOS ? secondImageSection() : iosSecondImageSection()} */}
        {/* {summarySection()} */}
        {/* {generateBridesProfile()} */}
        {eventDetail()}
        {/* {!isIOS ? thirdImageSeparator() : iosThirdImageSeparator()} */}
        {/* {generatePoemSection()} */}
        {attendingSection()}
        {giftSection()}

        {generateMessageSection()}
        {closingSection()}
        {footerSection()}
        {/* <AudioComponent isPlaying={isPlaying} setIsPlaying={setIsPlaying} /> */}
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