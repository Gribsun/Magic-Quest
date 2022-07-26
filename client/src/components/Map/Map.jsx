import React, { useEffect, useRef, useState } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import "./map.css";
import "animate.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

export default function Map() {
  const mapElement = useRef();

  const [map, setMap] = useState({});

  const [longitude, setLongitude] = useState(-0.112869);
  const [latitude, setLatitude] = useState(51.504);

  const convertToPoints = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      },
    };
  };

  useEffect(() => {
    const origin = {
      lng: longitude,
      lat: latitude,
    };
    const destinations = [];
    let map = tt.map({
      key: process.env.REACT_APP_API_KEY_MAP,
      container: mapElement.current,
      stylesVisibility: {
        trafficFlow: true,
      },
      center: [longitude, latitude],
      zoom: 10,
    });

    setMap(map);

    const options = {
      idleTimePress: 100,
      minNumberOfCharacters: 0,
      searchOptions: {
        key: process.env.REACT_APP_API_KEY_MAP,
        language: "en-GB",
      },
      autocompleteOptions: {
        key: process.env.REACT_APP_API_KEY_MAP,
        language: "en-GB",
      },
      noResultsMessage: "No results found.",
    };

    const customPopup =
      '<p style="display:inline">' +
      '<img src="https://images.unsplash.com/photo-1503431128871-cd250803fa41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="pizza oven" style="width:50%;float:right;padding-top:10px">' +
      '<div style="width:50%; height:100%; padding-top:10px"><span style="font:14px Gotham">You are here</span></br>' +
      '<div style="font:9px Gotham"><span style="color:grey">Best place to be in</span><div><br/>' +
      '<span style="font:10px Gotham">London,<br/>UK</span></br>' +
      "</div></p>";

    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -25],
      };
      const popup = new tt.Popup({ offset: popupOffset }).setHTML(customPopup);
      const element = document.createElement("div");
      element.className = "marker";

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      marker.setPopup(popup).togglePopup();

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        setLongitude(lngLat.lng);
        setLatitude(lngLat.lat);
      });
    };

    addMarker();

    const createPopup = (text, place) => {
      const popupOffset = {
        bottom: [0, -25],
      };
      const popup = new tt.Popup({ offset: popupOffset }).setHTML(text);

      place.setPopup(popup).togglePopup();
    };

    const newOrleanPopup =
      '<p style="display:inline">' +
      '<img src="https://images.unsplash.com/photo-1616463539061-adcd0d7664de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="pizza oven" style="width:50%;float:right;padding-top:10px">' +
      '<div style="width:50%; height:100%; padding-top:10px"><span style="font:14px Gotham">French quarter voodoo</span></br>' +
      '<a href="https://en.wikipedia.org/wiki/New_Orleans" target="_blank">New Orlean,USA </a>' +
      "</div></p>";

    const markerNewOrlean = new tt.Marker()
      .setLngLat([-90.071533, 29.951065])
      .addTo(map);

    createPopup(newOrleanPopup, markerNewOrlean);

    const stonehengePopup =
      '<p style="display:inline">' +
      '<img src="https://images.unsplash.com/photo-1519526933243-dd9747bfaae5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" alt="pizza oven" style="width:50%;float:right;padding-top:10px">' +
      '<div style="width:50%; height:100%; padding-top:10px"><span style="font:14px Gotham">Stonehenge is a prehistoric monument</span></br>' +
      '<a href="https://www.english-heritage.org.uk/visit/places/stonehenge/" target="_blank">Salisbury Plain in Wiltshire,UK </a>' +
      "</div></p>";

    const markerStonehenge = new tt.Marker()
      .setLngLat([-1.826215, 51.178882])
      .addTo(map);

    createPopup(
      stonehengePopup,

      markerStonehenge
    );

    const catemacoPopup =
      '<p style="display:inline">' +
      '<img src="https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="pizza oven" style="width:50%;float:right;padding-top:10px">' +
      '<div style="width:50%; height:100%; padding-top:10px"><span style="font:14px Gotham">Catemaco is known in Mexico for its community of “brujos", which can be translated as "witches" or "sorcerers"</span></br>' +
      '<a href="https://fr.wikipedia.org/wiki/Catemaco" target="_blank">Catemaco,Mexico </a>' +
      "</div></p>";

    const markerCatemaco = new tt.Marker()
      .setLngLat([-95.11398, 18.42131])
      .addTo(map);
    createPopup(catemacoPopup, markerCatemaco);

    const salemPopup =
      '<p style="display:inline">' +
      '<img src="https://media.tacdn.com/media/attractions-splice-spp-674x446/06/67/ae/97.jpg" alt="pizza oven" style="width:50%;float:right;padding-top:10px">' +
      '<div style="width:50%; height:100%; padding-top:10px"><span style="font:10px Gotham">This charming and typical Massachusetts village went down in history because of the witch hunts that took place in 1692</span></br>' +
      '<a href="https://en.wikipedia.org/wiki/Salem,_Massachusetts" target="_blank">Salem, Massachusetts</a>' +
      "</div></p>";

    const markerSalem = new tt.Marker()
      .setLngLat([-70.896713, 42.519539])
      .addTo(map);
    createPopup(salemPopup, markerSalem);

    const trioraPopup =
      '<p style="display:inline">' +
      '<img src="https://thumbs.dreamstime.com/b/street-triora-4-4886510.jpg" alt="pizza oven" style="width:50%;float:right;padding-top:10px">' +
      '<div style="width:50%; height:100%; padding-top:14px"><span style="font:10px Gotham">This village is often called “the Italian Salem”. </span></br>' +
      '<a href="https://fr.wikipedia.org/wiki/Triora" target="_blank">Triora, Liguria</a>' +
      "</div></p>";

    const markerTriora = new tt.Marker()
      .setLngLat([7.7653, 43.9931])
      .addTo(map);
    createPopup(trioraPopup, markerTriora);

    const turinPopup =
      '<p style="display:inline">' +
      '<img src="https://cdn.pixabay.com/photo/2016/10/31/14/53/italy-1785754_960_720.jpg" alt="pizza oven" style="width:50%;float:right;padding-top:10px">' +
      '<div style="width:50%; height:100%; padding-top:14px"><span style="font:10px Gotham">Beautiful Turin, joined by Lyon and Prague, is one of the three cities on the “white magic axis” ”. </span></br>' +
      '<a href="https://en.wikipedia.org/wiki/Turin" target="_blank">Turin, Piedmont</a>' +
      "</div></p>";

    const markerTurin = new tt.Marker()
      .setLngLat([7.6868565, 45.070312])
      .addTo(map);
    createPopup(turinPopup, markerTurin);

    const holmavikPopup =
      '<p style="display:inline">' +
      '<img src="https://thumbs.dreamstime.com/z/panorama-holmavik-town-iceland-church-harbour-panorama-holmavik-town-iceland-church-pier-harbour-199557673.jpg" alt="pizza oven" style="width:50%;float:right;padding-top:10px">' +
      '<div style="width:50%; height:100%; padding-top:14px;padding-right:14px"><span style="font:10px Gotham">In Iceland"s Holmavik, pagan culture and Christianity coexisted until at least 1000 AD ”. </span></br>' +
      '<a href="https://www.westfjords.is/en/destinations/towns/holmavik" target="_blank"> Holmavik, Iceland </a>' +
      "</div></p>";

    const markerHolmavik = new tt.Marker()
      .setLngLat([-21.6845875, 65.7021287])
      .addTo(map);
    createPopup(holmavikPopup, markerHolmavik);

    const togoPopup =
      '<p style="display:inline">' +
      '<img src="https://image.shutterstock.com/image-photo/voodoo-objects-use-rituals-spells-600w-1193607403.jpg" alt="pizza oven" style="width:50%;float:right;padding-top:10px">' +
      '<div style="width:50%; height:100%; padding-top:14px"><span style="font:10px Gotham">In Togoville in West Africa, voodoo and the magical arts are part of everyday life ”. </span></br>' +
      '<a href="https://en.wikipedia.org/wiki/Togoville" target="_blank">Togoville, Togo</a>' +
      "</div></p>";

    const markerTogo = new tt.Marker()
      .setLngLat([1.478102, 6.233659])
      .addTo(map);
    createPopup(togoPopup, markerTogo);

    const hookPopup =
      '<p style="display:inline">' +
      '<img src="https://image.shutterstock.com/image-photo/aerial-view-hook-lighthouse-building-600w-1495821716.jpg" alt="pizza oven" style="width:50%;float:right;padding-top:10px">' +
      '<div style="width:50%; height:100%; padding-top:14px"><span style="font:10px Gotham">In Ireland, one can find very many places that have local legends with deep magical and esoterical meaning. ”. </span></br>' +
      '<a href="https://en.wikipedia.org/wiki/Hook_Peninsula" target="_blank">The Hook Peninsula, Ireland</a>' +
      "</div></p>";

    const markerHook = new tt.Marker()
      .setLngLat([-6.920556, 52.121389])
      .addTo(map);
    createPopup(hookPopup, markerHook);

    const phnomPopup =
      '<p style="display:inline">' +
      '<img src="https://image.shutterstock.com/image-photo/phnom-penh-riverside-sunrise-cambodia-600w-1277484061.jpg" alt="pizza oven" style="width:50%;float:right;padding-top:10px">' +
      '<div style="width:50%; height:100%; padding-top:14px"><span style="font:10px Gotham">Temple of Wat Phnom will cure you of the evil eye by putting pieces of meat and fruit in the mouths of the dragon statues as offerings ”. </span></br>' +
      '<a href="https://en.wikipedia.org/wiki/Phnom_Penh" target="_blank">Phnom Penh, Cambodia</a>' +
      "</div></p>";

    const markerPhnom = new tt.Marker()
      .setLngLat([104.888535, 11.562108])
      .addTo(map);
    createPopup(phnomPopup, markerPhnom);

    const altayPopup =
      '<p style="display:inline">' +
      '<img src="https://www.altaiproject.org/wp-content/uploads/2020/12/Chagat_IMG_6779-1024x683.jpg" alt="pizza oven" style="width:50%;float:right;padding-top:10px">' +
      '<div style="width:50%; height:100%; padding-top:14px"><span style="font:10px Gotham">Shamanic rituals, connection with power places and nature. ”. </span></br>' +
      '<a href="https://en.wikipedia.org/wiki/Altai_Republic" target="_blank">Altai, Russia</a>' +
      "</div></p>";

    const markerAltay = new tt.Marker()
      .setLngLat([79.782372, 51.696396])
      .addTo(map);
    createPopup(altayPopup, markerAltay);

    return () => map.remove();
  }, []);

  return (
    <div className="container">
      <div className="map-text">
        <h2 className="title">Magic places around the world</h2>
        <p className="description-map">
          The fascination that the occult and the dark arts hold for many of us
          is undeniable. Some people dismiss anything connected with witchcraft
          as mere superstition, but on Halloween, even the most skeptical won’t
          say no to dressing up in a costume, sipping a pumpkin spice latte and
          watching a movie about witches. Whether you’re a practitioner of the
          dark arts or not, we wish you a frighteningly fun Halloween, and we
          have a gift for you: a list of places where witchcraft and esotericism
          play (or have played) a prominent role.
        </p>
      </div>
      <div ref={mapElement} className="map"></div>
      <div id="cat" className="cat">
        <img
          src={require("../../images/black_cat.gif")}
          alt="#"
          className="catGif"
        />
      </div>
      <img
        src={require("../../images/cat_sitting.gif")}
        alt="#"
        className="catGifSitting animate__animated animate__bounceIn animate__delay-5s"
      />
      <img
        src={require("../../images/for_text.png")}
        alt="#"
        className="cloudForText animate__animated animate__bounceIn animate__delay-5s"
      />
      <div className="textInCloud animate__animated animate__bounceIn animate__delay-5s">
        <p>Go to Stories,</p>
        <p>I'll look here.</p>
      </div>
    </div>
  );
}
