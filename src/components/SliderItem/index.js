import React, { memo } from 'react';
import Film from '../Film';

function SliderItem(props) {
  // on is selected slider index
  const { film, index, on, mouseOver, mouseLeave } = props;
  return (
    <div
      onMouseOver={mouseOver}
      onMouseLeave={mouseLeave}
      className={`Slider__item ${index === on && 'Slider__item--active'}`}
    >
      <Film film={film} />
    </div>
  );
}

export default memo(SliderItem);
