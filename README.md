# Grocery list

A Vue-based app allowing users to plan their grocery shopping. Initially done as a test assignement for a job application.

## Tech

- Vue 3 is bootstrapped /w Vite, Material Design and Markup / Icon elements done with Vuetify, basic tests /w Vitest, routing /w Vue-Router
- Since I have no deeper knowledge of Vuetify, this app is using the standard dark theme, which I've modified /w SCSS-Overrides

## Structure

- The app has three possible paths and two views, HomeView is the whole app, `/groceries planner` only shows the actual component, every other path is served by a basic 404 page
- HomeView displays the header and the actual GroceriesPlaner app, which in turn contains the modal for editing the products - EditModal

## Functionality

- The component `GroceryList` has a form that can be used to create products in the form of product tiles. If there is at least one product, all products can be deleted with an extra icon button. Both inputs have two simple validations, on the one hand the inputs are required to be able to send the form, on the other hand a number must be entered in the Number field. The error messages are rendered via Vuetify.
- The products with the entered data are displayed in a grid and contain two buttons and a checkbox. The checkbox ticks the products and puts them at the end of the products grid. If products are "unchecked", they are moved back to their original position. The order is handled via Unix dates.
- The two buttons on the product tiles are "Edit" and "Delete". "Delete" does what it says, "Edit" opens the `EditModal` component, which as the name suggests is a modal that - to a certain extent - mirrors the form of `GroceryList`. The two values can be adjusted, both inputs fields have the same validation and the product can be saved or the process can be cancelled with the "Cancel" button. Alternatively, the modal can also be closed with a click outside of the modal box or by pressing the ESC key.
- Product data is saved in localStorage

## Future

- Date picker, Notifications, PWA

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
