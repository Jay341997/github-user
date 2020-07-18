export interface IRepoItem {
  name: string,
  language: string,
  forks_count: number,
  stargazers_count: number,
  updated_at: string,
  forks_url: string,
  stargazers_url: string,
  license: {
    name: string,
    url: string
  }
  description: string,
  html_url: string,
  archived: boolean,
  fork: boolean,
  mirror_url: string
}