[![NPM Version][npm-image]][npm-url]
# bunyan-live-logger
Log with Node Bunyan to a live Webpage for development purposes.

## Example
![example](/../master/doc/example.png?raw=true "Bunyan Live Logger")

## Usage
```js
var bunyan 	= require("bunyan");
var live 	= require("bunyan-live-logger");

var log = bunyan.createLogger({
  name: 'yourlogarea',
  src:true,
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {					// Insert this point to use the live logger
      level: 'trace',
      stream: live(),
      type:"raw"
    }
  ]
});
// Use bunyan logger as usal
log.info("Info Message");
log.debug("Debug Message");
log.trace("Trace Message");
log.error("Error Message");
log.warn("Warn Message");
```
When you start you application the bunyan live logger server starts. The url you can use is logged to the console like this:
```shell
Live Logging server listening at 127.0.0.1:57712
```
Then you start your web browser and navigate to the following url to see the logs. Chrome Browser should be preferred.

##Features
  * Show all logs live on a Webpage
  * Filter the logs within the page
  * Show the log entries as json(formatted)
  * Show src location if 'src':true is active. (Planned)
  * Allow custom detail views. (Planned)
  
##License
MIT. See "LICENSE.txt".
Bunyan Live Logger was developed by Jens Schyma.

##Contribution
Constirbution is welcomed. Use the Github functions PullRequests and Issues to contribute.

##See Also
  * [Bunyan](https://github.com/trentm/node-bunyan)

[npm-image]: https://img.shields.io/npm/v/bunyan-live-logger.svg?style=flat
[npm-url]: https://npmjs.org/package/bunyan-live-logger