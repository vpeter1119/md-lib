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

