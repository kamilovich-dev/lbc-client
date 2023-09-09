import { makeAutoObservable } from "mobx"

/*Animation of counter of sorted cards*/
class SortedCounterAnimation {

  knownText: string = ''
  unknownText: string = ''

  knownTimerId: NodeJS.Timer | undefined
  unknownTimerId: NodeJS.Timer | undefined
  duration: number

  constructor(duration: number) {
    makeAutoObservable(this)
    this.duration = duration
  }

  plus1known = () => {
    clearTimeout(this.knownTimerId)
    this.knownText = '+1'
    this.knownTimerId = setTimeout(() => this.knownText = '', this.duration)
  }

  plus1unknown = () => {
    clearTimeout(this.unknownTimerId)
    this.unknownText = '+1'
    this.unknownTimerId = setTimeout(() => this.unknownText = '', this.duration)
  }

  minus1known = () => {
    clearTimeout(this.knownTimerId)
    this.knownText = '-1'
    this.knownTimerId = setTimeout(() => this.knownText = '', this.duration)
  }

  minus1unknown = () => {
    clearTimeout(this.unknownTimerId)
    this.unknownText = '-1'
    this.unknownTimerId = setTimeout(() => this.unknownText = '', this.duration)
  }

}

export { SortedCounterAnimation }