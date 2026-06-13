import { type PageConfigType } from '../types/filters'

export const PerPage = 8
export const VisiblePageCount = 5
export const DefaultFetchSize = 40

export const defaultProductPageConfig: PageConfigType = {
    total: 0,
    active: 1,
    lastFetchMin: 1,
    lastFetchMax: 5,
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

const getRangeForActive = (active: number, last: number, visible: number) => {
    const center = (visible - 1) / 2
    let start = Math.max(active - center, 1)
    const end = Math.min(start + visible - 1, last)
    const currentPageCount = end - start + 1
    const currentVisibleDiff = visible - currentPageCount

    if (currentPageCount < visible && start - currentVisibleDiff > 0) {
        start = start - currentVisibleDiff;
    }

    return {
        start,
        end
    }
}

export const getPageButtonNumbers = (active: number, last: number, visible: number) => {
    const { start, end } = getRangeForActive(active, last, visible)
    const range: number[] = []

    for (let i = start; i <= end; i++) {
        range.push(i)
    }

    return range
}

export const getPageFetchRange = (active: number, now: number, last: number, total: number, visible: number) => {
    const rangeForActive = getRangeForActive(active, last, visible)
    const rangeForNow = getRangeForActive(now, total, visible)

    let fetchRangeStart = 0;
    let fetchRangeEnd = 0;

    if (rangeForNow.start < rangeForActive.start) {
        fetchRangeStart = rangeForNow.start
        fetchRangeEnd = rangeForActive.start
    }
    if (rangeForNow.end > rangeForActive.end) {
        fetchRangeStart = rangeForActive.end + 1
        fetchRangeEnd = rangeForNow.end + 1
    }

    return {
        limit: (fetchRangeEnd - fetchRangeStart) * PerPage,
        skip: getSkipCount(fetchRangeStart),
    }
}