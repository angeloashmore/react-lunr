import { useState, useEffect, useMemo } from 'react'
import lunr from 'lunr'

const InvalidIndexError = Error(
  'Lunr index could not be parsed. Check that your index exists and is valid.',
)
const InvalidStoreError = Error(
  'Lunr store could not be parsed. Check that your store exists and is valid.',
)

export const useLunr = (query, providedIndex, providedStore) => {
  const [index, setIndex] = useState(null)
  const [store, setStore] = useState(null)

  useEffect(() => {
    const processedIndex =
      typeof providedIndex === 'string'
        ? lunr.Index.load(JSON.parse(providedIndex))
        : providedIndex

    if (!processedIndex) throw InvalidIndexError

    setIndex(processedIndex)
  }, [providedIndex])

  useEffect(() => {
    const processedStore =
      typeof providedStore === 'string'
        ? JSON.parse(providedStore)
        : providedStore

    if (!processedStore) throw InvalidStoreError

    setStore(processedStore)
  }, [providedStore])

  return useMemo(() => {
    if (!query || !index || !store) return []

    const lunrResults = index.search(query)

    return lunrResults.map(({ ref }) => store[ref])
  }, [query, index, store])
}
