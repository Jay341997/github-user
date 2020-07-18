import { IRepoItem } from "./components/Repositories/constants";

export interface IReduxAppState {
  reposData: Array<IRepoItem>,
  repositoriesList: Array<IRepoItem>,
  isListLoaded: Boolean,
  isListLoading: Boolean,
  type: {
    name: string,
    key: string
  },
  language: string,
  searchQuery: string,
  isNotFound: boolean
}

export enum EReduxLoginActionTypes {
  FETCH_REPOS_LIST_REQUEST = 'FETCH_REPOS_LIST_REQUEST',
  FETCH_REPOS_LIST_SUCCESS = 'FETCH_REPOS_LIST_SUCCESS',
  FETCH_REPOS_LIST_ERROR = 'FETCH_REPOS_LIST_ERROR',
  FILTER_BY_REPOS_TYPE = 'FILTER_BY_REPOS_TYPE',
  FILTER_BY_LANGUAGE = 'FILTER_BY_LANGUAGE',
  CLEAR_FILTER = 'CLEAR_FILTER',
  SEARCH_REPO = 'SEARCH_REPO',
  TRIGGER_NOT_FOUND = 'TRIGGER_NOT_FOUND'
}

export const BASE_URL = 'https://api.github.com';