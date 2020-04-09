import { renderHook } from '@testing-library/react-hooks'
import { useLunr } from '../src'
import lunr from 'lunr'

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
    expect(result).toEqual([documents[0]])
  })

  test('returns empty results if query has no matches', () => {
    const { result } = renderHook(() => useLunr('nomatches', index, store))
    expect(result).toEqual([])
  })

  test('returns empty results if no query', () => {
    const { result } = renderHook(() => useLunr(undefined, index, store))
    expect(result).toEqual([])
  })

  test('returns Lunr results if no store', () => {
    const { result } = renderHook(() =>
      useLunr(documents[0].name, index, store),
    )
    expect(result).toEqual([documents[0]])
  })

  test('supports object index', () => {
    const { result } = renderHook(() =>
      useLunr<Document>(documents[0].name, index.toJSON()),
    )
    expect(result).toEqual(null)
  })

  test('supports stringified index and store', () => {
    const { result } = renderHook(() =>
      useLunr<Document>(
        documents[0].name,
        JSON.stringify(index.toJSON()),
        JSON.stringify(store),
      ),
    )
    expect(result).toEqual([documents[0]])
  })
})
