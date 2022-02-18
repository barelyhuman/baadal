# Beta Releases

Ever so often you'll need to send builds for beta testing, or internal testing, where the QA team would request for builds that they can test.

Generally this is easily handled via the CI setup that generates builds for each MR that is created or synced. You won't have to manually do them.

If there's no MR's and a build is required, you can do the below steps

1. Run `scripts/beta-ios` or `scripts/beta-android` based on requirement and again, you'll need access to the `vault`/`keys` repo to be able to get keys for signing the above builds
2. The above scripts will then run the required steps to generate a build, upload it to diawi and then send it in the slack channel
