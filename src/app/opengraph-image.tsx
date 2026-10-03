import { ImageResponse } from 'next/og';
import { OgImage, ogImageAlt, ogImageSize } from './_og/image';

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = 'image/png';

const Image = () => new ImageResponse(<OgImage />, size);

export default Image;
