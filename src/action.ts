import { BASE_URL, EReduxLoginActionTypes } from "./constants";
import { isArray } from "util";


export class AppDispatcher {
  private dispatch: any;

  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }

  fetchRepoList = (userName: string) => {
    const classObj = this;
    this.dispatch({type: EReduxLoginActionTypes.FETCH_REPOS_LIST_REQUEST});

    fetch(`${BASE_URL}/users/${userName}/repos`)
    .then(res => res)
    .then(res => res.json())
    .then(data => {
      if (isArray(data)) {
        classObj.dispatch({
          type: EReduxLoginActionTypes.FETCH_REPOS_LIST_SUCCESS,
          data
        })
      }
    })
    .catch(err => {
      classObj.dispatch({
        type: EReduxLoginActionTypes.TRIGGER_NOT_FOUND
      })
    })
  }

  filterByType = (type: {key: string, name: string}) => this.dispatch({
    type: EReduxLoginActionTypes.FILTER_BY_REPOS_TYPE,
    data: type
  })

  filterByLanguage = (data: string) => this.dispatch({
    type: EReduxLoginActionTypes.FILTER_BY_LANGUAGE,
    data
  })

  clearFilter = () => this.dispatch({
    type: EReduxLoginActionTypes.CLEAR_FILTER
  })

  search = (data: string) => this.dispatch({
    type: EReduxLoginActionTypes.SEARCH_REPO,
    data
  })

  triggerNotFound = () => this.dispatch({
    type: EReduxLoginActionTypes.TRIGGER_NOT_FOUND
  })
}