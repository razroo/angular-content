---
title: Setting up HTML Hint
---
Having a linter for html cannot be overestimated. Within the normal
Angular CLI and Nrwl Nx config, there unfortunately isn't any linting
that is provided for html. The recommended html linter is html hint.
It's in a pretty stable place and provides linting that is beneficial.
Some linting rules that it introudces include:

1. All ids have to be unique.
2. Double quotation marks have to be used.
3. No empty tags.

Safe to say, in a large project it is useful.

## To Install

```
  npm install htmlhint --save-dev
```