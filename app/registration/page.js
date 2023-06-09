'use client'

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Link, scroller, Events, scrollSpy  } from 'react-scroll';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Country, State, City } from 'country-state-city';
import { GrLinkedin } from 'react-icons/gr';
import { GoLocation } from 'react-icons/go';
import { IoMdAdd } from 'react-icons/io';
import { VscCloudDownload } from 'react-icons/vsc';
import { FaTwitterSquare, FaFacebookSquare, FaUser } from 'react-icons/fa';
import customStyle from '../customStyle';
import languages from '../data/languages.json';
import business from '../data/business.json';
import activitySector from '../data/activitySector.json';
import Footer from '../components/Footer';
import MenuList from '../components/MenuList';
import OfficeLocations from './OfficeLocations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ScaleLoader from "react-spinners/ScaleLoader";


function Registration() {

 const router = useRouter();

  //----handle scroll--------------------------------//
  const scrollContainerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = () => {
    const sections = ['general-info', 'contact-info', 'industry-sector', 'languages', 'office-location', 'social-media'];

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element && isElementInViewport(element)) {
        setActiveSection(sectionId);
        scrollSpy.update();
        break;
      }
    }
  };

  const isElementInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  useEffect(() => {
    Events.scrollEvent.register('scroll', handleScroll);
    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove('scroll');
    };
  }, []);

  const scroll = () => {
    const id = location.hash.substr(1)
    if (id) scroller.scrollTo(id, {smooth: true, duration})
  }
  

  //------Handle Data------------------------------------//
  //General Information
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [street, setStreet] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [ourServices, setOurServices] = useState('');
  const [website, setWebsite] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');

  const validLink = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(:\d{1,5})?(\/[^\s]*)?$/;


  const countries = Country.getAllCountries();
  const states = State.getAllStates();
  const cities = City.getAllCities();

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption);
    setState(null);
  };

  const handleStateChange = (selectedOption) => {
    setState(selectedOption);
    setCity(null);
  };

  const StateOfCountry = country ? states.filter((state) => state.countryCode === country.value) : [];


  const CityOfCountry = state ? cities.filter((city) => city.stateCode === state.value)
    : country && country.value ? cities.filter((city) => city.countryCode === country.value) : [];


  const handleCity = (field, value) => {
    switch (field) {
      case 'cityOptions':
        setCity(value)
        break

      default:
        break
    }
  }

  //------upload Logo----------//
  const [file, setFile] = useState('');
  const [logoPath, setLogoPath] = useState('');


  function storeLogo(e) {
    console.log('Getting logo file...')
    setFile(e.target.files[0]);
  };

  const saveFile = async (e) => {
    e.preventDefault();

    if (file) {
      setIsLoading(true);
      const fileName = dataAccount.idUser + '_' + encodeURIComponent(file.name)
      const fileType = encodeURIComponent(file.type)
      await axios.post("/api/uploadLogo", { fileName: fileName, fileType: fileType })
        .then(res => {
          const url = res.data;
          //console.log(url)
          fetch(url, {
            body: file,
            headers: { "Content-Type": fileType, "Access-Control-Allow-Origin": '*' },
            method: 'PUT'
          }).then(async (response) => {
            // console.log('Envoi Success: response.url,')
            setLogoPath(response.url)
            const resume = {
              name: file.name.split('.')[0],
              logoPath: response.url,
            }
            await axios.post("https://referme-server.herokuapp.com/files/addCheckedDocument", { dataResume: resume }, { withCredentials: true })
              .then((res) => {
                console.log(res)
              })
              .catch((err) => {
                console.log(err)
              });
          }).catch(console.error());
        })
        .catch(console.error());
    } else {
      toast.info('No files found', { toastId: 'success1', });
    }
  };

  //Contact Information
  const [mainContactFirstName, setMainContactFirstName] = useState('');
  const [mainContactLastName, setMainContactLastName] = useState('');
  const [mainContactFirstEmail, setMainContactEmail] = useState('');
  const [mainContactPhone, setMainContactPhone] = useState('');
  const [mainAdmin, setMainAdmin] = useState(false);

  const [secondContactFirstName, setSecondContactFirstName] = useState('');
  const [secondContactLastName, setSecondContactLastName] = useState('');
  const [secondContactEmail, setSecondContactEmail] = useState('');
  const [secondContactPhone, setSecondContactPhone] = useState('');
  const [secondAdmin, setSecondAdmin] = useState(false);

  const [thirdContactFirstName, setThirdContactFirstName] = useState('');
  const [thirdContactLastName, setThirdContactLastName] = useState('');
  const [thirdContactEmail, setThirdContactEmail] = useState('');
  const [thirdContactPhone, setThirdContactPhone] = useState('');
  const [thirdAdmin, setThirdAdmin] = useState(false);

  const [fourthContactFirstName, setFourthContactFirstName] = useState('');
  const [fourthContactLastName, setFourthContactLastName] = useState('');
  const [fourthContactEmail, setFourthContactEmail] = useState('');
  const [fourthContactPhone, setFourthContactPhone] = useState('');
  const [fourthAdmin, setFourthAdmin] = useState(false);

  const [fifthContactFirstName, setFifthContactFirstName] = useState('');
  const [fifthContactLastName, setFifthContactLastName] = useState('');
  const [fifthContactEmail, setFifthContactEmail] = useState('');
  const [fifthContactPhone, setFifthContactPhone] = useState('');
  const [fifthAdmin, setFifthAdmin] = useState(false);


  const [showSecondContact, setSecondContact] = useState(false);
  const [showThirdContact, setThirdContact] = useState(false);
  const [showFourthContact, setFourthContact] = useState(false);
  const [showFifthContact, setFifthContact] = useState(false);

  const validPhone = /^(\+\d{1,3}\s?)?(\(\d{1,3}\)|\d{1,3})[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;




  const showContact = () => {
    setSecondContact(true)
    if (showSecondContact) {
      setThirdContact(true)
    }
    if (showThirdContact) {
      setFourthContact(true)
    }
    if (showFourthContact) {
      setFifthContact(true)
    }
  };

  //Industry Sector
    const [businessSector, setBusinessSector] = useState('');
    const [selectedActivity, setSelectedActivity] = useState([]);
    const [anotherBusinessSector, setAnotherBusiness] = useState([]);

    const handleBusinessChange = (option) => {
      setBusinessSector(option);
      setSelectedActivity([]);
    };

    const activityOfBusiness = businessSector ? activitySector[businessSector.value] : [];


  const organizationTypeOptions = [{ value: 'Incorporated', label: 'Incorporated' }, { value: 'Non-profit organization', label: 'Non-profit organization' },
  { value: 'Sole proprietor', label: 'Sole proprietor' }, { value: 'Government entity', label: 'Government entity' }]
  const [organizationType, setOrganizationType] = useState('');

  const companysSizesOptions = [{ value: '5 - 10', label: '5 - 10' }, { value: '10 - 100', label: '10 - 100' },
  { value: '100 - 500', label: '100 - 500' }, { value: '500 - 2000', label: '500 - 2000' },
  { value: '2000 +', label: '2000 (+)' }]
  const [companySize, setCompanySize] = useState('');

  //language
  const [language, setLanguage] = useState([]);

  //social media
  const [linkedin, setLinkedin] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');

  const linkedinLink = /^(https?:\/\/)?(www\.)?linkedin\.com\/company\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+$/;
  const facebookLink = /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9_.-]+$/;
  const twitterLink = /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_]+$/;

  //office location
  const [nameValue, setOfficeName] = useState('');
  const [contactValue, setOfficeContact] = useState('');
  const [countryValue, setOfficeCountry] = useState('');
  const [stateValue, setOfficeState] = useState('');
  const [cityValue, setOfficeCity] = useState('');
  const [streetValue, setOfficeStreet] = useState('');
  const [languageValue, setOfficeLanguage] = useState([]);
  const [officeList, setOfficeList] = useState([]);

  const officeNameRef = useRef();
  const officeContactRef = useRef();
  const officeStreetRef = useRef();

  const statesOffice = State.getAllStates();
  const citiesOffice = City.getAllCities();

  const handleCountry = (selectedOption) => {
    setOfficeCountry(selectedOption);
    setOfficeState(null);
  };

  const handleState = (selectedOption) => {
    setOfficeState(selectedOption);
    setOfficeCity(null);
  };

  const StateOfficeOptions = countryValue ? statesOffice.filter((state) => state.countryCode === countryValue.value) : [];


  const CityOfficeOptions = stateValue ? citiesOffice.filter((city) => city.stateCode === stateValue.value)
    : countryValue && countryValue.value ? citiesOffice.filter((city) => city.countryCode === countryValue.value) : [];


  const handleCityOffice = (field, value) => {
    switch (field) {
      case 'cityOfficeOptions':
        setOfficeCity(value)
        break

      default:
        break
    }
  }

  const [officeLocation, setOfficeLocation] = useState({ officeName: '', officeContact: '', officeCountry: [], officeState: [], officeCity: [], officeStreet: '', officeLanguage: [] });

  const addOffice = (e) => {
    e.preventDefault();


    if (nameValue !== '', countryValue !== '') {
      setOfficeLocation(prevState => ({
        ...prevState,
        officeName: nameValue,
        officeContact: contactValue,
        officeCountry: countryValue ? countryValue : [],
        officeState: stateValue ? stateValue : [],
        officeCity: cityValue ? cityValue : [],
        officeStreet: streetValue,
        officeLanguage: languageValue ? languageValue.map(el => el.label) : [],
        id: Math.random()
      }))

      const newOffice = {
        ...officeLocation,
        officeName: nameValue,
        officeContact: contactValue,
        officeCountry: countryValue ? countryValue.label : [],
        officeState: stateValue ? stateValue.label : [],
        officeCity: cityValue ? cityValue.label : [],
        officeStreet: streetValue,
        officeLanguage: languageValue ? languageValue.map(el => el.label) : [],
        id: Math.random()
      }

      setOfficeLocation(newOffice)
      setOfficeList(officeList.concat(newOffice))

      setOfficeName('');
      setOfficeContact('');
      setOfficeCountry('');
      setOfficeState('');
      setOfficeCity('');
      setOfficeStreet('');
      setOfficeLanguage('');

      officeNameRef.current.value = '';
      officeContactRef.current.value = '';
      officeStreetRef.current.value = '';
    }
  };

  //remove office location
  const removeOffice = (id) => {
    const officeArr = officeList.filter(el => el.id !== id);
    setOfficeList(officeArr)
  }

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(officeList.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOffice = officeList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //--------Send data-----------------------------------------------//

  const [saveLoading, setSaveLoading] = useState(false);

  const sendData = async (e) => {
    e.preventDefault();

    const dataAccount = JSON.parse(localStorage.getItem('account.connected'))
    setSaveLoading(true)

    const dataCompany = {
      companyName: companyName,
      country: country.label,
      state: state ? state.label : [],
      city: city ? city.label : [],
      street: street,
      aboutUs: aboutUs,
      ourServices: ourServices,
      website: website,
      businessNumber: businessNumber,
      logoPath: logoPath,

      businessSector: businessSector.label,
      selectedActivity: selectedActivity ? selectedActivity.map(el => el.label) : [],
      anotherBusinessSector: anotherBusinessSector ? anotherBusinessSector.map(el => el.label) : [],
      organizationType: organizationType.label,
      companySize: companySize.label,

      language: language ? language.map(el => el.label) : [],

      linkedin: linkedin,
      facebook: facebook,
      twitter: twitter,

      idUser: dataAccount.userId
    }

    const dataContact = {
      mainContactFirstName: mainContactFirstName,
      mainContactLastName: mainContactLastName,
      mainContactFirstEmail: mainContactFirstEmail,
      mainContactPhone: mainContactPhone,
      mainAdmin: mainAdmin,

      secondContactFirstName: secondContactFirstName,
      secondContactLastName: secondContactLastName,
      secondContactEmail: secondContactEmail,
      secondContactPhone: secondContactPhone,
      secondAdmin: secondAdmin,

      thirdContactFirstName: thirdContactFirstName,
      thirdContactLastName: thirdContactLastName,
      thirdContactEmail: thirdContactEmail,
      thirdContactPhone: thirdContactPhone,
      thirdAdmin: thirdAdmin,

      fourthContactFirstName: fourthContactFirstName,
      fourthContactLastName: fourthContactLastName,
      fourthContactEmail: fourthContactEmail,
      fourthContactPhone: fourthContactEmail,
      fourthAdmin: fourthAdmin,

      fifthContactFirstName: fifthContactFirstName,
      fifthContactLastName: fifthContactFirstName,
      fifthContactEmail: fifthContactEmail,
      fifthContactPhone: fifthContactPhone,
      fifthAdmin: fifthAdmin
    }


    const list_office = []
    officeList.forEach(el => {
      const officeItem = {
        officeName: el.officeName,
        officeContact: el.officeContact,
        officeCountry: el.officeCountry,
        officeState: el.officeState,
        officeCity: el.officeCity,
        officeStreet: el.officeStreet,
        officeLanguage: el.officeLanguage,
        id: Math.random()
      }
      list_office.push(officeItem)
    })

    // saveFile()
    const data = {
      dataCompany: dataCompany,
      dataContact: dataContact,
      officeLocations: list_office
    }


    if (businessNumber && !validPhone.test(businessNumber)) {
      toast.warning('The phone of business number is not valid', { toastId: 'success1', });
    }
    else if (mainContactPhone && !validPhone.test(mainContactPhone)) {
      toast.warning('The phone number of main contact is not valid', { toastId: 'success1', });
    }
    else if (secondContactPhone && !validPhone.test(secondContactPhone)) {
      toast.warning('The phone number of second contact is not valid', { toastId: 'success1', });
    }
    else if (thirdContactPhone && !validPhone.test(thirdContactPhone)) {
      toast.warning('The phone number of third contact is not valid', { toastId: 'success1', });
    }
    else if (fourthContactPhone && !validPhone.test(fourthContactPhone)) {
      toast.warning('The phone number of fourth contact is not valid', { toastId: 'success1', });
    }
    else if (fifthContactPhone && !validPhone.test(fifthContactPhone)) {
      toast.warning('The phone number of fifth contact is not valid', { toastId: 'success1', });
    }
    else if (mainContactFirstEmail && !validEmail.test(mainContactFirstEmail)) {
      toast.warning('Main contact: Invalid email format', { toastId: 'success1', });
    }
    else if (secondContactEmail && !validEmail.test(secondContactEmail)) {
      toast.warning('Second contact: Invalid email format', { toastId: 'success1', });
    }
    else if (thirdContactEmail && !validEmail.test(thirdContactEmail)) {
      toast.warning('Third contact: Invalid email format', { toastId: 'success1', });
    }
    else if (fourthContactEmail && !validEmail.test(fourthContactEmail)) {
      toast.warning('Fourth contact: Invalid email format', { toastId: 'success1', });
    }
    else if (fifthContactEmail && !validEmail.test(fifthContactEmail)) {
      toast.warning('Fifth contact: Invalid email format', { toastId: 'success1', });
    }
    else if (website && !validLink.test(website)) {
      toast.warning('The link to your website is not valid', { toastId: 'success1', });
    }
    else if (linkedin && !linkedinLink.test(linkedin)) {
      toast.warning('The linkedin link is not valid', { toastId: 'success1', });
    }
    else if (facebook && !facebookLink.test(facebook)) {
      toast.warning('The facebook link is not valid', { toastId: 'success1', });
    }
    else if (twitter && !twitterLink.test(twitter)) {
      toast.warning('The twitter link is not valid', { toastId: 'success1', });
    }


    else {
      try {
        await axios.post("https://refercomp-server.herokuapp.com/company/add", data, { withCredentials: true }).then((res) => {
          console.log(res)
          // router.push('/')
        })

      } catch (error) {
        console.log(error)
      }
    }
  };



  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient">
      <div className="flex items-center bg-white-500 rounded-lg p-4 h-[90%] overflow-hidden w-[88%] lg:w-[60%]">

        <nav className="hidden md:flex flex-col h-[95%] justify-between mr-8 border border-gray-400 shadow-md rounded-lg p-2">
          <ul className="space-y-2">
            <li>
              <Link to="general-info" spy={true} smooth={true} duration={800} containerId="scroll-container" offset={-20} activeClass='bg-blue rounded-xl text-white-500'
                onClick={scroll}
                className={`px-2 py-1 whitespace-nowrap cursor-pointer ${activeSection === 'general-info' && 'bg-blue rounded-xl text-white-500'}`}
              >
                General Information
              </Link>
            </li>

            <li>
              <Link to="contact-info" spy={true} smooth={true} duration={800} containerId="scroll-container" offset={-20} activeClass='bg-blue rounded-xl text-white-500'
                onClick={scroll}
                className={`px-2 py-1 whitespace-nowrap cursor-pointer ${activeSection === 'contact-info' && 'bg-blue rounded-xl text-white-500'}`}>
                Contact Information
              </Link>
            </li>

            <li>
              <Link to="industry-sector" spy={true} smooth={true} duration={800} containerId="scroll-container" offset={-20} activeClass='bg-blue rounded-xl text-white-500'
                onClick={scroll}
                className={`px-2 py-1 whitespace-nowrap cursor-pointer ${activeSection === 'industry-sector' && 'bg-blue rounded-xl text-white-500'}`}>
                Industry Sector
              </Link>
            </li>

            <li>
              <Link to="languages" spy={true} smooth={true} duration={800} containerId="scroll-container" offset={-20} activeClass='bg-blue rounded-xl text-white-500'
                onClick={scroll}
                className={`px-2 py-1 whitespace-nowrap cursor-pointer ${activeSection === 'languages' && 'bg-blue rounded-xl text-white-500'}`}>
                Languages
              </Link>
            </li>

            <li>
              <Link to="office-location" spy={true} smooth={true} duration={800} containerId="scroll-container" offset={-20} activeClass='bg-blue rounded-xl text-white-500'
                onClick={scroll}
                className={`px-2 py-1 whitespace-nowrap cursor-pointer ${activeSection === 'office-location' && 'bg-blue rounded-xl text-white-500'}`}>
                Office Locations
              </Link>
            </li>

            <li>
              <Link to="social-media" spy={true} smooth={true} duration={800} containerId="scroll-container" offset={-20} activeClass='bg-blue rounded-xl text-white-500'
                onClick={scroll}
                className={`px-2 py-1 whitespace-nowrap cursor-pointer ${activeSection === 'social-media' && 'bg-blue rounded-xl text-white-500'}`}>
                Social Media
              </Link>
            </li>
          </ul>
        </nav>


        <form ref={scrollContainerRef} id="scroll-container" className="h-[95%] w-full md:w-[75%] overflow-y-scroll scrollbar rounded-xl space-y-9 p-3">

          {/* General Information************************/}
          <section id="general-info">
            <h3 className='text-xl font-semibold mb-2'>General Information</h3>

            <div className='ml-2'>
              <label className='block italic'>Company name <span className='text-red'>*</span></label>
              <input type='text' className='inputstyle w-72' onChange={(e) => setCompanyName(e.target.value)} />
            </div>


            <div className='flex items-center ml-2 mt-5'>
              <GoLocation className='text-blue mr-1 mb-1' />
              <h4 className='font-bold'>Main office / Headquarter </h4>
            </div>

            <div className='md:flex items-center ml-2 mt-2'>
              <div>
                <label className='block italic'>Country <span className='text-red'>*</span></label>
                <Select options={countries.map((country) => ({
                  value: country.isoCode,
                  label: country.name,
                }))}
                  value={country}
                  onChange={handleCountryChange}
                  styles={customStyle}
                  placeholder=''
                  isClearable
                  className="my-react-select-container text-sm w-72 md:w-[215px] mr-5 mb-3 md:mb-0"
                  classNamePrefix="my-react-select"
                />
              </div>

              <div>
                <label className='block italic'>State / Province <span className='text-red'>*</span></label>
                <Select options={StateOfCountry.map((state) => ({
                  value: state.isoCode,
                  label: state.name,
                }))}
                  value={state}
                  onChange={handleStateChange}
                  components={{ MenuList }}
                  styles={customStyle}
                  placeholder=''
                  isClearable
                  className="my-react-select-container text-sm w-72 md:w-[215px] mr-5 mb-3 md:mb-0"
                  classNamePrefix="my-react-select"
                />
              </div>
            </div>

            <div className='md:flex items-center ml-2 mt-3'>
              <div>
                <label className='block italic'>City <span className='text-red'>*</span></label>
                <CreatableSelect options={CityOfCountry.map((state) => ({
                  value: state.stateCode,
                  label: state.name,
                }))}
                  onChange={(value) => handleCity('cityOptions', value)}
                  components={{ MenuList }}
                  value={city}
                  styles={customStyle}
                  placeholder=''
                  isClearable
                  className="my-react-select-container text-sm w-72 md:w-[215px]"
                  classNamePrefix="my-react-select"
                />
              </div>

              <div className='mt-3 md:mt-0 md:ml-6'>
                <label className='block italic'>Street address</label>
                <input type='text' className='inputstyle w-72 md:w-[215px]' onChange={(e) => setStreet(e.target.value)} />
              </div>
            </div>

            <div className='ml-2 mt-3'>
              <label className='block italic'>Business number <span className='text-red'>*</span></label>
              <input type='text' className='inputstyle w-72' onChange={(e) => setBusinessNumber(e.target.value)} />
            </div>

            <div className='ml-2 mt-3'>
              <label className='block italic'>Website</label>
              <input type='text' className='inputstyle w-72 placeholder-gray-400' placeholder='https://www.mywebsite.com'
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>


            <div className="relative flex items-center justify-center border border-gray-400 hover:border-blue rounded-md mt-5 ml-2 h-28 w-28">
              <input type="file" accept="image/png, image/gif, image/jpeg"
                onChange={(e) => storeLogo(e)}
                className="absolute z-20 w-full h-full opacity-0 cursor-pointer" />
              <div className='absolute z-10 p-2 text-center flex flex-col items-center justify-center'>
                {file == "" ? <>
                  <p className='text-sm'>Upload your Logo</p>
                  <VscCloudDownload className='text-2xl text-blue' />
                </>
                  :
                  <p className='text-sm text-blue'>{file.name ? file.name : ''}</p>
                }

              </div>
            </div>


            <div className='ml-2 mt-3'>
              <label className='block italic'>About us</label>
              <textarea onChange={e => setAboutUs(e.target.value)}
                className='border border-[#CCCCCC] text-sm outline-none overflow-hidden h-24  p-2 w-full rounded-md focus:border-royaleblue focus:ring-royaleblue focus:ring-1 placeholder-gray-400'>
              </textarea>
            </div>

            <div className='ml-2 mt-3'>
              <label className='block italic'>Our services</label>
              <textarea onChange={e => setOurServices(e.target.value)}
                className='border border-[#CCCCCC] text-sm outline-none overflow-hidden h-24  p-2 w-full rounded-md focus:border-royaleblue focus:ring-royaleblue focus:ring-1 placeholder-gray-400'>
              </textarea>
            </div>
          </section>


          {/* Contact Information*************************/}
          <section id="contact-info">
            <h3 className='text-xl font-semibold mb-2'>Contact Information</h3>

            <div className='ml-2'>
              <div className='flex items-center'>
                <FaUser className='text-blue mb-1 mr-1' />
                <p>Main contact details <span className='text-red'>*</span></p>
              </div>

              <div className='md:flex items-center'>
                <div>
                  <label className='block italic'>Fisrt name <span className='text-red'>*</span></label>
                  <input type='text' className='inputstyle w-72 md:w-56' onChange={(e) => setMainContactFirstName(e.target.value)} />
                </div>

                <div className='mt-3 md:mt-0 md:ml-3'>
                  <label className='block italic'>Last name <span className='text-red'>*</span></label>
                  <input type='text' className='inputstyle w-72 md:w-56' onChange={(e) => setMainContactLastName(e.target.value)} />
                </div>

              </div>

              <div className='md:flex items-center mt-3'>
                <div>
                  <label className='block italic'>Email <span className='text-red'>*</span></label>
                  <input type='email' className='inputstyle w-72 md:w-56' onChange={(e) => setMainContactEmail(e.target.value)} />
                </div>

                <div className='mt-3 md:mt-0 md:ml-3'>
                  <label className='block italic'>Phone number <span className='text-red'>*</span></label>
                  <input type='number' className='inputstyle w-72 md:w-56' onChange={(e) => setMainContactPhone(e.target.value)} />

                </div>
              </div>

              <div className='mt-3 space-x-3'>
                <label htmlFor='mainContactFirstName'>Super admin</label>
                <input type='radio' id='mainContactFirstName' name='admin' className='border-blue focus:ring-0 cursor-pointer'
                  value='main' onChange={e => setMainAdmin(e.target.checked)}
                />
              </div>

            </div>

            {showSecondContact && <div className='ml-2 mt-6'>
              <div className='flex items-center'>
                <FaUser className='text-blue mb-1 mr-1' />
                <p>Second contact details</p>
              </div>

              <div className='md:flex items-center'>
                <div>
                  <label className='block italic'>Fisrt name</label>
                  <input type='text' className='inputstyle w-72 md:w-56' onChange={(e) => setSecondContactFirstName(e.target.value)} />
                </div>

                <div className='mt-3 md:mt-0 md:ml-3'>
                  <label className='block italic'>Last name</label>
                  <input type='text' className='inputstyle w-72 md:w-56' onChange={(e) => setSecondContactLastName(e.target.value)} />
                </div>

              </div>

              <div className='md:flex items-center mt-3'>
                <div>
                  <label className='block italic'>Email</label>
                  <input type='email' className='inputstyle w-72 md:w-56' onChange={(e) => setSecondContactEmail(e.target.value)} />
                </div>

                <div className='mt-3 md:mt-0 md:ml-3'>
                  <label className='block italic'>Phone number</label>
                  <input type='number' className='inputstyle w-72 md:w-56' onChange={(e) => setSecondContactPhone(e.target.value)} />
                </div>
              </div>

              <div className='mt-3 space-x-3'>
                <label htmlFor='secondContactFirstName'>Super admin</label>
                <input type='radio' id='secondContactFirstName' name='admin' className='border-blue focus:ring-0 cursor-pointer'
                  value='second' onChange={e => setSecondAdmin(e.target.checked)}
                />
              </div>
            </div>}

            {showThirdContact && <div className='ml-2 mt-6'>
              <div className='flex items-center'>
                <FaUser className='text-blue mb-1 mr-1' />
                <p>Third contact details</p>
              </div>

              <div className='md:flex items-center'>
                <div>
                  <label className='block italic'>Fisrt name</label>
                  <input type='text' className='inputstyle w-72 md:w-56' onChange={(e) => setThirdContactFirstName(e.target.value)} />
                </div>

                <div className='mt-3 md:mt-0 md:ml-3'>
                  <label className='block italic'>Last name</label>
                  <input type='text' className='inputstyle w-72 md:w-56' onChange={(e) => setThirdContactLastName(e.target.value)} />
                </div>

              </div>

              <div className='md:flex items-center mt-3'>
                <div>
                  <label className='block italic'>Email</label>
                  <input type='email' className='inputstyle w-72 md:w-56' onChange={(e) => setThirdContactEmail(e.target.value)} />
                </div>

                <div className='mt-3 md:mt-0 md:ml-3'>
                  <label className='block italic'>Phone number</label>
                  <input type='number' className='inputstyle w-72 md:w-56' onChange={(e) => setThirdContactPhone(e.target.value)} />
                </div>
              </div>

              <div className='mt-3 space-x-3'>
                <label htmlFor='thirdContactFirstName'>Super admin</label>
                <input type='radio' id='thirdContactFirstName' name='admin' className='border-blue focus:ring-0 cursor-pointer'
                  value='third' onChange={e => setThirdAdmin(e.target.checked)}
                />
              </div>
            </div>}

            {showFourthContact && <div className='ml-2 mt-6'>
              <div className='flex items-center'>
                <FaUser className='text-blue mb-1 mr-1' />
                <p>Fourth contact details</p>
              </div>

              <div className='md:flex items-center'>
                <div>
                  <label className='block italic'>Fisrt name</label>
                  <input type='text' className='inputstyle w-72 md:w-56' onChange={(e) => setFourthContactFirstName(e.target.value)} />
                </div>

                <div className='mt-3 md:mt-0 md:ml-3'>
                  <label className='block italic'>Last name</label>
                  <input type='text' className='inputstyle w-72 md:w-56' onChange={(e) => setFourthContactLastName(e.target.value)} />
                </div>

              </div>

              <div className='md:flex items-center mt-3'>
                <div>
                  <label className='block italic'>Email</label>
                  <input type='email' className='inputstyle w-72 md:w-56' onChange={(e) => setFourthContactEmail(e.target.value)} />
                </div>

                <div className='mt-3 md:mt-0 md:ml-3'>
                  <label className='block italic'>Phone number</label>
                  <input type='number' className='inputstyle w-72 md:w-56' onChange={(e) => setFourthContactPhone(e.target.value)} />
                </div>
              </div>

              <div className='mt-3 space-x-3'>
                <label htmlFor='fourthContactFirstName'>Super admin</label>
                <input type='radio' id='fourthContactFirstName' name='admin' className='border-blue focus:ring-0 cursor-pointer'
                  value='fourth' onChange={e => setFourthAdmin(e.target.checked)}
                />
              </div>
            </div>}

            {showFifthContact && <div className='ml-2 mt-6'>
              <div className='flex items-center'>
                <FaUser className='text-blue mb-1 mr-1' />
                <p>Fifth contact details</p>
              </div>

              <div className='md:flex items-center'>
                <div>
                  <label className='block italic'>Fisrt name</label>
                  <input type='text' className='inputstyle w-72 md:w-56' onChange={(e) => setFifthContactFirstName(e.target.value)} />
                </div>

                <div className='mt-3 md:mt-0 md:ml-3'>
                  <label className='block italic'>Last name</label>
                  <input type='text' className='inputstyle w-72 md:w-56' onChange={(e) => setFifthContactLastName(e.target.value)} />
                </div>

              </div>

              <div className='md:flex items-center mt-3'>
                <div>
                  <label className='block italic'>Email</label>
                  <input type='email' className='inputstyle w-72 md:w-56' onChange={(e) => setFifthContactEmail(e.target.value)} />
                </div>

                <div className='mt-3 md:mt-0 md:ml-3'>
                  <label className='block italic'>Phone number</label>
                  <input type='number' className='inputstyle w-72 md:w-56' onChange={(e) => setFifthContactPhone(e.target.value)} />
                </div>
              </div>

              <div className='mt-3 space-x-3'>
                <label htmlFor='fifthContactFirstName'>Super admin</label>
                <input type='radio' id='fifthContactFirstName' name='admin' className='border-blue focus:ring-0 cursor-pointer'
                  value='fifth' onChange={e => setFifthAdmin(e.target.checked)}
                />
              </div>
            </div>}

            {!showFifthContact && <div className='flex items-center space-x-2 mt-6 hover:text-blue duration-300 cursor-pointer w-fit' onClick={showContact}>
              <IoMdAdd className='rounded-full shadow-lg border border-gray-400 text-xl' />
              <p>Add another contact</p>
            </div>}

          </section>


          {/* Industry Sector*****************************/}
          <section id="industry-sector">
            <h3 className='text-xl font-semibold mb-2'>Industry Sector</h3>

            <div className='ml-2'>
              <label className='block italic'>Business Sector <span className='text-red'>*</span></label>
              <Select options={business.map((el, i) => {
                return { id: i, value: el.value, label: el.label }
              })}
                value={businessSector}
                onChange={handleBusinessChange}
                styles={customStyle}
                placeholder=''
                isClearable
                className="my-react-select-container text-sm w-80"
                classNamePrefix="my-react-select"
              />
            </div>

            <div className='mt-3 ml-2'>
              <label className='block italic'>Activity Sector</label>
              <Select
                options={activityOfBusiness.length > 0 ? activityOfBusiness.map((el, i) => ({ id: i, value: el.value, label: el.label })) : []}
                value={selectedActivity}
                onChange={(selectedOptions) => setSelectedActivity(selectedOptions)}
                styles={customStyle}
                placeholder=''
                isClearable
                isMulti
                className="my-react-select-container text-sm w-80"
                classNamePrefix="my-react-select"
              />
            </div>

            <div className='mt-3 ml-2'>
              <label className='block italic'>Another Business Sector</label>
              <Select options={business.map((el, i) => {
                return { id: i, value: el.value, label: el.label }
              })}
                value={anotherBusinessSector}
                onChange={(anotherBusinessSector) => setAnotherBusiness(anotherBusinessSector)}
                styles={customStyle}
                placeholder=''
                isClearable
                isMulti
                className="my-react-select-container text-sm w-80"
                classNamePrefix="my-react-select"
              />
            </div>

            <div className='mt-3 ml-2'>
              <label className='block italic'>Organization type <span className='text-red'>*</span></label>
              <Select options={organizationTypeOptions}
                value={organizationType}
                onChange={(organizationType) => setOrganizationType(organizationType)}
                styles={customStyle}
                placeholder=''
                isClearable
                className="my-react-select-container text-sm w-80"
                classNamePrefix="my-react-select"
              />
            </div>

            <div className='mt-3 ml-2'>
              <label className='block italic'>Company size <span className='text-red'>*</span></label>
              <Select options={companysSizesOptions}
                value={companySize}
                onChange={(companySize) => setCompanySize(companySize)}
                styles={customStyle}
                placeholder=''
                isClearable
                className="my-react-select-container text-sm w-80"
                classNamePrefix="my-react-select"
              />
            </div>
          </section>

          {/* Langauges************************/}
          <section id="languages">
            <h3 className='text-xl font-semibold mb-2'>Languages</h3>

            <div className='mt-3 ml-2'>
              <label className='block italic'>Languages spoken or mastered by the company <span className='text-red'>*</span></label>
              <Select options={languages.map((el, i) => {
                return { id: i, value: el.value, label: el.label }
              })}
                value={language}
                onChange={(language) => setLanguage(language)}
                styles={customStyle}
                placeholder=''
                isMulti
                isClearable
                className="my-react-select-container text-sm w-80"
                classNamePrefix="my-react-select"
              />
            </div>
          </section>


          {/* Office locations************************/}
          <section id="office-location">
            <h3 className='text-xl font-semibold mb-2'>Office Locations</h3>

            <div className='mt-3 ml-2'>
              <label className='block italic'>Office Name <span className='text-red'>*</span></label>
              <input type="text" ref={officeNameRef} onChange={(e) => setOfficeName(e.target.value)}
                className='inputstyle w-72 md:w-[215px]' />
            </div>

            <div className='mt-3 ml-2'>
              <label className='block italic'>Contact Name </label>
              <input type="text" ref={officeContactRef} onChange={(e) => setOfficeContact(e.target.value)}
                className='inputstyle w-72 md:w-[215px]'
              />
            </div>

            <div className='md:flex items-center ml-2 mt-2'>
              <div>
                <label className='block italic'>Country <span className='text-red'>*</span></label>
                <Select options={countries.map((country) => ({
                  value: country.isoCode,
                  label: country.name,
                }))}
                  value={countryValue}
                  onChange={handleCountry}
                  styles={customStyle}
                  placeholder=''
                  isClearable
                  className="my-react-select-container text-sm w-72 md:w-[215px] mr-5 mb-3 md:mb-0"
                  classNamePrefix="my-react-select"
                />
              </div>

              <div>
                <label className='block italic'>State / Province</label>
                <Select options={StateOfficeOptions.map((state) => ({
                  value: state.isoCode,
                  label: state.name,
                }))}
                  value={stateValue}
                  onChange={handleState}
                  components={{ MenuList }}
                  styles={customStyle}
                  isClearable
                  placeholder=''
                  className="my-react-select-container text-sm w-72 md:w-[215px] mr-5 mb-3 md:mb-0"
                  classNamePrefix="my-react-select"
                />
              </div>
            </div>

            <div className='md:flex items-center ml-2 mt-3'>
              <div>
                <label className='block italic'>City</label>
                <CreatableSelect options={CityOfficeOptions.map((state) => ({
                  value: state.stateCode,
                  label: state.name,
                }))}
                  onChange={(value) => handleCityOffice('cityOfficeOptions', value)}
                  components={{ MenuList }}
                  value={cityValue}
                  styles={customStyle}
                  placeholder=''
                  isClearable
                  className="my-react-select-container text-sm w-72 md:w-[215px]"
                  classNamePrefix="my-react-select"
                />
              </div>

              <div className='mt-3 md:mt-0 md:ml-6'>
                <label className='block italic'>Street address</label>
                <input type='text' ref={officeStreetRef} onChange={(e) => setOfficeStreet(e.target.value)}
                  className='inputstyle w-72 md:w-[215px]' />
              </div>
            </div>

            <div className='mt-3 ml-2'>
              <label className='block italic'>Languages spoken or mastered</label>
              <Select options={languages.map((el, i) => {
                return { id: i, value: el.value, label: el.label }
              })}
                value={languageValue}
                onChange={(languageValue) => setOfficeLanguage(languageValue)}
                styles={customStyle}
                placeholder=''
                isMulti
                isClearable
                className="my-react-select-container text-sm w-72 md:w-[215px]"
                classNamePrefix="my-react-select"
              />
            </div>

            <div className='w-full text-center mt-8'>
              <button className='green-btn' onClick={addOffice}>Create</button>
            </div>

            {
              officeList.length > 0 && <div className='border border-gray-400 mt-5 rounded-lg'>

                <div className='flex items-center text-sm font-semibold px-2 py-3'>
                  <span className='w-48'>Office</span>
                  <span className='w-48'>Contact</span>
                  <span className='w-48'>Adress</span>
                  <span className='w-36 pl-3'>Languages</span>
                  <span className='w-20'></span>
                </div>



                {currentOffice.map(el => {
                  return <OfficeLocations key={el.id}
                    el={el}
                    removeOffice={() => removeOffice(el.id)}
                  />
                })}

              </div>
            }

            {/* Pagination ***********/}
            {
              officeList.length > 4 &&
              <div className='ml-3'>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                    className={currentPage === index + 1 ? 'text-blue font-bold shadow-md rounded-md border border-gray-100 py-1 px-2 mt-1 ml-1 text-sm'
                      : 'shadow-md rounded-md border border-gray-100 py-1 px-2 mt-1 ml-1 text-sm'}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            }

          </section>


          {/* Social media************************/}
          <section id="social-media">
            <h3 className='text-xl font-semibold mb-2'>Social Media</h3>
            <div className='relative ml-2'>
              <GrLinkedin className='text-blue dark:text-white-500 text-2xl absolute top-2 left-2' />
              <input type="text" onChange={(e) => setLinkedin(e.target.value)} placeholder='https://www.linkedin.com/company'
                className="text-sm rounded-md border border-gray-400 pl-10 w-[85%] placeholder-gray-400"
              />
            </div>

            <div className='relative ml-2 my-3'>
              <FaTwitterSquare className='text-blue dark:text-white-500 text-2xl absolute top-2 left-2' />
              <input type="text" onChange={(e) => setTwitter(e.target.value)} placeholder='https://www.twitter.com/company'
                className="text-sm rounded-md border border-gray-400 pl-10 w-[85%] placeholder-gray-400"
              />
            </div>

            <div className='relative ml-2'>
              <FaFacebookSquare className='text-blue dark:text-white-500 text-2xl absolute top-2 left-2' />
              <input type="text" onChange={(e) => setFacebook(e.target.value)} placeholder='https://www.facebook.com/company'
                className="text-sm rounded-md border border-gray-400 pl-10 w-[85%] placeholder-gray-400"
              />
            </div>
          </section>


          <div className='w-full text-center'>
            <button className='blue-btn' onClick={sendData}>
            {saveLoading ? <ScaleLoader color={"#FFFFFF"} saveLoading={saveLoading} height={18} />
                          : <span>Save</span>
            }
            </button>
          </div>

          <div className='h-44'></div>

          <Footer />

        </form>

        <ToastContainer />
      </div>
    </div>
  )
}

export default Registration