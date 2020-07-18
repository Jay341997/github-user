import React, { useState, useRef, useEffect } from 'react';
import './FilterMenu.scss';
import CloseIcon from '../../icons/CloseIcon';
import { IReduxAppState } from '../../constants';
import SelectIcon from '../../icons/SelectIcon';

interface Props {
  selectList: Array<any>,
  filterType: string,
  selectedValue: string,
  handleOnChange: Function
}
const FilterMenu: React.FC<Props> = (props) => {
  const wrapRef = useRef<any>(null);
  const { selectList, filterType, handleOnChange, selectedValue } = props;
  const [openSelectMenu, setOpenSelectMenu] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
        if (wrapRef.current && !wrapRef.current.contains(event.target)) {
            setOpenSelectMenu(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapRef]);

  const handleOnItemClick = (obj: any) => {
    setOpenSelectMenu(false);
    handleOnChange(obj);
  }

  return (
    <div ref={wrapRef} className="filterMenu">
      <span className="btn label" onClick={() => setOpenSelectMenu(!openSelectMenu)}>{filterType}: <strong>{selectedValue}</strong><i className="dropDownIcon"></i></span>
      {openSelectMenu &&
        <div className="selectMenu">
          <header className="selectMenuHeader">
            <span className="title">Select {filterType}</span>
            <button className="closeIcon">
              <CloseIcon />
            </button>
          </header>

          <ul className="menuList">
            {selectList.map((it, index) => (
              <li 
                className={["selectMenuItem", selectedValue === it.name && 'active'].filter(Boolean).join(' ')}
                key={index} 
                onClick={() => handleOnItemClick(it)}
              >
                <SelectIcon />
                {it.name}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}

export default FilterMenu;