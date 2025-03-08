import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ImageCropperProps {
  imageUrl: string;
  aspectRatio?: number;
  onCrop: (croppedImageBlob: Blob) => void;
  onCancel: () => void;
}

export default function ImageCropper({ 
  imageUrl, 
  aspectRatio = 1, 
  onCrop, 
  onCancel 
}: ImageCropperProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [cropSize, setCropSize] = useState({ width: 250, height: 250 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set crop size based on aspect ratio
  useEffect(() => {
    setCropSize({
      width: 250,
      height: 250 / aspectRatio
    });
  }, [aspectRatio]);

  // Get image dimensions on load
  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight
      });
    }
  };

  // Handle crop action
  const handleCrop = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx || !imageRef.current) return;
    
    // Set canvas size to crop size
    canvas.width = cropSize.width;
    canvas.height = cropSize.height;
    
    // Calculate source rectangle (the part of the image to crop)
    const sourceX = (cropSize.width / 2 - position.x) / scale;
    const sourceY = (cropSize.height / 2 - position.y) / scale;
    const sourceWidth = cropSize.width / scale;
    const sourceHeight = cropSize.height / scale;
    
    // Draw the cropped image
    ctx.drawImage(
      imageRef.current,
      sourceX, sourceY, sourceWidth, sourceHeight,
      0, 0, cropSize.width, cropSize.height
    );
    
    // Convert canvas to blob and pass to callback
    canvas.toBlob((blob) => {
      if (blob) {
        onCrop(blob);
      }
    }, 'image/jpeg', 0.9);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 max-w-md w-full"
        ref={containerRef}
      >
        <h3 className="text-xl font-semibold mb-4">Crop Image</h3>
        
        <div className="relative overflow-hidden mb-4" style={{ 
          width: cropSize.width, 
          height: cropSize.height,
          margin: '0 auto'
        }}>
          {/* Crop overlay */}
          <div className="absolute inset-0 border-2 border-purple-500 z-10"></div>
          
          {/* Image to crop */}
          <motion.div
            drag
            dragConstraints={containerRef}
            style={{ x: position.x, y: position.y }}
            onDrag={(_, info) => {
              setPosition({
                x: position.x + info.delta.x,
                y: position.y + info.delta.y
              });
            }}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Image to crop"
              style={{ 
                transform: `scale(${scale})`,
                transformOrigin: 'center'
              }}
              onLoad={handleImageLoad}
              className="max-w-none"
            />
          </motion.div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Zoom</label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Apply
          </button>
        </div>
      </motion.div>
    </div>
  );
} 