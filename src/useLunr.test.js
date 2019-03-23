import React from 'react'
import { testHook, cleanup } from 'react-testing-library'
import lunr from 'lunr'
import { useLunr } from './useLunr'

const documents = [
  {
    name: 'Lunr',
    text: 'Like Solr, but much smaller, and not as bright.',
  },
  {
    name: 'React',
    text: 'A JavaScript library for building user interfaces.',
  },
  {
    name: 'Lodash',
    text:
      'A modern JavaScript utility library delivering modularity, performance & extras.',
  },
]

const index = lunr(function() {
  this.ref('name')
  this.field('name')
  this.field('text')

  documents.forEach(doc => this.add(doc))
})

const store = {
  [documents[0].name]: documents[0],
  [documents[1].name]: documents[1],
  [documents[2].name]: documents[2],
}

const strIndex = JSON.stringify(index)
const strStore = JSON.stringify(store)

beforeEach(() => {
  console.error = jest.fn()
})

afterEach(cleanup)
afterEach(() => {
  console.error.mockClear()
})

describe('useLunr', () => {
  test('returns empty results if no query', () => {
    let objResults
    testHook(() => (objResults = useLunr(null, index, store)))

    let strResults
    testHook(() => (strResults = useLunr(null, strIndex, strStore)))

    expect(objResults).toEqual([])
    expect(strResults).toEqual([])
  })

  test('returns empty results if query has no matches', () => {
    let objResults
    testHook(() => (objResults = useLunr('nomatches', index, store)))

    let strResults
    testHook(() => (strResults = useLunr('nomatches', strIndex, strStore)))

    expect(objResults).toEqual([])
    expect(strResults).toEqual([])
  })

  test('returns results if query has matches', () => {
    let objResults
    testHook(() => (objResults = useLunr(documents[0].name, index, store)))

    let strResults
    testHook(
      () => (strResults = useLunr(documents[0].name, strIndex, strStore)),
    )

    expect(objResults).toEqual([documents[0]])
    expect(strResults).toEqual([documents[0]])
  })

  test('throws if index is missing', () => {
    expect(() => {
      testHook(() => useLunr(documents[0].name, null, store))
    }).toThrow('index could not be parsed')

    expect(() => {
      testHook(() => useLunr(documents[0].name, null, strStore))
    }).toThrow('index could not be parsed')

    expect(() => {
      testHook(() => useLunr(documents[0].name, undefined, store))
    }).toThrow('index could not be parsed')

    expect(() => {
      testHook(() => useLunr(documents[0].name, undefined, strStore))
    }).toThrow('index could not be parsed')
  })

  test('throws if store is missing', () => {
    expect(() => {
      testHook(() => useLunr(documents[0].name, index, null))
    }).toThrow('store could not be parsed')

    expect(() => {
      testHook(() => useLunr(documents[0].name, strIndex, null))
    }).toThrow('store could not be parsed')

    expect(() => {
      testHook(() => useLunr(documents[0].name, index, undefined))
    }).toThrow('store could not be parsed')

    expect(() => {
      testHook(() => useLunr(documents[0].name, strIndex, undefined))
    }).toThrow('store could not be parsed')
  })
})
