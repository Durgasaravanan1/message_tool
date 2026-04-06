import React, { useState } from 'react';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export const ImageWithFallback = (props) => {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    console.log('Image failed to load:', props.src);
    setDidError(true);
  };

  const { src, alt, style, className, ...rest } = props;

  if (didError) {
    console.log('Rendering fallback image for:', src);
    return (
      <div
        className={`inline-block bg-gray-100 dark:bg-gray-800 text-center align-middle ${className || ''}`}
        style={style}
        role="img"
        aria-label={`Failed to load image: ${alt || 'image'}`}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img 
            src={ERROR_IMG_SRC} 
            alt="Error loading image" 
            {...rest} 
            data-original-url={src}
            className="opacity-50 dark:opacity-40"
          />
        </div>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt || 'Image'} 
      className={className} 
      style={style} 
      {...rest} 
      onError={handleError}
      loading="lazy"
    />
  );
};

// Optional: Add a default export for convenience
export default ImageWithFallback;