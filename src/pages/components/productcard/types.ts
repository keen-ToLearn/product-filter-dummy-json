import { type ReactNode } from 'react';

type ContentType = 'rating'

export type RightContentInfoType = {
    content: ReactNode;
    contentType: ContentType;
}

type FooterInfoType = {
    left: ReactNode;
    right: RightContentInfoType;
}

export interface ProductCardProps {
    id: number;
    title: string;
    imageURI: string;
    footerInfo: FooterInfoType;
}