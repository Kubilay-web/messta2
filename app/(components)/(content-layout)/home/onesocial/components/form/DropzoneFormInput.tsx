import useFileUploader from '../../hooks/useFileUploader'
import { type ReactNode } from 'react'
import Dropzone from 'react-dropzone'
import { type IconBaseProps, type IconType } from 'react-icons'
import { BsUpload } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

type FileType = File & {
  preview?: string
  formattedSize?: string
}

type DropzoneFormInputProps = {
  label?: string
  labelClassName?: string
  helpText?: ReactNode | string
  showPreview?: boolean
  icon?: IconType
  iconProps?: IconBaseProps
  text?: string
  textClassName?: string
  onFileUpload?: (files: FileType[]) => void
}

const DropzoneFormInput = ({
  label,
  labelClassName,
  helpText,
  icon,
  iconProps,
  showPreview,
  text,
  textClassName,
  onFileUpload,
}: DropzoneFormInputProps) => {
  const { selectedFiles, handleAcceptedFiles, removeFile } = useFileUploader(showPreview)

  const Icon = icon ?? BsUpload
  
  return (
    <>
      {label && (
        <label className={`block text-sm font-medium text-gray-700 mb-2 ${labelClassName || ''}`}>
          {label}
        </label>
      )}

      <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles, onFileUpload)} maxFiles={5}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone-custom">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors bg-gray-50"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon 
                {...iconProps} 
                className="w-12 h-12 text-gray-400 mx-auto mb-3" 
              />
              <p className={`text-gray-600 ${textClassName || ''}`}>
                {text || "Drag & drop files here or click to upload"}
              </p>
            </div>
            
            {showPreview && selectedFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(selectedFiles || []).map((file, idx) => (
                  <div 
                    key={`file-${idx}-${file.name}`}
                    className="relative border border-gray-200 rounded-lg p-3 shadow-sm bg-white group"
                  >
                    <div className="absolute -top-2 -right-2 z-10">
                      <button
                        className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFile(file)
                        }}
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                    
                    <div className="mb-2">
                      {file.preview ? (
                        <div className="relative h-32 w-full bg-gray-100 rounded overflow-hidden">
                          <img 
                            alt={file.name} 
                            src={file.preview} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="h-32 flex items-center justify-center bg-gray-100 rounded">
                          <span className="text-sm font-medium text-gray-500">
                            {file.name.substr(file.name.lastIndexOf('.') + 1).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {file.formattedSize}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Dropzone>

      {helpText && (
        <div className="mt-2 text-sm text-gray-500">
          {typeof helpText === 'string' ? helpText : helpText}
        </div>
      )}
    </>
  )
}

export default DropzoneFormInput