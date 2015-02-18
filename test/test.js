var bunyan = require("bunyan");
var live = require("../");

var log = bunyan.createLogger({
  name: 'myapp',
  src:true,
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'trace',
      stream: live(),
      type:"raw"
    }
  ]
});
log.info("Info Message");
log.debug("Debug Message");
log.trace("Trace Message");
log.error("Error Message");
log.warn("Warn Message");