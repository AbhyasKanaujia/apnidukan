import { useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap'

const UploadWidget = ({ setUrl }) => {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'abhyas',
        uploadPreset: 'centrex image upload',
        sources: ['local', 'url', 'camera'],
      },
      (error, result) => {
        console.log(result)
        if (result.event === 'success') {
          setUrl(result.info.secure_url)
          widgetRef.close()
        }
      }
    )
  }, [])
  return <Button onClick={() => widgetRef.current.open()}>Upload Image</Button>
}

export default UploadWidget
