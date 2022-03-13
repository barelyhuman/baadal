# Setup

The following is based off tests and rundowns only on \*nix environments and so I can't help
developers on windows machines much, there will however be helpers and pointers to follow to get them working on windows.

## Setting up dev

### [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (nvm-for-windows for Windows)

Once you have nvm installed you can use the script `./scripts/nvm_setup` to have nvm install and use the version this codebase has been tested with.

Once done, check if you have `node` and `npm` working.

```sh
node -v
// prints a version code (eg: v16.14.0)
```

### Database setup

Here you have 2 options

1. Traditional setup of installing a database server on your system.
2. Using docker + compose to setup a database for you as necessary, this is a throwaway database so you aren't as worried when you end up deleting the docker images and it's connected volumes and honestly, I prefer this.

To move ahead with the 2nd step, You'll need to setup docker and `docker-compose` on your system.

On a Mac it's as simple as downloading and installing the [docker desktop app](https://www.docker.com/products/docker-desktop) if the desktop app doesn't give you the above commands (`docker` and `docker-compose`) use the documentation to learn on things you can do to set it up manually.

- [https://docs.docker.com/compose](https://docs.docker.com/compose)

On a linux, you can use the [same link](https://docs.docker.com/compose)

Now, we use the repository [barelyhuman/adminer-local](https://github.com/barelyhuman/adminer-local) and create a clone of it, anywhere on your system that you can remember is fine, doesn't have to be a part of your code's folder either.

```sh
git clone https://github.com/barelyhuman/adminer-local
cd adminer-local

# start it up (in the cloned folder)
docker-compose up -d

# bring it down (in the cloned folder)
docker-compose down

# destroy all local volumes (aka Nuke the data)
docker-compose down -v
```

Post this, you should now be able to open `localhost:8080` in your browser and be greeted with an Adminer interface that provides you with access to the database inside the docker container. The database is exposed so you can contruct a database url assuming you have it setup locally.

Check the `docker-compose.yml` in the cloned repo above to see the password and username to create a database url for use with prisma

### Code Editor setup

Even though I'm not a fan of code-style enforcement(okay maybe not always), I do like everything formatted well enough for me to be able to read when going through it during reviews and not having to handle diffs which exist just because someone decided tabs are better or spaces are better.

So, just for information, the codebase has `lefthook` and `prettier` rules setup to avoid that.

Other than this, there's not much you need to setup but if you are using VSCode the following plugins will make your life a little more easier.

You can use the extension id's in the brackets to search for the exact plugin

- Primsa (Prisma.prisma)
- GraphQL (GraphQL.vscode-graphql)

## All Docs / Reference

You can use the below documentation to know about the other areas of the codebase

#### Help / Standards

- [Working with GIT](/docs/working-with-git.md)

#### Workflow

- [Adding new features](/docs/adding-new-features.md)
- [Options and adding options](/docs/options-and-adding-options.md)
- [Generating Client API SDK](/docs/generating-client-api-sdk.md)
- [Sending Emails](/docs/sending-a-mail.md)

#### Releases

- [Preparing for release](/docs/preparing-for-release.md)
- [Release Cycles](/docs/release-cycles.md)
- [Beta Releases](/docs/beta-releases.md)

#### Others

- [Troubleshooting](/docs/troubleshooting.md)

## FAQ

** Why not use fnm instead of nvm ? **
Using fnm with react native and xcode bundling requires a little more setup in xcode
for everyone and not everyone is comfortable messing with xcode, if you wish to , you are free to do so.

1. Setup fnm as normal
2. In XCode > Select you target app > Build Phases > Copy Node Binaries... > Change the script to have the path to the node stored in your fnm path, would be easier to create a symlink and use the symlink instead (or just change the build phases script to use zsh, your call)
