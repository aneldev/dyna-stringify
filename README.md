# About

Stringify object with circular references.


# Usage
```
// Minimal usage
dynaStringify(value);
dynaStringify(value, {spaces: 2});
dynaStringify(value, {spaces: 2, circularText: '!REF'});

// Extensive with callback for the reference text
dynaStringify(
  value, 
  {
    spaces: 2, 
    circularText: value => { 
      if (value.customerId) return `!RefCustId:${value.customerId}`; 
      return '!Ref',
    }
   }
);
```

# Syntax
_In Typescript_
```
 dynaStringify = (
  value: any,
  options?: {
    spaces?: number;
    circularText?: string | ((value: any) => string);
  },
): string;
```

# Example
```
const value = {
      name: 'John',
      age: 32,
      cars: ['VW', 'Plymouth'],
    };
value.cars.push(value);
```
The
`dynaStringify(value, {spaces: 2})`

returns
```
{
  "name": "John",
  "age": 32,
  "cars": [
    "VW",
    "Plymouth",
    "[CircularRef]"
  ]
}
```


