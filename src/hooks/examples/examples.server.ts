import 'server-only'

import { type ExamplesSchemas, examplesSchemas } from './examples.schemas'
import { ServerService } from '@/types/utils'

export function createExamplesServerService(): ServerService<ExamplesSchemas> {
  async function getExample(params: ExamplesSchemas['getExample']['input']) {
    const { id } = examplesSchemas.getExample.input.parse(params)

    // slilence await lint error
    await new Promise((resolve) => setTimeout(resolve, 0))
    // ... access db to query the single example

    return { id }
  }

  return { getExample }
}
