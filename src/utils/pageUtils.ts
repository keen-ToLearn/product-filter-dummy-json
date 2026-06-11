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