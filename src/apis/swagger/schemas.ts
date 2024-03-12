import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  signUpParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  error: errorSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema
}
