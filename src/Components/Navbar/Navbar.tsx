"use client";

import { useEffect, useState } from "react";
import styles from "@/Components/Navbar/Navbar.module.scss";
import Link from "next/link";
import NavbarMenu from "@/Components/Navbar/NavbarMenu/NavbarMenu";
import UserPrefs from "@/Components/Navbar/UserPrefs/UserPrefs";
import { useUserContext } from "@/context/UserPrefsContext";
import Image from "next/image";
import Cookies from "js-cookie";

const Navbar = () => {
  const [weatherData, setWeatherData] = useState<any>();
  const { themeMode } = useUserContext();

  //This is very ugly code. But it works for now.
  //I'll look for a better way to implement this in the meantime

  //get user location
  useEffect(() => {
    if ("geolocation" in navigator) {
      if (!Cookies.get("userLocation")) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            Cookies.set("userLocation", `${latitude},${longitude}`, {
              expires: 1,
            });
          },
          function (error) {
            console.error("Error getting location: ", error.message);
          },
          {
            timeout: 5000,
          }
        );
      }
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  //get user weather info
  useEffect(() => {
    //check if cookies have the weather data if no then set it
    //else just use the stored cookie to define the state

    const userWeatherInfo = Cookies.get("userWeatherInfo");
    if (!userWeatherInfo) {
      const locationData = Cookies.get("userLocation");
      if (!locationData) {
        console.error("User location data is not available.");
        return;
      }
      const [latitude, longitude] = locationData?.split(",");

      async function getWeatherData() {
        const OPEN_WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
          { method: "GET" }
        );
        const data = await response.json();
        return data;
      }

      getWeatherData()
        .then((data) => {
          setWeatherData(data);
          Cookies.set("userWeatherInfo", JSON.stringify(data), { expires: 1 });
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    } else {
      setWeatherData(JSON.parse(userWeatherInfo));
    }
  }, []);

  return (
    <div
      className={`${styles.navbarRoot} ${themeMode === "light" ? styles.lightMode : styles.darkMode}`}
    >
      <div className={styles.navbarContainer}>
        <div className={styles.navbarStart}>
          <div className={styles.logoAndTemp}>
            <Link href="/" className={styles.navbarStartLink}>
              <div className={styles.navbarLogo}>
                <div className={styles.navbarLogoSVGContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="80 0 430 430"
                    className={styles.navbarLogoSVG}
                    width="120"
                    height="64"
                  >
                    <rect
                      rx="0"
                      ry="0"
                      width="100%"
                      height="100%"
                      fill="transparent"
                    ></rect>
                    <g
                      data-element="wrapper"
                      transform="translate(-520.50000000000324 -350.50000000000225) scale(2.7000000000000104)"
                    >
                      <g>
                        <g
                          data-element="icon"
                          transform="scale(0.16986770557110065) translate(1009.5428569319054 968.0538222369025)"
                        >
                          <path
                            id="color_x5F_2"
                            fill="currentColor"
                            d="M442.798,322.935c-2.812-0.482-5.581-0.696-8.291-0.662    c-15.575,0.19-30.639-5.439-41.652-16.453l-34.692-34.691c-10.999-11-16.662-26.041-16.451-41.595    c0.036-2.764-0.183-5.592-0.683-8.459c-3.164-18.145-17.883-32.703-36.067-35.628c-30.035-4.833-55.601,20.708-50.821,50.732    c2.897,18.194,17.437,32.942,35.583,36.132c2.903,0.51,5.765,0.733,8.562,0.692c15.537-0.226,30.555,5.465,41.542,16.452    l33.214,33.216c11.521,11.52,17.977,27.157,17.936,43.45v0.223c0,0.075,0,0.151,0,0.227c0.079,15.622-5.26,30.775-16.309,41.821    l-34.982,34.983c-11.047,11.048-26.201,16.385-41.823,16.308c-0.075-0.001-0.149-0.001-0.225-0.001c-0.074,0-0.149,0-0.223,0.001    c-15.627,0.077-30.784-5.261-41.834-16.311l-34.982-34.982c-10.902-10.902-16.588-25.81-16.304-41.225    c0.052-2.835-0.166-5.737-0.68-8.683c-3.166-18.146-17.887-32.701-36.072-35.624c-30.032-4.828-55.596,20.712-50.813,50.734    c2.897,18.194,17.437,32.94,35.582,36.131c2.977,0.523,5.91,0.744,8.775,0.688c15.399-0.298,30.289,5.414,41.179,16.306    l35.001,35.003c10.908,10.906,16.578,25.822,16.305,41.245c-0.05,2.802,0.164,5.67,0.666,8.581    c3.268,18.928,19.116,33.802,38.2,35.987c26.668,3.055,49.279-17.722,49.279-43.776c0-0.075,0-0.15,0-0.226    c-0.079-15.623,5.259-30.777,16.307-41.824L393,426.727c11.048-11.047,26.201-16.386,41.824-16.307c0.076,0,0.152,0,0.227,0    c26.066,0,46.848-22.627,43.774-49.311C476.627,342.023,461.732,326.185,442.798,322.935z"
                          ></path>
                          <path
                            id="color_x5F_1"
                            fill="currentColor"
                            d="M116.435,234.021c-2.982-26.621,17.77-49.166,43.791-49.166l0.223,0.001    c16.293,0.041,31.932-6.414,43.454-17.935l33.21-33.21c11.005-11.005,16.655-26.054,16.454-41.615    c-0.035-2.743,0.181-5.548,0.674-8.393c3.143-18.148,17.851-32.72,36.032-35.663c30.065-4.868,55.674,20.714,50.855,50.773    c-2.917,18.196-17.478,32.929-35.632,36.095c-2.871,0.5-5.7,0.72-8.466,0.682c-15.552-0.212-30.589,5.454-41.587,16.451    l-33.204,33.204c-11.524,11.523-17.979,27.166-17.939,43.462v0.223c0,0.075,0,0.149,0,0.223    c-0.078,15.628,5.261,30.786,16.311,41.837l34.981,34.979c10.917,10.917,25.85,16.566,41.286,16.304    c2.79-0.047,5.646,0.167,8.542,0.667c18.157,3.131,32.744,17.835,35.694,36.021c4.881,30.086-20.729,55.714-50.81,50.865    c-18.192-2.932-32.915-17.505-36.063-35.66c-0.507-2.924-0.723-5.804-0.672-8.618c0.275-15.422-5.398-30.337-16.305-41.243    l-35.001-35.002c-10.891-10.891-25.78-16.603-41.179-16.307c-2.85,0.056-5.767-0.162-8.726-0.68    C133.427,269.011,118.574,253.12,116.435,234.021z M435.051,273.007c24.343,0,44.076-19.733,44.076-44.076    c0-24.342-19.733-44.076-44.076-44.076c-24.344,0-44.074,19.734-44.074,44.076C390.977,253.274,410.707,273.007,435.051,273.007z"
                          ></path>
                        </g>
                        <text
                          transform="translate(267.21873474121094 230.33333587646484)"
                          fill="currentColor"
                          fontSize="64"
                          data-element="company-name"
                          dx="0 0 0 0 0"
                        >
                          fedup
                        </text>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </Link>
            <div className={styles.temperatureInfo}>
              <div className={styles.temperatureIconContainer}>
                <Image
                  src="/temp.webp"
                  alt="temperature icon"
                  className={styles.temperatureIcon}
                  fill={true}
                />
              </div>
              <span>
                {weatherData ? (
                  Math.round(Number(weatherData.main.temp))
                ) : (
                  <span>——</span>
                )}
                °C
              </span>
            </div>
          </div>
          <NavbarMenu />
        </div>
        <UserPrefs />
      </div>
    </div>
  );
};

export default Navbar;
