# NEXT WEATHER

NextJS App for checking current weather in certain area.

## Development

First you need to set up local development

### Install dependencies

```sh
npm install
```

### Setup on local

Rename `.env-sample` to `.env`. Then run the app.

### Running on local machine

```sh
npm run dev
```

Then open [https://localhost:3000](https://localhost:3000).

---

### Testing

Command line
```sh
npm run dev && npm run test
```

Interactive
```sh
npm run dev && npm run test:i
```


---

## Creating a New Component

To make a new component you’ll need to make three files: the source code,
the test, and the storybook demo.

1.  **Source file.** This goes in `src/components/New.js`, and should export a
    `styled-component` with `export default New` at the end and the component’s
    `propTypes` defined.

---

## State Management

This web use Redux as the state management in order to spread data used by application to all component and page. Redux is described in 2 part, action and reducer, in order to create new state management for some pages or components you'll need to create: action type, action, and reducer.

1. **Action type.** This goes in `src/stores/actionTypes.js` and should export the action type with value.
2. **Action.** Action is used by page or component when page or component wants to do something with the state management store. It should be located at `src/stores/actions/newAction.js` with camelCase. Every action function should be a exported const `export const actionFunction`. Every action should be exported from `src/stores/actions/index.js` as well.
3. **Reducer.** Reducer is part of store which contain the state in application. This goes in `src/stores/reducers/index.js`. After create new object property in reducer initialState, you should add the new object property again to `src/stores/index.js`.


---