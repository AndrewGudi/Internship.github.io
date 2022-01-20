// eslint-disable-next-line
export default function clickEmit (props: any, context: any) {
  const clickShowWindow = () => {
    context.emit('isShowWindow', props.isShowWindow)
  }
  const clickShowMenu = () => {
    context.emit('isShowMenu', props.isShowMenu)
  }
  const clickShowTaskDetailsWindow = () => {
    context.emit('isShowTaskDetails', props.isShowTaskDetails)
  }
  const deleteEvent = () => {
    context.emit('deleteEvent', props.task.id)
  }
  const clickTaskDetails = () => {
    context.emit('taskDetails', props.task.id)
  }
  const clickTaskDetailsItemId = () => {
    context.emit('taskDetails', props.item.id)
  }
  // eslint-disable-next-line
  const taskDetailsItem = (item: any) => {
    context.emit('taskDetails', item)
  }
  // eslint-disable-next-line
  const clickShowTaskDetailsItem = (isShowTaskDetails: any) => {
    context.emit('isShowTaskDetails', isShowTaskDetails)
  }
  const imageId = () => {
    context.emit('imageId', props.image.id)
  }
  return {
    clickShowWindow,
    clickShowMenu,
    clickShowTaskDetailsWindow,
    deleteEvent,
    clickTaskDetails,
    taskDetailsItem,
    clickShowTaskDetailsItem,
    clickTaskDetailsItemId,
    imageId
  }
}
