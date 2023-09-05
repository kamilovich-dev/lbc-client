import { Controller, SpringRef } from '@react-spring/web'

class Animation {

  api = SpringRef()
  controller = new Controller({
    ref: this.api,
    from: { transform: '', transformOrigin: '', opacity: '' },
    config: { mass: 5, tension: 500, friction: 80, duration: 500 },
  })

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
      from: { transform: `perspective(1200px) translateX(-200px) rotateY(20deg)`, opacity: 0.3},
      to: { transform: `perspective(1200px) translateX(0px) rotateY(0deg)'}`, opacity: 1},
    })
  }

}

export { Animation }


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