interface AA {
  a:String
}
export function f(aa:AA) {
  console.log('ts:aaa',aa?.a)
}