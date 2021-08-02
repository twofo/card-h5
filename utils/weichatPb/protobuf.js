/**
 * Created by zhangmiao on 2018/3/13.
 */
(function (protobufFactory) {
  //if (typeof define === 'function')//这里会不会定义重复呢?怎么去掉呢
  //    define('protobuf', protobufFactory);
  //else
  module.exports = protobufFactory();
})(function () {
  var protobuf = {}; //app.protobuf = protobuf;

  /**
   * Build type, one of `"full"`, `"light"` or `"minimal"`.
   * @name build
   * @type {string}
   * @const
   */

  protobuf.build = "minimal"; // Serialization

  protobuf.Writer = require("./src/writer.js");
  protobuf.encoder = require("./src/encoder.js");
  protobuf.Reader = require("./src/reader.js"); // Utility

  protobuf.util = require("./src/util.js");
  protobuf.rpc = require("./src/rpc/service.js");
  protobuf.roots = require("./src/roots.js");
  protobuf.verifier = require("./src/verifier.js");
  protobuf.tokenize = require("./src/tokenize.js");
  protobuf.parse = require("./src/parse.js");
  protobuf.common = require("./src/common.js");
  protobuf.ReflectionObject = require("./src/object.js");
  protobuf.Namespace = require("./src/namespace.js");
  protobuf.Root = require("./src/root.js");
  protobuf.Enum = require("./src/enum.js");
  protobuf.Type = require("./src/type.js");
  protobuf.Field = require("./src/field.js");
  protobuf.OneOf = require("./src/oneof.js");
  protobuf.MapField = require("./src/mapField.js");
  protobuf.Service = require("./src/service.js");
  protobuf.Method = require("./src/method.js");
  protobuf.converter = require("./src/converter.js");
  protobuf.decoder = require("./src/decoder.js"); // Runtime

  protobuf.Message = require("./src/message.js");
  protobuf.wrappers = require("./src/wrappers.js"); // Utility

  protobuf.types = require("./src/types.js");
  protobuf.util = require("./src/util.js");
  protobuf.configure = configure;

  function load(filename, root, callback) {
    if (typeof root === "function") {
      callback = root;
      root = new protobuf.Root();
    } else if (!root) root = new protobuf.Root();

    return root.load(filename, callback);
  }

  protobuf.load = load;

  function loadSync(filename, root) {
    if (!root) root = new protobuf.Root();
    return root.loadSync(filename);
  }

  protobuf.loadSync = loadSync; //新增weichat支持的解析pbConfig接口

  function parseFromPbString(pbString, root, callback) {
    if (typeof root === "function") {
      callback = root;
      root = new protobuf.Root();
    } else if (!root) root = new protobuf.Root();

    return root.parseFromPbString(pbString, callback);
  }

  protobuf.parseFromPbString = parseFromPbString;
  /**
   * Reconfigures the library according to the environment.
   * @returns {undefined}
   */

  function configure() {
    protobuf.converter._configure();

    protobuf.decoder._configure();

    protobuf.encoder._configure();

    protobuf.Field._configure();

    protobuf.MapField._configure();

    protobuf.Message._configure();

    protobuf.Namespace._configure();

    protobuf.Method._configure();

    protobuf.ReflectionObject._configure();

    protobuf.OneOf._configure();

    protobuf.parse._configure();

    protobuf.Reader._configure();

    protobuf.Root._configure();

    protobuf.Service._configure();

    protobuf.verifier._configure();

    protobuf.Type._configure();

    protobuf.types._configure();

    protobuf.wrappers._configure();

    protobuf.Writer._configure();
  }

  configure();

  if (arguments && arguments.length) {
    for (var i = 0; i < arguments.length; i++) {
      var argument = arguments[i];

      if (argument.hasOwnProperty("exports")) {
        argument.exports = protobuf;
        return;
      }
    }
  }

  return protobuf;
});