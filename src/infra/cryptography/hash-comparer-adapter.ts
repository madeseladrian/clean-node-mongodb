import bcrypt from 'bcrypt'

import { type HashComparer } from '@/application/contracts'

export class HashComparerAdapter implements HashComparer {
  async compare (params: HashComparer.Params): Promise<HashComparer.Result> {
    return await bcrypt.compare(params.plaintext, params.digest)
  }
}
