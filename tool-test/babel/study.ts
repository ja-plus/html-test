type A = {
  name: string;
  age: number;
  g: G;
};
enum G {
  a,
  b,
}
export function hello(name: string, age?: number) {
  const a: A = { name: 'hello', age: 6, g: G.a };
  const b = { ...a } as A;
  const c = 1_000_000;
}

export async function as() {
  await new Promise(resolve => {
    window.setTimeout(resolve, 1000);
  });
}
