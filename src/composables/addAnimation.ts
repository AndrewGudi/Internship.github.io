// eslint-disable-next-line
export default function addAnimation (divs: any) {
  const addingTaskAnimation = () => {
    // eslint-disable-next-line
    divs.value.forEach((item: any, index: number) => {
      setTimeout(() => {
        item.$el.classList.add('animate-grow')

        function handleAnimationEnd (event: Event) {
          event.stopPropagation()
          item.$el.classList.remove('animate-grow')
        }

        item.$el.addEventListener('animationend', handleAnimationEnd, { once: true })
      }, 1000 * (index + 1))
    })
  }
  return {
    addingTaskAnimation
  }
}
