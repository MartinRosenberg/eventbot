# Contributing

## Updating versions

- Node.js needs to be updated in:
  - `package.json` > `engines` > `node`
  - `package.json` > `devDependencies` > `@types/node` (latest matching minor version)
  - `.node-version`
  - `.tool-versions`
  - `Dockerfile` (all three `FROM` lines)
  - `pnpm-lock.yaml` (by running `pnpm install`)
- pnpm needs to be updated in:
  - `package.json` > `engines` > `pnpm`
  - `.tool-versions`
  - `Dockerfile` (both `RUN` lines that install pnpm)
  - `pnpm-lock.yaml` (by running `pnpm install`)
