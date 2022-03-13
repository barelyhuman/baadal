# baadal

A set of utilities combined to make writing crud API's a ton easier, while keeping the extensibility and control of coding from scratch

This was put together to help achieve similar results as Hasura but without having to run 2 instances for the same thing, (1 hasura for GRAPHQL, 1 http server for handling webhooks from hasura / handle rest calls in cases like file uploads)

## Stack

More like the set of tools that we have in place.

1. next.js - The base of the entire setup takes into consideration a traditional monolithic style setup, and next.js does it in the most mordern way I like so nextjs.
2. GraphQL Helix - We need a graphql layer so helix acts as the most minimal SDL reader and graphql interceptor, I've seen in a while.
3. envelope - (Still under evaluation) A plugin system for graphql's context standards so you can have most of the common plugin setup by just installing a package and extending on them , since they are still just functions
4. type-graphql - The brains of the Operations is taken care with type-graphql's code first instead of schema first philosophy which is easier (in my opinion) to extend on.
5. Prisma - the generative god in this project which takes care of generating queryable database clients to generating the literal CRUD operations for the models
6. typegraphql-prisma - The plugin responsible for intercepting the prisma model generation with genaration of read/write/update/delete operations for helix to provision
7. knex - (still figuring out a good structure for this), we have prisma but there's always cases where an ORM falls short and in cases like these I like to keep my options open and a little more battle-tested, which I know knex is (been using it for 3+ years now) and so a fallback database query solution. Though, knex is not going to be taking in migrations and seeding, it's only here to be a backup for when a nested pass through many to many relational aggregation fails to be simple in Prisma (rare, but happens)
8. React Native - we do have react-native in the requirement for most projects and since the web, and react native is both react/JS, I get to share logic and hooks. I do not plan to share components cause it's a set of problems I don't want a developer dealing with when working for a production feature.

## Documentation

You can read more about everything by heading to [setup.md](docs/setup.md)

## License

[MIT](/LICENSE)
