Write about fallback cases

## Global

### Typescript version issues

Typescript is known for breaking things on random versions and so please make sure you use the
exact version in the `package.json`, if you do wish to upgrade, make sure you go through the app and do it in a separate branch and not on the main branch, make preview deployments for the same so that the QA team can manually test the same things as needed.

The command you are looking for

```sh
$ yarn add -D --exact typescript@version
```

### Node and NPM package versioning issues

The boilerplate comes with a `.nvmrc` and the version there is what's its been tested on. If you feel like upgrading to a different version please do so in a different branch, re-test the code to make sure all platform level API's still work. Check the nodejs's changelog to see what has been marked as `deprecated` and what's been removed to be sure you have a stable backend.

You can use the `nvm_setup` script to make sure you are running the supported version

```sh
$ ./scripts/nvm_setup
```

## Frontend

While most of the cache provided by `nextjs` is useful, it has been disable due to the nature of graphiql , and this is why all development updates will be instant on the `graphiql` console. If you ever feel like the caching is needed then turn it on in the `next.config.js` by setting the `generateEtags` flag as `true`

```json
module.exports = {
    //... remaining props
	generateEtags: true,
}

```

## Backend

### Handling complex queries where Prisma doesn't suffice

Nothing beats being able to write raw SQL but then this cannot be moved to codebases where the database connector might change as a lot of the SQL queries do not directly translate to other databases. Thus the need for `ORM's` and why `Prisma` is in this codebase.

The other problem is that these ORM's solve a lot of problems but then these are done on the Application layer and not on the Database layer.

Which leads to the point:

**There's always cases where a raw query might be better off but nested queries and subqueries in a JS codebase look hideous and make it hard to read, the better approach is to use saved procedures or well, using something like `knex` to build the query for you.**

There's all sorts of other caveats that you should look up before just jumping into using knex but this codebase comes with knex as a fallback client for your DB operations in cases where it's necessary.

You can do so by importing `fallBackDBClient` from `prisma/client` and writing the queries according to `knex` syntax.
