import { useMemo } from 'react'
import { Index } from 'lunr'
import warning from 'tiny-warning'
import invariant from 'tiny-invariant'

type Store<T> = Record<string | number | symbol, T>

export const useLunr = <T = unknown>(
  query?: string,
  rawIndex?: Index | object | string,
  rawStore?: Store<T> | string,
) => {
  const index = useMemo(() => {
    if (rawIndex === undefined || rawIndex === null) {
      warning(
        rawIndex !== undefined && rawIndex !== null,
        'No index was provided. Results will always be empty.',
      )
      return
    }
    if (rawIndex instanceof Index) return rawIndex
    if (typeof rawIndex === 'string') return Index.load(JSON.parse(rawIndex))
    if (typeof rawIndex === 'object') return Index.load(rawIndex)

    invariant(
      false,
      'Invalid index provided. Please provide an instance of Lunr.Index or exported JSON or string index.',
    )
  }, [rawIndex])

  const store = useMemo(() => {
    if (typeof rawStore === 'string') return JSON.parse(rawStore) as Store<T>

    return rawStore
  }, [rawStore])

  return useMemo(() => {
    if (!query || !index) return []

    const results = index.search(query)

    if (store) return results.map(({ ref }) => store[ref])

    return results
  }, [query, index, store])
}
