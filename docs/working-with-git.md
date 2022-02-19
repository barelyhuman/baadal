# Working with GIT

If it isn't already obvious, we are working with a git based versioning system.

So here's a few set's of rules / guidelines to keep the flow as smooth as possible.

1. You start the project in a personal feature/fix branch (no arguments / excuses here), you take
   the default branch, update it `git pull --rebase` (yes, rebase it!) and now you create a new
   feature branch for whatever you are working with.
   Eg:

**_Project Manager_**: Reaper, We need to start on the login flow this week

```sh

   cd project
   git checkout development # development being the default branch here
   git pull --rebase # don't know how rebase works? Read about it then (╯°□°)╯︵ ┻━┻
   git checkout -b feat/login
   code . # or subl .
   # make changes
   git add <files that were changed or added>
   git commit
   # in the commit editor, give a short subject message about
   # the work and then describe it after an empty line.
   # eg:
   # add the view for the login screen
   #
   # only adds the visual aesthetic, doesn't include
   # any functionality as of yet.
   # --------
   # Now recheck my code and that everything is still working before I finally push it
   # to the remote
   git push -u origin feat/login

```

At this point, you'll see a link the push message which redirects you to creating a merge request
/ pull request (depending on platform), you create it a `Draft` MR/PR using the platform and add
the team lead as the reviewer.

## Dealing with dependent branches and subset of work.

Let's make context of this first.

You have work that you've done in a different branch but you need it in the current working branch
and the above branch hasn't been merged / been reviewed.

Very common example,

1. 2 people working on a dependent featureset, let's say the orders and cart.
2. You work on the orders list / transaction history / whatever you wanna call it
3. The other dev is working on the Cart for showing items.
4. The common part becomes the listing of the item details, (QTY Ordered, Client Details, delivery
   details etc etc)
5. Developer 1 was faster, he got done with creating the card already, you need the card now, but
   his MR hasn't been reviewed, what do you do?

**2 possible solutions**

1. Cherry pick the exact commit of the card, considering the commit was atomic(aka only adds the
   card component to the structure)
2. Rebase his commits into your branch / Merge his commits into your branch
3. Create a partial patch out of the commit taking only things that you need (doable, too much
   work)

Here,
Point 1, is the ideal case scenario which if properly followed can save you a lot of times from
un-needed maintenance of branches and testing merged branches again and again. Unfortunately, you
can't trust everyone to be disciplined enough (you can enforce it, but the minute you let loose,
it's gone, we can talk about human psych later). So, the 2nd option mostly ends up being the solution.

**DO GO FOR THE 1st ONE IF IT'S POSSIBLE!**

The 2nd one is easy to do,

1. Dev 1's branch in `feat/orders-list`
2. Dev 2's branch is `feat/cart`
3. Dev 2 needs the card component from Dev 1

Dev 2's shell

```sh
git checkout feat/orders-list
git pull --rebase # update your local version with the latest code from the other developer
git checkout feat/cart # back to our working branch


# if there's no conflicts this should fast forward itself and only then merge it
git merge feat/orders-list --ff-only


# if it has merge conflicts , that is you have both made changes on files that are common,
# in which case, do a rebase ( a merge might create conflicting code changes and take precendence
# on the later one's and this might result in code missing for the previous one to be considered
# valid.

git rebase feat/orders-list

# solve the rebasing issues as they come, shouldn't be more than a few, finally, make an implementaion of the card and push to remote

git add <changed-files>
git commit -m "use order card component in cart listing" -m "" -m "no further details..."

git push

```

At this point, you have the reviewer will have 2 Drafts, and one of them has the commits for both, so when the merges happen, the same hashes will be ignored and so your dependent code is valid. But do make sure that if you've made changes to the Card component and the other developer also makes changes to the card component you are bound to have a conflict.

AKA. Co-ordinate your changes before you do them, so you can split it into 2 components instead of over-riding each other's changes in the final merge. Also why `cherry-picking` is the easier and more maintainable approach.

# Next Step

[Adding new features](/docs/adding-new-features.md)
