export type NameInitialOptions = 'Full' | 'Initial'

export interface NameData {
  gender?: string,
  firstName: Boolean,
  middleName?: Boolean,
  lastName: Boolean,
  lastInitial: NameInitialOptions,
}

export type TimeStamps = {
  hour: number | string,
  minute: number | string
}

export type Meridiems = 'AM' | 'PM'

export interface TimeData {
  time: TimeStamps,
  amPm: Meridiems,
  interval: string
}

export type OperationTypes = {
  value: string,
  event: string
}

export interface TextLayerData {
  id: string,
  characters: string,
  name: string,
  operation?: OperationTypes
}