// @flow
export type Filter = {
  checked: boolean,
  id: string,
  days?: number,
  type: 'counter' | 'text',
}
export type Filters = {
  [string]: Filter,
}

export type Link = {
  url: string,
  name: string,
  title: string,
  type: string,
}
export type Search = {
  artist: string,
  title: string,
  full_title: string,
  items: Array<any>,
  selected: any,
}
export type ChartEntry = {
  createdTime: string,
  id: string,
  link: Link,
  message: string,
  reactionsNum: number,
  selected: boolean,
  source: string,
  type: string,
  updatedTime: string,
  search: Search,
}
export type fbEntry = {
  link: string,
  name: string,
  message: string,
  created_time: string,
  id: string,
  source: string,
  type: string,
  updated_time: string,
  attachments: {
    data: [
      {
        description: string,
        media: {
          image: {
            height: number,
            src: string,
            width: number
          }
        },
        target: {
          url: string
        },
        title: string,
        type: string,
        url: string
      }
      ]
  },
  reactions: {
    summary: {
      total_count: number
    }
  }
}
export type Response = {
  chart: ChartEntry[],
  lastUpdateDate: string
};
export type Action = {
  checked: boolean,
  value: any,
  type: string,
  id: string,
  field: string,
}
export type ErrorDay = {
  count: number,
  color: 'red' | 'blue',
  org: string,
}
export type FilteringReturn = {
  viewChart: ChartEntry[],
  errorDays: ErrorDay[],
  westLetters: ChartEntry[]
}
type BaseFilter = {
  control: { name: string, id: string },
  input: { max?: number, name: string },
  type: 'countDays' | 'more' | 'less' | 'text',
  valueName?: string,
  check(ChartEntry, any): boolean
}
export type FilterValue = {
  ...$Exact<BaseFilter>,

  description: { start: string, end?: string },
}
export type FilterText = {
  ...$Exact<BaseFilter>,
  text: string,
}
export type FiltersDefinition = {
  control: FilterValue[],
  text: FilterText[],
}
export type FacebookUser = {
  id: string,
  email: string,
  name: string,
  firstName: string,
  accessToken: string,
  lastName: string,
  pictureUrl: string,
  userID: string,
}
export type PlaylistInfoType = { url?: string, name?: string };
