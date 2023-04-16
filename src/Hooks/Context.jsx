import React, { useContext, useEffect, useState } from "react";
import imgHero from "../assets/planet.png";
import Card from "../Component/Card/Card";
import Loader from "../Component/Loader/Loader";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// creating context hooks
const appContext = React.createContext();

const AppProvider = ({ children }) => {
  // title change ------>

  const titleChange = (str) => {
    return (document.title = str);
  };

  //toggle dark mode
  const [isDark, setIsDark] = useState(false);
  const themeChangeHandle = () => {
    setIsDark(!isDark);
  };

  // ----------------Hero part-------------
  const heroData = {
    title1: "Simple",
    spanTitle: "News App",
    title2: "to search News and Blog Articles",
    description:
      "SNews is a simple web app with which you can search for current and historic news articles published by over 60,000 sources. With this news APP, you can also collect the current top headlines based on the Google News ranking.",
    img: imgHero,
  };

  //  search bar state ----------->
  const [change, setChange] = useState("");
  const [isListen, setIsListen] = useState(false);

  //  api data state-------------->
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // buttons --------------->
  const [btnMode, setBtnMode] = useState({
    sport: false,
    tech: false,
    enter: false,
  });

  const changeHandle = (e) => {
    setChange(e.target.value);
  };

  // speech recognization -------------->
  let { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const startListening = () => {
    setIsListen(true);
    SpeechRecognition.startListening({ language: "en-IN" });
  };

  const stopListning = () => {
    setIsListen(false);
    SpeechRecognition.stopListening();
  };

  const toggle = (e) => {
    e.preventDefault();
    setIsListen(isListen ? false : true);
    isListen ? stopListning() : startListening();
  };
  console.log(`${process.env.REACT_APP_API}`)
  const apiKey = "fe6ce862cf9f2bef1e5c3914c9f1dd44";
  const url = "https://gnews.io/api/v4/";

  //  fetching api ----------------->

  const getApiData = async (api) => {
    setIsLoading(true);
    const res = await fetch(api);
    const data = await res.json();
    try {
      data ? setIsLoading(false) : setIsLoading(true);
      setApiData(data.articles);
      setIsError(data.articles.length ? false : true);
    } catch (err) {
      console.error(err);
    }
  };

  const clickHandle = () => {
    let str = transcript.split("");
     str.pop();
    let str3 = str.join("");
    console.log(str3);
    const value = isListen ? str3 : change;
    getApiData(`${url}search?q=${value}&lang=en&apikey=${apiKey}`);
    setChange("");
  };

  const capitalTolower = (str) => {
    return str.toLowerCase();
  };

  const catBtnClick = (e) => {
    const btnName = capitalTolower(e.target.innerText);
    titleChange(`${btnName} News`);
    if (btnName === "technology") {
      setBtnMode({
        sport: false,
        tech: true,
        enter: false,
      });
    } else if (btnName === "entertainment") {
      setBtnMode({
        sport: false,
        tech: false,
        enter: true,
      });
    } else {
      setBtnMode({
        sport: true,
        tech: false,
        enter: false,
      });
    }
    getApiData(
      `${url}top-headlines?category=${btnName}&lang=en&apikey=${apiKey}`
    );
  };

  const category = [
    "general",
    "world",
    "nation",
    "business",
    "technology",
    "entertainment",
    "sports",
    "science and health",
  ];

  useEffect(() => {
    titleChange("Home");
    let randomNum = Math.floor(Math.random() * category.length);
    console.log(category[randomNum]);
    getApiData(
      `${url}top-headlines?category=${category[randomNum]}&lang=en&apikey=${apiKey}`
    );
    if (!browserSupportsSpeechRecognition) {
      return null;
    }
  }, []);

  // ======================================== //

  const cutString = (str, length) => {
    const strLength = str.length;
    return strLength > length ? str.substring(0, length) + "..." : str;
  };

  const dayName = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDay();
    let dayname = "";
    switch (day) {
      case 0:
        dayname = "Sun Day";
        break;
      case 1:
        dayname = "MonDay";
        break;
      case 2:
        dayname = "TuseDay";
        break;
      case 3:
        dayname = "WednesDay";
        break;
      case 4:
        dayname = "ThurseDay";
        break;
      case 5:
        dayname = "FriDay";
        break;
      case 6:
        dayname = "SatureDay";
        break;
      default:
        dayname = "Not found";
    }
    return `${dayname} ${date.toLocaleTimeString()}`;
  };

  const loadAllData = isLoading ? (
    <Loader />
  ) : !isError && Array.isArray(apiData) ? (
    <div className="card-wrapper">
      {apiData.map((ele, id) => {
        return (
          <Card
            title={cutString(ele.title, 13)}
            description={cutString(ele.description, 85)}
            img={ele.image}
            key={id}
            date={dayName(ele.publishedAt)}
            link={ele.url}
          />
        );
      })}
    </div>
  ) : (
    <p className="error">No News data found</p>
  );

  return (
    <appContext.Provider
      value={{
        isDark,
        themeChangeHandle,
        heroData,
        changeHandle,
        change,
        clickHandle,
        apiData,
        isLoading,
        getApiData,
        catBtnClick,
        btnMode,
        titleChange,
        loadAllData,
        toggle,
        isListen,
        transcript,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

const useGlobalHook = () => useContext(appContext);

export { AppProvider, useGlobalHook };
