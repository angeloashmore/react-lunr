import { renderHook } from '@testing-library/react-hooks'
import lunr from 'lunr'

import { useLunr } from '../src'

interface Document {
  name: string
  text: string
}

const documents: Document[] = [
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

const index = lunr(function () {
  this.ref('name')
  this.field('name')
  this.field('text')

  documents.forEach((doc) => this.add(doc))
})

const store = {
  [documents[0].name]: documents[0],
  [documents[1].name]: documents[1],
  [documents[2].name]: documents[2],
}

beforeEach(() => {
  console.error = jest.fn()
})

afterEach(() => {
  ;(console.error as jest.Mock).mockClear()
})

describe('useLunr', () => {
  test('returns results if query has matches', () => {
    const { result } = renderHook(() =>
      useLunr(documents[0].name, index, store),
    )
    expect(result.current).toEqual([documents[0]])
  })

  test('returns empty results if query has no matches', () => {
    const { result } = renderHook(() => useLunr('nomatches', index, store))
    expect(result.current).toEqual([])
  })

  test('returns empty results if no query', () => {
    const { result } = renderHook(() => useLunr(undefined, index, store))
    expect(result.current).toEqual([])
  })

  test('returns Lunr results if no store', () => {
    const { result } = renderHook(() => useLunr(documents[0].name, index))
    expect(result.current).toEqual([
      {
        matchData: { metadata: { lunr: { name: {} } } },
        ref: 'Lunr',
        score: 0.981,
      },
    ])
  })

  test('supports object index', () => {
    const { result } = renderHook(() =>
      useLunr<Document>(documents[0].name, index.toJSON(), store),
    )
    expect(result.current).toEqual([documents[0]])
  })

  test('supports stringified index and store', () => {
    const { result } = renderHook(() =>
      useLunr<Document>(
        documents[0].name,
        JSON.stringify(index.toJSON()),
        JSON.stringify(store),
      ),
    )
    expect(result.current).toEqual([documents[0]])
  })

  test('returns empty results and warns if missing index', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const { result } = renderHook(() => useLunr(documents[0].name, undefined))
    expect(result.current).toEqual([])
    spy.mockRestore()
  })

  test('throws if invalid index', () => {
    const { result } = renderHook(() => useLunr(documents[0].name, 0 as any))
    expect(result.error.message).toMatch(/invalid index provided/i)
  })

  test('returns results if builded query has matches', () => {
    const queryBuilder: lunr.Index.QueryBuilder = (q) => {
      q.term(documents[0].name.toLowerCase(), {})
    }
    const { result } = renderHook(() => useLunr(queryBuilder, index, store))
    expect(result.current).toEqual([documents[0]])
  })
})
