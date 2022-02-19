# Preparing for a Release

**Note: Make sure you are available for bug fixes for at least a couple of hours after release in case it's needed**

- Change Versions in all package.jsons, this includes mobile, web, and backend. In this stack backend being same as web. If possible use, `npm version` to generate a new commit and tag the state.

**IT IS VERY IMPORTANT TO TAG BUILDS AS THIS IS USED TO GENERATE CHANGELOGS AND AVOID DISPARITY BETWEEN RELEASES**

- Sync the versions using `scripts/sync-version` to update these values in native setups (`android`/ `ios`)
- Start with releasing the apps, checkout [Release apps](#release-apps)
- Then if the apps aren't dependent on any backend changes, [deploy the backend](#deploy-backend)

## Release Apps

### iOS

The production build can be generated and pushed to App Store Testflight using `scripts/release-ios` , You'll need permissions to clone and access the `vault`/`keys` repo to be able to download apple certs and signing the release before it's pushed to testflight.

1. Check the testflight build, download it, check that it doesn't show any of the developer menu options
2. Check if the demo account login works as expected
3. Use `scripts/changelog` to get a changelog from the existing commits and modify those with whatever aligns with the changes that've been made

### Android

The production build can be generated using `scripts/release-android` , You'll need permissions to clone and access the `vault`/`keys` repo to be able to download the keystore for signing release before it creates an app bundle and moves it to your desktop under the project name (eg: `~/Desktop/Impowered` )

1. Open Play Console and create an internal testing release.
2. Drag drop the above bundle into the upload zone and wait for it to upload
3. Use `scripts/changelog` to get a changelog from the existing commits and modify those with whatever aligns with the changes that've been made

## Deploy Backend / Web

Backend production deployments might be handled by one of your mentors or if you're one of mentors then the flow is as follows

1. Make sure the version was tagged before a deployment
2. Run the server locally once. Since typescript is being used, make sure to compile it as well.
3. After confirming that the above 2 work, run the `scripts/deploy-app` script to start ansible and watch it complete it's tasks.

If there's an issue during step 3, then go through as to why ansible wasn't able to deploy and fix respectively.
