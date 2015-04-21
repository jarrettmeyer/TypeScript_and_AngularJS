#!/usr/bin/env bash
tsc --target es5 \
    --sourceMap \
    --outDir scripts/app \
    --removeComments \
    --watch \
    app/**/*.ts
