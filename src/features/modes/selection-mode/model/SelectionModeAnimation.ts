import { Controller } from '@react-spring/web'
import { makeAutoObservable } from "mobx"

/*Card animations */
export class SelectionModeAnimation {

  private basicDuration: number = 400
  controllers: Array<Controller> = []

  constructor( controllersCount: number ) {
    makeAutoObservable(this)
    this.initControllers(controllersCount)
  }

  private initControllers = (controllersCount: number) => {
    for (let i = 0; i < controllersCount; i++) {
        this.controllers.push(new Controller({
            from: { transform: '', transformOrigin: '', opacity: '', backgroundColor: '' },
            config: { mass: 5, tension: 500, friction: 80, duration: this.basicDuration },
        }))
    }
  }

  select = async (idx: number) => {
    return this.controllers[idx].start({
        from: { transform: 'scale(1) rotateZ(0deg)', backgroundColor: '#9FDEF9' },
        to: { transform: 'scale(1) rotateZ(0deg)', backgroundColor: '#9FDEF9' },
        config: { duration: 100 }
    })
  }

  match = async (idx1: number, idx2: number) => {
    return await Promise.all([
        this.controllers[idx1].start({
            from: { transform: 'scale(1) rotateZ(0deg)', backgroundColor: '#63C679' },
            to: { transform: 'scale(0) rotateZ(0deg)', backgroundColor: '#63C679' },
            config: { duration: 400 }
        }),
        this.controllers[idx2].start({
            from: { transform: 'scale(1) rotateZ(0deg)', backgroundColor: '#63C679' },
            to: { transform: 'scale(0) rotateZ(0deg)', backgroundColor: '#63C679' },
            config: { duration: 400 }
        })
    ])
  }

  mismatch = async (idx1: number, idx2: number) => {
    return await Promise.all([
        this.controllers[idx1].start({
            from: { transform: 'rotateZ(-5deg)', backgroundColor: '#D34646' },
            to: [
                { transform: 'rotateZ(0deg)', backgroundColor: '#D34646' },
                { transform: 'rotateZ(5deg)', backgroundColor: '#D34646' },
                { transform: 'rotateZ(0deg) ', backgroundColor: 'white' }
            ],
            config: {duration: 100}
        }),
        this.controllers[idx2].start({
            from: { transform: 'rotateZ(5deg) ', backgroundColor: '#D34646' },
            to: [
                { transform: 'rotateZ(0deg)', backgroundColor: '#D34646' },
                { transform: 'rotateZ(-5deg)', backgroundColor: '#D34646' },
                { transform: 'rotateZ(0deg) ', backgroundColor: 'white' }
            ],
            config: {duration: 100}
        })
    ])

  }

}
