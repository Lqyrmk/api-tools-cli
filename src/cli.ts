#!/usr/bin/env node

import { parseArgs } from "node:util"

const { values, positionals } = parseArgs({
    options: {
        name: {
            type: "string",
            short: "n",
            default: "hello"
        },
    },
    allowPositionals: true,
    strict: true,
});

console.log('values :>> ', values);
console.log('positionals :>> ', positionals);