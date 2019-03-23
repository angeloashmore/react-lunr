# react-lunr

React hook and component to search a [Lunr][lunr] index.

## Status

[![npm version](https://badge.fury.io/js/react-lunr.svg)](http://badge.fury.io/js/react-lunr)

## Installation

```sh
npm install --save react-lunr
```

## API

### `useLunr` hook

```js
useLunr(query: String, index: lunr.Index! | String!, store: Object! | String!) => Object[]
```

The `useLunr` [hook][hooks] takes your search query, index, and store and returns
results as an array. Searches are memoized to ensure efficient searching.

#### Parameters

| Name        | Type                   | Description                                                                                                                           |
| ----------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **`query`** | `String`               | The search query. As this value updates, the return value will be updated.                                                            |
| **`index`** | `lunr.Index \| String` | The Lunr index. This can be an instance of a Lunr index or one that has been exported via `JSON.stringify`.                           |
| **`store`** | `Object \| String`     | Object mapping a result `ref` to an object of data. This can be an object or an object that has been exported via `JSON.stringified`. |

#### Example

The following example renders a text input and queries the Lunr index on form
submission.

Note: [Formik][formik] is used in the following example to handle form state,
but is not required. As long as your query is passed as the first parameter,
you can manage how to store it.

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

---

### `Lunr` component

The `Lunr` component uses the [Render Props][render-props] pattern and does not
handle any rendering for you. Instead, it provides the data and functions
needed to manage your UI.

#### Props

| Name        | Type                   | Description                                                                                                                           |
| ----------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **`query`** | `String`               | The search query. As this value updates, the `results` children prop will be updated. Default: empty string.                          |
| **`index`** | `lunr.Index \| String` | The Lunr index. This can be an instance of a Lunr index or one that has been exported via `JSON.stringify`.                           |
| **`store`** | `Object \| String`     | Object mapping a result `ref` to an object of data. This can be an object or an object that has been exported via `JSON.stringified`. |

The `children` prop will receive the following variables:

| Name           | Type            | Description                                |
| -------------- | --------------- | ------------------------------------------ |
| **`query`**    | `String`        | The search query.                          |
| **`setQuery`** | `Function`      | Function to set the search query.          |
| **`results`**  | `Array<Object>` | Array of results with data from the store. |

#### Example

The following example renders a text input and queries the Lunr index on form
submission.

Note: [Formik][formik] is used in the following example to handle form state,
but is not required. As long as your query is passed via `setQuery` or with the
`query` prop, you can manage how to provide it.

```js
import React from 'react'
import { Lunr } from 'react-lunr'
import { Formik, Form, Field } from 'formik'

const index = /* a lunr index */
const store = {
  1: { id: 1, title: 'Document 1' },
  2: { id: 2, title: 'Document 2' },
  3: { id: 3, title: 'Document 3' },
}

const SearchBar = () => (
  <Lunr index={index} store={store}>
    {({ results, setQuery }) => (
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
    )}
  </Lunr>
)
```

[lunr]: https://lunrjs.com/
[render-props]: https://reactjs.org/docs/render-props.html
[hooks]: https://reactjs.org/docs/hooks-intro.html
[formik]: https://github.com/jaredpalmer/formik
