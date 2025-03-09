'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  uploadPath?: string;
  maxSizeMB?: number;
}

export default function ImageUploader({
  images = [],
  onChange,
  maxImages = 5,
  uploadPath = 'portfolio',
  maxSizeMB = 5
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // Check if adding these files would exceed the maximum
      if (images.length + acceptedFiles.length > maxImages) {
        toast.error(`You can only upload a maximum of ${maxImages} images`);
        return;
      }

      setUploading(true);
      const newProgressTracking: Record<string, number> = {};
      acceptedFiles.forEach(file => {
        newProgressTracking[file.name] = 0;
      });
      setUploadProgress(newProgressTracking);

      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('path', uploadPath);
          formData.append('maxSize', maxSizeMB.toString());

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to upload image');
          }

          const data = await response.json();
          return data.url;
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        onChange([...images, ...uploadedUrls]);
        toast.success('Images uploaded successfully');
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to upload images');
      } finally {
        setUploading(false);
        setUploadProgress({});
      }
    },
    [images, maxImages, maxSizeMB, onChange, uploadPath]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    disabled: uploading || images.length >= maxImages,
    maxSize: maxSizeMB * 1024 * 1024, // Convert MB to bytes
  });

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-primary/50'
        } ${uploading || images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-gray-500" />
          <p className="text-sm font-medium">
            {isDragActive
              ? 'Drop the images here...'
              : `Drag & drop images here, or click to select`}
          </p>
          <p className="text-xs text-gray-500">
            {images.length} of {maxImages} images uploaded
          </p>
          <p className="text-xs text-gray-500">
            Supported formats: JPEG, PNG, GIF, WebP (max {maxSizeMB}MB)
          </p>
        </div>
      </div>

      {uploading && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <p className="text-sm">Uploading images...</p>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="group relative aspect-square rounded-lg overflow-hidden border">
              <img
                src={image}
                alt={`Uploaded image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 