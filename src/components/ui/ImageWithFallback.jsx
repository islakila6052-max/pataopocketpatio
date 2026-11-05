import { forwardRef, useEffect, useState } from 'react';

const FALLBACK_IMAGE = '/plant-image-fallback.svg';

const ImageWithFallback = forwardRef(function ImageWithFallback(
  { src, onError, ...props },
  ref
) {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <img
      {...props}
      ref={ref}
      src={imageSrc}
      onError={(event) => {
        if (imageSrc !== FALLBACK_IMAGE) setImageSrc(FALLBACK_IMAGE);
        onError?.(event);
      }}
    />
  );
});

export default ImageWithFallback;
