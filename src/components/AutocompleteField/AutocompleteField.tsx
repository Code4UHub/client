import React, { useState, useRef, useEffect } from 'react';

import { InputField } from 'components/InputField/InputField';

import styles from './AutoCompleteField.module.css';

// TODO: Define this somewhere else
export type ItemList = {
  id: string;
  value: string;
};

type Props = {
  label: string;
  id: string;
  list: ItemList[];
  error: string;
  handleChange: Function;
  handleBlur: Function;
  className?: string;
};

export default function AutocompleteField({
  label,
  id,
  list,
  handleChange,
  error,
  handleBlur,
  className,
}: Props) {
  const autocompleteListRef = useRef<HTMLUListElement>(null);
  const inputFieldRef = useRef<HTMLInputElement>(null);

  const [isListOpen, setIsListOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [focusedItem, setFocusedItem] = useState<number>();

  let timeOutId: NodeJS.Timeout;

  const filterData = !inputValue
    ? list
    : list.filter((item) => item.value.includes(inputValue.trim()));

  useEffect(() => {
    if (focusedItem && focusedItem !== 0 && autocompleteListRef.current) {
      const element = autocompleteListRef.current.childNodes[
        focusedItem - 1
      ] as HTMLElement;
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [focusedItem]);

  const handleClickedItem = (item: ItemList) => {
    if (inputFieldRef.current) inputFieldRef.current.value = item.value;

    setInputValue(item.value);
    setIsListOpen(false);
    handleChange(item);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      if (focusedItem !== filterData.length) {
        setFocusedItem((item) => (item as number) + 1);
      }
    } else if (e.key === 'ArrowUp') {
      if (focusedItem !== 0) {
        setFocusedItem((item) => (item as number) - 1);
      }
    } else if (e.key === 'Enter') {
      if (focusedItem && focusedItem !== 0) {
        if (inputFieldRef.current) inputFieldRef.current.blur();

        handleClickedItem(filterData[focusedItem - 1]);
      }
    }
  };

  const inputFocusHandler = () => {
    setIsListOpen(true);
    setFocusedItem(0);
  };

  const onBlurHandler = () => {
    timeOutId = setTimeout(() => {
      setIsListOpen(false);
    });
  };

  const onFocusHandler = () => {
    clearTimeout(timeOutId);
  };

  const listItems = filterData.map((item, index) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li
      key={item.id}
      onClick={() => handleClickedItem(item)}
      className={focusedItem === index + 1 ? styles.active : ''}
    >
      {item.value}
    </li>
  ));

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`${styles.autocomplete} ${className}`}
      tabIndex={-1}
      onBlur={onBlurHandler}
      onFocus={onFocusHandler}
      onKeyDown={keyDownHandler}
    >
      <InputField
        ref={inputFieldRef}
        id={id}
        label={label}
        className=""
        type="text"
        value=""
        error={error}
        handleFocus={inputFocusHandler}
        handleChange={(_id: string, value: string) => {
          setInputValue(value);
          setFocusedItem(0);
          handleChange(value);
        }}
        handleBlur={() => {
          handleBlur();
        }}
        required
      />
      {isListOpen && (
        <ul
          className={styles['autocomplete-list']}
          ref={autocompleteListRef}
        >
          {listItems}
        </ul>
      )}
    </div>
  );
}
AutocompleteField.defaultProps = {
  className: '',
};
