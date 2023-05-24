import React, { useEffect } from 'react';

import { Button } from 'components/Button/Button';

import { useIndex } from 'hooks/useIndex';

import styles from './Carousel.module.css';

type Props = {
  items: JSX.Element[];
  className?: string;
};

export default function Carousel({ items, className }: Props) {
  const { index, next, prev, jumpTo, setMaxIndex } = useIndex({
    initial: 0,
  });

  useEffect(() => {
    setMaxIndex(items.length - 1);
  }, [items]);

  const carouselItems = items.map((item, itemIndex) => (
    <li
      key={`carouselItem-${itemIndex}`}
      className={styles['item-container']}
    >
      {item}
    </li>
  ));

  const nextItemHandler = () => {
    if (index === carouselItems.length - 1) {
      jumpTo(0);
      return;
    }

    next();
  };

  const prevItemHandler = () => {
    if (index === 0) {
      jumpTo(carouselItems.length - 1);
      return;
    }

    prev();
  };

  return (
    <div className={`${className} ${styles.container}`}>
      <Button
        className={styles.prev}
        location="carousel"
        text="<"
        onClickHandler={prevItemHandler}
        type="button"
      />
      <div className={styles['list-container']}>
        <ul
          className={styles.list}
          style={{ transform: `translateX(-${100 * index}%)` }}
        >
          {carouselItems}
        </ul>
      </div>
      <Button
        className={styles.next}
        location="carousel"
        text=">"
        onClickHandler={nextItemHandler}
        type="button"
      />
    </div>
  );
}
Carousel.defaultProps = {
  className: '',
};
