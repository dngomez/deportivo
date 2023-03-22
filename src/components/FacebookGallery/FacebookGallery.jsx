import { useEffect, useState } from "react"

const USER_ID = "10229150910253654"
const APP_ID = "761272558684942"
const APP_SECRET = "c57839edcb84859842e0dd58758dcefe"

export default function FacebookGallery() {
  const [photoList, setPhotoList] = useState([])

  useEffect(() => {
    fetch(`https://graph.facebook.com/user/photos/?access_token=${APP_ID}|${APP_SECRET}`)
    .then(res => res.json())
    .then(data => {
      if ("data" in data) setPhotoList(data.data)
    })
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (photoList.length > 0) {
      console.log(photoList[0])
      // fetch(`https://graph.facebook.com/${USER_ID}/photos?access_token=${USER_TOKEN}`)
      // .then(res => res.json())
      // .then(data => setPhotoList(data.data))
      // .catch(error => console.log(error))
    }
  }, [photoList])

  let photoIds = []
  if (photoList.length > 0) {
    photoList.map((photo, index) => {
      photoIds.push(<span key={index}>{photo.id}</span>)
    })
  }

  return (
    <>
      <img src="https://drive.google.com/uc?export=view&id=1gwF3PuvMzqqi-wWvEyJ_qbmBRDaD_rUv" />
    </>
  )
}