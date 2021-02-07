# Git Workflow
We have 2 general branches, namely **main** and **development**

Branch | Description
------ | -----------
Main | This branch is our master branch which contains stable and working code. PR to this branch!
Development | This branch is for testing code and may contain unstable code with bugs! Features and pages in development will be tested here. Merge feature branches in here!

## Workflow
1. Create a new feature branch from `main`
2. Commit changes and test locally on your feature branch
3. Merge changes to `development`
4. Test locally before pushing to `origin/development`
5. If all tests are ok, pull from `main`
6. Create a new Pull Request to `main`

## Branch Naming
Our branches are named according to this convention: **trello task id**-feature-description-here
<br>
e.g. *101-create-login-page*
