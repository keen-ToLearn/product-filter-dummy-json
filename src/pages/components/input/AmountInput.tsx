import { useContext } from 'react'

import { ProductContext } from '../../../providers'
import { type AmountInputProps } from './types'

import styles from './Input.module.css'
import { isInputNumberOrEmpty } from '../../../utils'

export const AmountInput = ({ placeHolder, fieldKey, value }: AmountInputProps) => {
    const { updateFilterPrice } = useContext(ProductContext)

    const handlePriceChange = (value: string) => {
        if (!isInputNumberOrEmpty(value)) {
            return
        }

        updateFilterPrice(fieldKey, value)
    }

    return (
        <div className={styles['input-field-container']}>
            <input
                type={'text'}
                name={fieldKey}
                className={styles['input-field']}
                placeholder={placeHolder}
                value={value}
                onChange={(event) => handlePriceChange(event.target.value)}
                autoComplete='off'
            />
        </div>
    )
}