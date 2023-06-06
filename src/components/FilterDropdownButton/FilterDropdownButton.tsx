import React, { useState } from 'react';

import { ListItem } from 'types/ListItem/ListItem';

import { ReactComponent as CloseIcon } from './Close.svg';
import { ReactComponent as ExpandIcon } from './Expand.svg';
import { ReactComponent as DoneIcon } from './Done.svg';

import styles from './FilterDropdownButton.module.css';

type Props = {
  placeholder: string;
  value: string;
  list: ListItem[];
  onChange: (item: ListItem | undefined) => void;
};

export default function FilterDropdownButton({
  placeholder,
  value,
  list,
  onChange,
}: Props) {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  let timeOutId: NodeJS.Timeout;

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      if (activeIndex !== list?.length) {
        setActiveIndex((index) => index + 1);
      }
    } else if (e.key === 'ArrowUp') {
      if (activeIndex !== 0) {
        setActiveIndex((index) => index - 1);
      }
    } else if (e.key === 'Enter') {
      if (activeIndex !== 0) {
        setSelectedIndex(activeIndex);
        setActiveIndex(0);
        onChange(list && list[activeIndex - 1]);
      }
      setIsListOpen((open) => !open);
    }
  };

  const onBlurHandler = () => {
    timeOutId = setTimeout(() => {
      setActiveIndex(0);
      setIsListOpen(false);
    });
  };

  const onFocusHandler = () => {
    clearTimeout(timeOutId);
  };

  const resetFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange(undefined);
    setActiveIndex(0);
    setSelectedIndex(0);
  };

  return (
    <div
      className={`${styles.container} ${isListOpen ? styles.open : ''}`}
      tabIndex={0}
      onClick={() => {
        setIsListOpen((open) => !open);
      }}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      onKeyDown={keyDownHandler}
      role="menu"
    >
      <span>{value || placeholder}</span>
      <div className={styles['buttons-container']}>
        <button
          type="button"
          id={styles['clear-btn']}
          className={value ? styles.clear : ''}
          onClick={resetFilter}
        >
          <CloseIcon />
        </button>
        <button
          type="button"
          id={styles.expand}
          onClick={(e) => {
            e.stopPropagation();
            setIsListOpen((open) => !open);
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <ExpandIcon />
        </button>
      </div>
      {isListOpen && (
        <ul className={styles.list}>
          {list?.map((item, index) => (
            <li
              key={item.id}
              className={`${styles['list-item']} ${
                index + 1 === selectedIndex ? styles.active : ''
              } ${index + 1 === activeIndex ? styles.focused : ''}`}
              role="menuitem"
              onClick={(e) => {
                e.stopPropagation();
                onChange(item);
                setSelectedIndex(index + 1);
                setActiveIndex(0);
                setIsListOpen(false);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            >
              <DoneIcon />
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
