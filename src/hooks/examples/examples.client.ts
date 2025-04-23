import type { QueryFunctionContext } from '@tanstack/react-query'

import { type ExamplesSchemas, examplesSchemas } from './examples.schemas'
import { ClientService } from '@/types/utils'

export function createExamplesClientService(): ClientService<ExamplesSchemas> {
  async function getExample(
    params: ExamplesSchemas['getExample']['input'],
    ctx: QueryFunctionContext
  ) {
    const response = await fetch(`/api/examples/${params.id}`, {
      signal: ctx.signal,
    })
    const data = examplesSchemas.getExample.output.parse(await response.json())

    return data
  }

  return { getExample }
}
