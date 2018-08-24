# react-lunr

React component to search a [Lunr][lunr] index. The Lunr index and data store
is provided as a string from `JSON.stringify`.

This component uses the [Render Props][render-props] pattern and does not
handle any rendering for you. Instead, it provides the data and functions
needed to manage your UI.

## Status

[![npm version](https://badge.fury.io/js/react-lunr.svg)](http://badge.fury.io/js/react-lunr)

## Installation

```sh
npm install --save react-lunr
```

## Example

The following example renders a text input and queries the Lunr index on form
submission.

Note: `Formik` is used in the following example to handle form state, but is
not required. As long as `setQuery` is called with a string, you can manage how
you call it.

```js
import React from 'react'
import { Lunr } from 'react-lunr'
import { Formik } from 'formik'

const index = JSON.stringify(/* a lunr index */)
const store = JSON.stringify({
  1: { id: 1, title: 'Document 1' },
  2: { id: 2, title: 'Document 2' },
  3: { id: 3, title: 'Document 3' },
})

const SearchBar = () => (
  <Lunr index={index} store={store}>
    {({ results, setQuery }) => (
      <>
        <Formik
          initialValues={{ query: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setQuery(values.query)
            setSubmitting(false)
          }}
          render={({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            isSubmitting,
            touched,
            setTouched,
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                name="query"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.query}
              />
            </form>
          )}
        />
        <h1>Results</h1>
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      </>
    )}
  </Lunr>
)
```

## Props

| Name               | Type     | Description                                                                            |
| ------------------ | -------- | -------------------------------------------------------------------------------------- |
| **`index`**        | `String` | **Required**. Lunr index passed that has already been passed through `JSON.stringify`. |
| **`store`**        | `String` | **Required**. Object mapping a result `ref` to an object of data.                      |
| **`initialQuery`** | `String` | The initial search query. Default: empty string.                                       |

The `children` prop will receive the following variables:

| Name           | Type            | Description                                |
| -------------- | --------------- | ------------------------------------------ |
| **`setQuery`** | `Function`      | Function to set the search query.          |
| **`results`**  | `Array<Object>` | Array of results with data from the store. |

[lunr]: https://lunrjs.com/
[render-props]: https://reactjs.org/docs/render-props.html
