import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import lunr from 'lunr'
import memoize from 'memoize-one'

export const useLunr = (query, stringifiedIndex, stringifiedStore) => {
  const [index, setIndex] = useState(null)
  const [store, setStore] = useState(null)
  const [results, setResults] = useState([])

  useEffect(() => {
    const parsedIndex = JSON.parse(stringifiedIndex)
    setIndex(lunr.Index.load(parsedIndex))

    const parsedStore = JSON.parse(stringifiedStore)
    setStore(parsedStore)
  }, [])

  useEffect(
    () => {
      if (!query) setResults([])

      const lunrResults = index.search(query)
      const mappedResults = results.map(({ ref }) => store[ref])
      setResults(mappedResults)
    },
    [query],
  )

  return results
}

export class Lunr extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    index: PropTypes.string.isRequired,
    store: PropTypes.string.isRequired,
    initialQuery: PropTypes.string,
  }

  static defaultProps = {
    initialQuery: '',
  }

  static getDerivedStateFromProps(props, state) {
    return {
      query: props.query,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      query: props.initialQuery,
    }

    this.index = lunr.Index.load(JSON.parse(props.index))
    this.store = JSON.parse(props.store)
  }

  setQuery = query => this.setState({ query })

  search = memoize(query => {
    if (!query) return []

    const results = this.index.search(query)

    return results.map(({ ref }) => this.store[ref])
  })

  render() {
    return this.props.children({
      query: this.state.query,
      setQuery: this.setQuery,
      results: this.search(this.state.query),
    })
  }
}
