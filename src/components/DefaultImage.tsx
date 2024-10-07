import Image, { ImageProps } from 'next/image';
import React from 'react';

type CustomImageProps = Omit<ImageProps, 'alt'> & {
    alt?: string
}

const DefaultImage: React.FC<CustomImageProps> = ({
    alt = "Default Alt Text",
    width = 0,
    height = 0,
    sizes = "100vw",
    ...props
}) => {
    return <Image alt={alt} width={width} height={width ? 0 : height} sizes={sizes} {...props} />;
};

export default DefaultImage;
