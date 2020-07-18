import { EReduxLoginActionTypes } from './constants';
import { IRepoItem } from './components/Repositories/constants';

const initialState = {
  reposData: [],
  repositoriesList: [],
  isListLoaded: false,
  isListLoading: false,
  type: {
    name: 'All',
    key: 'all'
  },
  language: 'All',
  searchQuery: '',
  isNotFound: false
};

const filterByTypes = (repos: Array<IRepoItem>, type: string) => {
  switch (type) {
    case 'all':
      return repos;
    case 'sources':
      return repos.filter(it => !it.fork)
    case 'forks':
      return repos.filter(it => it.fork)
    case 'archieved':
      return repos.filter(it => it.archived)
    case 'mirrors':
      return repos.filter(it => it.mirror_url)  
    default:
      return repos;
  }
}

const filterByLanguages = (repos: Array<IRepoItem>, language: string) => {
  if (language === 'All') {
    return repos;
  }
  return repos.filter(it => it.language === language);
}

const searchRepo = (repos: Array<IRepoItem>, q: string) => {
  console.log(repos);
  if (!q) {
    return repos;
  }
  return repos.filter((it) => {
    return (it.name + it.description).replace(/[^\w\s]/gi, '').toLowerCase().search(q.replace(/[^\w\s]/gi, '').toLowerCase()) > -1;
  })
}

export default (state: any = initialState, action: any) => {
  switch (action.type) {
      case EReduxLoginActionTypes.FETCH_REPOS_LIST_REQUEST:
        return {
          ...state,
          reposData: [],
          isListLoading: true
        }
      case EReduxLoginActionTypes.FETCH_REPOS_LIST_SUCCESS:
        return {
          ...state,
          repositoriesList: action.data,
          reposData: action.data,
          isListLoaded: true,
          isListLoading: false
        }
      case EReduxLoginActionTypes.FETCH_REPOS_LIST_ERROR:
        return {
          repositoriesList: [],
          isListLoaded: false,
          isListLoading: false
        }
      case EReduxLoginActionTypes.FILTER_BY_REPOS_TYPE:
        return {
          ...state,
          repositoriesList: searchRepo(filterByLanguages(filterByTypes(state.reposData, action.data.key), state.language), state.searchQuery),
          type: action.data
        }
      case EReduxLoginActionTypes.FILTER_BY_LANGUAGE:
        return {
          ...state,
          repositoriesList: searchRepo(filterByTypes(filterByLanguages(state.reposData, action.data), state.type.key), state.searchQuery),
          language: action.data
        }
      case EReduxLoginActionTypes.SEARCH_REPO:
        return {
          ...state,
          repositoriesList: searchRepo(filterByTypes(filterByLanguages(state.reposData, state.language), state.type.key),  action.data),
          searchQuery: action.data
        }
      case EReduxLoginActionTypes.CLEAR_FILTER:
        return {
          ...initialState,
          repositoriesList: state.reposData,
          reposData: state.reposData
        }
      case EReduxLoginActionTypes.TRIGGER_NOT_FOUND:
        return {
          ...state,
          isNotFound: true
        }
      default:
          return state;
  }
}