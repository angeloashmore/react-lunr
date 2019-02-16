import { useState, useEffect, useMemo } from 'react'
import lunr from 'lunr'

const InvalidIndexError = Error(
  'Lunr index could not be parsed. Check that your index exists and is valid.',
)
const InvalidStoreError = Error(
  'Lunr store could not be parsed. Check that your store exists and is valid.',
)

export const useLunr = (query, stringifiedIndex, stringifiedStore) => {
  const [index, setIndex] = useState(null)
  const [store, setStore] = useState(null)

  useEffect(() => {
    if (!stringifiedIndex) throw InvalidIndexError
    const parsedIndex = JSON.parse(stringifiedIndex)
    if (!parsedIndex) throw InvalidIndexError

    setIndex(lunr.Index.load(parsedIndex))
  }, [stringifiedIndex])

  useEffect(() => {
    if (!stringifiedStore) throw InvalidStoreError
    const parsedStore = JSON.parse(stringifiedStore)
    if (!parsedStore) throw InvalidStoreError

    setStore(parsedStore)
  }, [stringifiedStore])

  return useMemo(() => {
    if (!query || !index || !store) return []

    const lunrResults = index.search(query)

    return lunrResults.map(({ ref }) => store[ref])
  }, [query, index, store])
}
