import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function CarouselComponent() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  function getEvents() {
    const eventsCollectionRef = collection(db, 'events')
    getDocs(eventsCollectionRef)
      .then(response => {
        const carousel = response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }))
        setEvents(carousel)
      })
      .catch(error => console.log(error.message))
  }

  return (
    <div className="carousel">
      <button onClick={() => getEvents()}>Refresh Names</button>
      {events.map(events => (
        <li key={events.id}>{events.data.name}</li>
      ))}
    </div>
  );
}