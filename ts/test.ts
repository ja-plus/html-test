enum Status {
  start,
  end,
}
const enum Status2 {
  start,
  end,
}
console.log(Status.start);
console.log(Status2.start);

interface Eat {
  eat(name: string): void;
}
interface Run {
  run(name: string): void;
}

class Person implements Eat, Run {
  name: string;
  public age: number;
  private readonly gender: string;
  protected school: string;
  constructor(name: string) {
    this.name = name || 'tom';
    this.gender = 'boy';
  }
  eat(name: string): void {
    throw new Error('Method not implemented.');
  }
  run(name: string): void {
    throw new Error('Method not implemented.');
  }
  sayHi(msg: string): void {
    console.log('hi' + msg);
    // this.gender = 1
  }
}
class Student extends Person {
  constructor(name: string) {
    super(name);
    this.school = '1';
  }
  static create(name: string) {
    return new Person(name);
  }
}

const person = Student.create('a'); // new Person()

function createNuberArray(length: number, value: number): number[] {
  const arr = Array<number>(length).fill(value);
  return arr;
}
function createArray<T>(length: number, value: T): T[] {
  const arr = Array<T>(length).fill(value);
  return arr;
}

const arr = createArray(10, 1);
