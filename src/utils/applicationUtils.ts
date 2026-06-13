export const NoCategory = 'all'

const numberOrEmptyRegex = /^\d*$/

export const isInputNumberOrEmpty = (input: string) => numberOrEmptyRegex.test(input)