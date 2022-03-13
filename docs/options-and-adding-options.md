# Options

The concept of options is very opinionated.

But for the point of simplicity we'll consider it any as kind of static enum data that also needs to be shared with the frontend.

Traditional enum's are good enough but then the frontend never knows what the enums are supposed to be and cannot be scaled on without actually changing the frontend to adapt to the new enum.

This is where the concept of options comes in place where the enums are declares as a structure with the following properties

```json
{
	// here BOOLEANSELECTION becomes the `identifier` to find the needed option
	"ROLES": {
		"user": {
			// "true" is the key that can be used to grab the structure
			"label": "User",
			"value": 1, // "what the value is going to be in the db"
			"sequence": 1
		},
		"admin": {
			"label": "Admin", // what is shown by the frontend in the selectors
			"value": 2, // "what the value is going to be in the db"
			"sequence": 2 // sequence of this , if you ever need to sort the options based on priority
		}
	}
}
```

This combined with a little formatting gives the frontend a iteratable set that can be used to display radios , checkboxes, dropdowns , you get the point.

## Adding new option handled field

To add a new field

1. Modify the prisma schema to have the field with the type being `Int`.
2. Push the modification using `npx prisma db push` and wait for the field to get added to the DB structure
3. open `constants/option.ts` and add/find the option that we need to use.
4. once you have the option definition from/in the `constants/option.ts` file, open `mappings/options.ts` and look for the model that you added the field to.
5. If the model doesn't exist, follow the structural convention in the `mappings/options.ts` to add another mapping and add the required data

```jsonc
{
	// the model that the option field is on
	"model": "User",

	// the identifiers to be added
	"optionIdentifiers": [
		{
			"optionField": "role", // the field that you've added
			"optionIdentifier": "ROLES" // the option constant identifier to be used to find the label
		}
	]
}
```

6. Then run `g:options` in the terminal

```sh
yarn g:options
```

7. This should generate a custom resolver for you in `graphql/generated`, which can be then added to `pages/api/graphql.ts` in the `toAdd` array

8. Post this you should be able to use `field` and `fieldLabel` in the graphql requests to get the label of an already added option. Based on the above example, the `field` can be replaced with `role` and `roleLabel`

```gql
query getUsers {
	users {
		role
		roleLabel
	}
}
```

↓↓ response ↓↓

```json
{
	"data": {
		"users": [
			{
				"role": 1,
				"roleLabel": "User"
			}
		]
	}
}
```
