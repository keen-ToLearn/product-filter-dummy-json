import { type ReactNode } from 'react'
import { type SizeProp } from '@fortawesome/fontawesome-svg-core'

export interface RatingProps {
    content: ReactNode;
    size: SizeProp;
    outof: number;
}