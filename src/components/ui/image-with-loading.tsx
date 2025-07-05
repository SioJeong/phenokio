import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithLoadingProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
}

const ImageWithLoading = ({
  src,
  alt,
  className,
  skeletonClassName,
  ...props
}: ImageWithLoadingProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative">
      {/* Skeleton loader */}
      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 bg-gray-200 animate-pulse rounded-lg",
            skeletonClassName
          )}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div
          className={cn(
            "absolute inset-0 bg-gray-100 flex items-center justify-center rounded-lg",
            skeletonClassName
          )}
        >
          <div className="text-gray-400 text-center">
            <div className="w-8 h-8 mx-auto mb-2">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-sm">이미지를 불러올 수 없습니다</span>
          </div>
        </div>
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          className,
          isLoading ? "opacity-0" : "opacity-100",
          "transition-opacity duration-300"
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default ImageWithLoading;
