import { examplesQueryKeys } from '@/hooks/examples/examples.keys'
import { createExamplesServerService } from '@/hooks/examples/examples.server'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { Example } from '../../components/example'

export type Params = { id: string }
type Props = { params: Promise<Params> }

export default async function ExamplePage(props: Props) {
  const queryClient = new QueryClient()
  const service = createExamplesServerService()
  const params = await props.params

  await queryClient.prefetchQuery({
    queryKey: examplesQueryKeys.getExample(params),
    queryFn: () => service.getExample(params),
  })

  return (
    <main className="grid h-screen w-screen place-items-center">
      <div className="text-3xl font-bold">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Example />
        </HydrationBoundary>
      </div>
    </main>
  )
}
