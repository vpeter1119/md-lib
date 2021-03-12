# md-lib

THIS MODULE IS WORK IN PROGRESS AND NOT READY TO USE.

An open-source node module for compiling libraries from markdown input.

# Installation

Install `MDLib` using npm:

`$ npm install @petervertesi/md-lib`

# Usage

First, you have to create a `md-lib.config.yaml` in your root directory.

Example `md-lib.config.yaml`:

```yaml
title: Example Library
version: 0.1.0

options:
  input: input
  output: output/Example.md
  doclevel: 2

content:
  - path: introduction.md
  - path: example-chapter-01.md
    subsections:
      - path: example-subsection-01.md
      - path: example-subsection-02.md
  - path: example-chapter-02.md
```

Then you can use MDLib in your project like this:

```javascript
const MDLib = require('@petervertesi/md-lib');

MDLib.compile();
// => results in the new file output/Example.md, containing all the .md files specified in content
```


<a name="module_Compiler"></a>

## Compiler
The Compiler module compiles multiple markdown files into one, based on the specified structure.

<a name="module_Compiler..compile"></a>

### Compiler~compile(configFile, options)
Compiles multiple markdown files into one, based on the provided config file and other options.

**Kind**: inner method of [<code>Compiler</code>](#module_Compiler)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| configFile | <code>string</code> | <code>&quot;md-lib.config.yaml&quot;</code> | A .yaml file that contains the configuration for the compiler. |
| options | <code>any</code> |  | Options (`input`, `output` and `doclevel`) specified in this object overwrite the options in the config file. |



