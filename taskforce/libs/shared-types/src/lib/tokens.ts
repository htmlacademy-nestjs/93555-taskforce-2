export interface Token {
  _id?,
  userId: string,
  hash?: string
  exp: Date
}
