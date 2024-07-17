# UniApp - Ludwig's Universal App template

This is a template for building universal apps with React Native and Expo.

## Stack

- New React Native Architecture
- Nativewind
- Expo
- React Native

- tRPC & Tanstack
- Maestro E2E

**Server**

- Expo Server Routes
- Prisma
- Postgres

## Installation

1. bun install
2. start postgres: `docker compose up -d postgres_uni `
3. init database: `npx prisma migrate deploy && npx prisma db seed && npx prisma generate`
4. bun start

## E2E Tests

Android:

- Runs a script that build the server then builds an apk and installs it on the emulator
- Runs the e2e tests
  iOS:
- No script but can reuse the android flow file
  Web:
- Runs a script that build the server then builds a web app and serves it on localhost:3000
- Runs the e2e tests

## Templates versions:

- Thirdweb: on branch `thirdweb-template`
