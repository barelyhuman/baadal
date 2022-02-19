# Adding new features

- [Frontend](#frontend)
- [Backend](#backend)

## Frontend

1. Figure out what goes where first, the repos considers react components to be of 3 types.
   - Components (pure components)
   - Containers (components with self sufficient business logic)
   - Screens (Wrappers around multiple components and containers)

### Components

These are items that are just `props` in view out. Same props give same view, these do not change based on state/data somewhere in your database, they just exist as views. An example would be a button or a stat counter. It takes in the props and gives you a graphical element. These go in the `components` folder.

### Containers

A lot of times you have the same view in multiple places but changed based on the data that you get back. An example could be order details, you might need this at multiple places instead of just the cart page.

Literally the same view but all that changes in the id that decides what is to be fetched from the server. or multiple such id's that fetch dependendent data from the server.

So a container is a self sufficient component that handles it's own API requests, handles it's own state but is still reusable.

```jsx
// pages/user/order.js
<GetOrdersList userId={myUserId} />

// pages/admin/order
<GetOrdersList userId={2} />
```

One place a user see's his set of orders and on other, I can use the same container component to
get the same view for admin by just changing the value that is required for the API calls to happen

### Screens

Pretty self explanatory, these are where the above to combine to create the layout that the user sees.

2. The second thing as a Frontend Developer you'll be dealing with is the API's themselves, considering the entire thing is generated, you'll be using `graphql-codegen` to generate the the client sided SDK, this will be added in more detailed once the scripts for this added but on the whole. You'll run a script that'll create a generic SDK from graphql and add you will be able to use it from the `api/sdk.js` file. Also the file where you'll be extending the sdk if ever necessary.

## Backend

1. The work here with this codebase get's very limited to creating a new table and it's CRUD operations or adding custom queries to limit the flow level API calls from the frontend.

   - For Tables, you follow the generic Prisma method of adding the table into the `schema.prisma` file and running `yarn db:generate` which will take care of generating the client for you. BUT, before you do that, make sure you do a prisma db pushto push the schema changes to your local DB,

   ```sh
   npx prisma db push
   ```

   check if all fields are as needed, all relations are as required and then solidify the migration before you run a generate, so that the frontend developer can go ahead and generate the client side sdk to use with it.

   ```sh
   npx prisma migrate dev
   ```

2. For extending and writing custom query's on existing models
   - decide which existing model the query extends, if it doesn't extend any model then know that you'll have to define your own input types for the same.
   - Next, create a file in `graphql` directory. If extending a model then the name would be `<model>-extended.ts` if not then just `<name>.ts` and write a generic type-graphql resolver with needed input and output types for the requirement.

## Next

- [Release Cycles](/docs/release-cycles.md)
- [Beta Releases](/docs/beta-releases.md)
