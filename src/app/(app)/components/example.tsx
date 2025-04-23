'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Params } from '../example/[id]/page'
import { createExamplesClientService } from '@/hooks/examples/examples.client'
import { examplesQueryKeys } from '@/hooks/examples/examples.keys'

export function Example() {
  const params = useParams<Params>()
  const service = createExamplesClientService()

  const { data, isLoading, refetch } = useQuery({
    queryKey: examplesQueryKeys.getExample(params),
    queryFn: (ctx) => service.getExample(params, ctx),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>Example not found</div>
  }

  return (
    <article className="my-4 text-center">
      <div>Example {data.id}</div>
      <button
        className="bg-slate-200 px-2 text-sm font-normal"
        onClick={() => void refetch()}
      >
        Refetch
      </button>
    </article>
  )
}
