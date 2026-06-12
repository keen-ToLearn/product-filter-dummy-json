import { type PageConfigType } from '../types/filters'

export const PerPage = 8

export const defaultProductPageConfig: PageConfigType = {
    total: 0,
    active: 1,
    lastFetchMin: 1,
    lastFetchMax: 5,
    limit: 40,
}

export const getSkipCount = (now: number) => Math.max((now - 1), 0) * PerPage

export const getDataRangeForPage = (now: number) => {
    const start = (now - 1) * PerPage
    const end = now * PerPage
    const range: number[] = []

    for (let i = start; i < end; i++) {
        range.push(i)
    }

    return range
}