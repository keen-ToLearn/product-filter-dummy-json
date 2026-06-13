import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { type RatingProps } from './types'

import styles from './Rating.module.css'

const filledStarStyle = { color: 'rgb(255, 215, 0)' }
const blankStarStyle = { color: 'rgb(164, 164, 164)' }

export const Rating = React.memo(({ content, size, outof }: RatingProps) => {
    if (typeof content === 'number') {
        const lastStar = Math.ceil(content)

        const renderRatingStars = Array.from({length: outof}, (_, i) => {
            const starNum = i + 1

            if (starNum === lastStar) {
                return (
                    <div key={`star-${starNum}`} className={styles['partial-star-box']}>
                        <FontAwesomeIcon icon={faStar} size={size} style={blankStarStyle} />
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            overflow: 'hidden',
                            width: `${(content - lastStar + 1) * 100}%`,
                        }}>
                            <FontAwesomeIcon icon={faStar} size={size} style={filledStarStyle} />
                        </div>
                    </div>
                )
            }

            if (starNum > lastStar) {
                return (
                    <FontAwesomeIcon key={`star-${starNum}`} icon={faStar} size={size} style={blankStarStyle} />
                )
            }

            return (
                <FontAwesomeIcon key={`star-${starNum}`} icon={faStar} size={size} style={filledStarStyle} />
            )
        })

        return (
            <div className={styles['rating-flex']}>
                {renderRatingStars}
                <span>{`(${content.toFixed(1)})`}</span>
            </div>
        )
    }
    
    return (
        <></>
    )
})