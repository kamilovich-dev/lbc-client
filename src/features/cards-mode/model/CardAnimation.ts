import { Controller } from '@react-spring/web'
import { makeAutoObservable } from "mobx"

/*Card animations */
class CardAnimation {

  duration: number = 500
  controller = new Controller({
    from: { transform: '', transformOrigin: '', opacity: '' },
    config: { mass: 5, tension: 500, friction: 80, duration: this.duration },
  })

  knownController = new Controller({
    from: { transform: '', transformOrigin: '', opacity: 1, visibility: 'hidden' },
    config: { mass: 5, tension: 500, friction: 80, duration: this.duration },
  })

  unknownController = new Controller({
    from: { transform: '', transformOrigin: '', opacity: 1, visibility: 'hidden' },
    config: { mass: 5, tension: 500, friction: 80, duration: this.duration },
  })

  cancelController = new Controller({
    from: { transform: '', transformOrigin: '', opacity: 1, visibility: 'hidden' },
    config: { mass: 5, tension: 500, friction: 80, duration: this.duration },
  })

  constructor() {
    makeAutoObservable(this)
  }

  reset = () => {
    this.controller.set({transform: 'rotateX(0deg)'})
  }

  flip = ( isFlipped: boolean ) => {
    const startAngle = isFlipped ? 0 : 180
    const endAngle = isFlipped ? 180 : 360

    this.controller.start({
        from: { transform: `perspective(1200px) rotateX(${startAngle}deg)` },
        to: { transform: `perspective(1200px) rotateX(${endAngle}deg)` },
        config: { duration: 300 }
    })
  }

  next = () => {
    this.controller.start({
      from: { transform: 'perspective(1200px) translateX(200px) rotateY(-20deg)', opacity: 0.3 },
      to: { transform: 'perspective(1200px) translateX(0px) rotateY(0deg)', opacity: 1},
    })
  }

  prev = () => {
    this.controller.start({
      from: { transform: 'perspective(1200px) translateX(-200px) rotateY(20deg)', opacity: 0.3 },
      to: { transform: 'perspective(1200px) translateX(0px) rotateY(0deg)', opacity: 1},
    })
  }

  known = () => {
    this.reset()
    this.knownController.start({
      from: { transform: 'rotateZ(0deg)', opacity: 1, visibility: 'visible' },
      to: { transform: 'rotateZ(-3deg) translateX(0px)', opacity: 1, visibility: 'visible'},
      config: { duration: 300 }
    })
    .then(() => {
      this.knownController.start({
        to: [
          { transform: 'rotateZ(0deg) translateX(200px)', opacity: 0, visibility: 'visible'},
          { visibility: 'hidden'},
        ],
        config: { duration: this.duration / 4 }
      })
    })
  }

  unknown = () => {
    this.reset()
    this.unknownController.start({
      from: { transform: 'rotateZ(0deg)', opacity: 1, visibility: 'visible' },
      to: { transform: 'rotateZ(3deg) translateX(0px)', opacity: 0.9, visibility: 'visible'},
      config: { duration: 300 }
    })
    .then(() => {
      this.unknownController.start({
        to: [
          { transform: 'rotateZ(0deg) translateX(-200px)', opacity: 0, visibility: 'visible'},
          { visibility: 'hidden'},
        ],
        config: { duration: this.duration / 4 }
      })
    })
  }

  cancel = () => {
    this.controller.start({
      from: { transform: 'translateX(0px)', opacity: '1' },
      to: { transform: 'translateX(200px)', opacity: '0'},
    })
  }

}

export { CardAnimation }


// sortedCanceled: { /* 1 */
// from: { transform: 'translateX(100px)', opacity: '0' },
// to: { transform: 'translateX(0px)', opacity: '1'},
// },
// sortedUnknown: { /* 2 */
// from: { transform: 'translateZ(20px) rotateZ(2deg)' },
// to: { transform: 'translateZ(0px) rotateZ(0deg)'},
// },
// sortedKnown: { /* 3 */
// from: { transform: 'translateZ(20px) rotateZ(-2deg)' },
// to: { transform: 'translateZ(0px) rotateZ(0deg)'},
// },