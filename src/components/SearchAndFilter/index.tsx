import React from 'react';
import './styles.scss';
import { reposTypes, languageType } from './constants';
import FilterMenu from './FilterMenu';
import RepoIcon from '../../icons/RepoIcon';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppDispatcher } from '../../action';
import { IReduxAppState } from '../../constants';

interface Props { }
interface StateProps {
  type: string,
  language: string,
  searchQuery: string
}
const SearchAndFilter: React.FC<Props> = (props) => {
  const { type, language, searchQuery } = useSelector<IReduxAppState, StateProps>((state: IReduxAppState) => {
    return {
      type: state.type.name,
      language: state.language,
      searchQuery: state.searchQuery
    }
  }, shallowEqual);
  const dispatch = useDispatch();
  const appDispatcher = new AppDispatcher(dispatch);

  const handleRepoTypesChange = (typeObj: any) => {
    appDispatcher.filterByType(typeObj);
  }

  const handleLanguageTypeChange = (languageObj: any) => {
    appDispatcher.filterByLanguage(languageObj.name);
  }

  const handleOnSearch = (e: any) => {
    appDispatcher.search(e.target.value);
  }

  return (
    <div className="searchFilterContainer">
      <input className="searchInput" value={searchQuery} placeholder="Find a repository…" onChange={handleOnSearch} />
      <div className="filterWrap">
        <FilterMenu selectList={reposTypes} filterType="Type" selectedValue={type} handleOnChange={handleRepoTypesChange} />
        <FilterMenu selectList={languageType} filterType="Language" selectedValue={language} handleOnChange={handleLanguageTypeChange} />
        <button className="btn btnNew"><RepoIcon /> New</button>
      </div>
    </div>
  )
}

export default SearchAndFilter;