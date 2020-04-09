import React from 'react'

type RenderProps = {
  query: string
  setQuery: (query: string) => void
  results: any[]
}

type LunrProps = {
  children: (props: RenderProps) => void
  index: string
  store: string
  initialQuery?: string
}

declare class Lunr extends React.Component<LunrProps, any> {}
