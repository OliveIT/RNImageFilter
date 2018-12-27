import * as React from 'react';
import { Image } from 'react-native';
import {
    Grayscale,
    Sepia,
    Tint,
    ColorMatrix,
    concatColorMatrices,
    invert,
    contrast,
    saturate
} from 'react-native-color-matrix-image-filters';
  
export const GrayscaledImage = (imageProps) => (
    <Grayscale>
        <Image {...imageProps} />
    </Grayscale>
);

export const SepiaFilterImage = (imageProps) => (
    <Sepia>
        <Image {...imageProps} />
    </Sepia>
);

export const TintFilterImage = (imageProps) => (
<Tint amount={1.25}>
    <Image {...imageProps} />
</Tint>
);

export const ColorMatrixImage = (imageProps) => (
<ColorMatrix
    matrix={concatColorMatrices([saturate(-0.9), contrast(5.2), invert()])}
    // alt: matrix={[saturate(-0.9), contrast(5.2), invert()]}
>
    <Image {...imageProps} />
</ColorMatrix>
);