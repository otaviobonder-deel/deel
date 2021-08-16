# This is the test repo for Deel

## How to run this code

It's simple as any other React project. To run in development, just `yarn install` and then `yarn start`. If you would run it in production, it would only need to be built and served.

PS: The only external lib I used was `msw` to mock the API request in tests. Everything else is pure React.

## Component documentation
The component is pretty simple, both functional and class components receive the same props:

- `fetchFn`: The function which will fetch what is being typed. It must receive a string and return an array of strings.
- `onSelect`: An optional prop that will execute when a value is selected. It will receive the selected item.
- `notFound`: An optional prop that receives a string to show when no values are found by the autocomplete.

There is no `prop-types`, since no libs should be used (`prop-types` is not part of React anymore), and this should be probably written in Typescript.

This is a pretty simple example of an Autocomplete, if this was to be used in a bigger project, probably the `fetchFn` would return an object and `onSelected` function would receive an object, instead of string.

The tests are pretty basic, but cover most use cases.
