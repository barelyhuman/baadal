# Generating Client API SDK

The client side SDK is generated using `graphql-codegen` and `urql`.

It can be generated using the below command

```sh
yarn g:graphql
```

This will generate a generated sdk in `client/sdk/generated.ts`. This sdk is generated based on all the `.gql` documents that are added in `client/sdk/documents` folder.

## Workflow

A general workflow for this might look like this.

1. You open up `localhost:3000/api/graphql` to see the GraphiQL console and then write the needed query in GraphQL there, test the needed query and then copy the entire query into a `.gql` file.

2. Let's consider you are getting all Posts for a certain user.

```gql
query getAllPostsByUser($userId: Int!) {
	posts(where: {userId: $userId}) {
		id
		title
		body
	}
}
```

and then paste the above query in `client/sdk/documents/post.gql`

3. Then run `yarn g:graphql` and it'll take care of re-generating the sdk for you with the method `getAllPostsByUser` onto the `clientSDK` in `client/sdk/client.ts`. Since this is generated with types in mind, you get full autocomplete and typechecking for the graphql fields and the input variables.
