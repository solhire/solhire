import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  label?: string;
  className?: string;
}

export default function FileUpload({
  onFileSelect,
  acceptedFileTypes = 'image/*',
  maxSizeMB = 5,
  label = 'Upload File',
  className = '',
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Check file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        toast.error(`File size exceeds the maximum limit of ${maxSizeMB}MB`);
        return;
      }

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }

      setSelectedFile(file);
      onFileSelect(file);
    },
    [maxSizeMB, onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes ? { [acceptedFileTypes]: [] } : undefined,
    maxFiles: 1,
  });

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div className={className}>
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-300 hover:border-purple-400'
          }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto text-3xl text-gray-400 mb-2" />
          <p className="text-gray-600">{label}</p>
          <p className="text-xs text-gray-500 mt-1">
            Drag & drop or click to select. Max size: {maxSizeMB}MB
          </p>
        </div>
      ) : (
        <div className="relative border rounded-lg p-4">
          <button
            onClick={removeFile}
            className="absolute top-2 right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
            title="Remove file"
          >
            <FiX />
          </button>

          {preview ? (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 max-w-full object-contain rounded"
              />
            </div>
          ) : (
            <div className="flex items-center">
              <FiFile className="text-2xl text-gray-500 mr-2" />
              <span className="text-sm truncate">{selectedFile.name}</span>
            </div>
          )}

          <div className="text-xs text-gray-500 mt-2">
            {(selectedFile.size / (1024 * 1024)).toFixed(2)}MB
          </div>
        </div>
      )}
    </div>
  );
} 