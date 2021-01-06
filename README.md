# react-lunr

React hook to search a [Lunr][lunr] index.

## Status

[![npm version](https://img.shields.io/npm/v/react-lunr?style=flat-square)](https://www.npmjs.com/package/react-lunr)
[![Build Status](https://img.shields.io/github/workflow/status/angeloashmore/react-lunr/CI?style=flat-square)](https://github.com/angeloashmore/react-lunr/actions?query=workflow%3ACI)

## Installation

```sh
npm install --save react-lunr
```

## API

### `useLunr`

```js
useLunr(query?: string | lunr.Index.QueryBuilder, index?: lunr.Index | JSON | string, store: object | string) => object[]
```

The `useLunr` [hook][hooks] takes your search query, index, and store and
returns results as an array. Searches are memoized to ensure efficient
searching.

#### Parameters

| Name        | Type                                  | Description                                                                                                                           |
| ----------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **`query`** | `string` \| `lunr.Index.QueryBuilder` | The search query. As this value updates, the return value will be updated. This can be a string or a query builder.                   |
| **`index`** | `lunr.Index \| JSON \| string`        | The Lunr index. This can be an instance of a Lunr index or one that has been exported via `index.toJSON` or `JSON.stringify`.         |
| **`store`** | `JSON \| string`                      | Object mapping a result `ref` to an object of data. This can be an object or an object that has been exported via `JSON.stringified`. |

If `store` is not provided, the raw results data from Lunr will be returned
instead. This includes the `ref` used when creating the index.

#### Example

The following example renders a text input and queries the Lunr index on form
submission.

Note: [Formik][formik] is used in the following example to handle form state,
but is not required. As long as your query is passed as the first parameter, you
can manage how to store it.

```js
import React, { useState } from 'react'
import { useLunr } from 'react-lunr'
import { Formik, Form, Field } from 'formik'

const index = /* a lunr index */
const store = {
  1: { id: 1, title: 'Document 1' },
  2: { id: 2, title: 'Document 2' },
  3: { id: 3, title: 'Document 3' },
}

const SearchBar = () => {
  const [query, setQuery] = useState(null)
  const results = useLunr(query, index, store)

  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setQuery(values.query)
        setSubmitting(false)
      }}
    >
      <Form>
        <Field name="query" />
      </Form>
      <h1>Results</h1>
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </Formik>
  )
}
```

[lunr]: https://lunrjs.com/
[render-props]: https://reactjs.org/docs/render-props.html
[hooks]: https://reactjs.org/docs/hooks-intro.html
[formik]: https://github.com/jaredpalmer/formik
