import { PriceKeys } from '../../../types/enums'

interface InputProps {
    placeHolder: string;
}

export interface SearchInputProps extends InputProps {}

export interface AmountInputProps extends InputProps {
    fieldKey: PriceKeys;
    value: string;
}