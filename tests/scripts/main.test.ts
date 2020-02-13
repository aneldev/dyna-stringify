import "jest";

import {dynaStringify} from "../../src";

describe('dynaStringify', () => {
  it('Simple object, minimal config', () => {
    const value = {
      name: 'John',
      age: 32,
      cars: ['VW', 'Plymouth'],
    };
    expect(dynaStringify(value)).toMatchSnapshot();
  });

  it('Simple object, spaces 2', () => {
    expect(
      dynaStringify({
          name: 'John',
          age: 32,
          cars: ['VW', 'Plymouth'],
        },
        {
          spaces: 2,
        })
    )
      .toMatchSnapshot();
  });

  it('Simple object, with circular reference', () => {
    const value: any = {
      name: 'John',
      age: 32,
      cars: ['VW', 'Plymouth'],
    };
    value.value = value;
    expect(
      dynaStringify(
        value,
        {
          spaces: 2,
        })
    )
      .toMatchSnapshot();
  });

  it('Simple object, with custom circular reference text', () => {
    const value: any = {
      name: 'John',
      age: 32,
      cars: ['VW', 'Plymouth'],
    };
    value.value = value;
    expect(
      dynaStringify(
        value,
        {
          spaces: 2,
          circularText: '!REF',
        })
    )
      .toMatchSnapshot();
  });

  it('Simple object, with circular reference in array', () => {
    const value: any = {
      name: 'John',
      age: 32,
      cars: ['VW', 'Plymouth'],
    };
    value.cars.push(value);
    expect(
      dynaStringify(
        value,
        {
          spaces: 2,
        })
    )
      .toMatchSnapshot();
  });

  it('Simple object, with callback for circular reference text', () => {
    const value: any = {
      name: 'John',
      age: 32,
      cars: ['VW', 'Plymouth'],
    };
    value.cars.push(value);
    value.cars.push(value.cars);
    expect(
      dynaStringify(
        value,
        {
          spaces: 2,
          circularText: (value: any) => {
            if (value.name) return `Circular reference for name: ${value.name}`;
            return '!REF';
          },
        })
    )
      .toMatchSnapshot();
  });
});
