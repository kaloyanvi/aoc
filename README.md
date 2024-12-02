## 🎄 Advent of Code 🎄

This repository contains my solutions for AoC problems.

Make sure [Dev](https://github.com/MasonData/dev) is installed before continuing.

Setup env in repo's root directory:

```
dev up
```

The repo is mainly setup to be used with VS Code. Main configuration is for TypeScript and ESLint.

## 📝 Usage

You can automatically start on a new problem by running the command:

```
make create YEAR=23 DAY=2
```

This will:

- create a directory for the provided day
- create two files; `solution.ts` and `input.txt`
- open the files in VS code
- start the solution script in watch mode waiting for changes

**Note:** If the files already exist, they won't be overwritten and the command
will just open the files in VS code and start the script in watch mode.
