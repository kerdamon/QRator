# QRator project

## Description

QRator is an app that would allow generating "dynamic" urls that could change the destination page after address is hardcoded somewhere, (e.g. printed or QR code is generated for that url). That redirection could be easily updated later. This allow for example for creating dynamic QR codes that could change the page user ends up on after scan, without changing the QR code itself.

## Concepts

Note: if you (agent) has better naming proposition, we can change that. I want this to be easily understandable for non-tech people.

- Address: single unit used in app consisting of public url, destination url and owner
- Redirection: mechanism that enables dynamic url change for already generated QR code
- Public url: static address that QR code points to
- Destination url: final address that user would end up on after entering Public URL (or scanning QR)
- QR code: image that points to public url

## Features

- addresses can be generated
  - each address has owner (owner can change the redirection), unique name that identifies it, pair of urls: public and redirection, and some metadata, like creation time
  - there should be option to generate QR code (image) for this
- for each address owner (or admin) can change what it redirects to
- user can list all active addresses that he owns and delete them
- authentication should be logging through google workspace (later: restricted to specific organization)

## Architecture

- For backend, there should be two ports exposed, so they can each be mapped to different domain and have separate endpoints. One for redirections `/:name` and other for management (everything else, like login, management panel etc.). In this way there would be no "blocked" endpoints for redirects and url would be easy to remember.
- Database should be lightweight. I was thinking about something like sqlite, but it is relative, and for usecase of redirections key-value would probably be better
- Frontend should be simple, only provide UI for the operations

## Tech stack

### Frontend

- typescript
- react
- tailwind
  - shadcn/ui is built on top of tailwind, so no wrapper is needed
- shadcn/ui

### Backend

- typescript
- express

### Testing

- jest
- cypress

## Build and deployment

- app should be dockerized
- frontend packages should be separate from backend
- platform used to host and deploy the app is my own instance of [dokploy](https://docs.dokploy.com/docs/core)
  - url: kered.pl
  - in the future we could change where prod is. Have that in mind, but that should be easy, since we will have that dockerized.
- there should be CI flow using github actions
  - docker images should be built in CI pipeline (not in Dokploy on VPS)
    - documentation for that: https://docs.dokploy.com/docs/core/applications/going-production
  - for prod release, github releases should be created
  - pipeline should test, inspect and scan the built image
- semantic versioning should be used
- changes to main and release branches should be only possible through PRs

### Environments and release process

- there should be couple separate environments
- dev
  - main branch in github
  - dev.qrator.kered.pl domain
- staging
  - when release branch is created from main, a staging environment for that release is created
  - the staging environment would be destroyed when release is made
  - domain is something like: v1-3-0.staging.qrator.kered.pl
  - The release branch should be scanned for security vulnerabilities.
  - when PR to release branch is merged the github release draft is created
- prod
  - domain: qrator.kered.pl
  - there should be flow in github to release that is manually launched
  - this flow should make release from existing draft, publish the package and trigger deployment in dokploy
  - deployments should be [zero downtime](https://docs.dokploy.com/docs/core/applications/zero-downtime) and the should [roll back](https://docs.dokploy.com/docs/core/applications/rollbacks) if something goes wrong

### Feature branches

- PR from feature branch should create [preview deployment](https://docs.dokploy.com/docs/core/applications/preview-deployments) in dokploy
- for PR from feature branch tests should be ran and block merging if they do not pass

## Tooling

- `commitlint`: To enforce a consistent commit message format.
- `Swagger`/`OpenAPI`: For documenting our backend API.

## Dev setup

- environment management using devbox
- js package management using pnpm
- linting, formatting should work
- convenient aliases:
  - `@/components/*`
  - `@/pages/*`
  - `@/shared/*`
