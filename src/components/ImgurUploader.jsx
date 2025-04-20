'use client'
import { useState, useRef } from 'react'

export default function ImgurUploader() {
  const [image, setImage] = useState(null)
  const [imgurUrl, setImgurUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, GIF)')
      return
    }

    setError('')
    const reader = new FileReader()
    reader.onload = (event) => setImage(event.target.result)
    reader.readAsDataURL(file)
  }

  const uploadToImgur = async () => {
    if (!image) {
      setError('Please select an image first')
      return
    }

    setIsUploading(true)
    setError('')

    try {
      const formData = new FormData()
      const blob = await fetch(image).then(r => r.blob())
      formData.append('image', blob)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Upload failed')

      setImgurUrl(data.link)
    } catch (err) {
      setError(err.message || 'Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
        {image ? (
          <img src={image} alt="Preview" className="max-h-60 mx-auto" />
        ) : (
          <p className="text-gray-500">Click to select or drag & drop an image</p>
        )}
      </div>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

      {image && !imgurUrl && (
        <button
          onClick={uploadToImgur}
          disabled={isUploading}
          className={`mt-4 w-full py-2 rounded-md ${isUploading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
        >
          {isUploading ? 'Uploading...' : 'Upload to Imgur'}
        </button>
      )}

      {imgurUrl && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700 mb-2">Upload successful!</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={imgurUrl}
              readOnly
              className="flex-1 px-2 py-1 border rounded text-sm"
              onClick={(e) => e.target.select()}
            />
            <button
              onClick={() => navigator.clipboard.writeText(imgurUrl)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}