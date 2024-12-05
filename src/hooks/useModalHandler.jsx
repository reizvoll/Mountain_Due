import { useState } from 'react'

const useModalHandler = () => {
  const [isClicked, setIsClicked] = useState(false)
  const [youtubeId, setYoutubeId] = useState('')

  const modalClickHandler = (item) => {
    console.log(item)
    const toggle = !isClicked
    setIsClicked(toggle)
    const { id } = item
    setYoutubeId(id)
  }

  const modalClose = (e) => {
    e.stopPropagation()
    setIsClicked(false)
  }
  return { isClicked, youtubeId, modalClickHandler, modalClose }
}

export default useModalHandler
