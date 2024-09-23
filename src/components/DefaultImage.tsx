import Image, { ImageProps } from 'next/image';
import React from 'react';

type CustomImageProps = Omit<ImageProps, 'alt'> & {
    alt?: string
}

const DefaultImage: React.FC<CustomImageProps> = ({
    alt = "Default Alt Text",
    width = 100,
    height = 100,
    loading = 'lazy',
    ...props
}) => {
    return <Image alt={alt} width={width} height={height} loading={loading} {...props} />;
};

export default DefaultImage;
