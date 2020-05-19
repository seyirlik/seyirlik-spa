import React, { useEffect, useState, memo } from 'react';
import http from '../../utils/http';
import './slider.css';
import SliderItem from '../SliderItem';

const Slider = memo((props) => {
  const [films, setFilms] = useState([]);
  const [selectedIndex, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch slider items
    async function getData() {
      const req = await http.get('/slider');
      setFilms(req.slider);
      setLoading(false);
    }
    getData();
  }, []);
  useEffect(() => {
    // when autoplay or films length changed
    //Slider autoplay
    let slider;
    if (autoPlay) {
      slider = setInterval(() => {
        setIndex((s) => (s >= films.length - 1 ? 0 : s + 1));
      }, 8000);
    } else {
      clearInterval(slider);
    }
    return () => {
      //componentwillunmount
      clearInterval(slider);
    };
  }, [films.length, autoPlay]);

  return (
    <div className={`Slider ${loading ? 'placeholder-loading' : ''}`}>
      <div className="Slider__numbers">
        {films.length > 0 &&
          Array.from(Array(films.length).keys()).map((_, index) => (
            <button
              className={`Slider__number ${
                index === selectedIndex ? 'Slider__number--active' : null
              }`}
              key={index}
              onClick={() => {
                setIndex(index);
              }}
            >
              {index + 1}
            </button>
          ))}
      </div>
      <div className="Slider__container">
        {films.length > 0 &&
          films.map(({ film }, index) => (
            <SliderItem
              film={film}
              on={selectedIndex}
              index={index}
              key={index}
              mouseOver={() => setAutoPlay(false)}
              mouseLeave={() => setAutoPlay(true)}
            />
          ))}
      </div>
    </div>
  );
});

export default Slider;
