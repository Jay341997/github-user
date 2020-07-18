import React, { useEffect } from 'react';
import OverviewIcon from '../../icons/OverviewIcon';
import RepoIcon from '../../icons/RepoIcon';
import ProjectIcon from '../../icons/ProjectIcon';
import './styles.scss';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppDispatcher } from '../../action';
import { IReduxAppState } from '../../constants';
import { IRepoItem } from './constants';
import StarIcon from '../../icons/StarIcon';
import ForkIcon from '../../icons/ForkIcon';
import LawIcon from '../../icons/LawIcon';
import { formatDate } from '../../helpers';
import SearchAndFilter from '../SearchAndFilter';
import CloseIcon from '../../icons/CloseIcon';

const navList = [
  {
    name: 'Overview',
    icon: <OverviewIcon />,
    isActive: false
  },
  {
    name: 'Repositories',
    icon: <RepoIcon />,
    isActive: true
  },
  {
    name: 'Projects',
    icon: <ProjectIcon />,
    isActive: false
  },
];

interface Props {
  userName: string
}
interface StateProps {
  repositoriesList: Array<IRepoItem>,
  type: string,
  language: string,
  searchQuery: string
}
const Repositories: React.FC<Props> = (props) => {
  const { repositoriesList, type, language, searchQuery } = useSelector<IReduxAppState, StateProps>((state: IReduxAppState) => {
    return {
      repositoriesList: state.repositoriesList,
      type: state.type.name,
      language: state.language,
      searchQuery: state.searchQuery
    }
  }, shallowEqual);

  const { userName } = props;
  const dispatch = useDispatch();
  const appDispatcher = new AppDispatcher(dispatch);


  useEffect(() => {
    appDispatcher.fetchRepoList(userName);
  }, [])

  const handleClearFilter = () => {
    appDispatcher.clearFilter();
  }

  const renderFilterCountHeading = () => {
    if (type === 'All' && language === 'All' && !searchQuery) {
      return <></>
    }
    
    let textArr = [
      <strong>{repositoriesList.length}</strong>, 
      'results for', 
      type !== 'All' && <strong>{type}</strong>, 
      'repositories',
      searchQuery && <>matching <strong>{searchQuery}</strong></>, 
      language !== 'All' && <>written in <strong>{language}</strong></>
    ].filter(Boolean);

    return (
      <div className="filterCountClearWrap">
        <p className="resultSummary">{textArr.map((it) => <>{it}{' '}</>)}</p>
        <span className="clearFilterWrap" onClick={handleClearFilter}>
          <i className="closeIcon"><CloseIcon /> </i>
          Clear filter
        </span>
      </div>
    )
  }

  return (
    <>
      <div className="underLineNav">
        {navList.map((it, index) => (
          <nav key={index} className={["underLineNavItem", it.isActive && 'active'].filter(Boolean).join(' ')}>
            {it.icon}
            {it.name}
            {it.isActive && repositoriesList.length > 0 && <span className="counter">{repositoriesList.length}</span>}
          </nav>
        ))}
      </div>
      <SearchAndFilter />
      <div className="repsitoriesList">
        {renderFilterCountHeading()}
        {repositoriesList.map((it: IRepoItem, index: any) => (
          <div key={index} className="reposItem">
            <div className="leftSectionWrap">
              <h3 className="displayname"><a href={it.html_url}>{it.name}</a></h3>
              {it.description && <p className="description">{it.description}</p>}
              <div className="activityWrap">
                {it.language && <span>{it.language}</span>}
                {it.stargazers_count > 0 && <a href={it.stargazers_url} ><StarIcon />{it.stargazers_count}</a>}
                {it.forks_count > 0 && <a href={it.forks_url} ><ForkIcon />{it.forks_count}</a>}
                {it.license && <a href={it.license.url}><LawIcon />{it.license.name}</a>}
                {it.updated_at && <span>Updated On {formatDate(it.updated_at)}</span>}
              </div>
            </div>
            <div className="rightSectionWrap">
              <button className="btn starBtn"><StarIcon /> Star</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Repositories;