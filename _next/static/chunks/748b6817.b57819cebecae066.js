"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[98],{1687:(e,t,r)=>{r.d(t,{_:()=>a});var s={"panel-C1evgHYw.js":`import { jsx, jsxs } from "react/jsx-runtime";
import { createContext, useState, useEffect, useContext, useRef, useCallback, useMemo } from "react";
var generateId$1 = (length = 16) => Math.random().toString(36).substring(2, length + 2), DEFAULT_OPTIONS = {
  maxReconnectAttempts: 5,
  reconnectDelay: 1e3,
  requestTimeout: 3e4
  // Extended timeout for longer operations
}, WebSocketRpcBridge = class {
  constructor(options = {}) {
    this.ws = null, this.pendingRequests = /* @__PURE__ */ new Map(), this.reconnectAttempts = 0, this.methods = {}, this.isIntentionalClose = !1, this.options = { ...DEFAULT_OPTIONS, ...options };
  }
  /**
   * Register RPC method handlers
   * @param methodHandlers Object containing method handlers
   */
  register(methodHandlers) {
    Object.entries(methodHandlers).forEach(([methodName, handler]) => {
      this.methods[methodName] = { handler };
    });
  }
  /**
   * Generic method to call a remote procedure with support for streaming updates
   * @param method Method name to call
   * @param payload Request payload
   * @param onUpdate Optional callback for progress updates
   * @returns Promise resolving with the response
   */
  callMethod(method, payload, onUpdate) {
    if (!this.ws)
      throw new Error("WebSocket is not connected");
    const id = generateId$1(), requestMessage = {
      id,
      messageType: "request",
      method,
      payload
    };
    return new Promise((resolve, reject) => {
      var _a;
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(id), reject(new Error(\`Request timed out: \${method}\`));
      }, this.options.requestTimeout);
      this.pendingRequests.set(id, { resolve, reject, timeout, onUpdate }), (_a = this.ws) == null || _a.send(JSON.stringify(requestMessage));
    });
  }
  /**
   * Sets up WebSocket event handlers
   * @param ws WebSocket instance
   */
  setupWebSocketHandlers(ws) {
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error("Error handling WebSocket message:", error);
      }
    }, ws.onclose = () => {
      this.handleDisconnect();
    }, ws.onerror = (event) => {
      console.error("WebSocket error:", event);
    };
  }
  /**
   * Handles incoming WebSocket messages
   * @param message The message to handle
   */
  handleMessage(message) {
    const { messageType, id } = message;
    switch (messageType) {
      case "request":
        this.handleRequest(message);
        break;
      case "response":
        this.handleResponse(id, message.payload);
        break;
      case "update":
        this.handleUpdate(id, message.payload);
        break;
      case "error":
        this.handleError(id, message.error.message);
        break;
      default:
        console.warn(\`Unknown message type: \${messageType}\`);
    }
  }
  /**
   * Handle incoming requests by invoking the registered method
   * @param message Request message
   */
  async handleRequest(message) {
    const { id, method, payload } = message;
    if (!method) {
      this.sendError(id, "Method name is required");
      return;
    }
    const methodDef = this.methods[method];
    if (!methodDef) {
      this.sendError(id, \`Method not found: \${method}\`);
      return;
    }
    try {
      const sendUpdate = (update) => {
        this.sendUpdate(id, method, update);
      }, result = await methodDef.handler(payload, sendUpdate);
      this.sendResponse(id, method, result);
    } catch (error) {
      this.sendError(
        id,
        error instanceof Error ? error.message : String(error)
      );
    }
  }
  /**
   * Handle response messages by resolving the pending request
   * @param id Request ID
   * @param payload Response payload
   */
  handleResponse(id, payload) {
    const pendingRequest = this.pendingRequests.get(id);
    if (!pendingRequest) {
      console.warn(\`Received response for unknown request ID: \${id}\`);
      return;
    }
    clearTimeout(pendingRequest.timeout), this.pendingRequests.delete(id), pendingRequest.resolve(payload);
  }
  /**
   * Handle update messages by calling the update callback
   * @param id Request ID
   * @param payload Update payload
   */
  handleUpdate(id, payload) {
    const pendingRequest = this.pendingRequests.get(id);
    if (!pendingRequest || !pendingRequest.onUpdate) {
      console.warn(\`Received update for unknown request ID: \${id}\`);
      return;
    }
    pendingRequest.onUpdate(payload);
  }
  /**
   * Handle error messages by rejecting the pending request
   * @param id Request ID
   * @param error Error message
   */
  handleError(id, error) {
    const pendingRequest = this.pendingRequests.get(id);
    if (!pendingRequest) {
      console.warn(\`Received error for unknown request ID: \${id}\`);
      return;
    }
    clearTimeout(pendingRequest.timeout), this.pendingRequests.delete(id), pendingRequest.reject(new Error(error));
  }
  /**
   * Send a response message
   * @param id Request ID
   * @param method Method name
   * @param payload Response payload
   */
  sendResponse(id, method, payload) {
    if (!this.ws)
      throw new Error("WebSocket is not connected");
    const responseMessage = {
      id,
      messageType: "response",
      method,
      payload
    };
    this.ws.send(JSON.stringify(responseMessage));
  }
  /**
   * Send an update message for streaming
   * @param id Request ID
   * @param method Method name
   * @param payload Update payload
   */
  sendUpdate(id, method, payload) {
    if (!this.ws)
      throw new Error("WebSocket is not connected");
    const updateMessage = {
      id,
      messageType: "update",
      method,
      payload
    };
    this.ws.send(JSON.stringify(updateMessage));
  }
  /**
   * Send an error message
   * @param id Request ID
   * @param errorMessage Error message
   */
  sendError(id, errorMessage) {
    if (!this.ws)
      throw new Error("WebSocket is not connected");
    const errorResponse = {
      id,
      messageType: "error",
      error: {
        message: errorMessage
      }
    };
    this.ws.send(JSON.stringify(errorResponse));
  }
  /**
   * Handle disconnection by attempting to reconnect
   */
  handleDisconnect() {
    if (this.isIntentionalClose) {
      console.log(
        "WebSocket closed intentionally, not attempting to reconnect"
      ), this.clearPendingRequests(new Error("Connection closed by user"));
      return;
    }
    this.reconnectAttempts < this.options.maxReconnectAttempts ? (this.reconnectAttempts++, console.log(
      \`Attempting to reconnect (\${this.reconnectAttempts}/\${this.options.maxReconnectAttempts})...\`
    ), setTimeout(
      () => this.reconnect(),
      this.options.reconnectDelay * this.reconnectAttempts
    )) : (console.error("Max reconnection attempts reached"), this.clearPendingRequests(new Error("Connection closed")));
  }
  /**
   * Clear all pending requests with an error
   * @param error Error to reject with
   */
  clearPendingRequests(error) {
    this.pendingRequests.forEach(({ reject }) => {
      reject(error);
    }), this.pendingRequests.clear();
  }
  /**
   * Close the WebSocket connection
   * @returns Promise that resolves when the connection is closed
   */
  async close() {
    this.isIntentionalClose = !0, this.ws && (this.ws.close(), this.ws = null), this.clearPendingRequests(new Error("Connection closed by user"));
  }
};
function validateWithZod(schema, data, context, silent = !1) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const error = new Error(
      \`Validation failed for \${context}: \${result.error.message}\`
    );
    if (silent)
      return console.error(error), data;
    throw error;
  }
  return result.data;
}
var ZodTypedBridge = class {
  constructor(bridge, contract2) {
    this.bridge = bridge, this.contract = contract2, this.call = new Proxy({}, {
      get: (_target, prop) => (request, options) => this.callMethod(prop, request, options)
    });
  }
  async callMethod(method, request, options) {
    const methodContract = this.contract.consumes[method];
    if (!methodContract)
      throw new Error(\`Method \${String(method)} not found in contract\`);
    const validatedRequest = validateWithZod(
      methodContract.request,
      request,
      \`request for method \${String(method)}\`
    ), onUpdate = options != null && options.onUpdate && methodContract.update ? (update) => {
      var _a;
      if (methodContract.update)
        try {
          const validatedUpdate = validateWithZod(
            methodContract.update,
            update,
            \`update for method \${String(method)}\`,
            !0
            // silently log validation errors
          );
          (_a = options.onUpdate) == null || _a.call(options, validatedUpdate);
        } catch (error) {
          console.error("Update validation failed:", error);
        }
    } : void 0, response = await this.bridge.callMethod(
      method,
      validatedRequest,
      onUpdate
    );
    return validateWithZod(
      methodContract.response,
      response,
      \`response for method \${String(method)}\`
    );
  }
  register(implementations) {
    const wrappedImplementations = {};
    for (const [method, implementation] of Object.entries(implementations)) {
      const methodContract = this.contract.serves[method];
      if (!methodContract)
        throw new Error(\`Method \${method} not found in contract\`);
      wrappedImplementations[method] = async (request, sendUpdate) => {
        const validatedRequest = validateWithZod(
          methodContract.request,
          request,
          \`request for method \${method}\`
        ), wrappedSendUpdate = methodContract.update && sendUpdate ? (update) => {
          if (methodContract.update)
            try {
              const validatedUpdate = validateWithZod(
                methodContract.update,
                update,
                \`update for method \${method}\`,
                !0
                // silently log validation errors
              );
              sendUpdate(validatedUpdate);
            } catch (error) {
              console.error("Update validation failed:", error);
            }
        } : void 0, response = await implementation(validatedRequest, {
          sendUpdate: wrappedSendUpdate
        });
        return validateWithZod(
          methodContract.response,
          response,
          \`response for method \${method}\`
        );
      };
    }
    this.bridge.register(wrappedImplementations);
  }
  async close() {
    await this.bridge.close();
  }
}, ClientBridge = class extends WebSocketRpcBridge {
  constructor(url, options) {
    super(options), this.reconnectTimer = null, this.url = url;
  }
  call(method, payload, onUpdate) {
    return this.callMethod(method, payload, onUpdate);
  }
  reconnect() {
    this.reconnectTimer && clearTimeout(this.reconnectTimer), this.reconnectTimer = setTimeout(async () => {
      try {
        await this.connect();
      } catch {
        this.reconnect();
      }
    }, this.options.reconnectDelay);
  }
  connect() {
    return new Promise((resolve, reject) => {
      try {
        const ws = new window.WebSocket(this.url);
        ws.onopen = () => {
          this.ws = ws, this.setupWebSocketHandlers(ws), resolve();
        }, ws.onerror = () => {
          reject(new Error("Failed to connect to WebSocket server"));
        };
      } catch (error) {
        reject(error);
      }
    });
  }
}, ZodClient = class extends ZodTypedBridge {
  constructor(url, contract2, options) {
    super(new ClientBridge(url, options), {
      serves: contract2.client || {},
      consumes: contract2.server || {}
    });
  }
  connect() {
    return this.bridge.connect();
  }
};
function createSRPCClientBridge(url, contract2, options) {
  return new ZodClient(url, contract2, options);
}
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever, util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items)
      obj[item] = item;
    return obj;
  }, util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] != "number"), filtered = {};
    for (const k of validKeys)
      filtered[k] = obj[k];
    return util2.objectValues(filtered);
  }, util2.objectValues = (obj) => util2.objectKeys(obj).map(function(e) {
    return obj[e];
  }), util2.objectKeys = typeof Object.keys == "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object)
      Object.prototype.hasOwnProperty.call(object, key) && keys.push(key);
    return keys;
  }, util2.find = (arr, checker) => {
    for (const item of arr)
      if (checker(item))
        return item;
  }, util2.isInteger = typeof Number.isInteger == "function" ? (val) => Number.isInteger(val) : (val) => typeof val == "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val == "string" ? \`'\${val}'\` : val).join(separator);
  }
  util2.joinValues = joinValues, util2.jsonStringifyReplacer = (_, value) => typeof value == "bigint" ? value.toString() : value;
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => ({
    ...first,
    ...second
    // second overwrites first
  });
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), getParsedType = (data) => {
  switch (typeof data) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      return Array.isArray(data) ? ZodParsedType.array : data === null ? ZodParsedType.null : data.then && typeof data.then == "function" && data.catch && typeof data.catch == "function" ? ZodParsedType.promise : typeof Map < "u" && data instanceof Map ? ZodParsedType.map : typeof Set < "u" && data instanceof Set ? ZodParsedType.set : typeof Date < "u" && data instanceof Date ? ZodParsedType.date : ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
}, ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super(), this.issues = [], this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    }, this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, actualProto) : this.__proto__ = actualProto, this.name = "ZodError", this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    }, fieldErrors = { _errors: [] }, processError = (error) => {
      for (const issue of error.issues)
        if (issue.code === "invalid_union")
          issue.unionErrors.map(processError);
        else if (issue.code === "invalid_return_type")
          processError(issue.returnTypeError);
        else if (issue.code === "invalid_arguments")
          processError(issue.argumentsError);
        else if (issue.path.length === 0)
          fieldErrors._errors.push(mapper(issue));
        else {
          let curr = fieldErrors, i = 0;
          for (; i < issue.path.length; ) {
            const el = issue.path[i];
            i === issue.path.length - 1 ? (curr[el] = curr[el] || { _errors: [] }, curr[el]._errors.push(mapper(issue))) : curr[el] = curr[el] || { _errors: [] }, curr = curr[el], i++;
          }
        }
    };
    return processError(this), fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError))
      throw new Error(\`Not a ZodError: \${value}\`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {}, formErrors = [];
    for (const sub of this.issues)
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [], fieldErrors[firstEl].push(mapper(sub));
      } else
        formErrors.push(mapper(sub));
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => new ZodError(issues);
const errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      issue.received === ZodParsedType.undefined ? message = "Required" : message = \`Expected \${issue.expected}, received \${issue.received}\`;
      break;
    case ZodIssueCode.invalid_literal:
      message = \`Invalid literal value, expected \${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}\`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = \`Unrecognized key(s) in object: \${util.joinValues(issue.keys, ", ")}\`;
      break;
    case ZodIssueCode.invalid_union:
      message = "Invalid input";
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = \`Invalid discriminator value. Expected \${util.joinValues(issue.options)}\`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = \`Invalid enum value. Expected \${util.joinValues(issue.options)}, received '\${issue.received}'\`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = "Invalid function arguments";
      break;
    case ZodIssueCode.invalid_return_type:
      message = "Invalid function return type";
      break;
    case ZodIssueCode.invalid_date:
      message = "Invalid date";
      break;
    case ZodIssueCode.invalid_string:
      typeof issue.validation == "object" ? "includes" in issue.validation ? (message = \`Invalid input: must include "\${issue.validation.includes}"\`, typeof issue.validation.position == "number" && (message = \`\${message} at one or more positions greater than or equal to \${issue.validation.position}\`)) : "startsWith" in issue.validation ? message = \`Invalid input: must start with "\${issue.validation.startsWith}"\` : "endsWith" in issue.validation ? message = \`Invalid input: must end with "\${issue.validation.endsWith}"\` : util.assertNever(issue.validation) : issue.validation !== "regex" ? message = \`Invalid \${issue.validation}\` : message = "Invalid";
      break;
    case ZodIssueCode.too_small:
      issue.type === "array" ? message = \`Array must contain \${issue.exact ? "exactly" : issue.inclusive ? "at least" : "more than"} \${issue.minimum} element(s)\` : issue.type === "string" ? message = \`String must contain \${issue.exact ? "exactly" : issue.inclusive ? "at least" : "over"} \${issue.minimum} character(s)\` : issue.type === "number" ? message = \`Number must be \${issue.exact ? "exactly equal to " : issue.inclusive ? "greater than or equal to " : "greater than "}\${issue.minimum}\` : issue.type === "bigint" ? message = \`Number must be \${issue.exact ? "exactly equal to " : issue.inclusive ? "greater than or equal to " : "greater than "}\${issue.minimum}\` : issue.type === "date" ? message = \`Date must be \${issue.exact ? "exactly equal to " : issue.inclusive ? "greater than or equal to " : "greater than "}\${new Date(Number(issue.minimum))}\` : message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      issue.type === "array" ? message = \`Array must contain \${issue.exact ? "exactly" : issue.inclusive ? "at most" : "less than"} \${issue.maximum} element(s)\` : issue.type === "string" ? message = \`String must contain \${issue.exact ? "exactly" : issue.inclusive ? "at most" : "under"} \${issue.maximum} character(s)\` : issue.type === "number" ? message = \`Number must be \${issue.exact ? "exactly" : issue.inclusive ? "less than or equal to" : "less than"} \${issue.maximum}\` : issue.type === "bigint" ? message = \`BigInt must be \${issue.exact ? "exactly" : issue.inclusive ? "less than or equal to" : "less than"} \${issue.maximum}\` : issue.type === "date" ? message = \`Date must be \${issue.exact ? "exactly" : issue.inclusive ? "smaller than or equal to" : "smaller than"} \${new Date(Number(issue.maximum))}\` : message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = "Invalid input";
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = "Intersection results could not be merged";
      break;
    case ZodIssueCode.not_multiple_of:
      message = \`Number must be a multiple of \${issue.multipleOf}\`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError, util.assertNever(issue);
  }
  return { message };
};
let overrideErrorMap = errorMap;
function getErrorMap() {
  return overrideErrorMap;
}
const makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params, fullPath = [...path, ...issueData.path || []], fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0)
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps)
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap(), issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      s.status === "dirty" && status.dirty(), arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key, value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted" || value.status === "aborted")
        return INVALID;
      key.status === "dirty" && status.dirty(), value.status === "dirty" && status.dirty(), key.value !== "__proto__" && (typeof value.value < "u" || pair.alwaysSet) && (finalObject[key.value] = value.value);
    }
    return { status: status.value, value: finalObject };
  }
}
const INVALID = Object.freeze({
  status: "aborted"
}), DIRTY = (value) => ({ status: "dirty", value }), OK = (value) => ({ status: "valid", value }), isAborted = (x) => x.status === "aborted", isDirty = (x) => x.status === "dirty", isValid = (x) => x.status === "valid", isAsync = (x) => typeof Promise < "u" && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message == "string" ? { message } : message || {}, errorUtil2.toString = (message) => typeof message == "string" ? message : message == null ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));
class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [], this.parent = parent, this.data = value, this._path = path, this._key = key;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const handleResult = (ctx, result) => {
  if (isValid(result))
    return { success: !0, data: result.value };
  if (!ctx.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const error = new ZodError(ctx.common.issues);
      return this._error = error, this._error;
    }
  };
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error))
    throw new Error(\`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.\`);
  return errorMap2 ? { errorMap: errorMap2, description } : { errorMap: (iss, ctx) => {
    const { message } = params;
    return iss.code === "invalid_enum_value" ? { message: message ?? ctx.defaultError } : typeof ctx.data > "u" ? { message: message ?? required_error ?? ctx.defaultError } : iss.code !== "invalid_type" ? { message: ctx.defaultError } : { message: message ?? invalid_type_error ?? ctx.defaultError };
  }, description };
}
class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result))
      throw new Error("Synchronous parse encountered promise.");
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: (params == null ? void 0 : params.async) ?? !1,
        contextualErrorMap: params == null ? void 0 : params.errorMap
      },
      path: (params == null ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    }, result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    var _a, _b;
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async)
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        (_b = (_a = err == null ? void 0 : err.message) == null ? void 0 : _a.toLowerCase()) != null && _b.includes("encountered") && (this["~standard"].async = !0), ctx.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params == null ? void 0 : params.errorMap,
        async: !0
      },
      path: (params == null ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    }, maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx }), result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => typeof message == "string" || typeof message > "u" ? { message } : typeof message == "function" ? message(val) : message;
    return this._refinement((val, ctx) => {
      const result = check(val), setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      return typeof Promise < "u" && result instanceof Promise ? result.then((data) => data ? !0 : (setError(), !1)) : result ? !0 : (setError(), !1);
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => check(val) ? !0 : (ctx.addIssue(typeof refinementData == "function" ? refinementData(val, ctx) : refinementData), !1));
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync, this._def = def, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def == "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def == "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const cuidRegex = /^c[^\\s-]{8,}$/i, cuid2Regex = /^[0-9a-z]+$/, ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i, uuidRegex = /^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$/i, nanoidRegex = /^[a-z0-9_-]{21}$/i, jwtRegex = /^[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]*$/, durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\\d+Y)|(?:[-+]?\\d+[.,]\\d+Y$))?(?:(?:[-+]?\\d+M)|(?:[-+]?\\d+[.,]\\d+M$))?(?:(?:[-+]?\\d+W)|(?:[-+]?\\d+[.,]\\d+W$))?(?:(?:[-+]?\\d+D)|(?:[-+]?\\d+[.,]\\d+D$))?(?:T(?=[\\d+-])(?:(?:[-+]?\\d+H)|(?:[-+]?\\d+[.,]\\d+H$))?(?:(?:[-+]?\\d+M)|(?:[-+]?\\d+[.,]\\d+M$))?(?:[-+]?\\d+(?:[.,]\\d+)?S)?)??$/, emailRegex = /^(?!\\.)(?!.*\\.\\.)([A-Z0-9_'+\\-\\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\\-]*\\.)+[A-Z]{2,}$/i, _emojiRegex = "^(\\\\p{Extended_Pictographic}|\\\\p{Emoji_Component})+$";
let emojiRegex;
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\/(3[0-2]|[12]?[0-9])$/, ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, dateRegexSource = "((\\\\d\\\\d[2468][048]|\\\\d\\\\d[13579][26]|\\\\d\\\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\\\d|30)|(02)-(0[1-9]|1\\\\d|2[0-8])))", dateRegex = new RegExp(\`^\${dateRegexSource}$\`);
function timeRegexSource(args) {
  let secondsRegexSource = "[0-5]\\\\d";
  args.precision ? secondsRegexSource = \`\${secondsRegexSource}\\\\.\\\\d{\${args.precision}}\` : args.precision == null && (secondsRegexSource = \`\${secondsRegexSource}(\\\\.\\\\d+)?\`);
  const secondsQuantifier = args.precision ? "+" : "?";
  return \`([01]\\\\d|2[0-3]):[0-5]\\\\d(:\${secondsRegexSource})\${secondsQuantifier}\`;
}
function timeRegex(args) {
  return new RegExp(\`^\${timeRegexSource(args)}$\`);
}
function datetimeRegex(args) {
  let regex = \`\${dateRegexSource}T\${timeRegexSource(args)}\`;
  const opts = [];
  return opts.push(args.local ? "Z?" : "Z"), args.offset && opts.push("([+-]\\\\d{2}:?\\\\d{2})"), regex = \`\${regex}(\${opts.join("|")})\`, new RegExp(\`^\${regex}$\`);
}
function isValidIP(ip, version) {
  return !!((version === "v4" || !version) && ipv4Regex.test(ip) || (version === "v6" || !version) && ipv6Regex.test(ip));
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return !1;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return !1;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "="), decoded = JSON.parse(atob(base64));
    return !(typeof decoded != "object" || decoded === null || "typ" in decoded && (decoded == null ? void 0 : decoded.typ) !== "JWT" || !decoded.alg || alg && decoded.alg !== alg);
  } catch {
    return !1;
  }
}
function isValidCidr(ip, version) {
  return !!((version === "v4" || !version) && ipv4CidrRegex.test(ip) || (version === "v6" || !version) && ipv6CidrRegex.test(ip));
}
class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce && (input.data = String(input.data)), this._getType(input) !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      return addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      }), INVALID;
    }
    const status = new ParseStatus();
    let ctx;
    for (const check of this._def.checks)
      if (check.kind === "min")
        input.data.length < check.value && (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: check.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: check.message
        }), status.dirty());
      else if (check.kind === "max")
        input.data.length > check.value && (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: check.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: check.message
        }), status.dirty());
      else if (check.kind === "length") {
        const tooBig = input.data.length > check.value, tooSmall = input.data.length < check.value;
        (tooBig || tooSmall) && (ctx = this._getOrReturnCtx(input, ctx), tooBig ? addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: check.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: check.message
        }) : tooSmall && addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: check.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: check.message
        }), status.dirty());
      } else if (check.kind === "email")
        emailRegex.test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
          validation: "email",
          code: ZodIssueCode.invalid_string,
          message: check.message
        }), status.dirty());
      else if (check.kind === "emoji")
        emojiRegex || (emojiRegex = new RegExp(_emojiRegex, "u")), emojiRegex.test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
          validation: "emoji",
          code: ZodIssueCode.invalid_string,
          message: check.message
        }), status.dirty());
      else if (check.kind === "uuid")
        uuidRegex.test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
          validation: "uuid",
          code: ZodIssueCode.invalid_string,
          message: check.message
        }), status.dirty());
      else if (check.kind === "nanoid")
        nanoidRegex.test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
          validation: "nanoid",
          code: ZodIssueCode.invalid_string,
          message: check.message
        }), status.dirty());
      else if (check.kind === "cuid")
        cuidRegex.test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
          validation: "cuid",
          code: ZodIssueCode.invalid_string,
          message: check.message
        }), status.dirty());
      else if (check.kind === "cuid2")
        cuid2Regex.test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
          validation: "cuid2",
          code: ZodIssueCode.invalid_string,
          message: check.message
        }), status.dirty());
      else if (check.kind === "ulid")
        ulidRegex.test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
          validation: "ulid",
          code: ZodIssueCode.invalid_string,
          message: check.message
        }), status.dirty());
      else if (check.kind === "url")
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          }), status.dirty();
        }
      else check.kind === "regex" ? (check.regex.lastIndex = 0, check.regex.test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        validation: "regex",
        code: ZodIssueCode.invalid_string,
        message: check.message
      }), status.dirty())) : check.kind === "trim" ? input.data = input.data.trim() : check.kind === "includes" ? input.data.includes(check.value, check.position) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_string,
        validation: { includes: check.value, position: check.position },
        message: check.message
      }), status.dirty()) : check.kind === "toLowerCase" ? input.data = input.data.toLowerCase() : check.kind === "toUpperCase" ? input.data = input.data.toUpperCase() : check.kind === "startsWith" ? input.data.startsWith(check.value) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_string,
        validation: { startsWith: check.value },
        message: check.message
      }), status.dirty()) : check.kind === "endsWith" ? input.data.endsWith(check.value) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_string,
        validation: { endsWith: check.value },
        message: check.message
      }), status.dirty()) : check.kind === "datetime" ? datetimeRegex(check).test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_string,
        validation: "datetime",
        message: check.message
      }), status.dirty()) : check.kind === "date" ? dateRegex.test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_string,
        validation: "date",
        message: check.message
      }), status.dirty()) : check.kind === "time" ? timeRegex(check).test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_string,
        validation: "time",
        message: check.message
      }), status.dirty()) : check.kind === "duration" ? durationRegex.test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        validation: "duration",
        code: ZodIssueCode.invalid_string,
        message: check.message
      }), status.dirty()) : check.kind === "ip" ? isValidIP(input.data, check.version) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        validation: "ip",
        code: ZodIssueCode.invalid_string,
        message: check.message
      }), status.dirty()) : check.kind === "jwt" ? isValidJWT(input.data, check.alg) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        validation: "jwt",
        code: ZodIssueCode.invalid_string,
        message: check.message
      }), status.dirty()) : check.kind === "cidr" ? isValidCidr(input.data, check.version) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        validation: "cidr",
        code: ZodIssueCode.invalid_string,
        message: check.message
      }), status.dirty()) : check.kind === "base64" ? base64Regex.test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        validation: "base64",
        code: ZodIssueCode.invalid_string,
        message: check.message
      }), status.dirty()) : check.kind === "base64url" ? base64urlRegex.test(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        validation: "base64url",
        code: ZodIssueCode.invalid_string,
        message: check.message
      }), status.dirty()) : util.assertNever(check);
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    return typeof options == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: options
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (options == null ? void 0 : options.precision) > "u" ? null : options == null ? void 0 : options.precision,
      offset: (options == null ? void 0 : options.offset) ?? !1,
      local: (options == null ? void 0 : options.local) ?? !1,
      ...errorUtil.errToObj(options == null ? void 0 : options.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    return typeof options == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: options
    }) : this._addCheck({
      kind: "time",
      precision: typeof (options == null ? void 0 : options.precision) > "u" ? null : options == null ? void 0 : options.precision,
      ...errorUtil.errToObj(options == null ? void 0 : options.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options == null ? void 0 : options.position,
      ...errorUtil.errToObj(options == null ? void 0 : options.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to \`.min(1)\`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks)
      ch.kind === "min" && (min === null || ch.value > min) && (min = ch.value);
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks)
      ch.kind === "max" && (max === null || ch.value < max) && (max = ch.value);
    return max;
  }
}
ZodString.create = (params) => new ZodString({
  checks: [],
  typeName: ZodFirstPartyTypeKind.ZodString,
  coerce: (params == null ? void 0 : params.coerce) ?? !1,
  ...processCreateParams(params)
});
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length, stepDecCount = (step.toString().split(".")[1] || "").length, decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount, valInt = Number.parseInt(val.toFixed(decCount).replace(".", "")), stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
class ZodNumber extends ZodType {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce && (input.data = Number(input.data)), this._getType(input) !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      return addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      }), INVALID;
    }
    let ctx;
    const status = new ParseStatus();
    for (const check of this._def.checks)
      check.kind === "int" ? util.isInteger(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: "integer",
        received: "float",
        message: check.message
      }), status.dirty()) : check.kind === "min" ? (check.inclusive ? input.data < check.value : input.data <= check.value) && (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: check.value,
        type: "number",
        inclusive: check.inclusive,
        exact: !1,
        message: check.message
      }), status.dirty()) : check.kind === "max" ? (check.inclusive ? input.data > check.value : input.data >= check.value) && (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: check.value,
        type: "number",
        inclusive: check.inclusive,
        exact: !1,
        message: check.message
      }), status.dirty()) : check.kind === "multipleOf" ? floatSafeRemainder(input.data, check.value) !== 0 && (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.not_multiple_of,
        multipleOf: check.value,
        message: check.message
      }), status.dirty()) : check.kind === "finite" ? Number.isFinite(input.data) || (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.not_finite,
        message: check.message
      }), status.dirty()) : util.assertNever(check);
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, !0, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, !1, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, !0, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, !1, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks)
      ch.kind === "min" && (min === null || ch.value > min) && (min = ch.value);
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks)
      ch.kind === "max" && (max === null || ch.value < max) && (max = ch.value);
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf")
        return !0;
      ch.kind === "min" ? (min === null || ch.value > min) && (min = ch.value) : ch.kind === "max" && (max === null || ch.value < max) && (max = ch.value);
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => new ZodNumber({
  checks: [],
  typeName: ZodFirstPartyTypeKind.ZodNumber,
  coerce: (params == null ? void 0 : params.coerce) || !1,
  ...processCreateParams(params)
});
class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce)
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    if (this._getType(input) !== ZodParsedType.bigint)
      return this._getInvalidInput(input);
    let ctx;
    const status = new ParseStatus();
    for (const check of this._def.checks)
      check.kind === "min" ? (check.inclusive ? input.data < check.value : input.data <= check.value) && (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        type: "bigint",
        minimum: check.value,
        inclusive: check.inclusive,
        message: check.message
      }), status.dirty()) : check.kind === "max" ? (check.inclusive ? input.data > check.value : input.data >= check.value) && (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        type: "bigint",
        maximum: check.value,
        inclusive: check.inclusive,
        message: check.message
      }), status.dirty()) : check.kind === "multipleOf" ? input.data % check.value !== BigInt(0) && (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.not_multiple_of,
        multipleOf: check.value,
        message: check.message
      }), status.dirty()) : util.assertNever(check);
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    return addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    }), INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, !0, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, !1, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, !0, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, !1, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks)
      ch.kind === "min" && (min === null || ch.value > min) && (min = ch.value);
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks)
      ch.kind === "max" && (max === null || ch.value < max) && (max = ch.value);
    return max;
  }
}
ZodBigInt.create = (params) => new ZodBigInt({
  checks: [],
  typeName: ZodFirstPartyTypeKind.ZodBigInt,
  coerce: (params == null ? void 0 : params.coerce) ?? !1,
  ...processCreateParams(params)
});
class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce && (input.data = !!input.data), this._getType(input) !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      }), INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => new ZodBoolean({
  typeName: ZodFirstPartyTypeKind.ZodBoolean,
  coerce: (params == null ? void 0 : params.coerce) || !1,
  ...processCreateParams(params)
});
class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce && (input.data = new Date(input.data)), this._getType(input) !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      return addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      }), INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      return addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      }), INVALID;
    }
    const status = new ParseStatus();
    let ctx;
    for (const check of this._def.checks)
      check.kind === "min" ? input.data.getTime() < check.value && (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        message: check.message,
        inclusive: !0,
        exact: !1,
        minimum: check.value,
        type: "date"
      }), status.dirty()) : check.kind === "max" ? input.data.getTime() > check.value && (ctx = this._getOrReturnCtx(input, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        message: check.message,
        inclusive: !0,
        exact: !1,
        maximum: check.value,
        type: "date"
      }), status.dirty()) : util.assertNever(check);
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks)
      ch.kind === "min" && (min === null || ch.value > min) && (min = ch.value);
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks)
      ch.kind === "max" && (max === null || ch.value < max) && (max = ch.value);
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => new ZodDate({
  checks: [],
  coerce: (params == null ? void 0 : params.coerce) || !1,
  typeName: ZodFirstPartyTypeKind.ZodDate,
  ...processCreateParams(params)
});
class ZodSymbol extends ZodType {
  _parse(input) {
    if (this._getType(input) !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      }), INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => new ZodSymbol({
  typeName: ZodFirstPartyTypeKind.ZodSymbol,
  ...processCreateParams(params)
});
class ZodUndefined extends ZodType {
  _parse(input) {
    if (this._getType(input) !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      }), INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => new ZodUndefined({
  typeName: ZodFirstPartyTypeKind.ZodUndefined,
  ...processCreateParams(params)
});
class ZodNull extends ZodType {
  _parse(input) {
    if (this._getType(input) !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      }), INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => new ZodNull({
  typeName: ZodFirstPartyTypeKind.ZodNull,
  ...processCreateParams(params)
});
class ZodAny extends ZodType {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => new ZodAny({
  typeName: ZodFirstPartyTypeKind.ZodAny,
  ...processCreateParams(params)
});
class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => new ZodUnknown({
  typeName: ZodFirstPartyTypeKind.ZodUnknown,
  ...processCreateParams(params)
});
class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    return addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    }), INVALID;
  }
}
ZodNever.create = (params) => new ZodNever({
  typeName: ZodFirstPartyTypeKind.ZodNever,
  ...processCreateParams(params)
});
class ZodVoid extends ZodType {
  _parse(input) {
    if (this._getType(input) !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      }), INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => new ZodVoid({
  typeName: ZodFirstPartyTypeKind.ZodVoid,
  ...processCreateParams(params)
});
class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input), def = this._def;
    if (ctx.parsedType !== ZodParsedType.array)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      }), INVALID;
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value, tooSmall = ctx.data.length < def.exactLength.value;
      (tooBig || tooSmall) && (addIssueToContext(ctx, {
        code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
        minimum: tooSmall ? def.exactLength.value : void 0,
        maximum: tooBig ? def.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: def.exactLength.message
      }), status.dirty());
    }
    if (def.minLength !== null && ctx.data.length < def.minLength.value && (addIssueToContext(ctx, {
      code: ZodIssueCode.too_small,
      minimum: def.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: def.minLength.message
    }), status.dirty()), def.maxLength !== null && ctx.data.length > def.maxLength.value && (addIssueToContext(ctx, {
      code: ZodIssueCode.too_big,
      maximum: def.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: def.maxLength.message
    }), status.dirty()), ctx.common.async)
      return Promise.all([...ctx.data].map((item, i) => def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i)))).then((result2) => ParseStatus.mergeArray(status, result2));
    const result = [...ctx.data].map((item, i) => def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => new ZodArray({
  type: schema,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: ZodFirstPartyTypeKind.ZodArray,
  ...processCreateParams(params)
});
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else return schema instanceof ZodArray ? new ZodArray({
    ...schema._def,
    type: deepPartialify(schema.element)
  }) : schema instanceof ZodOptional ? ZodOptional.create(deepPartialify(schema.unwrap())) : schema instanceof ZodNullable ? ZodNullable.create(deepPartialify(schema.unwrap())) : schema instanceof ZodTuple ? ZodTuple.create(schema.items.map((item) => deepPartialify(item))) : schema;
}
class ZodObject extends ZodType {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape(), keys = util.objectKeys(shape);
    return this._cached = { shape, keys }, this._cached;
  }
  _parse(input) {
    if (this._getType(input) !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      return addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      }), INVALID;
    }
    const { status, ctx } = this._processInputParams(input), { shape, keys: shapeKeys } = this._getCached(), extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip"))
      for (const key in ctx.data)
        shapeKeys.includes(key) || extraKeys.push(key);
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key], value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough")
        for (const key of extraKeys)
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
      else if (unknownKeys === "strict")
        extraKeys.length > 0 && (addIssueToContext(ctx, {
          code: ZodIssueCode.unrecognized_keys,
          keys: extraKeys
        }), status.dirty());
      else if (unknownKeys !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    return ctx.common.async ? Promise.resolve().then(async () => {
      const syncPairs = [];
      for (const pair of pairs) {
        const key = await pair.key, value = await pair.value;
        syncPairs.push({
          key,
          value,
          alwaysSet: pair.alwaysSet
        });
      }
      return syncPairs;
    }).then((syncPairs) => ParseStatus.mergeObjectSync(status, syncPairs)) : ParseStatus.mergeObjectSync(status, pairs);
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    return errorUtil.errToObj, new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a, _b;
          const defaultError = ((_b = (_a = this._def).errorMap) == null ? void 0 : _b.call(_a, issue, ctx).message) ?? ctx.defaultError;
          return issue.code === "unrecognized_keys" ? {
            message: errorUtil.errToObj(message).message ?? defaultError
          } : {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    return new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask))
      mask[key] && this.shape[key] && (shape[key] = this.shape[key]);
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape))
      mask[key] || (shape[key] = this.shape[key]);
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      mask && !mask[key] ? newShape[key] = fieldSchema : newShape[key] = fieldSchema.optional();
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape))
      if (mask && !mask[key])
        newShape[key] = this.shape[key];
      else {
        let newField = this.shape[key];
        for (; newField instanceof ZodOptional; )
          newField = newField._def.innerType;
        newShape[key] = newField;
      }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => new ZodObject({
  shape: () => shape,
  unknownKeys: "strip",
  catchall: ZodNever.create(),
  typeName: ZodFirstPartyTypeKind.ZodObject,
  ...processCreateParams(params)
});
ZodObject.strictCreate = (shape, params) => new ZodObject({
  shape: () => shape,
  unknownKeys: "strict",
  catchall: ZodNever.create(),
  typeName: ZodFirstPartyTypeKind.ZodObject,
  ...processCreateParams(params)
});
ZodObject.lazycreate = (shape, params) => new ZodObject({
  shape,
  unknownKeys: "strip",
  catchall: ZodNever.create(),
  typeName: ZodFirstPartyTypeKind.ZodObject,
  ...processCreateParams(params)
});
class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input), options = this._def.options;
    function handleResults(results) {
      for (const result of results)
        if (result.result.status === "valid")
          return result.result;
      for (const result of results)
        if (result.result.status === "dirty")
          return ctx.common.issues.push(...result.ctx.common.issues), result.result;
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      }), INVALID;
    }
    if (ctx.common.async)
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    {
      let dirty;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        }, result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid")
          return result;
        result.status === "dirty" && !dirty && (dirty = { result, ctx: childCtx }), childCtx.common.issues.length && issues.push(childCtx.common.issues);
      }
      if (dirty)
        return ctx.common.issues.push(...dirty.ctx.common.issues), dirty.result;
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      }), INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => new ZodUnion({
  options: types,
  typeName: ZodFirstPartyTypeKind.ZodUnion,
  ...processCreateParams(params)
});
function mergeValues(a, b) {
  const aType = getParsedType(a), bType = getParsedType(b);
  if (a === b)
    return { valid: !0, data: a };
  if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b), sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1), newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid)
        return { valid: !1 };
      newObj[key] = sharedValue.data;
    }
    return { valid: !0, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length)
      return { valid: !1 };
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index], itemB = b[index], sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid)
        return { valid: !1 };
      newArray.push(sharedValue.data);
    }
    return { valid: !0, data: newArray };
  } else return aType === ZodParsedType.date && bType === ZodParsedType.date && +a == +b ? { valid: !0, data: a } : { valid: !1 };
}
class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input), handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight))
        return INVALID;
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      return merged.valid ? ((isDirty(parsedLeft) || isDirty(parsedRight)) && status.dirty(), { status: status.value, value: merged.data }) : (addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_intersection_types
      }), INVALID);
    };
    return ctx.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }),
      this._def.right._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      })
    ]).then(([left, right]) => handleParsed(left, right)) : handleParsed(this._def.left._parseSync({
      data: ctx.data,
      path: ctx.path,
      parent: ctx
    }), this._def.right._parseSync({
      data: ctx.data,
      path: ctx.path,
      parent: ctx
    }));
  }
}
ZodIntersection.create = (left, right, params) => new ZodIntersection({
  left,
  right,
  typeName: ZodFirstPartyTypeKind.ZodIntersection,
  ...processCreateParams(params)
});
class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      }), INVALID;
    if (ctx.data.length < this._def.items.length)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), INVALID;
    !this._def.rest && ctx.data.length > this._def.items.length && (addIssueToContext(ctx, {
      code: ZodIssueCode.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), status.dirty());
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      return schema ? schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex)) : null;
    }).filter((x) => !!x);
    return ctx.common.async ? Promise.all(items).then((results) => ParseStatus.mergeArray(status, results)) : ParseStatus.mergeArray(status, items);
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      }), INVALID;
    const keyType = this._def.keyType, valueType = this._def.valueType, pairs = [...ctx.data.entries()].map(([key, value], index) => ({
      key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
      value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
    }));
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key, value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted")
            return INVALID;
          (key.status === "dirty" || value.status === "dirty") && status.dirty(), finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key, value = pair.value;
        if (key.status === "aborted" || value.status === "aborted")
          return INVALID;
        (key.status === "dirty" || value.status === "dirty") && status.dirty(), finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => new ZodMap({
  valueType,
  keyType,
  typeName: ZodFirstPartyTypeKind.ZodMap,
  ...processCreateParams(params)
});
class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      }), INVALID;
    const def = this._def;
    def.minSize !== null && ctx.data.size < def.minSize.value && (addIssueToContext(ctx, {
      code: ZodIssueCode.too_small,
      minimum: def.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: def.minSize.message
    }), status.dirty()), def.maxSize !== null && ctx.data.size > def.maxSize.value && (addIssueToContext(ctx, {
      code: ZodIssueCode.too_big,
      maximum: def.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: def.maxSize.message
    }), status.dirty());
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        element.status === "dirty" && status.dirty(), parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    return ctx.common.async ? Promise.all(elements).then((elements2) => finalizeSet(elements2)) : finalizeSet(elements);
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => new ZodSet({
  valueType,
  minSize: null,
  maxSize: null,
  typeName: ZodFirstPartyTypeKind.ZodSet,
  ...processCreateParams(params)
});
class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    return this._def.getter()._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => new ZodLazy({
  getter,
  typeName: ZodFirstPartyTypeKind.ZodLazy,
  ...processCreateParams(params)
});
class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      return addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      }), INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => new ZodLiteral({
  value,
  typeName: ZodFirstPartyTypeKind.ZodLiteral,
  ...processCreateParams(params)
});
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
class ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data != "string") {
      const ctx = this._getOrReturnCtx(input), expectedValues = this._def.values;
      return addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      }), INVALID;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input), expectedValues = this._def.values;
      return addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      }), INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values)
      enumValues[val] = val;
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values)
      enumValues[val] = val;
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values)
      enumValues[val] = val;
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values), ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      return addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      }), INVALID;
    }
    if (this._cache || (this._cache = new Set(util.getValidEnumValues(this._def.values))), !this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      return addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      }), INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
ZodNativeEnum.create = (values, params) => new ZodNativeEnum({
  values,
  typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
  ...processCreateParams(params)
});
class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === !1)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      }), INVALID;
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => this._def.type.parseAsync(data, {
      path: ctx.path,
      errorMap: ctx.common.contextualErrorMap
    })));
  }
}
ZodPromise.create = (schema, params) => new ZodPromise({
  type: schema,
  typeName: ZodFirstPartyTypeKind.ZodPromise,
  ...processCreateParams(params)
});
class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input), effect = this._def.effect || null, checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg), arg.fatal ? status.abort() : status.dirty();
      },
      get path() {
        return ctx.path;
      }
    };
    if (checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx), effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async)
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          return result.status === "aborted" ? INVALID : result.status === "dirty" || status.value === "dirty" ? DIRTY(result.value) : result;
        });
      {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        return result.status === "aborted" ? INVALID : result.status === "dirty" || status.value === "dirty" ? DIRTY(result.value) : result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async)
          return Promise.resolve(result);
        if (result instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return acc;
      };
      if (ctx.common.async === !1) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        return inner.status === "aborted" ? INVALID : (inner.status === "dirty" && status.dirty(), executeRefinement(inner.value), { status: status.value, value: inner.value });
      } else
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => inner.status === "aborted" ? INVALID : (inner.status === "dirty" && status.dirty(), executeRefinement(inner.value).then(() => ({ status: status.value, value: inner.value }))));
    }
    if (effect.type === "transform")
      if (ctx.common.async === !1) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: status.value, value: result };
      } else
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => isValid(base) ? Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
          status: status.value,
          value: result
        })) : INVALID);
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => new ZodEffects({
  schema,
  typeName: ZodFirstPartyTypeKind.ZodEffects,
  effect,
  ...processCreateParams(params)
});
ZodEffects.createWithPreprocess = (preprocess, schema, params) => new ZodEffects({
  schema,
  effect: { type: "preprocess", transform: preprocess },
  typeName: ZodFirstPartyTypeKind.ZodEffects,
  ...processCreateParams(params)
});
class ZodOptional extends ZodType {
  _parse(input) {
    return this._getType(input) === ZodParsedType.undefined ? OK(void 0) : this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => new ZodOptional({
  innerType: type,
  typeName: ZodFirstPartyTypeKind.ZodOptional,
  ...processCreateParams(params)
});
class ZodNullable extends ZodType {
  _parse(input) {
    return this._getType(input) === ZodParsedType.null ? OK(null) : this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => new ZodNullable({
  innerType: type,
  typeName: ZodFirstPartyTypeKind.ZodNullable,
  ...processCreateParams(params)
});
class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    return ctx.parsedType === ZodParsedType.undefined && (data = this._def.defaultValue()), this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => new ZodDefault({
  innerType: type,
  typeName: ZodFirstPartyTypeKind.ZodDefault,
  defaultValue: typeof params.default == "function" ? params.default : () => params.default,
  ...processCreateParams(params)
});
class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input), newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    }, result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    return isAsync(result) ? result.then((result2) => ({
      status: "valid",
      value: result2.status === "valid" ? result2.value : this._def.catchValue({
        get error() {
          return new ZodError(newCtx.common.issues);
        },
        input: newCtx.data
      })
    })) : {
      status: "valid",
      value: result.status === "valid" ? result.value : this._def.catchValue({
        get error() {
          return new ZodError(newCtx.common.issues);
        },
        input: newCtx.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => new ZodCatch({
  innerType: type,
  typeName: ZodFirstPartyTypeKind.ZodCatch,
  catchValue: typeof params.catch == "function" ? params.catch : () => params.catch,
  ...processCreateParams(params)
});
class ZodNaN extends ZodType {
  _parse(input) {
    if (this._getType(input) !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      }), INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => new ZodNaN({
  typeName: ZodFirstPartyTypeKind.ZodNaN,
  ...processCreateParams(params)
});
class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input), data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async)
      return (async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        return inResult.status === "aborted" ? INVALID : inResult.status === "dirty" ? (status.dirty(), DIRTY(inResult.value)) : this._def.out._parseAsync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      })();
    {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      return inResult.status === "aborted" ? INVALID : inResult.status === "dirty" ? (status.dirty(), {
        status: "dirty",
        value: inResult.value
      }) : this._def.out._parseSync({
        data: inResult.value,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}
class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input), freeze = (data) => (isValid(data) && (data.value = Object.freeze(data.value)), data);
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type, params) => new ZodReadonly({
  innerType: type,
  typeName: ZodFirstPartyTypeKind.ZodReadonly,
  ...processCreateParams(params)
});
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2.ZodString = "ZodString", ZodFirstPartyTypeKind2.ZodNumber = "ZodNumber", ZodFirstPartyTypeKind2.ZodNaN = "ZodNaN", ZodFirstPartyTypeKind2.ZodBigInt = "ZodBigInt", ZodFirstPartyTypeKind2.ZodBoolean = "ZodBoolean", ZodFirstPartyTypeKind2.ZodDate = "ZodDate", ZodFirstPartyTypeKind2.ZodSymbol = "ZodSymbol", ZodFirstPartyTypeKind2.ZodUndefined = "ZodUndefined", ZodFirstPartyTypeKind2.ZodNull = "ZodNull", ZodFirstPartyTypeKind2.ZodAny = "ZodAny", ZodFirstPartyTypeKind2.ZodUnknown = "ZodUnknown", ZodFirstPartyTypeKind2.ZodNever = "ZodNever", ZodFirstPartyTypeKind2.ZodVoid = "ZodVoid", ZodFirstPartyTypeKind2.ZodArray = "ZodArray", ZodFirstPartyTypeKind2.ZodObject = "ZodObject", ZodFirstPartyTypeKind2.ZodUnion = "ZodUnion", ZodFirstPartyTypeKind2.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", ZodFirstPartyTypeKind2.ZodIntersection = "ZodIntersection", ZodFirstPartyTypeKind2.ZodTuple = "ZodTuple", ZodFirstPartyTypeKind2.ZodRecord = "ZodRecord", ZodFirstPartyTypeKind2.ZodMap = "ZodMap", ZodFirstPartyTypeKind2.ZodSet = "ZodSet", ZodFirstPartyTypeKind2.ZodFunction = "ZodFunction", ZodFirstPartyTypeKind2.ZodLazy = "ZodLazy", ZodFirstPartyTypeKind2.ZodLiteral = "ZodLiteral", ZodFirstPartyTypeKind2.ZodEnum = "ZodEnum", ZodFirstPartyTypeKind2.ZodEffects = "ZodEffects", ZodFirstPartyTypeKind2.ZodNativeEnum = "ZodNativeEnum", ZodFirstPartyTypeKind2.ZodOptional = "ZodOptional", ZodFirstPartyTypeKind2.ZodNullable = "ZodNullable", ZodFirstPartyTypeKind2.ZodDefault = "ZodDefault", ZodFirstPartyTypeKind2.ZodCatch = "ZodCatch", ZodFirstPartyTypeKind2.ZodPromise = "ZodPromise", ZodFirstPartyTypeKind2.ZodBranded = "ZodBranded", ZodFirstPartyTypeKind2.ZodPipeline = "ZodPipeline", ZodFirstPartyTypeKind2.ZodReadonly = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const stringType = ZodString.create, numberType = ZodNumber.create, booleanType = ZodBoolean.create;
ZodNever.create;
const arrayType = ZodArray.create, objectType = ZodObject.create;
ZodUnion.create;
ZodIntersection.create;
ZodTuple.create;
const enumType = ZodEnum.create;
ZodPromise.create;
ZodOptional.create;
ZodNullable.create;
var DEFAULT_PORT = 5746, PING_ENDPOINT = "/ping/stagewise", PING_RESPONSE = "stagewise", contract = {
  server: {
    getSessionInfo: {
      request: objectType({}),
      response: objectType({
        sessionId: stringType().optional(),
        appName: stringType().describe('The name of the application, e.g. "VS Code" or "Cursor"'),
        displayName: stringType().describe("Human-readable window identifier for UI display"),
        port: numberType().describe("Port number this VS Code instance is running on")
      }),
      update: objectType({})
    },
    triggerAgentPrompt: {
      request: objectType({
        sessionId: stringType().optional(),
        prompt: stringType(),
        model: stringType().optional().describe("The model to use for the agent prompt"),
        files: arrayType(stringType()).optional().describe("Link project files to the agent prompt"),
        mode: enumType(["agent", "ask", "manual"]).optional().describe("The mode to use for the agent prompt"),
        images: arrayType(stringType()).optional().describe("Upload files like images, videos, etc.")
      }),
      response: objectType({
        sessionId: stringType().optional(),
        result: objectType({
          success: booleanType(),
          error: stringType().optional(),
          errorCode: enumType(["session_mismatch"]).optional(),
          output: stringType().optional()
        })
      }),
      update: objectType({
        sessionId: stringType().optional(),
        updateText: stringType()
      })
    }
  }
};
const MAX_CONSECUTIVE_ERRORS = 2;
async function discoverVSCodeWindows(maxAttempts = 10, timeout = 300) {
  const windows = [];
  let consecutiveErrors = 0;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const port = DEFAULT_PORT + attempt;
    try {
      const controller = new AbortController(), timeoutId = setTimeout(() => controller.abort(), timeout), response = await fetch(\`http://localhost:\${port}\${PING_ENDPOINT}\`, {
        signal: controller.signal
      });
      if (clearTimeout(timeoutId), consecutiveErrors = 0, response.ok && await response.text() === PING_RESPONSE)
        try {
          const bridge = createSRPCClientBridge(
            \`ws://localhost:\${port}\`,
            contract
          );
          await bridge.connect();
          const sessionInfo = await bridge.call.getSessionInfo(
            {},
            {
              onUpdate: () => {
              }
            }
          );
          windows.push(sessionInfo), await bridge.close();
        } catch (_error) {
          console.warn(\`Failed to get session info from port \${port}:\`, _error);
        }
      else
        continue;
    } catch {
      if (consecutiveErrors++, consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) {
        console.warn(
          "⬆️⬆️⬆️ Those two errors are expected! (Everything is fine, they are part of stagewise's discovery mechanism!) ✅"
        );
        break;
      }
      continue;
    }
  }
  return windows.length === 0 && console.warn(
    "No IDE windows found, please start an IDE with the stagewise extension installed! ❌"
  ), windows;
}
const getCurrentPort = () => typeof window < "u" && window.parent.location && window.parent.location.port || "80", getStorageKey = () => \`ide-selected-session-id-on-browser-port-\${getCurrentPort()}\`, getStoredSessionId = () => {
  try {
    return localStorage.getItem(getStorageKey()) || void 0;
  } catch {
    return;
  }
}, setStoredSessionId = (sessionId) => {
  try {
    sessionId ? localStorage.setItem(getStorageKey(), sessionId) : localStorage.removeItem(getStorageKey());
  } catch {
  }
}, VSCodeContext = createContext({
  windows: [],
  isDiscovering: !1,
  discoveryError: null,
  selectedSession: void 0,
  shouldPromptWindowSelection: !1,
  setShouldPromptWindowSelection: () => {
  },
  discover: async () => {
  },
  selectSession: () => {
  },
  refreshSession: async () => {
  },
  appName: void 0
});
function VSCodeProvider({ children }) {
  const [windows, setWindows] = useState([]), [isDiscovering, setIsDiscovering] = useState(!1), [discoveryError, setDiscoveryError] = useState(null), [selectedSessionId, setSelectedSessionId] = useState(getStoredSessionId()), [shouldPromptWindowSelection, setShouldPromptWindowSelection] = useState(!1), discover = async () => {
    setIsDiscovering(!0), setDiscoveryError(null);
    try {
      const discoveredWindows = await discoverVSCodeWindows();
      setWindows(discoveredWindows);
      const storedSessionId = getStoredSessionId();
      if (discoveredWindows.length === 1) {
        const singleWindow = discoveredWindows[0];
        (!storedSessionId || storedSessionId !== singleWindow.sessionId) && (setSelectedSessionId(singleWindow.sessionId), setStoredSessionId(singleWindow.sessionId)), setShouldPromptWindowSelection(!1);
      } else {
        const noSessionIdSavedForCurrentPort = discoveredWindows.length > 1 && !storedSessionId || // No saved sessionId for current port
        storedSessionId && !discoveredWindows.some((w) => w.sessionId === storedSessionId);
        setShouldPromptWindowSelection(noSessionIdSavedForCurrentPort), noSessionIdSavedForCurrentPort && (setSelectedSessionId(void 0), setStoredSessionId(void 0));
      }
    } catch (err) {
      setDiscoveryError(
        err instanceof Error ? err.message : "Failed to discover windows"
      );
    } finally {
      setIsDiscovering(!1);
    }
  }, selectSession = (sessionId) => {
    if (!sessionId || sessionId === "") {
      setStoredSessionId(void 0), setSelectedSessionId(void 0);
      return;
    }
    setSelectedSessionId(sessionId), setStoredSessionId(sessionId), sessionId && setShouldPromptWindowSelection(!1);
  }, refreshSession = async () => {
    selectedSessionId && await discover();
  };
  useEffect(() => {
    discover();
  }, []);
  const selectedSession = windows.find(
    (w) => w.sessionId === selectedSessionId
  ), value = {
    windows,
    isDiscovering,
    discoveryError,
    selectedSession,
    shouldPromptWindowSelection,
    setShouldPromptWindowSelection,
    discover,
    selectSession,
    refreshSession,
    appName: selectedSession == null ? void 0 : selectedSession.appName
  };
  return /* @__PURE__ */ jsx(VSCodeContext.Provider, { value, children });
}
function useVSCode() {
  return useContext(VSCodeContext);
}
const SRPCBridgeContext = createContext({
  bridge: null,
  isConnecting: !1,
  error: null
});
function SRPCBridgeProvider({ children }) {
  const [state, setState] = useState({
    bridge: null,
    isConnecting: !0,
    error: null
  }), { selectedSession } = useVSCode(), bridgeRef = useRef(null), initializeBridge = useCallback(async (port) => {
    bridgeRef.current && await bridgeRef.current.close();
    try {
      const bridge = createSRPCClientBridge(\`ws://localhost:\${port}\`, contract);
      await bridge.connect(), bridgeRef.current = bridge, setState({
        bridge,
        isConnecting: !1,
        error: null
      });
    } catch (error) {
      bridgeRef.current = null, setState({
        bridge: null,
        isConnecting: !1,
        error: error instanceof Error ? error : new Error(String(error))
      });
    }
  }, []);
  return useEffect(() => {
    selectedSession && initializeBridge(selectedSession.port);
  }, [selectedSession, initializeBridge]), /* @__PURE__ */ jsx(SRPCBridgeContext.Provider, { value: state, children });
}
function useSRPCBridge() {
  const context = useContext(SRPCBridgeContext);
  if (!context)
    throw new Error("useSRPCBridge must be used within an SRPCBridgeProvider");
  return context;
}
const ConfigContext = createContext({
  config: void 0
});
function ConfigProvider({
  children,
  config
}) {
  const value = useMemo(() => ({
    config
  }), [config]);
  return /* @__PURE__ */ jsx(ConfigContext.Provider, { value, children });
}
function useConfig() {
  return useContext(ConfigContext);
}
const PluginContext = createContext({
  plugins: [],
  toolbarContext: {
    sendPrompt: () => {
    },
    mainAppWindow: window.parent
  }
});
function PluginProvider({ children }) {
  const { bridge } = useSRPCBridge(), { selectedSession } = useVSCode(), { config } = useConfig(), plugins = (config == null ? void 0 : config.plugins) || [], toolbarContext = useMemo(() => ({
    sendPrompt: async (prompt) => {
      if (!bridge) throw new Error("No connection to the agent");
      return await bridge.call.triggerAgentPrompt(
        typeof prompt == "string" ? {
          prompt,
          ...selectedSession && {
            sessionId: selectedSession.sessionId
          }
        } : {
          prompt: prompt.prompt,
          model: prompt.model,
          files: prompt.files,
          images: prompt.images,
          mode: prompt.mode,
          ...selectedSession && {
            sessionId: selectedSession.sessionId
          }
        },
        {
          onUpdate: (_update) => {
          }
        }
      );
    },
    mainAppWindow: window.parent
  }), [bridge, selectedSession]), pluginsLoadedRef = useRef(!1);
  useEffect(() => {
    pluginsLoadedRef.current || (pluginsLoadedRef.current = !0, console.log("plugins", plugins), plugins.forEach((plugin) => {
      var _a;
      (_a = plugin.onLoad) == null || _a.call(plugin, toolbarContext);
    }));
  }, [plugins, toolbarContext]);
  const value = useMemo(() => ({
    plugins,
    toolbarContext
  }), [plugins, toolbarContext]);
  return /* @__PURE__ */ jsx(PluginContext.Provider, { value, children });
}
function usePlugins() {
  return useContext(PluginContext);
}
function r(e) {
  var t, f, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
const CLASS_PART_SEPARATOR = "-", createClassGroupUtils = (config) => {
  const classMap = createClassMap(config), {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  return {
    getClassGroupId: (className) => {
      const classParts = className.split(CLASS_PART_SEPARATOR);
      return classParts[0] === "" && classParts.length !== 1 && classParts.shift(), getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
    },
    getConflictingClassGroupIds: (classGroupId, hasPostfixModifier) => {
      const conflicts = conflictingClassGroups[classGroupId] || [];
      return hasPostfixModifier && conflictingClassGroupModifiers[classGroupId] ? [...conflicts, ...conflictingClassGroupModifiers[classGroupId]] : conflicts;
    }
  };
}, getGroupRecursive = (classParts, classPartObject) => {
  var _a;
  if (classParts.length === 0)
    return classPartObject.classGroupId;
  const currentClassPart = classParts[0], nextClassPartObject = classPartObject.nextPart.get(currentClassPart), classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart)
    return classGroupFromNextClassPart;
  if (classPartObject.validators.length === 0)
    return;
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return (_a = classPartObject.validators.find(({
    validator
  }) => validator(classRest))) == null ? void 0 : _a.classGroupId;
}, arbitraryPropertyRegex = /^\\[(.+)\\]$/, getGroupIdForArbitraryProperty = (className) => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1], property = arbitraryPropertyClassName == null ? void 0 : arbitraryPropertyClassName.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property)
      return "arbitrary.." + property;
  }
}, createClassMap = (config) => {
  const {
    theme,
    classGroups
  } = config, classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const classGroupId in classGroups)
    processClassesRecursively(classGroups[classGroupId], classMap, classGroupId, theme);
  return classMap;
}, processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition == "string") {
      const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition == "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
    });
  });
}, getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  return path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    currentClassPartObject.nextPart.has(pathPart) || currentClassPartObject.nextPart.set(pathPart, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  }), currentClassPartObject;
}, isThemeGetter = (func) => func.isThemeGetter, createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let cacheSize = 0, cache = /* @__PURE__ */ new Map(), previousCache = /* @__PURE__ */ new Map();
  const update = (key, value) => {
    cache.set(key, value), cacheSize++, cacheSize > maxCacheSize && (cacheSize = 0, previousCache = cache, cache = /* @__PURE__ */ new Map());
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== void 0)
        return value;
      if ((value = previousCache.get(key)) !== void 0)
        return update(key, value), value;
    },
    set(key, value) {
      cache.has(key) ? cache.set(key, value) : update(key, value);
    }
  };
}, IMPORTANT_MODIFIER = "!", MODIFIER_SEPARATOR = ":", MODIFIER_SEPARATOR_LENGTH = MODIFIER_SEPARATOR.length, createParseClassName = (config) => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  let parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0, parenDepth = 0, modifierStart = 0, postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index)), modifierStart = index + MODIFIER_SEPARATOR_LENGTH;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      currentCharacter === "[" ? bracketDepth++ : currentCharacter === "]" ? bracketDepth-- : currentCharacter === "(" ? parenDepth++ : currentCharacter === ")" && parenDepth--;
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart), baseClassName = stripImportantModifier(baseClassNameWithImportantModifier), hasImportantModifier = baseClassName !== baseClassNameWithImportantModifier, maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR, parseClassNameOriginal = parseClassName;
    parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.substring(fullPrefix.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: className,
      maybePostfixModifierPosition: void 0
    };
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
}, stripImportantModifier = (baseClassName) => baseClassName.endsWith(IMPORTANT_MODIFIER) ? baseClassName.substring(0, baseClassName.length - 1) : baseClassName.startsWith(IMPORTANT_MODIFIER) ? baseClassName.substring(1) : baseClassName, createSortModifiers = (config) => {
  const orderSensitiveModifiers = Object.fromEntries(config.orderSensitiveModifiers.map((modifier) => [modifier, !0]));
  return (modifiers) => {
    if (modifiers.length <= 1)
      return modifiers;
    const sortedModifiers = [];
    let unsortedModifiers = [];
    return modifiers.forEach((modifier) => {
      modifier[0] === "[" || orderSensitiveModifiers[modifier] ? (sortedModifiers.push(...unsortedModifiers.sort(), modifier), unsortedModifiers = []) : unsortedModifiers.push(modifier);
    }), sortedModifiers.push(...unsortedModifiers.sort()), sortedModifiers;
  };
}, createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  ...createClassGroupUtils(config)
}), SPLIT_CLASSES_REGEX = /\\s+/, mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers
  } = configUtils, classGroupsInConflict = [], classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index], {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? " " + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition, classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      if (classGroupId = getClassGroupId(baseClassName), !classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = !1;
    }
    const variantModifier = sortModifiers(modifiers).join(":"), modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier, classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId))
      continue;
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
function twJoin() {
  let index = 0, argument, resolvedValue, string = "";
  for (; index < arguments.length; )
    (argument = arguments[index++]) && (resolvedValue = toValue(argument)) && (string && (string += " "), string += resolvedValue);
  return string;
}
const toValue = (mix) => {
  if (typeof mix == "string")
    return mix;
  let resolvedValue, string = "";
  for (let k = 0; k < mix.length; k++)
    mix[k] && (resolvedValue = toValue(mix[k])) && (string && (string += " "), string += resolvedValue);
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils, cacheGet, cacheSet, functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    return configUtils = createConfigUtils(config), cacheGet = configUtils.cache.get, cacheSet = configUtils.cache.set, functionToCall = tailwindMerge, tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult)
      return cachedResult;
    const result = mergeClassList(classList, configUtils);
    return cacheSet(classList, result), result;
  }
  return function() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
const fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || [];
  return themeGetter.isThemeGetter = !0, themeGetter;
}, arbitraryValueRegex = /^\\[(?:(\\w[\\w-]*):)?(.+)\\]$/i, arbitraryVariableRegex = /^\\((?:(\\w[\\w-]*):)?(.+)\\)$/i, fractionRegex = /^\\d+\\/\\d+$/, tshirtUnitRegex = /^(\\d+(\\.\\d+)?)?(xs|sm|md|lg|xl)$/, lengthUnitRegex = /\\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\\b(calc|min|max|clamp)\\(.+\\)|^0$/, colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\\(.+\\)$/, shadowRegex = /^(inset_)?-?((\\d+)?\\.?(\\d+)[a-z]+|0)_-?((\\d+)?\\.?(\\d+)[a-z]+|0)/, imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\\(.+\\)$/, isFraction = (value) => fractionRegex.test(value), isNumber = (value) => !!value && !Number.isNaN(Number(value)), isInteger = (value) => !!value && Number.isInteger(Number(value)), isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1)), isTshirtSize = (value) => tshirtUnitRegex.test(value), isAny = () => !0, isLengthOnly = (value) => (
  // \`colorFunctionRegex\` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, \`hsl(0 0% 0%)\` would be classified as a length without this check.
  // I could also use lookbehind assertion in \`lengthUnitRegex\` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
), isNever = () => !1, isShadow = (value) => shadowRegex.test(value), isImage = (value) => imageRegex.test(value), isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value), isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever), isArbitraryValue = (value) => arbitraryValueRegex.test(value), isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly), isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber), isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever), isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage), isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow), isArbitraryVariable = (value) => arbitraryVariableRegex.test(value), isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength), isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName), isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition), isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize), isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage), isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, !0), getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  return result ? result[1] ? testLabel(result[1]) : testValue(result[2]) : !1;
}, getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = !1) => {
  const result = arbitraryVariableRegex.exec(value);
  return result ? result[1] ? testLabel(result[1]) : shouldMatchNoLabel : !1;
}, isLabelPosition = (label) => label === "position" || label === "percentage", isLabelImage = (label) => label === "image" || label === "url", isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size", isLabelLength = (label) => label === "length", isLabelNumber = (label) => label === "number", isLabelFamilyName = (label) => label === "family-name", isLabelShadow = (label) => label === "shadow", getDefaultConfig = () => {
  const themeColor = fromTheme("color"), themeFont = fromTheme("font"), themeText = fromTheme("text"), themeFontWeight = fromTheme("font-weight"), themeTracking = fromTheme("tracking"), themeLeading = fromTheme("leading"), themeBreakpoint = fromTheme("breakpoint"), themeContainer = fromTheme("container"), themeSpacing = fromTheme("spacing"), themeRadius = fromTheme("radius"), themeShadow = fromTheme("shadow"), themeInsetShadow = fromTheme("inset-shadow"), themeTextShadow = fromTheme("text-shadow"), themeDropShadow = fromTheme("drop-shadow"), themeBlur = fromTheme("blur"), themePerspective = fromTheme("perspective"), themeAspect = fromTheme("aspect"), themeEase = fromTheme("ease"), themeAnimate = fromTheme("animate"), scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], scalePosition = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue], scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"], scaleOverscroll = () => ["auto", "contain", "none"], scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing], scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()], scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue], scaleGridColRowStartAndEnd = () => ["auto", {
    span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
  }, isInteger, isArbitraryVariable, isArbitraryValue], scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue], scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue], scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()], scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()], scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue], scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
    position: [isArbitraryVariable, isArbitraryValue]
  }], scaleBgRepeat = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
    size: [isArbitraryVariable, isArbitraryValue]
  }], scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength], scaleRadius = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    themeRadius,
    isArbitraryVariable,
    isArbitraryValue
  ], scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength], scaleLineStyle = () => ["solid", "dashed", "dotted", "double"], scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition], scaleBlur = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    themeBlur,
    isArbitraryVariable,
    isArbitraryValue
  ], scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue], scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue], scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue], scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      ease: ["in", "out", "in-out"],
      font: [isAnyNonArbitrary],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [isTshirtSize],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ["px", isNumber],
      text: [isTshirtSize],
      "text-shadow": [isTshirtSize],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: scalePositionWithArbitrary()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": scaleInset()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": scaleInset()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: scaleInset()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": scaleUnambiguousSpacing()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": scaleUnambiguousSpacing()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...scaleAlignPrimaryAxis(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [themeContainer, "screen", ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          themeContainer,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...scaleSizing()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          themeContainer,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [themeBreakpoint]
          },
          ...scaleSizing()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [themeFontWeight, isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isArbitraryVariableFamilyName, isArbitraryValue, themeFont]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          themeLeading,
          ...scaleUnambiguousSpacing()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...scaleLineStyle(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: scaleBgPosition()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: scaleBgRepeat()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: scaleBgSize()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ["", isArbitraryVariable, isArbitraryValue],
          conic: [isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": scaleBorderWidth()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": scaleBorderWidth()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": scaleBorderWidth()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: scaleColor()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": scaleColor()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": scaleColor()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": scaleColor()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...scaleLineStyle(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: scaleColor()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [isNumber, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": scaleColor()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": scaleBlendMode()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [isNumber]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": scaleMaskImagePosition()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": scaleMaskImagePosition()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": scaleColor()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": scaleColor()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": scaleMaskImagePosition()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": scaleMaskImagePosition()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": scaleColor()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": scaleColor()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": scaleMaskImagePosition()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": scaleMaskImagePosition()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": scaleColor()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": scaleColor()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": scaleMaskImagePosition()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": scaleMaskImagePosition()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": scaleColor()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": scaleColor()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": scaleMaskImagePosition()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": scaleMaskImagePosition()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": scaleColor()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": scaleColor()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": scaleMaskImagePosition()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": scaleMaskImagePosition()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": scaleColor()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": scaleColor()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": scaleMaskImagePosition()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": scaleMaskImagePosition()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": scaleColor()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": scaleColor()
      }],
      "mask-image-radial": [{
        "mask-radial": [isArbitraryVariable, isArbitraryValue]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": scaleMaskImagePosition()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": scaleMaskImagePosition()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": scaleColor()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": scaleColor()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": scalePosition()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [isNumber]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": scaleMaskImagePosition()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": scaleMaskImagePosition()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": scaleColor()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": scaleColor()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: scaleBgPosition()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: scaleBgRepeat()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: scaleBgSize()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeDropShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": scaleColor()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": scalePositionWithArbitrary()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: scalePositionWithArbitrary()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, mergeConfigs = (baseConfig, {
  cacheSize,
  prefix,
  experimentalParseClassName,
  extend = {},
  override = {}
}) => (overrideProperty(baseConfig, "cacheSize", cacheSize), overrideProperty(baseConfig, "prefix", prefix), overrideProperty(baseConfig, "experimentalParseClassName", experimentalParseClassName), overrideConfigProperties(baseConfig.theme, override.theme), overrideConfigProperties(baseConfig.classGroups, override.classGroups), overrideConfigProperties(baseConfig.conflictingClassGroups, override.conflictingClassGroups), overrideConfigProperties(baseConfig.conflictingClassGroupModifiers, override.conflictingClassGroupModifiers), overrideProperty(baseConfig, "orderSensitiveModifiers", override.orderSensitiveModifiers), mergeConfigProperties(baseConfig.theme, extend.theme), mergeConfigProperties(baseConfig.classGroups, extend.classGroups), mergeConfigProperties(baseConfig.conflictingClassGroups, extend.conflictingClassGroups), mergeConfigProperties(baseConfig.conflictingClassGroupModifiers, extend.conflictingClassGroupModifiers), mergeArrayProperties(baseConfig, extend, "orderSensitiveModifiers"), baseConfig), overrideProperty = (baseObject, overrideKey, overrideValue) => {
  overrideValue !== void 0 && (baseObject[overrideKey] = overrideValue);
}, overrideConfigProperties = (baseObject, overrideObject) => {
  if (overrideObject)
    for (const key in overrideObject)
      overrideProperty(baseObject, key, overrideObject[key]);
}, mergeConfigProperties = (baseObject, mergeObject) => {
  if (mergeObject)
    for (const key in mergeObject)
      mergeArrayProperties(baseObject, mergeObject, key);
}, mergeArrayProperties = (baseObject, mergeObject, key) => {
  const mergeValue = mergeObject[key];
  mergeValue !== void 0 && (baseObject[key] = baseObject[key] ? baseObject[key].concat(mergeValue) : mergeValue);
}, extendTailwindMerge = (configExtension, ...createConfig) => typeof configExtension == "function" ? createTailwindMerge(getDefaultConfig, configExtension, ...createConfig) : createTailwindMerge(() => mergeConfigs(getDefaultConfig(), configExtension), ...createConfig);
function getElementAtPoint(x, y) {
  return window.parent.document.elementsFromPoint(
    x,
    y
  ).find(
    (element) => !element.closest("svg") && !element.closest("STAGEWISE-TOOLBAR") && isElementAtPoint(element, x, y)
  ) || window.parent.document.body;
}
const isElementAtPoint = (element, clientX, clientY) => {
  const boundingRect = element.getBoundingClientRect(), isInHorizontalBounds = clientX > boundingRect.left && clientX < boundingRect.left + boundingRect.width, isInVerticalBounds = clientY > boundingRect.top && clientY < boundingRect.top + boundingRect.height;
  return isInHorizontalBounds && isInVerticalBounds;
};
var HotkeyActions = /* @__PURE__ */ ((HotkeyActions2) => (HotkeyActions2[HotkeyActions2.ESC = 0] = "ESC", HotkeyActions2[HotkeyActions2.CTRL_ALT_C = 1] = "CTRL_ALT_C", HotkeyActions2))(HotkeyActions || {});
const hotkeyActionDefinitions = {
  0: {
    keyComboDefault: "Esc",
    keyComboMac: "esc",
    isEventMatching: (ev) => ev.code === "Escape"
  },
  1: {
    keyComboDefault: "Ctrl+Alt+C",
    keyComboMac: "⌘+⌥+C",
    isEventMatching: (ev) => ev.code === "KeyC" && (ev.ctrlKey || ev.metaKey) && ev.altKey
  }
}, customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "bg-image": [
        "bg-gradient",
        "bg-gradient-light-1",
        "bg-gradient-light-2",
        "bg-gradient-light-3"
      ]
    }
  }
});
function cn(...inputs) {
  return customTwMerge(clsx(inputs));
}
const generateId = (length = 16) => Math.random().toString(36).substring(2, length + 2);
function Panel({
  children,
  alwaysFullHeight = !1
}) {
  return console.log("Hello from Panel!"), /* @__PURE__ */ jsx(
    "section",
    {
      className: cn(
        "flex max-h-full min-h-48 flex-col items-stretch justify-start rounded-2xl border border-border/30 bg-zinc-50/80 p-4 shadow-md backdrop-blur-md",
        alwaysFullHeight && "h-full"
      ),
      children
    }
  );
}
function PanelHeader({
  title,
  description
}) {
  return /* @__PURE__ */ jsxs("header", { className: "mb-3 flex flex-col gap-1 text-zinc-950", children: [
    title && /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg ", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "font-medium text-zinc-600", children: description })
  ] });
}
function PanelContent({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "-mx-4 flex flex-col gap-2 overflow-y-auto border-border/30 border-t px-4 pt-4 text-zinc-950", children });
}
function PanelFooter({ children }) {
  return /* @__PURE__ */ jsx("footer", { className: "flex flex-row items-end justify-end gap-2 text-sm text-zinc-600", children });
}
export {
  ConfigProvider as C,
  HotkeyActions as H,
  PluginProvider as P,
  SRPCBridgeProvider as S,
  VSCodeProvider as V,
  useSRPCBridge as a,
  usePlugins as b,
  cn as c,
  Panel as d,
  PanelHeader as e,
  PanelContent as f,
  generateId as g,
  hotkeyActionDefinitions as h,
  getElementAtPoint as i,
  clsx as j,
  PanelFooter as k,
  useVSCode as u
};
`,"index.js":`import React, { createContext, useState, createRef, useEffect, useCallback, useContext, useMemo, useRef, useLayoutEffect, forwardRef, Fragment, isValidElement, cloneElement, createElement, useId, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { jsx, jsxs, Fragment as Fragment$1 } from "react/jsx-runtime";
import { u as useVSCode, a as useSRPCBridge, g as generateId, b as usePlugins, C as ConfigProvider, V as VSCodeProvider, S as SRPCBridgeProvider, P as PluginProvider, H as HotkeyActions, h as hotkeyActionDefinitions, c as cn, d as Panel, e as PanelHeader, f as PanelContent, i as getElementAtPoint } from "panel-C1evgHYw.js";
import config from "@stagewise/toolbar/config";
const appStyle = '/*! tailwindcss v4.1.11 | MIT License | https://tailwindcss.com */@layer properties{@supports ((-webkit-hyphens:none) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-scale-x:1;--tw-scale-y:1;--tw-scale-z:1;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-y-reverse:0;--tw-border-style:solid;--tw-gradient-position:initial;--tw-gradient-from:#0000;--tw-gradient-via:#0000;--tw-gradient-to:#0000;--tw-gradient-stops:initial;--tw-gradient-via-stops:initial;--tw-gradient-from-position:0%;--tw-gradient-via-position:50%;--tw-gradient-to-position:100%;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-duration:initial;--tw-ease:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-red-100:oklch(93.6% .032 17.717);--color-red-200:oklch(88.5% .062 18.334);--color-red-500:oklch(63.7% .237 25.331);--color-red-600:oklch(57.7% .245 27.325);--color-red-700:oklch(50.5% .213 27.518);--color-orange-50:oklch(98% .016 73.684);--color-orange-100:oklch(95.4% .038 75.164);--color-orange-200:oklch(90.1% .076 70.697);--color-orange-300:oklch(83.7% .128 66.29);--color-orange-500:oklch(70.5% .213 47.604);--color-orange-600:oklch(64.6% .222 41.116);--color-orange-700:oklch(55.3% .195 38.402);--color-orange-800:oklch(47% .157 37.304);--color-amber-50:oklch(98.7% .022 95.277);--color-amber-800:oklch(47.3% .137 46.201);--color-yellow-500:oklch(79.5% .184 86.047);--color-green-500:oklch(72.3% .219 149.579);--color-green-600:oklch(62.7% .194 149.214);--color-teal-500:oklch(70.4% .14 182.503);--color-sky-600:oklch(58.8% .158 241.966);--color-sky-700:oklch(50% .134 242.749);--color-blue-50:oklch(97% .014 254.604);--color-blue-100:oklch(93.2% .032 255.585);--color-blue-200:oklch(88.2% .059 254.128);--color-blue-300:oklch(80.9% .105 251.813);--color-blue-500:oklch(62.3% .214 259.815);--color-blue-600:oklch(54.6% .245 262.881);--color-blue-700:oklch(48.8% .243 264.376);--color-blue-800:oklch(42.4% .199 265.638);--color-indigo-700:oklch(45.7% .24 277.023);--color-indigo-950:oklch(25.7% .09 281.288);--color-violet-700:oklch(49.1% .27 292.581);--color-purple-500:oklch(62.7% .265 303.9);--color-fuchsia-700:oklch(51.8% .253 323.949);--color-pink-500:oklch(65.6% .241 354.308);--color-rose-600:oklch(58.6% .253 17.585);--color-zinc-50:oklch(98.5% 0 0);--color-zinc-100:oklch(96.7% .001 286.375);--color-zinc-300:oklch(87.1% .006 286.286);--color-zinc-400:oklch(70.5% .015 286.067);--color-zinc-500:oklch(55.2% .016 285.938);--color-zinc-600:oklch(44.2% .017 285.786);--color-zinc-700:oklch(37% .013 285.805);--color-zinc-900:oklch(21% .006 285.885);--color-zinc-950:oklch(14.1% .005 285.823);--color-black:#000;--color-white:#fff;--spacing:.25rem;--text-xs:.75rem;--text-xs--line-height:calc(1/.75);--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--text-base:1rem;--text-base--line-height: 1.5 ;--text-lg:1.125rem;--text-lg--line-height:calc(1.75/1.125);--font-weight-normal:400;--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--radius-md:.375rem;--radius-lg:.5rem;--radius-2xl:1rem;--radius-3xl:1.5rem;--drop-shadow-xs:0 1px 1px #0000000d;--drop-shadow-md:0 3px 3px #0000001f;--drop-shadow-xl:0 9px 7px #0000001a;--ease-out:cubic-bezier(0,0,.2,1);--animate-spin:spin 1s linear infinite;--animate-pulse:pulse 2s cubic-bezier(.4,0,.6,1)infinite;--blur-md:12px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono);--color-background:var(--color-white);--color-foreground:var(--color-zinc-950);--color-border:var(--color-zinc-500)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::-moz-placeholder{opacity:1}::placeholder{opacity:1}@supports (not (-webkit-appearance:-apple-pay-button)) or (contain-intrinsic-size:1px){::-moz-placeholder{color:currentColor}::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::-moz-placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{min-width:0;min-height:0;position:relative}body{all:initial;color:var(--color-zinc-950);letter-spacing:normal!important;font-family:Inter,Noto Color Emoji,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,SF Compact,SF Pro,Helvetica Neue,sans-serif!important;font-weight:400!important;line-height:normal!important}@supports (font-variation-settings:normal){body{font-optical-sizing:auto!important;font-family:InterVariable,Noto Color Emoji,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,SF Compact,SF Pro,Helvetica Neue,sans-serif!important}}}@layer components{.chat-loading-gradient{background:linear-gradient(#f8fafccc,#f8fafccc) padding-box padding-box,linear-gradient(45deg,#8b5cf6,#06b6d4,#8b5cf6) 0 0/400% 400% border-box;border:2px solid #0000;animation:2s infinite gradient-animation}.chat-success-border{animation:2s ease-out blink-green-fade}.chat-error-border{animation:1s ease-out blink-red-fade}@keyframes blink-green-fade{0%,50%{box-shadow:0 0 0 2px #22c55eb3}to{box-shadow:0 0 0 2px #22c55e00}}@keyframes blink-red-fade{0%,50%{box-shadow:0 0 0 2px #ef4444}to{box-shadow:0 0 0 2px #ef444400}}}@layer utilities{.pointer-events-auto{pointer-events:auto}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.inset-0{inset:calc(var(--spacing)*0)}.inset-4{inset:calc(var(--spacing)*4)}.top-0{top:calc(var(--spacing)*0)}.top-0\\\\.5{top:calc(var(--spacing)*.5)}.top-1\\\\/2{top:50%}.top-\\\\[-20\\\\%\\\\]{top:-20%}.top-\\\\[25\\\\%\\\\]{top:25%}.right-0{right:calc(var(--spacing)*0)}.right-1\\\\/2{right:50%}.right-\\\\[100\\\\%\\\\]{right:100%}.bottom-0{bottom:calc(var(--spacing)*0)}.bottom-1\\\\/2{bottom:50%}.bottom-3{bottom:calc(var(--spacing)*3)}.left-0{left:calc(var(--spacing)*0)}.left-0\\\\.5{left:calc(var(--spacing)*.5)}.left-1\\\\/2{left:50%}.left-3{left:calc(var(--spacing)*3)}.left-\\\\[-10\\\\%\\\\]{left:-10%}.left-\\\\[25\\\\%\\\\]{left:25%}.left-\\\\[100\\\\%\\\\]{left:100%}.z-20{z-index:20}.z-50{z-index:50}.container{width:100%}@media (min-width:40rem){.container{max-width:40rem}}@media (min-width:48rem){.container{max-width:48rem}}@media (min-width:64rem){.container{max-width:64rem}}@media (min-width:80rem){.container{max-width:80rem}}@media (min-width:96rem){.container{max-width:96rem}}.-mx-4{margin-inline:calc(var(--spacing)*-4)}.my-2{margin-block:calc(var(--spacing)*2)}.mt-1{margin-top:calc(var(--spacing)*1)}.mt-2{margin-top:calc(var(--spacing)*2)}.mb-2{margin-bottom:calc(var(--spacing)*2)}.mb-3{margin-bottom:calc(var(--spacing)*3)}.block{display:block}.contents{display:contents}.flex{display:flex}.hidden{display:none}.inline{display:inline}.aspect-square{aspect-ratio:1}.size-0{width:calc(var(--spacing)*0);height:calc(var(--spacing)*0)}.size-1\\\\.5{width:calc(var(--spacing)*1.5);height:calc(var(--spacing)*1.5)}.size-2\\\\/3{width:66.6667%;height:66.6667%}.size-3{width:calc(var(--spacing)*3);height:calc(var(--spacing)*3)}.size-4{width:calc(var(--spacing)*4);height:calc(var(--spacing)*4)}.size-4\\\\.5{width:calc(var(--spacing)*4.5);height:calc(var(--spacing)*4.5)}.size-5{width:calc(var(--spacing)*5);height:calc(var(--spacing)*5)}.size-6{width:calc(var(--spacing)*6);height:calc(var(--spacing)*6)}.size-8{width:calc(var(--spacing)*8);height:calc(var(--spacing)*8)}.size-9{width:calc(var(--spacing)*9);height:calc(var(--spacing)*9)}.size-9\\\\/12{width:75%;height:75%}.size-12{width:calc(var(--spacing)*12);height:calc(var(--spacing)*12)}.size-\\\\[120\\\\%\\\\]{width:120%;height:120%}.size-full{width:100%;height:100%}.h-0{height:calc(var(--spacing)*0)}.h-3{height:calc(var(--spacing)*3)}.h-5{height:calc(var(--spacing)*5)}.h-8{height:calc(var(--spacing)*8)}.h-9\\\\.5{height:calc(var(--spacing)*9.5)}.h-12{height:calc(var(--spacing)*12)}.h-16{height:calc(var(--spacing)*16)}.h-24{height:calc(var(--spacing)*24)}.h-\\\\[50\\\\%\\\\]{height:50%}.h-\\\\[120\\\\%\\\\]{height:120%}.h-\\\\[calc\\\\(100vh-32px\\\\)\\\\]{height:calc(100vh - 32px)}.h-\\\\[calc-size\\\\(auto\\\\)\\\\]{height:calc-size(auto)}.h-\\\\[calc-size\\\\(auto\\\\,size\\\\)\\\\]{height:calc-size(auto,size)}.h-auto{height:auto}.h-full{height:100%}.h-screen{height:100vh}.max-h-full{max-height:100%}.min-h-0{min-height:calc(var(--spacing)*0)}.min-h-48{min-height:calc(var(--spacing)*48)}.w-8{width:calc(var(--spacing)*8)}.w-9\\\\.5{width:calc(var(--spacing)*9.5)}.w-96{width:calc(var(--spacing)*96)}.w-\\\\[50\\\\%\\\\]{width:50%}.w-auto{width:auto}.w-fit{width:-moz-fit-content;width:fit-content}.w-full{width:100%}.w-max{width:-moz-max-content;width:max-content}.w-screen{width:100vw}.max-w-8{max-width:calc(var(--spacing)*8)}.max-w-90{max-width:calc(var(--spacing)*90)}.max-w-\\\\[40vw\\\\]{max-width:40vw}.max-w-full{max-width:100%}.min-w-0{min-width:calc(var(--spacing)*0)}.min-w-3{min-width:calc(var(--spacing)*3)}.min-w-24{min-width:calc(var(--spacing)*24)}.flex-1{flex:1}.flex-shrink-0,.shrink-0{flex-shrink:0}.origin-bottom{transform-origin:bottom}.origin-bottom-left{transform-origin:0 100%}.origin-bottom-right{transform-origin:100% 100%}.origin-center{transform-origin:50%}.origin-top{transform-origin:top}.origin-top-left{transform-origin:0 0}.origin-top-right{transform-origin:100% 0}.scale-25{--tw-scale-x:25%;--tw-scale-y:25%;--tw-scale-z:25%;scale:var(--tw-scale-x)var(--tw-scale-y)}.scale-50{--tw-scale-x:50%;--tw-scale-y:50%;--tw-scale-z:50%;scale:var(--tw-scale-x)var(--tw-scale-y)}.scale-100{--tw-scale-x:100%;--tw-scale-y:100%;--tw-scale-z:100%;scale:var(--tw-scale-x)var(--tw-scale-y)}.animate-pulse{animation:var(--animate-pulse)}.animate-spin{animation:var(--animate-spin)}.cursor-copy{cursor:copy}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.resize{resize:both}.resize-none{resize:none}.snap-start{scroll-snap-align:start}.list-inside{list-style-position:inside}.list-decimal{list-style-type:decimal}.flex-col{flex-direction:column}.flex-col-reverse{flex-direction:column-reverse}.flex-row{flex-direction:row}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.items-end{align-items:flex-end}.items-start{align-items:flex-start}.items-stretch{align-items:stretch}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.justify-start{justify-content:flex-start}.gap-0\\\\.5{gap:calc(var(--spacing)*.5)}.gap-1{gap:calc(var(--spacing)*1)}.gap-2{gap:calc(var(--spacing)*2)}.gap-3{gap:calc(var(--spacing)*3)}:where(.space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*1)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*1)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*2)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*2)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*3)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*3)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*4)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*4)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--spacing)*2)*var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--spacing)*2)*calc(1 - var(--tw-space-x-reverse)))}:where(.divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px*var(--tw-divide-y-reverse));border-bottom-width:calc(1px*calc(1 - var(--tw-divide-y-reverse)))}:where(.divide-y-reverse>:not(:last-child)){--tw-divide-y-reverse:1}:where(.divide-blue-200>:not(:last-child)){border-color:var(--color-blue-200)}:where(.divide-border\\\\/20>:not(:last-child)){border-color:#71717b33}@supports (color:color-mix(in lab,red,red)){:where(.divide-border\\\\/20>:not(:last-child)){border-color:color-mix(in oklab,var(--color-border)20%,transparent)}}:where(.divide-orange-200>:not(:last-child)){border-color:var(--color-orange-200)}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-hidden{overflow:hidden}.overflow-visible{overflow:visible}.overflow-y-auto{overflow-y:auto}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:var(--radius-2xl)}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.rounded-t-3xl{border-top-left-radius:var(--radius-3xl);border-top-right-radius:var(--radius-3xl)}.rounded-t-lg{border-top-left-radius:var(--radius-lg);border-top-right-radius:var(--radius-lg)}.rounded-b-3xl{border-bottom-right-radius:var(--radius-3xl);border-bottom-left-radius:var(--radius-3xl)}.rounded-b-lg{border-bottom-right-radius:var(--radius-lg);border-bottom-left-radius:var(--radius-lg)}.border{border-style:var(--tw-border-style);border-width:1px}.border-2{border-style:var(--tw-border-style);border-width:2px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-solid{--tw-border-style:solid;border-style:solid}.border-blue-200{border-color:var(--color-blue-200)}.border-blue-300{border-color:var(--color-blue-300)}.border-blue-500{border-color:var(--color-blue-500)}.border-blue-600\\\\/80{border-color:#155dfccc}@supports (color:color-mix(in lab,red,red)){.border-blue-600\\\\/80{border-color:color-mix(in oklab,var(--color-blue-600)80%,transparent)}}.border-border\\\\/30{border-color:#71717b4d}@supports (color:color-mix(in lab,red,red)){.border-border\\\\/30{border-color:color-mix(in oklab,var(--color-border)30%,transparent)}}.border-green-500{border-color:var(--color-green-500)}.border-green-600\\\\/80{border-color:#00a544cc}@supports (color:color-mix(in lab,red,red)){.border-green-600\\\\/80{border-color:color-mix(in oklab,var(--color-green-600)80%,transparent)}}.border-orange-200{border-color:var(--color-orange-200)}.border-orange-300{border-color:var(--color-orange-300)}.border-orange-500{border-color:var(--color-orange-500)}.border-pink-500{border-color:var(--color-pink-500)}.border-purple-500{border-color:var(--color-purple-500)}.border-red-200{border-color:var(--color-red-200)}.border-red-500{border-color:var(--color-red-500)}.border-transparent{border-color:#0000}.border-yellow-500{border-color:var(--color-yellow-500)}.border-zinc-300{border-color:var(--color-zinc-300)}.border-zinc-500{border-color:var(--color-zinc-500)}.bg-amber-50{background-color:var(--color-amber-50)}.bg-background\\\\/60{background-color:#fff9}@supports (color:color-mix(in lab,red,red)){.bg-background\\\\/60{background-color:color-mix(in oklab,var(--color-background)60%,transparent)}}.bg-blue-50{background-color:var(--color-blue-50)}.bg-blue-50\\\\/90{background-color:#eff6ffe6}@supports (color:color-mix(in lab,red,red)){.bg-blue-50\\\\/90{background-color:color-mix(in oklab,var(--color-blue-50)90%,transparent)}}.bg-blue-100\\\\/80{background-color:#dbeafecc}@supports (color:color-mix(in lab,red,red)){.bg-blue-100\\\\/80{background-color:color-mix(in oklab,var(--color-blue-100)80%,transparent)}}.bg-blue-500{background-color:var(--color-blue-500)}.bg-blue-600{background-color:var(--color-blue-600)}.bg-blue-600\\\\/20{background-color:#155dfc33}@supports (color:color-mix(in lab,red,red)){.bg-blue-600\\\\/20{background-color:color-mix(in oklab,var(--color-blue-600)20%,transparent)}}.bg-green-500{background-color:var(--color-green-500)}.bg-green-600\\\\/5{background-color:#00a5440d}@supports (color:color-mix(in lab,red,red)){.bg-green-600\\\\/5{background-color:color-mix(in oklab,var(--color-green-600)5%,transparent)}}.bg-orange-50\\\\/90{background-color:#fff7ede6}@supports (color:color-mix(in lab,red,red)){.bg-orange-50\\\\/90{background-color:color-mix(in oklab,var(--color-orange-50)90%,transparent)}}.bg-orange-100\\\\/80{background-color:#ffedd5cc}@supports (color:color-mix(in lab,red,red)){.bg-orange-100\\\\/80{background-color:color-mix(in oklab,var(--color-orange-100)80%,transparent)}}.bg-orange-500{background-color:var(--color-orange-500)}.bg-orange-600{background-color:var(--color-orange-600)}.bg-pink-500{background-color:var(--color-pink-500)}.bg-purple-500{background-color:var(--color-purple-500)}.bg-red-100{background-color:var(--color-red-100)}.bg-red-500{background-color:var(--color-red-500)}.bg-rose-600{background-color:var(--color-rose-600)}.bg-transparent{background-color:#0000}.bg-white{background-color:var(--color-white)}.bg-white\\\\/40{background-color:#fff6}@supports (color:color-mix(in lab,red,red)){.bg-white\\\\/40{background-color:color-mix(in oklab,var(--color-white)40%,transparent)}}.bg-white\\\\/80{background-color:#fffc}@supports (color:color-mix(in lab,red,red)){.bg-white\\\\/80{background-color:color-mix(in oklab,var(--color-white)80%,transparent)}}.bg-white\\\\/90{background-color:#ffffffe6}@supports (color:color-mix(in lab,red,red)){.bg-white\\\\/90{background-color:color-mix(in oklab,var(--color-white)90%,transparent)}}.bg-yellow-500{background-color:var(--color-yellow-500)}.bg-zinc-50\\\\/80{background-color:#fafafacc}@supports (color:color-mix(in lab,red,red)){.bg-zinc-50\\\\/80{background-color:color-mix(in oklab,var(--color-zinc-50)80%,transparent)}}.bg-zinc-300{background-color:var(--color-zinc-300)}.bg-zinc-500{background-color:var(--color-zinc-500)}.bg-zinc-500\\\\/10{background-color:#71717b1a}@supports (color:color-mix(in lab,red,red)){.bg-zinc-500\\\\/10{background-color:color-mix(in oklab,var(--color-zinc-500)10%,transparent)}}.bg-zinc-500\\\\/40{background-color:#71717b66}@supports (color:color-mix(in lab,red,red)){.bg-zinc-500\\\\/40{background-color:color-mix(in oklab,var(--color-zinc-500)40%,transparent)}}.bg-zinc-700\\\\/80{background-color:#3f3f46cc}@supports (color:color-mix(in lab,red,red)){.bg-zinc-700\\\\/80{background-color:color-mix(in oklab,var(--color-zinc-700)80%,transparent)}}.bg-gradient-to-tr{--tw-gradient-position:to top right in oklab;background-image:linear-gradient(var(--tw-gradient-stops))}.bg-\\\\[radial-gradient\\\\(circle\\\\,rgba\\\\(55\\\\,48\\\\,163\\\\,0\\\\)_55\\\\%\\\\,rgba\\\\(55\\\\,48\\\\,163\\\\,0\\\\.35\\\\)_73\\\\%\\\\)\\\\]{background-image:radial-gradient(circle,#3730a300 55%,#3730a359 73%)}.bg-\\\\[radial-gradient\\\\(circle\\\\,rgba\\\\(219\\\\,39\\\\,119\\\\,0\\\\.2\\\\)_0\\\\%\\\\,rgba\\\\(219\\\\,39\\\\,119\\\\,0\\\\)_100\\\\%\\\\)\\\\]{background-image:radial-gradient(circle,#db277733,#db277700)}.bg-\\\\[radial-gradient\\\\(circle\\\\,rgba\\\\(255\\\\,255\\\\,255\\\\,0\\\\)_60\\\\%\\\\,rgba\\\\(255\\\\,255\\\\,255\\\\,0\\\\.2\\\\)_70\\\\%\\\\)\\\\]{background-image:radial-gradient(circle,#fff0 60%,#fff3 70%)}.from-blue-600{--tw-gradient-from:var(--color-blue-600);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-indigo-700{--tw-gradient-from:var(--color-indigo-700);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-orange-600{--tw-gradient-from:var(--color-orange-600);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.from-sky-700{--tw-gradient-from:var(--color-sky-700);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.via-blue-500{--tw-gradient-via:var(--color-blue-500);--tw-gradient-via-stops:var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-via)var(--tw-gradient-via-position),var(--tw-gradient-to)var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-via-stops)}.to-fuchsia-700{--tw-gradient-to:var(--color-fuchsia-700);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-red-600{--tw-gradient-to:var(--color-red-600);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-sky-600{--tw-gradient-to:var(--color-sky-600);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.to-teal-500{--tw-gradient-to:var(--color-teal-500);--tw-gradient-stops:var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-gradient-from-position),var(--tw-gradient-to)var(--tw-gradient-to-position))}.fill-current{fill:currentColor}.fill-white{fill:var(--color-white)}.fill-zinc-500\\\\/50{fill:#71717b80}@supports (color:color-mix(in lab,red,red)){.fill-zinc-500\\\\/50{fill:color-mix(in oklab,var(--color-zinc-500)50%,transparent)}}.fill-zinc-950{fill:var(--color-zinc-950)}.stroke-black\\\\/30{stroke:#0000004d}@supports (color:color-mix(in lab,red,red)){.stroke-black\\\\/30{stroke:color-mix(in oklab,var(--color-black)30%,transparent)}}.stroke-none{stroke:none}.stroke-white{stroke:var(--color-white)}.stroke-zinc-950{stroke:var(--color-zinc-950)}.stroke-1{stroke-width:1px}.p-0\\\\.5{padding:calc(var(--spacing)*.5)}.p-1{padding:calc(var(--spacing)*1)}.p-2{padding:calc(var(--spacing)*2)}.p-3{padding:calc(var(--spacing)*3)}.p-4{padding:calc(var(--spacing)*4)}.px-0\\\\.5{padding-inline:calc(var(--spacing)*.5)}.px-1{padding-inline:calc(var(--spacing)*1)}.px-2{padding-inline:calc(var(--spacing)*2)}.px-3{padding-inline:calc(var(--spacing)*3)}.px-4{padding-inline:calc(var(--spacing)*4)}.py-0{padding-block:calc(var(--spacing)*0)}.py-0\\\\.5{padding-block:calc(var(--spacing)*.5)}.py-2{padding-block:calc(var(--spacing)*2)}.pt-2{padding-top:calc(var(--spacing)*2)}.pt-4{padding-top:calc(var(--spacing)*4)}.pr-6{padding-right:calc(var(--spacing)*6)}.pb-4{padding-bottom:calc(var(--spacing)*4)}.pl-2{padding-left:calc(var(--spacing)*2)}.text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\\\[0\\\\.5em\\\\]{font-size:.5em}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-normal{--tw-font-weight:var(--font-weight-normal);font-weight:var(--font-weight-normal)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.text-amber-800{color:var(--color-amber-800)}.text-blue-500{color:var(--color-blue-500)}.text-blue-600{color:var(--color-blue-600)}.text-blue-700{color:var(--color-blue-700)}.text-blue-800{color:var(--color-blue-800)}.text-foreground{color:var(--color-foreground)}.text-indigo-700{color:var(--color-indigo-700)}.text-orange-600{color:var(--color-orange-600)}.text-orange-700{color:var(--color-orange-700)}.text-orange-800{color:var(--color-orange-800)}.text-red-600{color:var(--color-red-600)}.text-red-700{color:var(--color-red-700)}.text-transparent{color:#0000}.text-violet-700{color:var(--color-violet-700)}.text-white{color:var(--color-white)}.text-zinc-500{color:var(--color-zinc-500)}.text-zinc-600{color:var(--color-zinc-600)}.text-zinc-700{color:var(--color-zinc-700)}.text-zinc-950{color:var(--color-zinc-950)}.opacity-0{opacity:0}.opacity-20{opacity:.2}.opacity-30{opacity:.3}.opacity-80{opacity:.8}.opacity-100{opacity:1}.shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a),0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a),0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-black\\\\/50{--tw-shadow-color:#00000080}@supports (color:color-mix(in lab,red,red)){.shadow-black\\\\/50{--tw-shadow-color:color-mix(in oklab,color-mix(in oklab,var(--color-black)50%,transparent)var(--tw-shadow-alpha),transparent)}}.ring-transparent{--tw-ring-color:transparent}.ring-zinc-950\\\\/20{--tw-ring-color:#09090b33}@supports (color:color-mix(in lab,red,red)){.ring-zinc-950\\\\/20{--tw-ring-color:color-mix(in oklab,var(--color-zinc-950)20%,transparent)}}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.blur-md{--tw-blur:blur(var(--blur-md));filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.blur-none{--tw-blur: ;filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.drop-shadow-md{--tw-drop-shadow-size:drop-shadow(0 3px 3px var(--tw-drop-shadow-color,#0000001f));--tw-drop-shadow:drop-shadow(var(--drop-shadow-md));filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.drop-shadow-xl{--tw-drop-shadow-size:drop-shadow(0 9px 7px var(--tw-drop-shadow-color,#0000001a));--tw-drop-shadow:drop-shadow(var(--drop-shadow-xl));filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.drop-shadow-xs{--tw-drop-shadow-size:drop-shadow(0 1px 1px var(--tw-drop-shadow-color,#0000000d));--tw-drop-shadow:drop-shadow(var(--drop-shadow-xs));filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.drop-shadow-black{--tw-drop-shadow-color:#000}@supports (color:color-mix(in lab,red,red)){.drop-shadow-black{--tw-drop-shadow-color:color-mix(in oklab,var(--color-black)var(--tw-drop-shadow-alpha),transparent)}}.drop-shadow-black{--tw-drop-shadow:var(--tw-drop-shadow-size)}.drop-shadow-indigo-950{--tw-drop-shadow-color:oklch(25.7% .09 281.288)}@supports (color:color-mix(in lab,red,red)){.drop-shadow-indigo-950{--tw-drop-shadow-color:color-mix(in oklab,var(--color-indigo-950)var(--tw-drop-shadow-alpha),transparent)}}.drop-shadow-indigo-950{--tw-drop-shadow:var(--tw-drop-shadow-size)}.backdrop-blur{--tw-backdrop-blur:blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.backdrop-blur-md{--tw-backdrop-blur:blur(var(--blur-md));-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.backdrop-saturate-150{--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,visibility,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.duration-0{--tw-duration:0s;transition-duration:0s}.duration-100{--tw-duration:.1s;transition-duration:.1s}.duration-150{--tw-duration:.15s;transition-duration:.15s}.duration-300{--tw-duration:.3s;transition-duration:.3s}.duration-500{--tw-duration:.5s;transition-duration:.5s}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.outline-none{--tw-outline-style:none;outline-style:none}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}:is(.\\\\*\\\\:size-full>*){width:100%;height:100%}.placeholder\\\\:text-zinc-400::-moz-placeholder{color:var(--color-zinc-400)}.placeholder\\\\:text-zinc-400::placeholder{color:var(--color-zinc-400)}.placeholder\\\\:text-zinc-950\\\\/50::-moz-placeholder{color:#09090b80}.placeholder\\\\:text-zinc-950\\\\/50::placeholder{color:#09090b80}@supports (color:color-mix(in lab,red,red)){.placeholder\\\\:text-zinc-950\\\\/50::-moz-placeholder{color:color-mix(in oklab,var(--color-zinc-950)50%,transparent)}.placeholder\\\\:text-zinc-950\\\\/50::placeholder{color:color-mix(in oklab,var(--color-zinc-950)50%,transparent)}}.placeholder\\\\:text-zinc-950\\\\/70::-moz-placeholder{color:#09090bb3}.placeholder\\\\:text-zinc-950\\\\/70::placeholder{color:#09090bb3}@supports (color:color-mix(in lab,red,red)){.placeholder\\\\:text-zinc-950\\\\/70::-moz-placeholder{color:color-mix(in oklab,var(--color-zinc-950)70%,transparent)}.placeholder\\\\:text-zinc-950\\\\/70::placeholder{color:color-mix(in oklab,var(--color-zinc-950)70%,transparent)}}@media (hover:hover){.hover\\\\:border-red-600\\\\/80:hover{border-color:#e40014cc}@supports (color:color-mix(in lab,red,red)){.hover\\\\:border-red-600\\\\/80:hover{border-color:color-mix(in oklab,var(--color-red-600)80%,transparent)}}.hover\\\\:bg-blue-200\\\\/80:hover{background-color:#bedbffcc}@supports (color:color-mix(in lab,red,red)){.hover\\\\:bg-blue-200\\\\/80:hover{background-color:color-mix(in oklab,var(--color-blue-200)80%,transparent)}}.hover\\\\:bg-orange-200:hover{background-color:var(--color-orange-200)}.hover\\\\:bg-orange-700:hover{background-color:var(--color-orange-700)}.hover\\\\:bg-red-600\\\\/20:hover{background-color:#e4001433}@supports (color:color-mix(in lab,red,red)){.hover\\\\:bg-red-600\\\\/20:hover{background-color:color-mix(in oklab,var(--color-red-600)20%,transparent)}}.hover\\\\:bg-zinc-500\\\\/20:hover{background-color:#71717b33}@supports (color:color-mix(in lab,red,red)){.hover\\\\:bg-zinc-500\\\\/20:hover{background-color:color-mix(in oklab,var(--color-zinc-500)20%,transparent)}}.hover\\\\:bg-zinc-950\\\\/5:hover{background-color:#09090b0d}@supports (color:color-mix(in lab,red,red)){.hover\\\\:bg-zinc-950\\\\/5:hover{background-color:color-mix(in oklab,var(--color-zinc-950)5%,transparent)}}.hover\\\\:bg-zinc-950\\\\/10:hover{background-color:#09090b1a}@supports (color:color-mix(in lab,red,red)){.hover\\\\:bg-zinc-950\\\\/10:hover{background-color:color-mix(in oklab,var(--color-zinc-950)10%,transparent)}}.hover\\\\:text-orange-800:hover{color:var(--color-orange-800)}.hover\\\\:text-white:hover{color:var(--color-white)}.hover\\\\:underline:hover{text-decoration-line:underline}.hover\\\\:opacity-100:hover{opacity:1}.hover\\\\:shadow-lg:hover{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a),0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}}.focus\\\\:border-blue-500:focus{border-color:var(--color-blue-500)}.focus\\\\:border-zinc-500:focus{border-color:var(--color-zinc-500)}.focus\\\\:text-zinc-900:focus{color:var(--color-zinc-900)}.focus\\\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.disabled\\\\:opacity-50:disabled{opacity:.5}.data-focus\\\\:outline-none[data-focus]{--tw-outline-style:none;outline-style:none}.animate-shake{animation:.5s ease-in-out 2 shake}}:root{color-scheme:normal;font-feature-settings:"liga" 1,"calt" 1;background-color:#0000}body{background-color:#0000}@keyframes shake{0%,to{transform:translate(0)}10%,30%,50%,70%,90%{transform:translate(-2px)}20%,40%,60%,80%{transform:translate(2px)}}@keyframes gradient-animation{0%{background-position:0%}50%{background-position:100%}to{background-position:0%}}#headlessui-portal-root{z-index:50;width:100vw;height:100vh;position:fixed}#headlessui-portal-root>*{pointer-events:auto}@property --tw-scale-x{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-y{syntax:"*";inherits:false;initial-value:1}@property --tw-scale-z{syntax:"*";inherits:false;initial-value:1}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-gradient-position{syntax:"*";inherits:false}@property --tw-gradient-from{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-via{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-to{syntax:"<color>";inherits:false;initial-value:#0000}@property --tw-gradient-stops{syntax:"*";inherits:false}@property --tw-gradient-via-stops{syntax:"*";inherits:false}@property --tw-gradient-from-position{syntax:"<length-percentage>";inherits:false;initial-value:0%}@property --tw-gradient-via-position{syntax:"<length-percentage>";inherits:false;initial-value:50%}@property --tw-gradient-to-position{syntax:"<length-percentage>";inherits:false;initial-value:100%}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}';
function getElementAttributes(element) {
  const attrs = {}, priorityAttrs = [
    "id",
    "class",
    "name",
    "type",
    "href",
    "src",
    "alt",
    "for",
    "placeholder"
  ], dataAttrs = [];
  for (let i2 = 0; i2 < element.attributes.length; i2++) {
    const attr = element.attributes[i2];
    attr.name.startsWith("data-") ? dataAttrs.push({ name: attr.name, value: attr.value }) : (priorityAttrs.includes(attr.name.toLowerCase()) || attr.name.toLowerCase() !== "style") && (attrs[attr.name] = attr.value);
  }
  return dataAttrs.forEach((da) => {
    attrs[da.name] = da.value;
  }), attrs;
}
function generateElementContext(element, index) {
  var _a;
  let context = \`<element index="\${index + 1}">
\`;
  context += \`  <tag>\${element.tagName.toLowerCase()}</tag>
\`;
  const id = element.id;
  id && (context += \`  <id>\${id}</id>
\`);
  const classes = Array.from(element.classList).join(", ");
  classes && (context += \`  <classes>\${classes}</classes>
\`);
  const attributes = getElementAttributes(element);
  if (Object.keys(attributes).length > 0) {
    context += \`  <attributes>
\`;
    for (const [key, value] of Object.entries(attributes))
      (key.toLowerCase() !== "class" || !classes) && (context += \`    <\${key}>\${value}</\${key}>
\`);
    context += \`  </attributes>
\`;
  }
  const text = (_a = element.innerText) == null ? void 0 : _a.trim();
  if (text && (context += \`  <text>\${text.length > 100 ? \`\${text.substring(0, 100)}...\` : text}</text>
\`), context += \`  <structural_context>
\`, element.parentElement) {
    const parent = element.parentElement;
    context += \`    <parent>
\`, context += \`      <tag>\${parent.tagName.toLowerCase()}</tag>
\`, parent.id && (context += \`      <id>\${parent.id}</id>
\`);
    const parentClasses = Array.from(parent.classList).join(", ");
    parentClasses && (context += \`      <classes>\${parentClasses}</classes>
\`), context += \`    </parent>
\`;
  } else
    context += \`    <parent>No parent element found (likely root or disconnected)</parent>
\`;
  context += \`  </structural_context>
\`;
  try {
    const styles = window.getComputedStyle(element), relevantStyles = {
      color: styles.color,
      backgroundColor: styles.backgroundColor,
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      display: styles.display
    };
    context += \`  <styles>
\`;
    for (const [key, value] of Object.entries(relevantStyles))
      context += \`    <\${key}>\${value}</\${key}>
\`;
    context += \`  </styles>
\`;
  } catch {
    context += \`  <styles>Could not retrieve computed styles</styles>
\`;
  }
  return context += \`</element>
\`, context;
}
function createPrompt(selectedElements, userPrompt, url, contextSnippets) {
  const pluginContext = contextSnippets.map(
    (snippet) => \`
      <plugin_contexts>
<\${snippet.pluginName}>
\${snippet.contextSnippets.map((snippet2) => \`    <\${snippet2.promptContextName}>\${snippet2.content}</\${snippet2.promptContextName}>\`).join(\`
\`)}
</\${snippet.pluginName}>
</plugin_contexts>
\`.trim()
  ).join(\`
\`);
  if (!selectedElements || selectedElements.length === 0)
    return \`
    <request>
      <user_goal>\${userPrompt}</user_goal>
      <url>\${url}</url>
  <context>No specific element was selected on the page. Please analyze the page code in general or ask for clarification.</context>
  \${pluginContext}
</request>\`.trim();
  let detailedContext = "";
  return selectedElements.forEach((element, index) => {
    detailedContext += generateElementContext(element, index);
  }), \`
<request>
  <user_goal>\${userPrompt}</user_goal>
  <url>\${url}</url>
  <selected_elements>
    \${detailedContext.trim()}
  </selected_elements>
  \${pluginContext}
</request>\`.trim();
}
const AppContext = createContext(null), STORAGE_KEY = "stgws:companion";
function loadStateFromStorage() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return console.error("Failed to load state from storage:", error), {};
  }
}
function saveStateToStorage(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save state to storage:", error);
  }
}
function AppStateProvider({ children }) {
  const [state, setState] = useState(() => {
    const storedState = loadStateFromStorage();
    return {
      appBlockRequestList: [],
      appUnblockRequestList: [],
      lastBlockRequestNumber: 0,
      lastUnblockRequestNumber: 0,
      isMainAppBlocked: !1,
      toolbarBoxRef: createRef(),
      minimized: storedState.minimized ?? !1,
      requestMainAppBlock: () => 0,
      // These will be replaced by the actual implementations
      requestMainAppUnblock: () => 0,
      discardMainAppBlock: () => {
      },
      discardMainAppUnblock: () => {
      },
      setToolbarBoxRef: () => {
      },
      unsetToolbarBoxRef: () => {
      },
      minimize: () => {
      },
      expand: () => {
      }
    };
  });
  useEffect(() => {
    saveStateToStorage({
      minimized: state.minimized
    });
  }, [state.minimized]);
  const requestMainAppBlock = useCallback(() => {
    let newHandleValue = 0;
    return setState((prev) => (newHandleValue = prev.lastBlockRequestNumber + 1, {
      ...prev,
      appBlockRequestList: [...prev.appBlockRequestList, newHandleValue],
      lastBlockRequestNumber: newHandleValue,
      isMainAppBlocked: prev.appUnblockRequestList.length === 0
    })), newHandleValue;
  }, []), requestMainAppUnblock = useCallback(() => {
    let newHandleValue = 0;
    return setState((prev) => (newHandleValue = prev.lastUnblockRequestNumber + 1, {
      ...prev,
      appUnblockRequestList: [...prev.appUnblockRequestList, newHandleValue],
      lastUnblockRequestNumber: newHandleValue,
      isMainAppBlocked: !1
    })), newHandleValue;
  }, []), discardMainAppBlock = useCallback((handle) => {
    setState((prev) => {
      const newBlockRequestList = prev.appBlockRequestList.filter(
        (h2) => h2 !== handle
      );
      return {
        ...prev,
        appBlockRequestList: newBlockRequestList,
        isMainAppBlocked: newBlockRequestList.length > 0 && prev.appUnblockRequestList.length === 0
      };
    });
  }, []), discardMainAppUnblock = useCallback((handle) => {
    setState((prev) => {
      const newUnblockRequestList = prev.appUnblockRequestList.filter(
        (h2) => h2 !== handle
      );
      return {
        ...prev,
        appUnblockRequestList: newUnblockRequestList,
        isMainAppBlocked: prev.appBlockRequestList.length > 0 && newUnblockRequestList.length === 0
      };
    });
  }, []), setToolbarBoxRef = useCallback((ref) => {
    setState((prev) => ({ ...prev, toolbarBoxRef: ref }));
  }, []), unsetToolbarBoxRef = useCallback(() => {
    setState((prev) => ({ ...prev, toolbarBoxRef: createRef() }));
  }, []), minimize = useCallback(() => {
    setState((prev) => ({ ...prev, minimized: !0 }));
  }, []), expand = useCallback(() => {
    setState((prev) => ({ ...prev, minimized: !1 }));
  }, []), value = {
    requestMainAppBlock,
    requestMainAppUnblock,
    discardMainAppBlock,
    discardMainAppUnblock,
    isMainAppBlocked: state.isMainAppBlocked,
    toolbarBoxRef: state.toolbarBoxRef,
    setToolbarBoxRef,
    unsetToolbarBoxRef,
    minimized: state.minimized,
    minimize,
    expand
  };
  return /* @__PURE__ */ jsx(AppContext.Provider, { value, children });
}
function useAppState() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppState must be used within an AppStateProvider");
  return context;
}
const ChatContext = createContext({
  chats: [],
  currentChatId: null,
  createChat: () => "",
  deleteChat: () => {
  },
  setCurrentChat: () => {
  },
  setChatInput: () => {
  },
  addChatDomContext: () => {
  },
  removeChatDomContext: () => {
  },
  addMessage: () => {
  },
  chatAreaState: "hidden",
  setChatAreaState: () => {
  },
  isPromptCreationActive: !1,
  startPromptCreation: () => {
  },
  stopPromptCreation: () => {
  },
  promptState: "idle",
  resetPromptState: () => {
  }
}), ChatStateProvider = ({ children }) => {
  const [chats, setChats] = useState([
    {
      id: "new_chat",
      messages: [],
      title: "New chat",
      inputValue: "",
      domContextElements: []
    }
  ]), [currentChatId, setCurrentChatId] = useState("new_chat"), [chatAreaState, internalSetChatAreaState] = useState("hidden"), [isPromptCreationMode, setIsPromptCreationMode] = useState(!1), [promptState, setPromptState] = useState("idle"), resetPromptState = useCallback(() => {
    setPromptState("idle");
  }, []), { minimized } = useAppState(), { selectedSession, setShouldPromptWindowSelection } = useVSCode();
  useEffect(() => {
    minimized && (setIsPromptCreationMode(!1), internalSetChatAreaState("hidden"));
  }, [minimized]);
  const { bridge } = useSRPCBridge(), createChat = useCallback(() => {
    const newChatId = generateId(), newChat = {
      id: newChatId,
      title: null,
      messages: [],
      inputValue: "",
      domContextElements: []
    };
    return setChats((prev) => [...prev, newChat]), setCurrentChatId(newChatId), newChatId;
  }, []), deleteChat = useCallback(
    (chatId) => {
      setChats((prev) => {
        const filteredChats = prev.filter((chat) => chat.id !== chatId);
        return filteredChats.length === 0 ? [
          {
            id: "new_chat",
            messages: [],
            title: "New chat",
            inputValue: "",
            domContextElements: []
          }
        ] : filteredChats;
      }), currentChatId === chatId && setChats((prev) => (setCurrentChatId(prev[0].id), prev));
    },
    [currentChatId]
  ), setCurrentChat = useCallback((chatId) => {
    setCurrentChatId(chatId);
  }, []), setChatInput = useCallback((chatId, value2) => {
    setChats(
      (prev) => prev.map(
        (chat) => chat.id === chatId ? { ...chat, inputValue: value2 } : chat
      )
    );
  }, []), { plugins } = usePlugins(), startPromptCreation = useCallback(() => {
    setIsPromptCreationMode(!0), chatAreaState === "hidden" && internalSetChatAreaState("compact"), plugins.forEach((plugin) => {
      var _a;
      (_a = plugin.onPromptingStart) == null || _a.call(plugin);
    });
  }, [chatAreaState]), stopPromptCreation = useCallback(() => {
    setIsPromptCreationMode(!1), setPromptState("idle"), setChats(
      (prev) => prev.map(
        (chat) => chat.id === currentChatId ? { ...chat, domContextElements: [] } : chat
      )
    ), chatAreaState === "compact" && internalSetChatAreaState("hidden"), plugins.forEach((plugin) => {
      var _a;
      (_a = plugin.onPromptingAbort) == null || _a.call(plugin);
    });
  }, [currentChatId, chatAreaState]), setChatAreaState = useCallback(
    (state) => {
      internalSetChatAreaState(state), state === "hidden" && stopPromptCreation();
    },
    [internalSetChatAreaState, stopPromptCreation]
  ), addChatDomContext = useCallback(
    (chatId, element) => {
      const pluginsWithContextGetters = plugins.filter(
        (plugin) => plugin.onContextElementSelect
      );
      setChats(
        (prev) => prev.map((chat) => chat.id === chatId ? {
          ...chat,
          domContextElements: [
            ...chat.domContextElements,
            {
              element,
              pluginContext: pluginsWithContextGetters.map((plugin) => {
                var _a;
                return {
                  pluginName: plugin.pluginName,
                  context: (_a = plugin.onContextElementSelect) == null ? void 0 : _a.call(plugin, element)
                };
              })
            }
          ]
        } : chat)
      );
    },
    [plugins]
  ), removeChatDomContext = useCallback(
    (chatId, element) => {
      setChats(
        (prev) => prev.map(
          (chat) => chat.id === chatId ? {
            ...chat,
            domContextElements: chat.domContextElements.filter(
              (e2) => e2.element !== element
            )
          } : chat
        )
      );
    },
    []
  ), addMessage = useCallback(
    async (chatId, content, pluginTriggered = !1) => {
      if (!content.trim() || promptState === "loading") return;
      const chat = chats.find((chat2) => chat2.id === chatId);
      setPromptState("loading");
      const pluginContextSnippets = [], pluginProcessingPromises = plugins.map(async (plugin) => {
        var _a;
        const userMessagePayload = {
          id: generateId(),
          text: content,
          contextElements: (chat == null ? void 0 : chat.domContextElements.map((el) => el.element)) || [],
          sentByPlugin: pluginTriggered
        }, handlerResult = await ((_a = plugin.onPromptSend) == null ? void 0 : _a.call(plugin, userMessagePayload));
        if (!handlerResult || !handlerResult.contextSnippets || handlerResult.contextSnippets.length === 0)
          return null;
        const snippetPromises = handlerResult.contextSnippets.map(
          async (snippet) => {
            const resolvedContent = typeof snippet.content == "string" ? snippet.content : await snippet.content();
            return {
              promptContextName: snippet.promptContextName,
              content: resolvedContent
            };
          }
        ), resolvedSnippets = await Promise.all(snippetPromises);
        return resolvedSnippets.length > 0 ? {
          pluginName: plugin.pluginName,
          contextSnippets: resolvedSnippets
        } : null;
      });
      (await Promise.all(pluginProcessingPromises)).forEach((pluginCtx) => {
        pluginCtx && pluginContextSnippets.push(pluginCtx);
      });
      const prompt = createPrompt(
        chat == null ? void 0 : chat.domContextElements.map((e2) => e2.element),
        content,
        window.parent.location.href,
        pluginContextSnippets
      ), newMessage = {
        id: generateId(),
        content: content.trim(),
        sender: "user",
        type: "regular",
        timestamp: /* @__PURE__ */ new Date()
      };
      async function triggerAgentPrompt() {
        if (bridge)
          try {
            const result = await bridge.call.triggerAgentPrompt(
              {
                prompt,
                sessionId: selectedSession == null ? void 0 : selectedSession.sessionId
              },
              { onUpdate: (_update) => {
              } }
            );
            result.result.success ? (setTimeout(() => {
              setPromptState("success");
            }, 1e3), setChats(
              (prev) => prev.map(
                (chat2) => chat2.id === chatId ? { ...chat2, inputValue: "" } : chat2
              )
            )) : (result.result.errorCode && result.result.errorCode === "session_mismatch" && setShouldPromptWindowSelection(!0), setPromptState("error"), setTimeout(() => {
              setPromptState("idle"), setIsPromptCreationMode(!1), setChats(
                (prev) => prev.map(
                  (chat2) => chat2.id === chatId ? { ...chat2, inputValue: "" } : chat2
                )
              );
            }, 300));
          } catch {
            setPromptState("error"), setTimeout(() => {
              setPromptState("idle"), setIsPromptCreationMode(!1), setChats(
                (prev) => prev.map(
                  (chat2) => chat2.id === chatId ? { ...chat2, inputValue: "" } : chat2
                )
              );
            }, 300);
          }
        else
          setShouldPromptWindowSelection(!0), setPromptState("error"), setTimeout(() => {
            setPromptState("idle"), setIsPromptCreationMode(!1), setChats(
              (prev) => prev.map(
                (chat2) => chat2.id === chatId ? { ...chat2, inputValue: "" } : chat2
              )
            );
          }, 300);
      }
      triggerAgentPrompt(), chatAreaState === "hidden" && internalSetChatAreaState("compact"), setChats(
        (prev) => prev.map(
          (chat2) => chat2.id === chatId ? {
            ...chat2,
            messages: [...chat2.messages, newMessage],
            inputValue: content.trim(),
            // Keep the original prompt instead of clearing
            domContextElements: []
          } : chat2
        )
      );
    },
    [
      chatAreaState,
      bridge,
      chats,
      setIsPromptCreationMode,
      internalSetChatAreaState,
      selectedSession,
      promptState,
      setPromptState,
      plugins
    ]
  ), value = {
    chats,
    currentChatId,
    createChat,
    deleteChat,
    setCurrentChat,
    setChatInput,
    addMessage,
    chatAreaState,
    setChatAreaState,
    isPromptCreationActive: isPromptCreationMode,
    startPromptCreation,
    stopPromptCreation,
    addChatDomContext,
    removeChatDomContext,
    promptState,
    resetPromptState
  };
  return /* @__PURE__ */ jsx(ChatContext.Provider, { value, children });
};
function useChatState() {
  const context = useContext(ChatContext);
  if (!context)
    throw new Error("useChatState must be used within a ChatStateProvider");
  return context;
}
function ContextProviders({
  children,
  config: config2
}) {
  return /* @__PURE__ */ jsx(ConfigProvider, { config: config2, children: /* @__PURE__ */ jsx(VSCodeProvider, { children: /* @__PURE__ */ jsx(SRPCBridgeProvider, { children: /* @__PURE__ */ jsx(PluginProvider, { children: /* @__PURE__ */ jsx(ChatStateProvider, { children }) }) }) }) });
}
function useEventListener(eventName, handler, options, element = window) {
  useEffect(() => {
    if (!(typeof window > "u") && element)
      return element.addEventListener(eventName, handler, options), () => element.removeEventListener(eventName, handler, options);
  }, [eventName, handler, element, options]);
}
function HotkeyListener() {
  const { startPromptCreation, stopPromptCreation, isPromptCreationActive } = useChatState(), hotKeyHandlerMap = useMemo(
    () => ({
      // Functions that return true will prevent further propagation of the event.
      [HotkeyActions.CTRL_ALT_C]: () => isPromptCreationActive ? !1 : (startPromptCreation(), !0),
      [HotkeyActions.ESC]: () => isPromptCreationActive ? (stopPromptCreation(), !0) : !1
    }),
    [startPromptCreation, stopPromptCreation, isPromptCreationActive]
  ), hotKeyListener = useCallback(
    (ev) => {
      for (const [action, definition] of Object.entries(
        hotkeyActionDefinitions
      ))
        if (definition.isEventMatching(ev)) {
          hotKeyHandlerMap[action]() && (ev.preventDefault(), ev.stopPropagation());
          break;
        }
    },
    [hotKeyHandlerMap]
  );
  return useEventListener("keydown", hotKeyListener, {
    capture: !0
  }), null;
}
const $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c = typeof document < "u" ? React.useLayoutEffect : () => {
};
function $8ae05eaa5c114e9c$export$7f54fc3180508a52(fn) {
  const ref = useRef(null);
  return $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    ref.current = fn;
  }, [
    fn
  ]), useCallback((...args) => {
    const f2 = ref.current;
    return f2 == null ? void 0 : f2(...args);
  }, []);
}
const $431fbd86ca7dc216$export$b204af158042fbac = (el) => {
  var _el_ownerDocument;
  return (_el_ownerDocument = el == null ? void 0 : el.ownerDocument) !== null && _el_ownerDocument !== void 0 ? _el_ownerDocument : document;
}, $431fbd86ca7dc216$export$f21a1ffae260145a = (el) => el && "window" in el && el.window === el ? el : $431fbd86ca7dc216$export$b204af158042fbac(el).defaultView || window;
function $431fbd86ca7dc216$var$isNode(value) {
  return value !== null && typeof value == "object" && "nodeType" in value && typeof value.nodeType == "number";
}
function $431fbd86ca7dc216$export$af51f0f06c0f328a(node) {
  return $431fbd86ca7dc216$var$isNode(node) && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in node;
}
let $f4e2df6bd15f8569$var$_shadowDOM = !1;
function $f4e2df6bd15f8569$export$98658e8c59125e6a() {
  return $f4e2df6bd15f8569$var$_shadowDOM;
}
function $d4ee10de306f2510$export$4282f70798064fe0(node, otherNode) {
  if (!$f4e2df6bd15f8569$export$98658e8c59125e6a()) return otherNode && node ? node.contains(otherNode) : !1;
  if (!node || !otherNode) return !1;
  let currentNode = otherNode;
  for (; currentNode !== null; ) {
    if (currentNode === node) return !0;
    currentNode.tagName === "SLOT" && currentNode.assignedSlot ? currentNode = currentNode.assignedSlot.parentNode : $431fbd86ca7dc216$export$af51f0f06c0f328a(currentNode) ? currentNode = currentNode.host : currentNode = currentNode.parentNode;
  }
  return !1;
}
const $d4ee10de306f2510$export$cd4e5573fbe2b576 = (doc = document) => {
  var _activeElement_shadowRoot;
  if (!$f4e2df6bd15f8569$export$98658e8c59125e6a()) return doc.activeElement;
  let activeElement = doc.activeElement;
  for (; activeElement && "shadowRoot" in activeElement && (!((_activeElement_shadowRoot = activeElement.shadowRoot) === null || _activeElement_shadowRoot === void 0) && _activeElement_shadowRoot.activeElement); ) activeElement = activeElement.shadowRoot.activeElement;
  return activeElement;
};
function $d4ee10de306f2510$export$e58f029f0fbfdb29(event) {
  return $f4e2df6bd15f8569$export$98658e8c59125e6a() && event.target.shadowRoot && event.composedPath ? event.composedPath()[0] : event.target;
}
var define_process_env_default$2 = {};
function $c87311424ea30a05$var$testUserAgent(re) {
  var _window_navigator_userAgentData;
  return typeof window > "u" || window.navigator == null ? !1 : ((_window_navigator_userAgentData = window.navigator.userAgentData) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.brands.some((brand) => re.test(brand.brand))) || re.test(window.navigator.userAgent);
}
function $c87311424ea30a05$var$testPlatform(re) {
  var _window_navigator_userAgentData;
  return typeof window < "u" && window.navigator != null ? re.test(((_window_navigator_userAgentData = window.navigator.userAgentData) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.platform) || window.navigator.platform) : !1;
}
function $c87311424ea30a05$var$cached(fn) {
  if (define_process_env_default$2.NODE_ENV === "test") return fn;
  let res = null;
  return () => (res == null && (res = fn()), res);
}
const $c87311424ea30a05$export$9ac100e40613ea10 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testPlatform(/^Mac/i);
}), $c87311424ea30a05$export$a11b0059900ceec8 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testUserAgent(/Android/i);
});
function $03deb23ff14920c4$export$4eaf04e54aa8eed6() {
  let globalListeners = useRef(/* @__PURE__ */ new Map()), addGlobalListener = useCallback((eventTarget, type, listener, options) => {
    let fn = options != null && options.once ? (...args) => {
      globalListeners.current.delete(listener), listener(...args);
    } : listener;
    globalListeners.current.set(listener, {
      type,
      eventTarget,
      fn,
      options
    }), eventTarget.addEventListener(type, fn, options);
  }, []), removeGlobalListener = useCallback((eventTarget, type, listener, options) => {
    var _globalListeners_current_get;
    let fn = ((_globalListeners_current_get = globalListeners.current.get(listener)) === null || _globalListeners_current_get === void 0 ? void 0 : _globalListeners_current_get.fn) || listener;
    eventTarget.removeEventListener(type, fn, options), globalListeners.current.delete(listener);
  }, []), removeAllGlobalListeners = useCallback(() => {
    globalListeners.current.forEach((value, key) => {
      removeGlobalListener(value.eventTarget, value.type, key, value.options);
    });
  }, [
    removeGlobalListener
  ]);
  return useEffect(() => removeAllGlobalListeners, [
    removeAllGlobalListeners
  ]), {
    addGlobalListener,
    removeGlobalListener,
    removeAllGlobalListeners
  };
}
function $6a7db85432448f7f$export$60278871457622de(event) {
  return event.mozInputSource === 0 && event.isTrusted ? !0 : $c87311424ea30a05$export$a11b0059900ceec8() && event.pointerType ? event.type === "click" && event.buttons === 1 : event.detail === 0 && !event.pointerType;
}
function $8a9cb279dc87e130$export$525bc4921d56d4a(nativeEvent) {
  let event = nativeEvent;
  return event.nativeEvent = nativeEvent, event.isDefaultPrevented = () => event.defaultPrevented, event.isPropagationStopped = () => event.cancelBubble, event.persist = () => {
  }, event;
}
function $8a9cb279dc87e130$export$c2b7abe5d61ec696(event, target) {
  Object.defineProperty(event, "target", {
    value: target
  }), Object.defineProperty(event, "currentTarget", {
    value: target
  });
}
function $8a9cb279dc87e130$export$715c682d09d639cc(onBlur) {
  let stateRef = useRef({
    isFocused: !1,
    observer: null
  });
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    const state = stateRef.current;
    return () => {
      state.observer && (state.observer.disconnect(), state.observer = null);
    };
  }, []);
  let dispatchBlur = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e2) => {
    onBlur == null || onBlur(e2);
  });
  return useCallback((e2) => {
    if (e2.target instanceof HTMLButtonElement || e2.target instanceof HTMLInputElement || e2.target instanceof HTMLTextAreaElement || e2.target instanceof HTMLSelectElement) {
      stateRef.current.isFocused = !0;
      let target = e2.target, onBlurHandler = (e3) => {
        if (stateRef.current.isFocused = !1, target.disabled) {
          let event = $8a9cb279dc87e130$export$525bc4921d56d4a(e3);
          dispatchBlur(event);
        }
        stateRef.current.observer && (stateRef.current.observer.disconnect(), stateRef.current.observer = null);
      };
      target.addEventListener("focusout", onBlurHandler, {
        once: !0
      }), stateRef.current.observer = new MutationObserver(() => {
        if (stateRef.current.isFocused && target.disabled) {
          var _stateRef_current_observer;
          (_stateRef_current_observer = stateRef.current.observer) === null || _stateRef_current_observer === void 0 || _stateRef_current_observer.disconnect();
          let relatedTargetEl = target === document.activeElement ? null : document.activeElement;
          target.dispatchEvent(new FocusEvent("blur", {
            relatedTarget: relatedTargetEl
          })), target.dispatchEvent(new FocusEvent("focusout", {
            bubbles: !0,
            relatedTarget: relatedTargetEl
          }));
        }
      }), stateRef.current.observer.observe(target, {
        attributes: !0,
        attributeFilter: [
          "disabled"
        ]
      });
    }
  }, [
    dispatchBlur
  ]);
}
let $8a9cb279dc87e130$export$fda7da73ab5d4c48 = !1;
var define_process_env_default$1 = {};
let $507fabe10e71c6fb$var$currentModality = null, $507fabe10e71c6fb$var$changeHandlers = /* @__PURE__ */ new Set(), $507fabe10e71c6fb$export$d90243b58daecda7 = /* @__PURE__ */ new Map(), $507fabe10e71c6fb$var$hasEventBeforeFocus = !1, $507fabe10e71c6fb$var$hasBlurredWindowRecently = !1;
const $507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS = {
  Tab: !0,
  Escape: !0
};
function $507fabe10e71c6fb$var$triggerChangeHandlers(modality, e2) {
  for (let handler of $507fabe10e71c6fb$var$changeHandlers) handler(modality, e2);
}
function $507fabe10e71c6fb$var$isValidKey(e2) {
  return !(e2.metaKey || !$c87311424ea30a05$export$9ac100e40613ea10() && e2.altKey || e2.ctrlKey || e2.key === "Control" || e2.key === "Shift" || e2.key === "Meta");
}
function $507fabe10e71c6fb$var$handleKeyboardEvent(e2) {
  $507fabe10e71c6fb$var$hasEventBeforeFocus = !0, $507fabe10e71c6fb$var$isValidKey(e2) && ($507fabe10e71c6fb$var$currentModality = "keyboard", $507fabe10e71c6fb$var$triggerChangeHandlers("keyboard", e2));
}
function $507fabe10e71c6fb$var$handlePointerEvent(e2) {
  $507fabe10e71c6fb$var$currentModality = "pointer", (e2.type === "mousedown" || e2.type === "pointerdown") && ($507fabe10e71c6fb$var$hasEventBeforeFocus = !0, $507fabe10e71c6fb$var$triggerChangeHandlers("pointer", e2));
}
function $507fabe10e71c6fb$var$handleClickEvent(e2) {
  $6a7db85432448f7f$export$60278871457622de(e2) && ($507fabe10e71c6fb$var$hasEventBeforeFocus = !0, $507fabe10e71c6fb$var$currentModality = "virtual");
}
function $507fabe10e71c6fb$var$handleFocusEvent(e2) {
  e2.target === window || e2.target === document || $8a9cb279dc87e130$export$fda7da73ab5d4c48 || !e2.isTrusted || (!$507fabe10e71c6fb$var$hasEventBeforeFocus && !$507fabe10e71c6fb$var$hasBlurredWindowRecently && ($507fabe10e71c6fb$var$currentModality = "virtual", $507fabe10e71c6fb$var$triggerChangeHandlers("virtual", e2)), $507fabe10e71c6fb$var$hasEventBeforeFocus = !1, $507fabe10e71c6fb$var$hasBlurredWindowRecently = !1);
}
function $507fabe10e71c6fb$var$handleWindowBlur() {
  $507fabe10e71c6fb$var$hasEventBeforeFocus = !1, $507fabe10e71c6fb$var$hasBlurredWindowRecently = !0;
}
function $507fabe10e71c6fb$var$setupGlobalFocusEvents(element) {
  if (typeof window > "u" || $507fabe10e71c6fb$export$d90243b58daecda7.get($431fbd86ca7dc216$export$f21a1ffae260145a(element))) return;
  const windowObject = $431fbd86ca7dc216$export$f21a1ffae260145a(element), documentObject = $431fbd86ca7dc216$export$b204af158042fbac(element);
  let focus = windowObject.HTMLElement.prototype.focus;
  windowObject.HTMLElement.prototype.focus = function() {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = !0, focus.apply(this, arguments);
  }, documentObject.addEventListener("keydown", $507fabe10e71c6fb$var$handleKeyboardEvent, !0), documentObject.addEventListener("keyup", $507fabe10e71c6fb$var$handleKeyboardEvent, !0), documentObject.addEventListener("click", $507fabe10e71c6fb$var$handleClickEvent, !0), windowObject.addEventListener("focus", $507fabe10e71c6fb$var$handleFocusEvent, !0), windowObject.addEventListener("blur", $507fabe10e71c6fb$var$handleWindowBlur, !1), typeof PointerEvent < "u" ? (documentObject.addEventListener("pointerdown", $507fabe10e71c6fb$var$handlePointerEvent, !0), documentObject.addEventListener("pointermove", $507fabe10e71c6fb$var$handlePointerEvent, !0), documentObject.addEventListener("pointerup", $507fabe10e71c6fb$var$handlePointerEvent, !0)) : define_process_env_default$1.NODE_ENV === "test" && (documentObject.addEventListener("mousedown", $507fabe10e71c6fb$var$handlePointerEvent, !0), documentObject.addEventListener("mousemove", $507fabe10e71c6fb$var$handlePointerEvent, !0), documentObject.addEventListener("mouseup", $507fabe10e71c6fb$var$handlePointerEvent, !0)), windowObject.addEventListener("beforeunload", () => {
    $507fabe10e71c6fb$var$tearDownWindowFocusTracking(element);
  }, {
    once: !0
  }), $507fabe10e71c6fb$export$d90243b58daecda7.set(windowObject, {
    focus
  });
}
const $507fabe10e71c6fb$var$tearDownWindowFocusTracking = (element, loadListener) => {
  const windowObject = $431fbd86ca7dc216$export$f21a1ffae260145a(element), documentObject = $431fbd86ca7dc216$export$b204af158042fbac(element);
  loadListener && documentObject.removeEventListener("DOMContentLoaded", loadListener), $507fabe10e71c6fb$export$d90243b58daecda7.has(windowObject) && (windowObject.HTMLElement.prototype.focus = $507fabe10e71c6fb$export$d90243b58daecda7.get(windowObject).focus, documentObject.removeEventListener("keydown", $507fabe10e71c6fb$var$handleKeyboardEvent, !0), documentObject.removeEventListener("keyup", $507fabe10e71c6fb$var$handleKeyboardEvent, !0), documentObject.removeEventListener("click", $507fabe10e71c6fb$var$handleClickEvent, !0), windowObject.removeEventListener("focus", $507fabe10e71c6fb$var$handleFocusEvent, !0), windowObject.removeEventListener("blur", $507fabe10e71c6fb$var$handleWindowBlur, !1), typeof PointerEvent < "u" ? (documentObject.removeEventListener("pointerdown", $507fabe10e71c6fb$var$handlePointerEvent, !0), documentObject.removeEventListener("pointermove", $507fabe10e71c6fb$var$handlePointerEvent, !0), documentObject.removeEventListener("pointerup", $507fabe10e71c6fb$var$handlePointerEvent, !0)) : define_process_env_default$1.NODE_ENV === "test" && (documentObject.removeEventListener("mousedown", $507fabe10e71c6fb$var$handlePointerEvent, !0), documentObject.removeEventListener("mousemove", $507fabe10e71c6fb$var$handlePointerEvent, !0), documentObject.removeEventListener("mouseup", $507fabe10e71c6fb$var$handlePointerEvent, !0)), $507fabe10e71c6fb$export$d90243b58daecda7.delete(windowObject));
};
function $507fabe10e71c6fb$export$2f1888112f558a7d(element) {
  const documentObject = $431fbd86ca7dc216$export$b204af158042fbac(element);
  let loadListener;
  return documentObject.readyState !== "loading" ? $507fabe10e71c6fb$var$setupGlobalFocusEvents(element) : (loadListener = () => {
    $507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
  }, documentObject.addEventListener("DOMContentLoaded", loadListener)), () => $507fabe10e71c6fb$var$tearDownWindowFocusTracking(element, loadListener);
}
typeof document < "u" && $507fabe10e71c6fb$export$2f1888112f558a7d();
function $507fabe10e71c6fb$export$b9b3dfddab17db27() {
  return $507fabe10e71c6fb$var$currentModality !== "pointer";
}
const $507fabe10e71c6fb$var$nonTextInputTypes = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
function $507fabe10e71c6fb$var$isKeyboardFocusEvent(isTextInput, modality, e2) {
  let document1 = $431fbd86ca7dc216$export$b204af158042fbac(e2 == null ? void 0 : e2.target);
  const IHTMLInputElement = typeof window < "u" ? $431fbd86ca7dc216$export$f21a1ffae260145a(e2 == null ? void 0 : e2.target).HTMLInputElement : HTMLInputElement, IHTMLTextAreaElement = typeof window < "u" ? $431fbd86ca7dc216$export$f21a1ffae260145a(e2 == null ? void 0 : e2.target).HTMLTextAreaElement : HTMLTextAreaElement, IHTMLElement = typeof window < "u" ? $431fbd86ca7dc216$export$f21a1ffae260145a(e2 == null ? void 0 : e2.target).HTMLElement : HTMLElement, IKeyboardEvent = typeof window < "u" ? $431fbd86ca7dc216$export$f21a1ffae260145a(e2 == null ? void 0 : e2.target).KeyboardEvent : KeyboardEvent;
  return isTextInput = isTextInput || document1.activeElement instanceof IHTMLInputElement && !$507fabe10e71c6fb$var$nonTextInputTypes.has(document1.activeElement.type) || document1.activeElement instanceof IHTMLTextAreaElement || document1.activeElement instanceof IHTMLElement && document1.activeElement.isContentEditable, !(isTextInput && modality === "keyboard" && e2 instanceof IKeyboardEvent && !$507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS[e2.key]);
}
function $507fabe10e71c6fb$export$ec71b4b83ac08ec3(fn, deps, opts) {
  $507fabe10e71c6fb$var$setupGlobalFocusEvents(), useEffect(() => {
    let handler = (modality, e2) => {
      $507fabe10e71c6fb$var$isKeyboardFocusEvent(!!(opts != null && opts.isTextInput), modality, e2) && fn($507fabe10e71c6fb$export$b9b3dfddab17db27());
    };
    return $507fabe10e71c6fb$var$changeHandlers.add(handler), () => {
      $507fabe10e71c6fb$var$changeHandlers.delete(handler);
    };
  }, deps);
}
function $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props) {
  let { isDisabled, onFocus: onFocusProp, onBlur: onBlurProp, onFocusChange } = props;
  const onBlur = useCallback((e2) => {
    if (e2.target === e2.currentTarget)
      return onBlurProp && onBlurProp(e2), onFocusChange && onFocusChange(!1), !0;
  }, [
    onBlurProp,
    onFocusChange
  ]), onSyntheticFocus = $8a9cb279dc87e130$export$715c682d09d639cc(onBlur), onFocus = useCallback((e2) => {
    const ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(e2.target), activeElement = ownerDocument ? $d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument) : $d4ee10de306f2510$export$cd4e5573fbe2b576();
    e2.target === e2.currentTarget && activeElement === $d4ee10de306f2510$export$e58f029f0fbfdb29(e2.nativeEvent) && (onFocusProp && onFocusProp(e2), onFocusChange && onFocusChange(!0), onSyntheticFocus(e2));
  }, [
    onFocusChange,
    onFocusProp,
    onSyntheticFocus
  ]);
  return {
    focusProps: {
      onFocus: !isDisabled && (onFocusProp || onFocusChange || onBlurProp) ? onFocus : void 0,
      onBlur: !isDisabled && (onBlurProp || onFocusChange) ? onBlur : void 0
    }
  };
}
function $9ab94262bd0047c7$export$420e68273165f4ec(props) {
  let { isDisabled, onBlurWithin, onFocusWithin, onFocusWithinChange } = props, state = useRef({
    isFocusWithin: !1
  }), { addGlobalListener, removeAllGlobalListeners } = $03deb23ff14920c4$export$4eaf04e54aa8eed6(), onBlur = useCallback((e2) => {
    e2.currentTarget.contains(e2.target) && state.current.isFocusWithin && !e2.currentTarget.contains(e2.relatedTarget) && (state.current.isFocusWithin = !1, removeAllGlobalListeners(), onBlurWithin && onBlurWithin(e2), onFocusWithinChange && onFocusWithinChange(!1));
  }, [
    onBlurWithin,
    onFocusWithinChange,
    state,
    removeAllGlobalListeners
  ]), onSyntheticFocus = $8a9cb279dc87e130$export$715c682d09d639cc(onBlur), onFocus = useCallback((e2) => {
    if (!e2.currentTarget.contains(e2.target)) return;
    const ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(e2.target), activeElement = $d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument);
    if (!state.current.isFocusWithin && activeElement === $d4ee10de306f2510$export$e58f029f0fbfdb29(e2.nativeEvent)) {
      onFocusWithin && onFocusWithin(e2), onFocusWithinChange && onFocusWithinChange(!0), state.current.isFocusWithin = !0, onSyntheticFocus(e2);
      let currentTarget = e2.currentTarget;
      addGlobalListener(ownerDocument, "focus", (e3) => {
        if (state.current.isFocusWithin && !$d4ee10de306f2510$export$4282f70798064fe0(currentTarget, e3.target)) {
          let nativeEvent = new ownerDocument.defaultView.FocusEvent("blur", {
            relatedTarget: e3.target
          });
          $8a9cb279dc87e130$export$c2b7abe5d61ec696(nativeEvent, currentTarget);
          let event = $8a9cb279dc87e130$export$525bc4921d56d4a(nativeEvent);
          onBlur(event);
        }
      }, {
        capture: !0
      });
    }
  }, [
    onFocusWithin,
    onFocusWithinChange,
    onSyntheticFocus,
    addGlobalListener,
    onBlur
  ]);
  return isDisabled ? {
    focusWithinProps: {
      // These cannot be null, that would conflict in mergeProps
      onFocus: void 0,
      onBlur: void 0
    }
  } : {
    focusWithinProps: {
      onFocus,
      onBlur
    }
  };
}
var define_process_env_default = {};
let $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = !1, $6179b936705e76d3$var$hoverCount = 0;
function $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents() {
  $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = !0, setTimeout(() => {
    $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = !1;
  }, 50);
}
function $6179b936705e76d3$var$handleGlobalPointerEvent(e2) {
  e2.pointerType === "touch" && $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents();
}
function $6179b936705e76d3$var$setupGlobalTouchEvents() {
  if (!(typeof document > "u"))
    return typeof PointerEvent < "u" ? document.addEventListener("pointerup", $6179b936705e76d3$var$handleGlobalPointerEvent) : define_process_env_default.NODE_ENV === "test" && document.addEventListener("touchend", $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents), $6179b936705e76d3$var$hoverCount++, () => {
      $6179b936705e76d3$var$hoverCount--, !($6179b936705e76d3$var$hoverCount > 0) && (typeof PointerEvent < "u" ? document.removeEventListener("pointerup", $6179b936705e76d3$var$handleGlobalPointerEvent) : define_process_env_default.NODE_ENV === "test" && document.removeEventListener("touchend", $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents));
    };
}
function $6179b936705e76d3$export$ae780daf29e6d456(props) {
  let { onHoverStart, onHoverChange, onHoverEnd, isDisabled } = props, [isHovered, setHovered] = useState(!1), state = useRef({
    isHovered: !1,
    ignoreEmulatedMouseEvents: !1,
    pointerType: "",
    target: null
  }).current;
  useEffect($6179b936705e76d3$var$setupGlobalTouchEvents, []);
  let { addGlobalListener, removeAllGlobalListeners } = $03deb23ff14920c4$export$4eaf04e54aa8eed6(), { hoverProps, triggerHoverEnd } = useMemo(() => {
    let triggerHoverStart = (event, pointerType) => {
      if (state.pointerType = pointerType, isDisabled || pointerType === "touch" || state.isHovered || !event.currentTarget.contains(event.target)) return;
      state.isHovered = !0;
      let target = event.currentTarget;
      state.target = target, addGlobalListener($431fbd86ca7dc216$export$b204af158042fbac(event.target), "pointerover", (e2) => {
        state.isHovered && state.target && !$d4ee10de306f2510$export$4282f70798064fe0(state.target, e2.target) && triggerHoverEnd2(e2, e2.pointerType);
      }, {
        capture: !0
      }), onHoverStart && onHoverStart({
        type: "hoverstart",
        target,
        pointerType
      }), onHoverChange && onHoverChange(!0), setHovered(!0);
    }, triggerHoverEnd2 = (event, pointerType) => {
      let target = state.target;
      state.pointerType = "", state.target = null, !(pointerType === "touch" || !state.isHovered || !target) && (state.isHovered = !1, removeAllGlobalListeners(), onHoverEnd && onHoverEnd({
        type: "hoverend",
        target,
        pointerType
      }), onHoverChange && onHoverChange(!1), setHovered(!1));
    }, hoverProps2 = {};
    return typeof PointerEvent < "u" ? (hoverProps2.onPointerEnter = (e2) => {
      $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents && e2.pointerType === "mouse" || triggerHoverStart(e2, e2.pointerType);
    }, hoverProps2.onPointerLeave = (e2) => {
      !isDisabled && e2.currentTarget.contains(e2.target) && triggerHoverEnd2(e2, e2.pointerType);
    }) : define_process_env_default.NODE_ENV === "test" && (hoverProps2.onTouchStart = () => {
      state.ignoreEmulatedMouseEvents = !0;
    }, hoverProps2.onMouseEnter = (e2) => {
      !state.ignoreEmulatedMouseEvents && !$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents && triggerHoverStart(e2, "mouse"), state.ignoreEmulatedMouseEvents = !1;
    }, hoverProps2.onMouseLeave = (e2) => {
      !isDisabled && e2.currentTarget.contains(e2.target) && triggerHoverEnd2(e2, "mouse");
    }), {
      hoverProps: hoverProps2,
      triggerHoverEnd: triggerHoverEnd2
    };
  }, [
    onHoverStart,
    onHoverChange,
    onHoverEnd,
    isDisabled,
    state,
    addGlobalListener,
    removeAllGlobalListeners
  ]);
  return useEffect(() => {
    isDisabled && triggerHoverEnd({
      currentTarget: state.target
    }, state.pointerType);
  }, [
    isDisabled
  ]), {
    hoverProps,
    isHovered
  };
}
function $f7dceffc5ad7768b$export$4e328f61c538687f(props = {}) {
  let { autoFocus = !1, isTextInput, within } = props, state = useRef({
    isFocused: !1,
    isFocusVisible: autoFocus || $507fabe10e71c6fb$export$b9b3dfddab17db27()
  }), [isFocused, setFocused] = useState(!1), [isFocusVisibleState, setFocusVisible] = useState(() => state.current.isFocused && state.current.isFocusVisible), updateState = useCallback(() => setFocusVisible(state.current.isFocused && state.current.isFocusVisible), []), onFocusChange = useCallback((isFocused2) => {
    state.current.isFocused = isFocused2, setFocused(isFocused2), updateState();
  }, [
    updateState
  ]);
  $507fabe10e71c6fb$export$ec71b4b83ac08ec3((isFocusVisible) => {
    state.current.isFocusVisible = isFocusVisible, updateState();
  }, [], {
    isTextInput
  });
  let { focusProps } = $a1ea59d68270f0dd$export$f8168d8dd8fd66e6({
    isDisabled: within,
    onFocusChange
  }), { focusWithinProps } = $9ab94262bd0047c7$export$420e68273165f4ec({
    isDisabled: !within,
    onFocusWithinChange: onFocusChange
  });
  return {
    isFocused,
    isFocusVisible: isFocusVisibleState,
    focusProps: within ? focusWithinProps : focusProps
  };
}
var i = Object.defineProperty, d = (t2, e2, n2) => e2 in t2 ? i(t2, e2, { enumerable: !0, configurable: !0, writable: !0, value: n2 }) : t2[e2] = n2, r = (t2, e2, n2) => (d(t2, typeof e2 != "symbol" ? e2 + "" : e2, n2), n2);
let o$3 = class {
  constructor() {
    r(this, "current", this.detect()), r(this, "handoffState", "pending"), r(this, "currentId", 0);
  }
  set(e2) {
    this.current !== e2 && (this.handoffState = "pending", this.currentId = 0, this.current = e2);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
}, s$1 = new o$3();
function o$2(n2) {
  var e2, r2;
  return s$1.isServer ? null : n2 ? "ownerDocument" in n2 ? n2.ownerDocument : "current" in n2 ? (r2 = (e2 = n2.current) == null ? void 0 : e2.ownerDocument) != null ? r2 : document : null : document;
}
function t$1(e2) {
  typeof queueMicrotask == "function" ? queueMicrotask(e2) : Promise.resolve().then(e2).catch((o3) => setTimeout(() => {
    throw o3;
  }));
}
function o$1() {
  let n2 = [], r2 = { addEventListener(e2, t2, s2, a2) {
    return e2.addEventListener(t2, s2, a2), r2.add(() => e2.removeEventListener(t2, s2, a2));
  }, requestAnimationFrame(...e2) {
    let t2 = requestAnimationFrame(...e2);
    return r2.add(() => cancelAnimationFrame(t2));
  }, nextFrame(...e2) {
    return r2.requestAnimationFrame(() => r2.requestAnimationFrame(...e2));
  }, setTimeout(...e2) {
    let t2 = setTimeout(...e2);
    return r2.add(() => clearTimeout(t2));
  }, microTask(...e2) {
    let t2 = { current: !0 };
    return t$1(() => {
      t2.current && e2[0]();
    }), r2.add(() => {
      t2.current = !1;
    });
  }, style(e2, t2, s2) {
    let a2 = e2.style.getPropertyValue(t2);
    return Object.assign(e2.style, { [t2]: s2 }), this.add(() => {
      Object.assign(e2.style, { [t2]: a2 });
    });
  }, group(e2) {
    let t2 = o$1();
    return e2(t2), this.add(() => t2.dispose());
  }, add(e2) {
    return n2.includes(e2) || n2.push(e2), () => {
      let t2 = n2.indexOf(e2);
      if (t2 >= 0) for (let s2 of n2.splice(t2, 1)) s2();
    };
  }, dispose() {
    for (let e2 of n2.splice(0)) e2();
  } };
  return r2;
}
function p() {
  let [e2] = useState(o$1);
  return useEffect(() => () => e2.dispose(), [e2]), e2;
}
let n = (e2, t2) => {
  s$1.isServer ? useEffect(e2, t2) : useLayoutEffect(e2, t2);
};
function s(e2) {
  let r2 = useRef(e2);
  return n(() => {
    r2.current = e2;
  }, [e2]), r2;
}
let o2 = function(t2) {
  let e2 = s(t2);
  return React.useCallback((...r2) => e2.current(...r2), [e2]);
};
function E(e2) {
  let t2 = e2.width / 2, n2 = e2.height / 2;
  return { top: e2.clientY - n2, right: e2.clientX + t2, bottom: e2.clientY + n2, left: e2.clientX - t2 };
}
function P$2(e2, t2) {
  return !(!e2 || !t2 || e2.right < t2.left || e2.left > t2.right || e2.bottom < t2.top || e2.top > t2.bottom);
}
function w({ disabled: e2 = !1 } = {}) {
  let t2 = useRef(null), [n2, l] = useState(!1), r2 = p(), o$12 = o2(() => {
    t2.current = null, l(!1), r2.dispose();
  }), f2 = o2((s2) => {
    if (r2.dispose(), t2.current === null) {
      t2.current = s2.currentTarget, l(!0);
      {
        let i2 = o$2(s2.currentTarget);
        r2.addEventListener(i2, "pointerup", o$12, !1), r2.addEventListener(i2, "pointermove", (c2) => {
          if (t2.current) {
            let p2 = E(c2);
            l(P$2(p2, t2.current.getBoundingClientRect()));
          }
        }, !1), r2.addEventListener(i2, "pointercancel", o$12, !1);
      }
    }
  });
  return { pressed: n2, pressProps: e2 ? {} : { onPointerDown: f2, onPointerUp: o$12, onClick: o$12 } };
}
let e$1 = createContext(void 0);
function a$1() {
  return useContext(e$1);
}
function t(...r2) {
  return Array.from(new Set(r2.flatMap((n2) => typeof n2 == "string" ? n2.split(" ") : []))).filter(Boolean).join(" ");
}
function u$2(r2, n2, ...a2) {
  if (r2 in n2) {
    let e2 = n2[r2];
    return typeof e2 == "function" ? e2(...a2) : e2;
  }
  let t2 = new Error(\`Tried to handle "\${r2}" but there is no handler defined. Only defined handlers are: \${Object.keys(n2).map((e2) => \`"\${e2}"\`).join(", ")}.\`);
  throw Error.captureStackTrace && Error.captureStackTrace(t2, u$2), t2;
}
var O = ((a2) => (a2[a2.None = 0] = "None", a2[a2.RenderStrategy = 1] = "RenderStrategy", a2[a2.Static = 2] = "Static", a2))(O || {}), A = ((e2) => (e2[e2.Unmount = 0] = "Unmount", e2[e2.Hidden = 1] = "Hidden", e2))(A || {});
function L$1() {
  let n2 = U$2();
  return useCallback((r2) => C$1({ mergeRefs: n2, ...r2 }), [n2]);
}
function C$1({ ourProps: n2, theirProps: r2, slot: e2, defaultTag: a2, features: s2, visible: t2 = !0, name: l, mergeRefs: i2 }) {
  i2 = i2 ?? $;
  let o3 = P$1(r2, n2);
  if (t2) return F(o3, e2, a2, l, i2);
  let y2 = s2 ?? 0;
  if (y2 & 2) {
    let { static: f2 = !1, ...u2 } = o3;
    if (f2) return F(u2, e2, a2, l, i2);
  }
  if (y2 & 1) {
    let { unmount: f2 = !0, ...u2 } = o3;
    return u$2(f2 ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return F({ ...u2, hidden: !0, style: { display: "none" } }, e2, a2, l, i2);
    } });
  }
  return F(o3, e2, a2, l, i2);
}
function F(n2, r2 = {}, e2, a2, s2) {
  let { as: t$12 = e2, children: l, refName: i2 = "ref", ...o3 } = h(n2, ["unmount", "static"]), y2 = n2.ref !== void 0 ? { [i2]: n2.ref } : {}, f2 = typeof l == "function" ? l(r2) : l;
  "className" in o3 && o3.className && typeof o3.className == "function" && (o3.className = o3.className(r2)), o3["aria-labelledby"] && o3["aria-labelledby"] === o3.id && (o3["aria-labelledby"] = void 0);
  let u2 = {};
  if (r2) {
    let d2 = !1, p2 = [];
    for (let [c2, T] of Object.entries(r2)) typeof T == "boolean" && (d2 = !0), T === !0 && p2.push(c2.replace(/([A-Z])/g, (g) => \`-\${g.toLowerCase()}\`));
    if (d2) {
      u2["data-headlessui-state"] = p2.join(" ");
      for (let c2 of p2) u2[\`data-\${c2}\`] = "";
    }
  }
  if (t$12 === Fragment && (Object.keys(m(o3)).length > 0 || Object.keys(m(u2)).length > 0)) if (!isValidElement(f2) || Array.isArray(f2) && f2.length > 1) {
    if (Object.keys(m(o3)).length > 0) throw new Error(['Passing props on "Fragment"!', "", \`The current component <\${a2} /> is rendering a "Fragment".\`, "However we need to passthrough the following props:", Object.keys(m(o3)).concat(Object.keys(m(u2))).map((d2) => \`  - \${d2}\`).join(\`
\`), "", "You can apply a few solutions:", ['Add an \`as="..."\` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((d2) => \`  - \${d2}\`).join(\`
\`)].join(\`
\`));
  } else {
    let d2 = f2.props, p2 = d2 == null ? void 0 : d2.className, c2 = typeof p2 == "function" ? (...R2) => t(p2(...R2), o3.className) : t(p2, o3.className), T = c2 ? { className: c2 } : {}, g = P$1(f2.props, m(h(o3, ["ref"])));
    for (let R2 in u2) R2 in g && delete u2[R2];
    return cloneElement(f2, Object.assign({}, g, u2, y2, { ref: s2(H$2(f2), y2.ref) }, T));
  }
  return createElement(t$12, Object.assign({}, h(o3, ["ref"]), t$12 !== Fragment && y2, t$12 !== Fragment && u2), f2);
}
function U$2() {
  let n2 = useRef([]), r2 = useCallback((e2) => {
    for (let a2 of n2.current) a2 != null && (typeof a2 == "function" ? a2(e2) : a2.current = e2);
  }, []);
  return (...e2) => {
    if (!e2.every((a2) => a2 == null)) return n2.current = e2, r2;
  };
}
function $(...n2) {
  return n2.every((r2) => r2 == null) ? void 0 : (r2) => {
    for (let e2 of n2) e2 != null && (typeof e2 == "function" ? e2(r2) : e2.current = r2);
  };
}
function P$1(...n2) {
  if (n2.length === 0) return {};
  if (n2.length === 1) return n2[0];
  let r2 = {}, e2 = {};
  for (let s2 of n2) for (let t2 in s2) t2.startsWith("on") && typeof s2[t2] == "function" ? (e2[t2] != null || (e2[t2] = []), e2[t2].push(s2[t2])) : r2[t2] = s2[t2];
  if (r2.disabled || r2["aria-disabled"]) for (let s2 in e2) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(s2) && (e2[s2] = [(t2) => {
    var l;
    return (l = t2 == null ? void 0 : t2.preventDefault) == null ? void 0 : l.call(t2);
  }]);
  for (let s2 in e2) Object.assign(r2, { [s2](t2, ...l) {
    let i2 = e2[s2];
    for (let o3 of i2) {
      if ((t2 instanceof Event || (t2 == null ? void 0 : t2.nativeEvent) instanceof Event) && t2.defaultPrevented) return;
      o3(t2, ...l);
    }
  } });
  return r2;
}
function _$1(...n2) {
  if (n2.length === 0) return {};
  if (n2.length === 1) return n2[0];
  let r2 = {}, e2 = {};
  for (let s2 of n2) for (let t2 in s2) t2.startsWith("on") && typeof s2[t2] == "function" ? (e2[t2] != null || (e2[t2] = []), e2[t2].push(s2[t2])) : r2[t2] = s2[t2];
  for (let s2 in e2) Object.assign(r2, { [s2](...t2) {
    let l = e2[s2];
    for (let i2 of l) i2 == null || i2(...t2);
  } });
  return r2;
}
function K(n2) {
  var r2;
  return Object.assign(forwardRef(n2), { displayName: (r2 = n2.displayName) != null ? r2 : n2.name });
}
function m(n2) {
  let r2 = Object.assign({}, n2);
  for (let e2 in r2) r2[e2] === void 0 && delete r2[e2];
  return r2;
}
function h(n2, r2 = []) {
  let e2 = Object.assign({}, n2);
  for (let a2 of r2) a2 in e2 && delete e2[a2];
  return e2;
}
function H$2(n2) {
  return React.version.split(".")[0] >= "19" ? n2.props.ref : n2.ref;
}
let R = "button";
function v(a2, u2) {
  var p2;
  let l = a$1(), { disabled: e2 = l || !1, autoFocus: t2 = !1, ...o3 } = a2, { isFocusVisible: r2, focusProps: i2 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: t2 }), { isHovered: s2, hoverProps: T } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e2 }), { pressed: n2, pressProps: d2 } = w({ disabled: e2 }), f2 = _$1({ ref: u2, type: (p2 = o3.type) != null ? p2 : "button", disabled: e2 || void 0, autoFocus: t2 }, i2, T, d2), m2 = useMemo(() => ({ disabled: e2, hover: s2, focus: r2, active: n2, autofocus: t2 }), [e2, s2, r2, n2, t2]);
  return L$1()({ ourProps: f2, theirProps: o3, slot: m2, defaultTag: R, name: "Button" });
}
let H$1 = K(v), e = createContext(void 0);
function u$1() {
  return useContext(e);
}
let u = Symbol();
function y(...t2) {
  let n2 = useRef(t2);
  useEffect(() => {
    n2.current = t2;
  }, [t2]);
  let c2 = o2((e2) => {
    for (let o3 of n2.current) o3 != null && (typeof o3 == "function" ? o3(e2) : o3.current = e2);
  });
  return t2.every((e2) => e2 == null || (e2 == null ? void 0 : e2[u])) ? void 0 : c2;
}
let a = createContext(null);
a.displayName = "DescriptionContext";
function f() {
  let r2 = useContext(a);
  if (r2 === null) {
    let e2 = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(e2, f), e2;
  }
  return r2;
}
function U$1() {
  var r2, e2;
  return (e2 = (r2 = useContext(a)) == null ? void 0 : r2.value) != null ? e2 : void 0;
}
let S = "p";
function C(r2, e2) {
  let d2 = useId(), t2 = a$1(), { id: i2 = \`headlessui-description-\${d2}\`, ...l } = r2, n$1 = f(), s2 = y(e2);
  n(() => n$1.register(i2), [i2, n$1.register]);
  let o3 = t2 || !1, p2 = useMemo(() => ({ ...n$1.slot, disabled: o3 }), [n$1.slot, o3]), D = { ref: s2, ...n$1.props, id: i2 };
  return L$1()({ ourProps: D, theirProps: l, slot: p2, defaultTag: S, name: n$1.name || "Description" });
}
let _ = K(C);
Object.assign(_, {});
let c = createContext(null);
c.displayName = "LabelContext";
function P() {
  let r2 = useContext(c);
  if (r2 === null) {
    let l = new Error("You used a <Label /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(l, P), l;
  }
  return r2;
}
function I(r2) {
  var a2, e2, o3;
  let l = (e2 = (a2 = useContext(c)) == null ? void 0 : a2.value) != null ? e2 : void 0;
  return ((o3 = void 0) != null ? o3 : 0) > 0 ? [l, ...r2].filter(Boolean).join(" ") : l;
}
let N = "label";
function G(r2, l) {
  var y$1;
  let a2 = useId(), e2 = P(), o$12 = u$1(), g = a$1(), { id: t2 = \`headlessui-label-\${a2}\`, htmlFor: s2 = o$12 ?? ((y$1 = e2.props) == null ? void 0 : y$1.htmlFor), passive: m2 = !1, ...i2 } = r2, p2 = y(l);
  n(() => e2.register(t2), [t2, e2.register]);
  let u2 = o2((L2) => {
    let b = L2.currentTarget;
    if (b instanceof HTMLLabelElement && L2.preventDefault(), e2.props && "onClick" in e2.props && typeof e2.props.onClick == "function" && e2.props.onClick(L2), b instanceof HTMLLabelElement) {
      let n2 = document.getElementById(b.htmlFor);
      if (n2) {
        let E2 = n2.getAttribute("disabled");
        if (E2 === "true" || E2 === "") return;
        let x = n2.getAttribute("aria-disabled");
        if (x === "true" || x === "") return;
        (n2 instanceof HTMLInputElement && (n2.type === "radio" || n2.type === "checkbox") || n2.role === "radio" || n2.role === "checkbox" || n2.role === "switch") && n2.click(), n2.focus({ preventScroll: !0 });
      }
    }
  }), d2 = g || !1, C2 = useMemo(() => ({ ...e2.slot, disabled: d2 }), [e2.slot, d2]), f2 = { ref: p2, ...e2.props, id: t2, htmlFor: s2, onClick: u2 };
  return m2 && ("onClick" in f2 && (delete f2.htmlFor, delete f2.onClick), "onClick" in i2 && delete i2.onClick), L$1()({ ourProps: f2, theirProps: i2, slot: C2, defaultTag: s2 ? N : "div", name: e2.name || "Label" });
}
let U = K(G);
Object.assign(U, {});
let L = "textarea";
function H(s2, l) {
  let i2 = useId(), d2 = u$1(), n2 = a$1(), { id: p2 = d2 || \`headlessui-textarea-\${i2}\`, disabled: e2 = n2 || !1, autoFocus: r2 = !1, invalid: a2 = !1, ...T } = s2, f2 = I(), m2 = U$1(), { isFocused: o3, focusProps: u2 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: r2 }), { isHovered: t2, hoverProps: b } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e2 }), y2 = _$1({ ref: l, id: p2, "aria-labelledby": f2, "aria-describedby": m2, "aria-invalid": a2 ? "true" : void 0, disabled: e2 || void 0, autoFocus: r2 }, u2, b), x = useMemo(() => ({ disabled: e2, invalid: a2, hover: t2, focus: o3, autofocus: r2 }), [e2, a2, t2, o3, r2]);
  return L$1()({ ourProps: y2, theirProps: T, slot: x, defaultTag: L, name: "Textarea" });
}
let J = K(H);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), toCamelCase = (string) => string.replace(
  /^([A-Z])|[\\s-_]+(\\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
), toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}, mergeClasses = (...classes) => classes.filter((className, index, array) => !!className && className.trim() !== "" && array.indexOf(className) === index).join(" ").trim(), hasA11yProp = (props) => {
  for (const prop in props)
    if (prop.startsWith("aria-") || prop === "role" || prop === "title")
      return !0;
};
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        \`lucide-\${toKebabCase(toPascalCase(iconName))}\`,
        \`lucide-\${iconName}\`,
        className
      ),
      ...props
    })
  );
  return Component.displayName = toPascalCase(iconName), Component;
};
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$9 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ChevronDown = createLucideIcon("chevron-down", __iconNode$9);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], ChevronUp = createLucideIcon("chevron-up", __iconNode$8);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
], MessageCircle = createLucideIcon("message-circle", __iconNode$7);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Plus = createLucideIcon("plus", __iconNode$6);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
      key: "w46dr5"
    }
  ]
], Puzzle = createLucideIcon("puzzle", __iconNode$5);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], RefreshCw = createLucideIcon("refresh-cw", __iconNode$4);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], Send = createLucideIcon("send", __iconNode$3);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], Settings = createLucideIcon("settings", __iconNode$2);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
], Trash2 = createLucideIcon("trash-2", __iconNode$1);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], WifiOff = createLucideIcon("wifi-off", __iconNode), BROWSER_ALIASES_MAP = {
  "Amazon Silk": "amazon_silk",
  "Android Browser": "android",
  Bada: "bada",
  BlackBerry: "blackberry",
  Chrome: "chrome",
  Chromium: "chromium",
  Electron: "electron",
  Epiphany: "epiphany",
  Firefox: "firefox",
  Focus: "focus",
  Generic: "generic",
  "Google Search": "google_search",
  Googlebot: "googlebot",
  "Internet Explorer": "ie",
  "K-Meleon": "k_meleon",
  Maxthon: "maxthon",
  "Microsoft Edge": "edge",
  "MZ Browser": "mz",
  "NAVER Whale Browser": "naver",
  Opera: "opera",
  "Opera Coast": "opera_coast",
  PhantomJS: "phantomjs",
  Puffin: "puffin",
  QupZilla: "qupzilla",
  QQ: "qq",
  QQLite: "qqlite",
  Safari: "safari",
  Sailfish: "sailfish",
  "Samsung Internet for Android": "samsung_internet",
  SeaMonkey: "seamonkey",
  Sleipnir: "sleipnir",
  Swing: "swing",
  Tizen: "tizen",
  "UC Browser": "uc",
  Vivaldi: "vivaldi",
  "WebOS Browser": "webos",
  WeChat: "wechat",
  "Yandex Browser": "yandex",
  Roku: "roku"
}, BROWSER_MAP = {
  amazon_silk: "Amazon Silk",
  android: "Android Browser",
  bada: "Bada",
  blackberry: "BlackBerry",
  chrome: "Chrome",
  chromium: "Chromium",
  electron: "Electron",
  epiphany: "Epiphany",
  firefox: "Firefox",
  focus: "Focus",
  generic: "Generic",
  googlebot: "Googlebot",
  google_search: "Google Search",
  ie: "Internet Explorer",
  k_meleon: "K-Meleon",
  maxthon: "Maxthon",
  edge: "Microsoft Edge",
  mz: "MZ Browser",
  naver: "NAVER Whale Browser",
  opera: "Opera",
  opera_coast: "Opera Coast",
  phantomjs: "PhantomJS",
  puffin: "Puffin",
  qupzilla: "QupZilla",
  qq: "QQ Browser",
  qqlite: "QQ Browser Lite",
  safari: "Safari",
  sailfish: "Sailfish",
  samsung_internet: "Samsung Internet for Android",
  seamonkey: "SeaMonkey",
  sleipnir: "Sleipnir",
  swing: "Swing",
  tizen: "Tizen",
  uc: "UC Browser",
  vivaldi: "Vivaldi",
  webos: "WebOS Browser",
  wechat: "WeChat",
  yandex: "Yandex Browser"
}, PLATFORMS_MAP = {
  tablet: "tablet",
  mobile: "mobile",
  desktop: "desktop",
  tv: "tv"
}, OS_MAP = {
  WindowsPhone: "Windows Phone",
  Windows: "Windows",
  MacOS: "macOS",
  iOS: "iOS",
  Android: "Android",
  WebOS: "WebOS",
  BlackBerry: "BlackBerry",
  Bada: "Bada",
  Tizen: "Tizen",
  Linux: "Linux",
  ChromeOS: "Chrome OS",
  PlayStation4: "PlayStation 4",
  Roku: "Roku"
}, ENGINE_MAP = {
  EdgeHTML: "EdgeHTML",
  Blink: "Blink",
  Trident: "Trident",
  Presto: "Presto",
  Gecko: "Gecko",
  WebKit: "WebKit"
};
class Utils {
  /**
   * Get first matched item for a string
   * @param {RegExp} regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getFirstMatch(regexp, ua) {
    const match = ua.match(regexp);
    return match && match.length > 0 && match[1] || "";
  }
  /**
   * Get second matched item for a string
   * @param regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getSecondMatch(regexp, ua) {
    const match = ua.match(regexp);
    return match && match.length > 1 && match[2] || "";
  }
  /**
   * Match a regexp and return a constant or undefined
   * @param {RegExp} regexp
   * @param {String} ua
   * @param {*} _const Any const that will be returned if regexp matches the string
   * @return {*}
   */
  static matchAndReturnConst(regexp, ua, _const) {
    if (regexp.test(ua))
      return _const;
  }
  static getWindowsVersionName(version) {
    switch (version) {
      case "NT":
        return "NT";
      case "XP":
        return "XP";
      case "NT 5.0":
        return "2000";
      case "NT 5.1":
        return "XP";
      case "NT 5.2":
        return "2003";
      case "NT 6.0":
        return "Vista";
      case "NT 6.1":
        return "7";
      case "NT 6.2":
        return "8";
      case "NT 6.3":
        return "8.1";
      case "NT 10.0":
        return "10";
      default:
        return;
    }
  }
  /**
   * Get macOS version name
   *    10.5 - Leopard
   *    10.6 - Snow Leopard
   *    10.7 - Lion
   *    10.8 - Mountain Lion
   *    10.9 - Mavericks
   *    10.10 - Yosemite
   *    10.11 - El Capitan
   *    10.12 - Sierra
   *    10.13 - High Sierra
   *    10.14 - Mojave
   *    10.15 - Catalina
   *
   * @example
   *   getMacOSVersionName("10.14") // 'Mojave'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getMacOSVersionName(version) {
    const v2 = version.split(".").splice(0, 2).map((s2) => parseInt(s2, 10) || 0);
    if (v2.push(0), v2[0] === 10)
      switch (v2[1]) {
        case 5:
          return "Leopard";
        case 6:
          return "Snow Leopard";
        case 7:
          return "Lion";
        case 8:
          return "Mountain Lion";
        case 9:
          return "Mavericks";
        case 10:
          return "Yosemite";
        case 11:
          return "El Capitan";
        case 12:
          return "Sierra";
        case 13:
          return "High Sierra";
        case 14:
          return "Mojave";
        case 15:
          return "Catalina";
        default:
          return;
      }
  }
  /**
   * Get Android version name
   *    1.5 - Cupcake
   *    1.6 - Donut
   *    2.0 - Eclair
   *    2.1 - Eclair
   *    2.2 - Froyo
   *    2.x - Gingerbread
   *    3.x - Honeycomb
   *    4.0 - Ice Cream Sandwich
   *    4.1 - Jelly Bean
   *    4.4 - KitKat
   *    5.x - Lollipop
   *    6.x - Marshmallow
   *    7.x - Nougat
   *    8.x - Oreo
   *    9.x - Pie
   *
   * @example
   *   getAndroidVersionName("7.0") // 'Nougat'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getAndroidVersionName(version) {
    const v2 = version.split(".").splice(0, 2).map((s2) => parseInt(s2, 10) || 0);
    if (v2.push(0), !(v2[0] === 1 && v2[1] < 5)) {
      if (v2[0] === 1 && v2[1] < 6) return "Cupcake";
      if (v2[0] === 1 && v2[1] >= 6) return "Donut";
      if (v2[0] === 2 && v2[1] < 2) return "Eclair";
      if (v2[0] === 2 && v2[1] === 2) return "Froyo";
      if (v2[0] === 2 && v2[1] > 2) return "Gingerbread";
      if (v2[0] === 3) return "Honeycomb";
      if (v2[0] === 4 && v2[1] < 1) return "Ice Cream Sandwich";
      if (v2[0] === 4 && v2[1] < 4) return "Jelly Bean";
      if (v2[0] === 4 && v2[1] >= 4) return "KitKat";
      if (v2[0] === 5) return "Lollipop";
      if (v2[0] === 6) return "Marshmallow";
      if (v2[0] === 7) return "Nougat";
      if (v2[0] === 8) return "Oreo";
      if (v2[0] === 9) return "Pie";
    }
  }
  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  static getVersionPrecision(version) {
    return version.split(".").length;
  }
  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
   *   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
   *   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
   *   compareVersions('1.10.2.1',  '1.0800.2');     // -1
   *   compareVersions('1.10.2.1',  '1.10',  true);  // 0
   *
   * @param {String} versionA versions versions to compare
   * @param {String} versionB versions versions to compare
   * @param {boolean} [isLoose] enable loose comparison
   * @return {Number} comparison result: -1 when versionA is lower,
   * 1 when versionA is bigger, 0 when both equal
   */
  /* eslint consistent-return: 1 */
  static compareVersions(versionA, versionB, isLoose = !1) {
    const versionAPrecision = Utils.getVersionPrecision(versionA), versionBPrecision = Utils.getVersionPrecision(versionB);
    let precision = Math.max(versionAPrecision, versionBPrecision), lastPrecision = 0;
    const chunks = Utils.map([versionA, versionB], (version) => {
      const delta = precision - Utils.getVersionPrecision(version), _version = version + new Array(delta + 1).join(".0");
      return Utils.map(_version.split("."), (chunk) => new Array(20 - chunk.length).join("0") + chunk).reverse();
    });
    for (isLoose && (lastPrecision = precision - Math.min(versionAPrecision, versionBPrecision)), precision -= 1; precision >= lastPrecision; ) {
      if (chunks[0][precision] > chunks[1][precision])
        return 1;
      if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === lastPrecision)
          return 0;
        precision -= 1;
      } else if (chunks[0][precision] < chunks[1][precision])
        return -1;
    }
  }
  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  static map(arr, iterator) {
    const result = [];
    let i2;
    if (Array.prototype.map)
      return Array.prototype.map.call(arr, iterator);
    for (i2 = 0; i2 < arr.length; i2 += 1)
      result.push(iterator(arr[i2]));
    return result;
  }
  /**
   * Array::find polyfill
   *
   * @param  {Array} arr
   * @param  {Function} predicate
   * @return {Array}
   */
  static find(arr, predicate) {
    let i2, l;
    if (Array.prototype.find)
      return Array.prototype.find.call(arr, predicate);
    for (i2 = 0, l = arr.length; i2 < l; i2 += 1) {
      const value = arr[i2];
      if (predicate(value, i2))
        return value;
    }
  }
  /**
   * Object::assign polyfill
   *
   * @param  {Object} obj
   * @param  {Object} ...objs
   * @return {Object}
   */
  static assign(obj, ...assigners) {
    const result = obj;
    let i2, l;
    if (Object.assign)
      return Object.assign(obj, ...assigners);
    for (i2 = 0, l = assigners.length; i2 < l; i2 += 1) {
      const assigner = assigners[i2];
      typeof assigner == "object" && assigner !== null && Object.keys(assigner).forEach((key) => {
        result[key] = assigner[key];
      });
    }
    return obj;
  }
  /**
   * Get short version/alias for a browser name
   *
   * @example
   *   getBrowserAlias('Microsoft Edge') // edge
   *
   * @param  {string} browserName
   * @return {string}
   */
  static getBrowserAlias(browserName) {
    return BROWSER_ALIASES_MAP[browserName];
  }
  /**
   * Get short version/alias for a browser name
   *
   * @example
   *   getBrowserAlias('edge') // Microsoft Edge
   *
   * @param  {string} browserAlias
   * @return {string}
   */
  static getBrowserTypeByAlias(browserAlias) {
    return BROWSER_MAP[browserAlias] || "";
  }
}
const commonVersionIdentifier = /version\\/(\\d+(\\.?_?\\d+)+)/i, browsersList = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(ua) {
      const browser = {
        name: "Googlebot"
      }, version = Utils.getFirstMatch(/googlebot\\/(\\d+(\\.\\d+))/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(ua) {
      const browser = {
        name: "Opera"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:opera)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  /* Opera > 13.0 */
  {
    test: [/opr\\/|opios/i],
    describe(ua) {
      const browser = {
        name: "Opera"
      }, version = Utils.getFirstMatch(/(?:opr|opios)[\\s/](\\S+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(ua) {
      const browser = {
        name: "Samsung Internet for Android"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:SamsungBrowser)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/Whale/i],
    describe(ua) {
      const browser = {
        name: "NAVER Whale Browser"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:whale)[\\s/](\\d+(?:\\.\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(ua) {
      const browser = {
        name: "MZ Browser"
      }, version = Utils.getFirstMatch(/(?:MZBrowser)[\\s/](\\d+(?:\\.\\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/focus/i],
    describe(ua) {
      const browser = {
        name: "Focus"
      }, version = Utils.getFirstMatch(/(?:focus)[\\s/](\\d+(?:\\.\\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/swing/i],
    describe(ua) {
      const browser = {
        name: "Swing"
      }, version = Utils.getFirstMatch(/(?:swing)[\\s/](\\d+(?:\\.\\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/coast/i],
    describe(ua) {
      const browser = {
        name: "Opera Coast"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:coast)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/opt\\/\\d+(?:.?_?\\d+)+/i],
    describe(ua) {
      const browser = {
        name: "Opera Touch"
      }, version = Utils.getFirstMatch(/(?:opt)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/yabrowser/i],
    describe(ua) {
      const browser = {
        name: "Yandex Browser"
      }, version = Utils.getFirstMatch(/(?:yabrowser)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(ua) {
      const browser = {
        name: "UC Browser"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:ucbrowser)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(ua) {
      const browser = {
        name: "Maxthon"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:Maxthon|mxios)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/epiphany/i],
    describe(ua) {
      const browser = {
        name: "Epiphany"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:epiphany)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/puffin/i],
    describe(ua) {
      const browser = {
        name: "Puffin"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:puffin)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/sleipnir/i],
    describe(ua) {
      const browser = {
        name: "Sleipnir"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:sleipnir)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/k-meleon/i],
    describe(ua) {
      const browser = {
        name: "K-Meleon"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:k-meleon)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/micromessenger/i],
    describe(ua) {
      const browser = {
        name: "WeChat"
      }, version = Utils.getFirstMatch(/(?:micromessenger)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(ua) {
      const browser = {
        name: /qqbrowserlite/i.test(ua) ? "QQ Browser Lite" : "QQ Browser"
      }, version = Utils.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\\d+(\\.?_?\\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/msie|trident/i],
    describe(ua) {
      const browser = {
        name: "Internet Explorer"
      }, version = Utils.getFirstMatch(/(?:msie |rv:)(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/\\sedg\\//i],
    describe(ua) {
      const browser = {
        name: "Microsoft Edge"
      }, version = Utils.getFirstMatch(/\\sedg\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(ua) {
      const browser = {
        name: "Microsoft Edge"
      }, version = Utils.getSecondMatch(/edg([ea]|ios)\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/vivaldi/i],
    describe(ua) {
      const browser = {
        name: "Vivaldi"
      }, version = Utils.getFirstMatch(/vivaldi\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/seamonkey/i],
    describe(ua) {
      const browser = {
        name: "SeaMonkey"
      }, version = Utils.getFirstMatch(/seamonkey\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/sailfish/i],
    describe(ua) {
      const browser = {
        name: "Sailfish"
      }, version = Utils.getFirstMatch(/sailfish\\s?browser\\/(\\d+(\\.\\d+)?)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/silk/i],
    describe(ua) {
      const browser = {
        name: "Amazon Silk"
      }, version = Utils.getFirstMatch(/silk\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/phantom/i],
    describe(ua) {
      const browser = {
        name: "PhantomJS"
      }, version = Utils.getFirstMatch(/phantomjs\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/slimerjs/i],
    describe(ua) {
      const browser = {
        name: "SlimerJS"
      }, version = Utils.getFirstMatch(/slimerjs\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/blackberry|\\bbb\\d+/i, /rim\\stablet/i],
    describe(ua) {
      const browser = {
        name: "BlackBerry"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/blackberry[\\d]+\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua) {
      const browser = {
        name: "WebOS Browser"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/w(?:eb)?[o0]sbrowser\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/bada/i],
    describe(ua) {
      const browser = {
        name: "Bada"
      }, version = Utils.getFirstMatch(/dolfin\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/tizen/i],
    describe(ua) {
      const browser = {
        name: "Tizen"
      }, version = Utils.getFirstMatch(/(?:tizen\\s?)?browser\\/(\\d+(\\.?_?\\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/qupzilla/i],
    describe(ua) {
      const browser = {
        name: "QupZilla"
      }, version = Utils.getFirstMatch(/(?:qupzilla)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(ua) {
      const browser = {
        name: "Firefox"
      }, version = Utils.getFirstMatch(/(?:firefox|iceweasel|fxios)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/electron/i],
    describe(ua) {
      const browser = {
        name: "Electron"
      }, version = Utils.getFirstMatch(/(?:electron)\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/MiuiBrowser/i],
    describe(ua) {
      const browser = {
        name: "Miui"
      }, version = Utils.getFirstMatch(/(?:MiuiBrowser)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/chromium/i],
    describe(ua) {
      const browser = {
        name: "Chromium"
      }, version = Utils.getFirstMatch(/(?:chromium)[\\s/](\\d+(\\.?_?\\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(ua) {
      const browser = {
        name: "Chrome"
      }, version = Utils.getFirstMatch(/(?:chrome|crios|crmo)\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  {
    test: [/GSA/i],
    describe(ua) {
      const browser = {
        name: "Google Search"
      }, version = Utils.getFirstMatch(/(?:GSA)\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (browser.version = version), browser;
    }
  },
  /* Android Browser */
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i), butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua) {
      const browser = {
        name: "Android Browser"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(ua) {
      const browser = {
        name: "PlayStation 4"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(ua) {
      const browser = {
        name: "Safari"
      }, version = Utils.getFirstMatch(commonVersionIdentifier, ua);
      return version && (browser.version = version), browser;
    }
  },
  /* Something else */
  {
    test: [/.*/i],
    describe(ua) {
      const regexpWithoutDeviceSpec = /^(.*)\\/(.*) /, regexpWithDeviceSpec = /^(.*)\\/(.*)[ \\t]\\((.*)/, regexp = ua.search("\\\\(") !== -1 ? regexpWithDeviceSpec : regexpWithoutDeviceSpec;
      return {
        name: Utils.getFirstMatch(regexp, ua),
        version: Utils.getSecondMatch(regexp, ua)
      };
    }
  }
], osParsersList = [
  /* Roku */
  {
    test: [/Roku\\/DVP/],
    describe(ua) {
      const version = Utils.getFirstMatch(/Roku\\/DVP-(\\d+\\.\\d+)/i, ua);
      return {
        name: OS_MAP.Roku,
        version
      };
    }
  },
  /* Windows Phone */
  {
    test: [/windows phone/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/windows phone (?:os)?\\s?(\\d+(\\.\\d+)*)/i, ua);
      return {
        name: OS_MAP.WindowsPhone,
        version
      };
    }
  },
  /* Windows */
  {
    test: [/windows /i],
    describe(ua) {
      const version = Utils.getFirstMatch(/Windows ((NT|XP)( \\d\\d?.\\d)?)/i, ua), versionName = Utils.getWindowsVersionName(version);
      return {
        name: OS_MAP.Windows,
        version,
        versionName
      };
    }
  },
  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\\//],
    describe(ua) {
      const result = {
        name: OS_MAP.iOS
      }, version = Utils.getSecondMatch(/(Version\\/)(\\d[\\d.]+)/, ua);
      return version && (result.version = version), result;
    }
  },
  /* macOS */
  {
    test: [/macintosh/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/mac os x (\\d+(\\.?_?\\d+)+)/i, ua).replace(/[_\\s]/g, "."), versionName = Utils.getMacOSVersionName(version), os = {
        name: OS_MAP.MacOS,
        version
      };
      return versionName && (os.versionName = versionName), os;
    }
  },
  /* iOS */
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/os (\\d+([_\\s]\\d+)*) like mac os x/i, ua).replace(/[_\\s]/g, ".");
      return {
        name: OS_MAP.iOS,
        version
      };
    }
  },
  /* Android */
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i), butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua) {
      const version = Utils.getFirstMatch(/android[\\s/-](\\d+(\\.\\d+)*)/i, ua), versionName = Utils.getAndroidVersionName(version), os = {
        name: OS_MAP.Android,
        version
      };
      return versionName && (os.versionName = versionName), os;
    }
  },
  /* WebOS */
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/(?:web|hpw)[o0]s\\/(\\d+(\\.\\d+)*)/i, ua), os = {
        name: OS_MAP.WebOS
      };
      return version && version.length && (os.version = version), os;
    }
  },
  /* BlackBerry */
  {
    test: [/blackberry|\\bbb\\d+/i, /rim\\stablet/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/rim\\stablet\\sos\\s(\\d+(\\.\\d+)*)/i, ua) || Utils.getFirstMatch(/blackberry\\d+\\/(\\d+([_\\s]\\d+)*)/i, ua) || Utils.getFirstMatch(/\\bbb(\\d+)/i, ua);
      return {
        name: OS_MAP.BlackBerry,
        version
      };
    }
  },
  /* Bada */
  {
    test: [/bada/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/bada\\/(\\d+(\\.\\d+)*)/i, ua);
      return {
        name: OS_MAP.Bada,
        version
      };
    }
  },
  /* Tizen */
  {
    test: [/tizen/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/tizen[/\\s](\\d+(\\.\\d+)*)/i, ua);
      return {
        name: OS_MAP.Tizen,
        version
      };
    }
  },
  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: OS_MAP.Linux
      };
    }
  },
  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: OS_MAP.ChromeOS
      };
    }
  },
  /* Playstation 4 */
  {
    test: [/PlayStation 4/],
    describe(ua) {
      const version = Utils.getFirstMatch(/PlayStation 4[/\\s](\\d+(\\.\\d+)*)/i, ua);
      return {
        name: OS_MAP.PlayStation4,
        version
      };
    }
  }
], platformParsersList = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe() {
      return {
        type: "bot",
        vendor: "Google"
      };
    }
  },
  /* Huawei */
  {
    test: [/huawei/i],
    describe(ua) {
      const model = Utils.getFirstMatch(/(can-l01)/i, ua) && "Nova", platform = {
        type: PLATFORMS_MAP.mobile,
        vendor: "Huawei"
      };
      return model && (platform.model = model), platform;
    }
  },
  /* Nexus Tablet */
  {
    test: [/nexus\\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Nexus"
      };
    }
  },
  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\\//],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  /* Amazon Kindle Fire */
  {
    test: [/kftt build/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Amazon",
        model: "Kindle Fire HD 7"
      };
    }
  },
  /* Another Amazon Tablet with Silk */
  {
    test: [/silk/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Amazon"
      };
    }
  },
  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet
      };
    }
  },
  /* iPod/iPhone */
  {
    test(parser) {
      const iDevice = parser.test(/ipod|iphone/i), likeIDevice = parser.test(/like (ipod|iphone)/i);
      return iDevice && !likeIDevice;
    },
    describe(ua) {
      const model = Utils.getFirstMatch(/(ipod|iphone)/i, ua);
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "Apple",
        model
      };
    }
  },
  /* Nexus Mobile */
  {
    test: [/nexus\\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "Nexus"
      };
    }
  },
  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile
      };
    }
  },
  /* BlackBerry */
  {
    test(parser) {
      return parser.getBrowserName(!0) === "blackberry";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "BlackBerry"
      };
    }
  },
  /* Bada */
  {
    test(parser) {
      return parser.getBrowserName(!0) === "bada";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile
      };
    }
  },
  /* Windows Phone */
  {
    test(parser) {
      return parser.getBrowserName() === "windows phone";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "Microsoft"
      };
    }
  },
  /* Android Tablet */
  {
    test(parser) {
      const osMajorVersion = Number(String(parser.getOSVersion()).split(".")[0]);
      return parser.getOSName(!0) === "android" && osMajorVersion >= 3;
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tablet
      };
    }
  },
  /* Android Mobile */
  {
    test(parser) {
      return parser.getOSName(!0) === "android";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile
      };
    }
  },
  /* desktop */
  {
    test(parser) {
      return parser.getOSName(!0) === "macos";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop,
        vendor: "Apple"
      };
    }
  },
  /* Windows */
  {
    test(parser) {
      return parser.getOSName(!0) === "windows";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop
      };
    }
  },
  /* Linux */
  {
    test(parser) {
      return parser.getOSName(!0) === "linux";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop
      };
    }
  },
  /* PlayStation 4 */
  {
    test(parser) {
      return parser.getOSName(!0) === "playstation 4";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tv
      };
    }
  },
  /* Roku */
  {
    test(parser) {
      return parser.getOSName(!0) === "roku";
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tv
      };
    }
  }
], enginesParsersList = [
  /* EdgeHTML */
  {
    test(parser) {
      return parser.getBrowserName(!0) === "microsoft edge";
    },
    describe(ua) {
      if (/\\sedg\\//i.test(ua))
        return {
          name: ENGINE_MAP.Blink
        };
      const version = Utils.getFirstMatch(/edge\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return {
        name: ENGINE_MAP.EdgeHTML,
        version
      };
    }
  },
  /* Trident */
  {
    test: [/trident/i],
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Trident
      }, version = Utils.getFirstMatch(/trident\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (engine.version = version), engine;
    }
  },
  /* Presto */
  {
    test(parser) {
      return parser.test(/presto/i);
    },
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Presto
      }, version = Utils.getFirstMatch(/presto\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (engine.version = version), engine;
    }
  },
  /* Gecko */
  {
    test(parser) {
      const isGecko = parser.test(/gecko/i), likeGecko = parser.test(/like gecko/i);
      return isGecko && !likeGecko;
    },
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Gecko
      }, version = Utils.getFirstMatch(/gecko\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (engine.version = version), engine;
    }
  },
  /* Blink */
  {
    test: [/(apple)?webkit\\/537\\.36/i],
    describe() {
      return {
        name: ENGINE_MAP.Blink
      };
    }
  },
  /* WebKit */
  {
    test: [/(apple)?webkit/i],
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.WebKit
      }, version = Utils.getFirstMatch(/webkit\\/(\\d+(\\.?_?\\d+)+)/i, ua);
      return version && (engine.version = version), engine;
    }
  }
];
class Parser {
  /**
   * Create instance of Parser
   *
   * @param {String} UA User-Agent string
   * @param {Boolean} [skipParsing=false] parser can skip parsing in purpose of performance
   * improvements if you need to make a more particular parsing
   * like {@link Parser#parseBrowser} or {@link Parser#parsePlatform}
   *
   * @throw {Error} in case of empty UA String
   *
   * @constructor
   */
  constructor(UA, skipParsing = !1) {
    if (UA == null || UA === "")
      throw new Error("UserAgent parameter can't be empty");
    this._ua = UA, this.parsedResult = {}, skipParsing !== !0 && this.parse();
  }
  /**
   * Get UserAgent string of current Parser instance
   * @return {String} User-Agent String of the current <Parser> object
   *
   * @public
   */
  getUA() {
    return this._ua;
  }
  /**
   * Test a UA string for a regexp
   * @param {RegExp} regex
   * @return {Boolean}
   */
  test(regex) {
    return regex.test(this._ua);
  }
  /**
   * Get parsed browser object
   * @return {Object}
   */
  parseBrowser() {
    this.parsedResult.browser = {};
    const browserDescriptor = Utils.find(browsersList, (_browser) => {
      if (typeof _browser.test == "function")
        return _browser.test(this);
      if (_browser.test instanceof Array)
        return _browser.test.some((condition) => this.test(condition));
      throw new Error("Browser's test function is not valid");
    });
    return browserDescriptor && (this.parsedResult.browser = browserDescriptor.describe(this.getUA())), this.parsedResult.browser;
  }
  /**
   * Get parsed browser object
   * @return {Object}
   *
   * @public
   */
  getBrowser() {
    return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser();
  }
  /**
   * Get browser's name
   * @return {String} Browser's name or an empty string
   *
   * @public
   */
  getBrowserName(toLowerCase) {
    return toLowerCase ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || "";
  }
  /**
   * Get browser's version
   * @return {String} version of browser
   *
   * @public
   */
  getBrowserVersion() {
    return this.getBrowser().version;
  }
  /**
   * Get OS
   * @return {Object}
   *
   * @example
   * this.getOS();
   * {
   *   name: 'macOS',
   *   version: '10.11.12'
   * }
   */
  getOS() {
    return this.parsedResult.os ? this.parsedResult.os : this.parseOS();
  }
  /**
   * Parse OS and save it to this.parsedResult.os
   * @return {*|{}}
   */
  parseOS() {
    this.parsedResult.os = {};
    const os = Utils.find(osParsersList, (_os) => {
      if (typeof _os.test == "function")
        return _os.test(this);
      if (_os.test instanceof Array)
        return _os.test.some((condition) => this.test(condition));
      throw new Error("Browser's test function is not valid");
    });
    return os && (this.parsedResult.os = os.describe(this.getUA())), this.parsedResult.os;
  }
  /**
   * Get OS name
   * @param {Boolean} [toLowerCase] return lower-cased value
   * @return {String} name of the OS — macOS, Windows, Linux, etc.
   */
  getOSName(toLowerCase) {
    const { name } = this.getOS();
    return toLowerCase ? String(name).toLowerCase() || "" : name || "";
  }
  /**
   * Get OS version
   * @return {String} full version with dots ('10.11.12', '5.6', etc)
   */
  getOSVersion() {
    return this.getOS().version;
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  getPlatform() {
    return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform();
  }
  /**
   * Get platform name
   * @param {Boolean} [toLowerCase=false]
   * @return {*}
   */
  getPlatformType(toLowerCase = !1) {
    const { type } = this.getPlatform();
    return toLowerCase ? String(type).toLowerCase() || "" : type || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parsePlatform() {
    this.parsedResult.platform = {};
    const platform = Utils.find(platformParsersList, (_platform) => {
      if (typeof _platform.test == "function")
        return _platform.test(this);
      if (_platform.test instanceof Array)
        return _platform.test.some((condition) => this.test(condition));
      throw new Error("Browser's test function is not valid");
    });
    return platform && (this.parsedResult.platform = platform.describe(this.getUA())), this.parsedResult.platform;
  }
  /**
   * Get parsed engine
   * @return {{}}
   */
  getEngine() {
    return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine();
  }
  /**
   * Get engines's name
   * @return {String} Engines's name or an empty string
   *
   * @public
   */
  getEngineName(toLowerCase) {
    return toLowerCase ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || "";
  }
  /**
   * Get parsed platform
   * @return {{}}
   */
  parseEngine() {
    this.parsedResult.engine = {};
    const engine = Utils.find(enginesParsersList, (_engine) => {
      if (typeof _engine.test == "function")
        return _engine.test(this);
      if (_engine.test instanceof Array)
        return _engine.test.some((condition) => this.test(condition));
      throw new Error("Browser's test function is not valid");
    });
    return engine && (this.parsedResult.engine = engine.describe(this.getUA())), this.parsedResult.engine;
  }
  /**
   * Parse full information about the browser
   * @returns {Parser}
   */
  parse() {
    return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this;
  }
  /**
   * Get parsed result
   * @return {ParsedResult}
   */
  getResult() {
    return Utils.assign({}, this.parsedResult);
  }
  /**
   * Check if parsed browser matches certain conditions
   *
   * @param {Object} checkTree It's one or two layered object,
   * which can include a platform or an OS on the first layer
   * and should have browsers specs on the bottom-laying layer
   *
   * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
   * Returns \`undefined\` when the browser is no described in the checkTree object.
   *
   * @example
   * const browser = Bowser.getParser(window.navigator.userAgent);
   * if (browser.satisfies({chrome: '>118.01.1322' }))
   * // or with os
   * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
   * // or with platforms
   * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
   */
  satisfies(checkTree) {
    const platformsAndOSes = {};
    let platformsAndOSCounter = 0;
    const browsers = {};
    let browsersCounter = 0;
    if (Object.keys(checkTree).forEach((key) => {
      const currentDefinition = checkTree[key];
      typeof currentDefinition == "string" ? (browsers[key] = currentDefinition, browsersCounter += 1) : typeof currentDefinition == "object" && (platformsAndOSes[key] = currentDefinition, platformsAndOSCounter += 1);
    }), platformsAndOSCounter > 0) {
      const platformsAndOSNames = Object.keys(platformsAndOSes), OSMatchingDefinition = Utils.find(platformsAndOSNames, (name) => this.isOS(name));
      if (OSMatchingDefinition) {
        const osResult = this.satisfies(platformsAndOSes[OSMatchingDefinition]);
        if (osResult !== void 0)
          return osResult;
      }
      const platformMatchingDefinition = Utils.find(
        platformsAndOSNames,
        (name) => this.isPlatform(name)
      );
      if (platformMatchingDefinition) {
        const platformResult = this.satisfies(platformsAndOSes[platformMatchingDefinition]);
        if (platformResult !== void 0)
          return platformResult;
      }
    }
    if (browsersCounter > 0) {
      const browserNames = Object.keys(browsers), matchingDefinition = Utils.find(browserNames, (name) => this.isBrowser(name, !0));
      if (matchingDefinition !== void 0)
        return this.compareVersion(browsers[matchingDefinition]);
    }
  }
  /**
   * Check if the browser name equals the passed string
   * @param browserName The string to compare with the browser name
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {boolean}
   */
  isBrowser(browserName, includingAlias = !1) {
    const defaultBrowserName = this.getBrowserName().toLowerCase();
    let browserNameLower = browserName.toLowerCase();
    const alias = Utils.getBrowserTypeByAlias(browserNameLower);
    return includingAlias && alias && (browserNameLower = alias.toLowerCase()), browserNameLower === defaultBrowserName;
  }
  compareVersion(version) {
    let expectedResults = [0], comparableVersion = version, isLoose = !1;
    const currentBrowserVersion = this.getBrowserVersion();
    if (typeof currentBrowserVersion == "string")
      return version[0] === ">" || version[0] === "<" ? (comparableVersion = version.substr(1), version[1] === "=" ? (isLoose = !0, comparableVersion = version.substr(2)) : expectedResults = [], version[0] === ">" ? expectedResults.push(1) : expectedResults.push(-1)) : version[0] === "=" ? comparableVersion = version.substr(1) : version[0] === "~" && (isLoose = !0, comparableVersion = version.substr(1)), expectedResults.indexOf(
        Utils.compareVersions(currentBrowserVersion, comparableVersion, isLoose)
      ) > -1;
  }
  isOS(osName) {
    return this.getOSName(!0) === String(osName).toLowerCase();
  }
  isPlatform(platformType) {
    return this.getPlatformType(!0) === String(platformType).toLowerCase();
  }
  isEngine(engineName) {
    return this.getEngineName(!0) === String(engineName).toLowerCase();
  }
  /**
   * Is anything? Check if the browser is called "anything",
   * the OS called "anything" or the platform called "anything"
   * @param {String} anything
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {Boolean}
   */
  is(anything, includingAlias = !1) {
    return this.isBrowser(anything, includingAlias) || this.isOS(anything) || this.isPlatform(anything);
  }
  /**
   * Check if any of the given values satisfies this.is(anything)
   * @param {String[]} anythings
   * @returns {Boolean}
   */
  some(anythings = []) {
    return anythings.some((anything) => this.is(anything));
  }
}
/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2019
 */
class Bowser {
  /**
   * Creates a {@link Parser} instance
   *
   * @param {String} UA UserAgent string
   * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
   * explicitly. Same as \`skipParsing\` for {@link Parser}.
   * @returns {Parser}
   * @throws {Error} when UA is not a String
   *
   * @example
   * const parser = Bowser.getParser(window.navigator.userAgent);
   * const result = parser.getResult();
   */
  static getParser(UA, skipParsing = !1) {
    if (typeof UA != "string")
      throw new Error("UserAgent should be a string");
    return new Parser(UA, skipParsing);
  }
  /**
   * Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
   *
   * @param UA
   * @return {ParsedResult}
   *
   * @example
   * const result = Bowser.parse(window.navigator.userAgent);
   */
  static parse(UA) {
    return new Parser(UA).getResult();
  }
  static get BROWSER_MAP() {
    return BROWSER_MAP;
  }
  static get ENGINE_MAP() {
    return ENGINE_MAP;
  }
  static get OS_MAP() {
    return OS_MAP;
  }
  static get PLATFORMS_MAP() {
    return PLATFORMS_MAP;
  }
}
const useBrowserInfo = () => useMemo(() => {
  {
    const result = Bowser.parse(window.navigator.userAgent);
    return {
      browser: result.browser,
      engine: result.engine,
      os: result.os
    };
  }
}, []);
function useHotkeyListenerComboText(action) {
  return useBrowserInfo().os.name.toLowerCase().includes("mac") ? hotkeyActionDefinitions[action].keyComboMac : hotkeyActionDefinitions[action].keyComboDefault;
}
function ToolbarChatArea() {
  const chatState = useChatState(), [isComposing, setIsComposing] = useState(!1), currentChat = useMemo(
    () => chatState.chats.find((c2) => c2.id === chatState.currentChatId),
    [chatState.chats, chatState.currentChatId]
  ), currentInput = useMemo(
    () => (currentChat == null ? void 0 : currentChat.inputValue) || "",
    [currentChat == null ? void 0 : currentChat.inputValue]
  ), handleInputChange = useCallback(
    (value) => {
      chatState.setChatInput(chatState.currentChatId, value);
    },
    [chatState.setChatInput, chatState.currentChatId]
  ), handleSubmit = useCallback(() => {
    !currentChat || !currentInput.trim() || chatState.addMessage(currentChat.id, currentInput);
  }, [currentChat, currentInput, chatState.addMessage]), handleKeyDown = useCallback(
    (e2) => {
      e2.key === "Enter" && !e2.shiftKey && !isComposing && (e2.preventDefault(), handleSubmit());
    },
    [handleSubmit, isComposing]
  ), handleCompositionStart = useCallback(() => {
    setIsComposing(!0);
  }, []), handleCompositionEnd = useCallback(() => {
    setIsComposing(!1);
  }, []), inputRef = useRef(null);
  useEffect(() => {
    var _a, _b, _c;
    const blurHandler = () => {
      var _a2;
      return (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
    };
    return chatState.isPromptCreationActive ? ((_a = inputRef.current) == null || _a.focus(), (_b = inputRef.current) == null || _b.addEventListener("blur", blurHandler)) : (_c = inputRef.current) == null || _c.blur(), () => {
      var _a2;
      (_a2 = inputRef.current) == null || _a2.removeEventListener("blur", blurHandler);
    };
  }, [chatState.isPromptCreationActive]);
  const buttonClassName = useMemo(
    () => cn(
      "flex size-8 items-center justify-center rounded-full bg-transparent p-1 text-zinc-950 opacity-20 transition-all duration-150",
      currentInput.length > 0 && "bg-blue-600 text-white opacity-100",
      chatState.promptState === "loading" && "cursor-not-allowed bg-zinc-300 text-zinc-500 opacity-30"
    ),
    [currentInput.length, chatState.promptState]
  ), textareaClassName = useMemo(
    () => cn(
      "h-full w-full flex-1 resize-none bg-transparent text-zinc-950 transition-all duration-150 placeholder:text-zinc-950/50 focus:outline-none",
      chatState.promptState === "loading" && "text-zinc-500 placeholder:text-zinc-400"
    ),
    [chatState.promptState]
  ), containerClassName = useMemo(() => {
    const baseClasses = "flex h-24 w-full flex-1 flex-row items-end gap-1 rounded-2xl p-4 text-sm text-zinc-950 shadow-md backdrop-blur transition-all duration-150 placeholder:text-zinc-950/70";
    switch (chatState.promptState) {
      case "loading":
        return cn(
          baseClasses,
          "border-2 border-transparent bg-zinc-50/80",
          "chat-loading-gradient"
        );
      case "success":
        return cn(
          baseClasses,
          "border-2 border-transparent bg-zinc-50/80",
          "chat-success-border"
        );
      case "error":
        return cn(
          baseClasses,
          "border-2 border-transparent bg-zinc-50/80",
          "chat-error-border animate-shake"
        );
      default:
        return cn(baseClasses, "border border-border/30 bg-zinc-50/80");
    }
  }, [chatState.promptState]), ctrlAltCText = useHotkeyListenerComboText(HotkeyActions.CTRL_ALT_C);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: containerClassName,
      onClick: () => chatState.startPromptCreation(),
      role: "button",
      tabIndex: 0,
      children: [
        /* @__PURE__ */ jsx(
          J,
          {
            ref: inputRef,
            className: textareaClassName,
            value: currentInput,
            onChange: (e2) => handleInputChange(e2.currentTarget.value),
            onKeyDown: handleKeyDown,
            onCompositionStart: handleCompositionStart,
            onCompositionEnd: handleCompositionEnd,
            placeholder: chatState.isPromptCreationActive ? chatState.promptState === "loading" ? "Processing..." : "Enter prompt..." : \`What do you want to change? (\${ctrlAltCText})\`,
            disabled: chatState.promptState === "loading"
          }
        ),
        /* @__PURE__ */ jsx(
          H$1,
          {
            className: buttonClassName,
            disabled: currentInput.length === 0 || chatState.promptState === "loading",
            onClick: handleSubmit,
            children: /* @__PURE__ */ jsx(Send, { className: "size-4" })
          }
        )
      ]
    }
  );
}
const DraggableContext = createContext(
  null
), DraggableProvider = ({
  containerRef,
  children,
  snapAreas,
  onDragStart,
  onDragEnd
}) => {
  const [borderLocation, setBorderLocation] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  useEffect(() => {
    if (!containerRef.current) return;
    const updateBorderLocation = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setBorderLocation({
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom
        });
      }
    };
    updateBorderLocation();
    const resizeObserver = new ResizeObserver(updateBorderLocation);
    return resizeObserver.observe(containerRef.current), window.addEventListener("resize", updateBorderLocation), () => {
      containerRef.current && resizeObserver.unobserve(containerRef.current), resizeObserver.disconnect(), window.removeEventListener("resize", updateBorderLocation);
    };
  }, [containerRef]);
  const dragStartListeners = useRef(/* @__PURE__ */ new Set()), dragEndListeners = useRef(/* @__PURE__ */ new Set()), registerDragStart = useCallback((cb) => (dragStartListeners.current.add(cb), () => dragStartListeners.current.delete(cb)), []), registerDragEnd = useCallback((cb) => (dragEndListeners.current.add(cb), () => dragEndListeners.current.delete(cb)), []), emitDragStart = useCallback(() => {
    onDragStart && onDragStart(), dragStartListeners.current.forEach((cb) => cb());
  }, [onDragStart]), emitDragEnd = useCallback(() => {
    onDragEnd && onDragEnd(), dragEndListeners.current.forEach((cb) => cb());
  }, [onDragEnd]), contextValue = {
    borderLocation,
    snapAreas,
    registerDragStart,
    registerDragEnd,
    emitDragStart,
    emitDragEnd
  };
  return /* @__PURE__ */ jsx(DraggableContext.Provider, { value: contextValue, children });
};
function useDraggable(config2) {
  const providerData = useContext(DraggableContext), latestProviderDataRef = useRef(providerData);
  useEffect(() => {
    latestProviderDataRef.current = providerData;
  }, [providerData]);
  const movingElementRef = useRef(null), dragInitiatorRef = useRef(null), [movingElementNode, setMovingElementNode] = useState(null), [dragInitiatorNode, setDragInitiatorNode] = useState(null), mouseToDraggableCenterOffsetRef = useRef(null), mouseDownPosRef = useRef(null), currentMousePosRef = useRef(null), isDraggingRef = useRef(!1), persistedRelativeCenterRef = useRef(config2.initialRelativeCenter), [currentSnapArea, setCurrentSnapArea] = useState(null), {
    startThreshold = 3,
    areaSnapThreshold = 60,
    // px, default threshold for snapping
    onDragStart,
    onDragEnd,
    initialSnapArea,
    springStiffness = 0.2,
    // Default spring stiffness
    springDampness = 0.55
    // Default spring dampness
    // initialRelativeCenter is used to initialize persistedRelativeCenterRef
  } = config2, animatedPositionRef = useRef(null), velocityRef = useRef({ x: 0, y: 0 }), hasAnimatedOnceRef = useRef(!1);
  useEffect(() => {
    if (initialSnapArea && providerData && providerData.borderLocation && providerData.snapAreas && providerData.snapAreas[initialSnapArea] && !isDraggingRef.current) {
      const { top, left, right, bottom } = providerData.borderLocation, width = right - left, height = bottom - top, center = {
        topLeft: { x: left, y: top },
        topRight: { x: right, y: top },
        bottomLeft: { x: left, y: bottom },
        bottomRight: { x: right, y: bottom }
      }[initialSnapArea];
      if (center && width > 0 && height > 0) {
        const relX = (center.x - left) / width, relY = (center.y - top) / height;
        persistedRelativeCenterRef.current = { x: relX, y: relY };
      } else center && console.warn(
        "useDraggable: Container for initialSnapArea has zero width or height. Cannot calculate relative center from snap area. Falling back to initialRelativeCenter or undefined."
      );
    }
  }, [initialSnapArea, providerData]);
  function getSnapAreaCenters(borderLocation) {
    const { top, left, right, bottom } = borderLocation, centerX = (left + right) / 2;
    return {
      topLeft: { x: left, y: top },
      topCenter: { x: centerX, y: top },
      topRight: { x: right, y: top },
      bottomLeft: { x: left, y: bottom },
      bottomCenter: { x: centerX, y: bottom },
      bottomRight: { x: right, y: bottom }
    };
  }
  const updateDraggablePosition = useCallback(() => {
    var _a, _b;
    const draggableEl = movingElementRef.current;
    if (!draggableEl) return;
    const draggableWidth = draggableEl.offsetWidth, draggableHeight = draggableEl.offsetHeight, offsetParent = draggableEl.offsetParent;
    let parentViewportLeft = 0, parentViewportTop = 0, parentWidth = window.innerWidth, parentHeight = window.innerHeight;
    if (offsetParent) {
      const opRect = offsetParent.getBoundingClientRect();
      parentViewportLeft = opRect.left, parentViewportTop = opRect.top, parentWidth = offsetParent.offsetWidth || window.innerWidth, parentHeight = offsetParent.offsetHeight || window.innerHeight;
    }
    let targetViewportCenterX = null, targetViewportCenterY = null;
    const currentDesiredRelativeCenter = persistedRelativeCenterRef.current;
    let snapArea = null, snapTarget = null;
    const provider = latestProviderDataRef.current;
    let isTopHalf = !0, isLeftHalf = !0;
    if (isDraggingRef.current && mouseToDraggableCenterOffsetRef.current && currentMousePosRef.current && provider && provider.borderLocation && provider.snapAreas) {
      const dragCenter = {
        x: currentMousePosRef.current.x - mouseToDraggableCenterOffsetRef.current.x,
        y: currentMousePosRef.current.y - mouseToDraggableCenterOffsetRef.current.y
      }, areaCenters = getSnapAreaCenters(provider.borderLocation);
      let minDist = Number.POSITIVE_INFINITY, closestArea = null, closestCenter = null;
      for (const area in provider.snapAreas)
        if (provider.snapAreas[area]) {
          const center = areaCenters[area];
          if (!center) continue;
          const dist = Math.hypot(
            center.x - dragCenter.x,
            center.y - dragCenter.y
          );
          dist < minDist && (minDist = dist, closestArea = area, closestCenter = center);
        }
      closestArea && closestCenter && minDist <= areaSnapThreshold && (snapArea = closestArea, snapTarget = closestCenter), isLeftHalf = (dragCenter.x - parentViewportLeft) / parentWidth <= 0.5, isTopHalf = (dragCenter.y - parentViewportTop) / parentHeight <= 0.5;
    }
    if (isDraggingRef.current && snapTarget)
      targetViewportCenterX = snapTarget.x, targetViewportCenterY = snapTarget.y, setCurrentSnapArea(snapArea), isLeftHalf = (snapTarget.x - parentViewportLeft) / parentWidth <= 0.5, isTopHalf = (snapTarget.y - parentViewportTop) / parentHeight <= 0.5;
    else if (isDraggingRef.current && mouseToDraggableCenterOffsetRef.current && currentMousePosRef.current)
      targetViewportCenterX = currentMousePosRef.current.x - mouseToDraggableCenterOffsetRef.current.x, targetViewportCenterY = currentMousePosRef.current.y - mouseToDraggableCenterOffsetRef.current.y, setCurrentSnapArea(null), isLeftHalf = (targetViewportCenterX - parentViewportLeft) / parentWidth <= 0.5, isTopHalf = (targetViewportCenterY - parentViewportTop) / parentHeight <= 0.5;
    else {
      if (currentDesiredRelativeCenter && parentWidth > 0 && parentHeight > 0) {
        if (isTopHalf = currentDesiredRelativeCenter.y <= 0.5, isLeftHalf = currentDesiredRelativeCenter.x <= 0.5, isLeftHalf) {
          const targetCenterXInParent = parentWidth * currentDesiredRelativeCenter.x;
          targetViewportCenterX = parentViewportLeft + targetCenterXInParent;
        } else {
          const targetCenterXInParent = parentWidth * (1 - currentDesiredRelativeCenter.x);
          targetViewportCenterX = parentViewportLeft + parentWidth - targetCenterXInParent;
        }
        if (isTopHalf) {
          const targetCenterYInParent = parentHeight * currentDesiredRelativeCenter.y;
          targetViewportCenterY = parentViewportTop + targetCenterYInParent;
        } else {
          const targetCenterYInParent = parentHeight * (1 - currentDesiredRelativeCenter.y);
          targetViewportCenterY = parentViewportTop + parentHeight - targetCenterYInParent;
        }
      } else {
        !((_a = movingElementRef.current) != null && _a.style.left) && !((_b = movingElementRef.current) != null && _b.style.top) && console.warn(
          "useDraggable: Cannot determine position. Parent has no dimensions or initialRelativeCenter was not effectively set."
        );
        return;
      }
      setCurrentSnapArea(null);
    }
    if (targetViewportCenterX === null || targetViewportCenterY === null)
      return;
    const { borderLocation } = latestProviderDataRef.current || {
      borderLocation: void 0
    };
    if (borderLocation && draggableWidth > 0 && draggableHeight > 0) {
      const providerRectWidth = borderLocation.right - borderLocation.left, providerRectHeight = borderLocation.bottom - borderLocation.top;
      let clampedCenterX = targetViewportCenterX, clampedCenterY = targetViewportCenterY;
      if (draggableWidth >= providerRectWidth)
        clampedCenterX = borderLocation.left + providerRectWidth / 2;
      else {
        const minX = borderLocation.left + draggableWidth / 2, maxX = borderLocation.right - draggableWidth / 2;
        clampedCenterX = Math.max(minX, Math.min(clampedCenterX, maxX));
      }
      if (draggableHeight >= providerRectHeight)
        clampedCenterY = borderLocation.top + providerRectHeight / 2;
      else {
        const minY = borderLocation.top + draggableHeight / 2, maxY = borderLocation.bottom - draggableHeight / 2;
        clampedCenterY = Math.max(minY, Math.min(clampedCenterY, maxY));
      }
      targetViewportCenterX = clampedCenterX, targetViewportCenterY = clampedCenterY;
    }
    if (!animatedPositionRef.current) {
      animatedPositionRef.current = {
        x: targetViewportCenterX,
        y: targetViewportCenterY
      }, velocityRef.current = { x: 0, y: 0 };
      const targetElementStyleX2 = targetViewportCenterX - draggableWidth / 2, targetElementStyleY2 = targetViewportCenterY - draggableHeight / 2, elStyle2 = draggableEl.style;
      if (elStyle2.right = "", elStyle2.bottom = "", elStyle2.left = "", elStyle2.top = "", isLeftHalf) {
        const styleLeftPx = targetElementStyleX2 - parentViewportLeft;
        elStyle2.left = parentWidth > 0 ? \`\${(styleLeftPx / parentWidth * 100).toFixed(2)}%\` : "0px", elStyle2.right = "";
      } else {
        const styleRightPx = parentViewportLeft + parentWidth - (targetElementStyleX2 + draggableWidth);
        elStyle2.right = parentWidth > 0 ? \`\${(styleRightPx / parentWidth * 100).toFixed(2)}%\` : "0px", elStyle2.left = "";
      }
      if (isTopHalf) {
        const styleTopPx = targetElementStyleY2 - parentViewportTop;
        elStyle2.top = parentHeight > 0 ? \`\${(styleTopPx / parentHeight * 100).toFixed(2)}%\` : "0px", elStyle2.bottom = "";
      } else {
        const styleBottomPx = parentViewportTop + parentHeight - (targetElementStyleY2 + draggableHeight);
        elStyle2.bottom = parentHeight > 0 ? \`\${(styleBottomPx / parentHeight * 100).toFixed(2)}%\` : "0px", elStyle2.top = "";
      }
      hasAnimatedOnceRef.current = !0;
      return;
    }
    if (!hasAnimatedOnceRef.current) {
      hasAnimatedOnceRef.current = !0;
      return;
    }
    const pos = animatedPositionRef.current, vel = velocityRef.current, dx = targetViewportCenterX - pos.x, dy = targetViewportCenterY - pos.y, ax = springStiffness * dx - springDampness * vel.x, ay = springStiffness * dy - springDampness * vel.y;
    vel.x += ax, vel.y += ay, pos.x += vel.x, pos.y += vel.y;
    const threshold = 0.5;
    Math.abs(dx) < threshold && Math.abs(dy) < threshold && Math.abs(vel.x) < threshold && Math.abs(vel.y) < threshold && (pos.x = targetViewportCenterX, pos.y = targetViewportCenterY, vel.x = 0, vel.y = 0), animatedPositionRef.current = { ...pos }, velocityRef.current = { ...vel };
    const targetElementStyleX = pos.x - draggableWidth / 2, targetElementStyleY = pos.y - draggableHeight / 2, elStyle = draggableEl.style;
    if (elStyle.right = "", elStyle.bottom = "", elStyle.left = "", elStyle.top = "", isLeftHalf) {
      const styleLeftPx = targetElementStyleX - parentViewportLeft;
      elStyle.left = parentWidth > 0 ? \`\${(styleLeftPx / parentWidth * 100).toFixed(2)}%\` : "0px", elStyle.right = "";
    } else {
      const styleRightPx = parentViewportLeft + parentWidth - (targetElementStyleX + draggableWidth);
      elStyle.right = parentWidth > 0 ? \`\${(styleRightPx / parentWidth * 100).toFixed(2)}%\` : "0px", elStyle.left = "";
    }
    if (isTopHalf) {
      const styleTopPx = targetElementStyleY - parentViewportTop;
      elStyle.top = parentHeight > 0 ? \`\${(styleTopPx / parentHeight * 100).toFixed(2)}%\` : "0px", elStyle.bottom = "";
    } else {
      const styleBottomPx = parentViewportTop + parentHeight - (targetElementStyleY + draggableHeight);
      elStyle.bottom = parentHeight > 0 ? \`\${(styleBottomPx / parentHeight * 100).toFixed(2)}%\` : "0px", elStyle.top = "";
    }
    (Math.abs(pos.x - targetViewportCenterX) > threshold || Math.abs(pos.y - targetViewportCenterY) > threshold || Math.abs(vel.x) > threshold || Math.abs(vel.y) > threshold || isDraggingRef.current) && requestAnimationFrame(updateDraggablePosition);
  }, [areaSnapThreshold, springStiffness, springDampness]), [wasDragged, setWasDragged] = useState(!1), mouseUpHandler = useCallback(
    (_e) => {
      var _a;
      if (isDraggingRef.current) {
        onDragEnd && onDragEnd(), (_a = latestProviderDataRef.current) != null && _a.emitDragEnd && latestProviderDataRef.current.emitDragEnd(), setWasDragged(!0), setTimeout(() => setWasDragged(!1), 0);
        const draggableEl = movingElementRef.current, provider = latestProviderDataRef.current;
        if (draggableEl && provider && provider.borderLocation) {
          const draggableWidth = draggableEl.offsetWidth, draggableHeight = draggableEl.offsetHeight, offsetParent = draggableEl.offsetParent;
          let parentViewportLeft = 0, parentViewportTop = 0, parentWidth = window.innerWidth, parentHeight = window.innerHeight;
          if (offsetParent) {
            const opRect = offsetParent.getBoundingClientRect();
            parentViewportLeft = opRect.left, parentViewportTop = opRect.top, parentWidth = offsetParent.offsetWidth || window.innerWidth, parentHeight = offsetParent.offsetHeight || window.innerHeight;
          }
          let releasedCenterX = 0, releasedCenterY = 0;
          currentMousePosRef.current && mouseToDraggableCenterOffsetRef.current ? (releasedCenterX = currentMousePosRef.current.x - mouseToDraggableCenterOffsetRef.current.x, releasedCenterY = currentMousePosRef.current.y - mouseToDraggableCenterOffsetRef.current.y) : animatedPositionRef.current && (releasedCenterX = animatedPositionRef.current.x, releasedCenterY = animatedPositionRef.current.y);
          const borderLocation = provider.borderLocation, minX = borderLocation.left + draggableWidth / 2, maxX = borderLocation.right - draggableWidth / 2, minY = borderLocation.top + draggableHeight / 2, maxY = borderLocation.bottom - draggableHeight / 2;
          releasedCenterX = Math.max(minX, Math.min(releasedCenterX, maxX)), releasedCenterY = Math.max(minY, Math.min(releasedCenterY, maxY));
          const areaCenters = getSnapAreaCenters(borderLocation);
          let minDist = Number.POSITIVE_INFINITY, closestArea = null, closestCenter = null;
          for (const area in provider.snapAreas)
            if (provider.snapAreas[area]) {
              const center = areaCenters[area];
              if (!center) continue;
              const dist = Math.hypot(
                center.x - releasedCenterX,
                center.y - releasedCenterY
              );
              dist < minDist && (minDist = dist, closestArea = area, closestCenter = center);
            }
          if (closestArea && closestCenter) {
            setCurrentSnapArea(closestArea);
            const relX = (closestCenter.x - parentViewportLeft) / parentWidth, relY = (closestCenter.y - parentViewportTop) / parentHeight;
            persistedRelativeCenterRef.current = { x: relX, y: relY };
          } else {
            setCurrentSnapArea(null);
            const relX = (releasedCenterX - parentViewportLeft) / parentWidth, relY = (releasedCenterY - parentViewportTop) / parentHeight;
            persistedRelativeCenterRef.current = { x: relX, y: relY };
          }
        }
      }
      mouseDownPosRef.current = null, isDraggingRef.current = !1, window.removeEventListener("mousemove", mouseMoveHandler, {
        capture: !0
      }), window.removeEventListener("mouseup", mouseUpHandler, {
        capture: !0
      }), movingElementRef.current && (movingElementRef.current.style.userSelect = ""), document.body.style.userSelect = "", document.body.style.cursor = "";
    },
    [onDragEnd]
  ), mouseMoveHandler = useCallback(
    (e2) => {
      var _a;
      if (!mouseDownPosRef.current) return;
      Math.hypot(
        e2.clientX - mouseDownPosRef.current.x,
        e2.clientY - mouseDownPosRef.current.y
      ) > startThreshold && !isDraggingRef.current && (isDraggingRef.current = !0, movingElementRef.current && (movingElementRef.current.style.userSelect = "none"), document.body.style.userSelect = "none", document.body.style.cursor = "grabbing", onDragStart && onDragStart(), (_a = latestProviderDataRef.current) != null && _a.emitDragStart && latestProviderDataRef.current.emitDragStart(), requestAnimationFrame(updateDraggablePosition)), currentMousePosRef.current = { x: e2.clientX, y: e2.clientY };
    },
    [startThreshold, onDragStart, updateDraggablePosition]
  ), mouseDownHandler = useCallback(
    (e2) => {
      if (e2.button !== 0)
        return;
      const handleNode = dragInitiatorRef.current, draggableItemNode = movingElementRef.current;
      if (handleNode) {
        if (!handleNode.contains(e2.target) && e2.target !== handleNode)
          return;
      } else if (draggableItemNode) {
        if (!draggableItemNode.contains(e2.target) && e2.target !== draggableItemNode)
          return;
      } else {
        console.error(
          "Draggable element or handle ref not set in mouseDownHandler"
        );
        return;
      }
      if (mouseDownPosRef.current = { x: e2.clientX, y: e2.clientY }, !movingElementRef.current) {
        console.error("Draggable element ref not set in mouseDownHandler");
        return;
      }
      const rect = movingElementRef.current.getBoundingClientRect(), currentDraggableCenterX = rect.left + rect.width / 2, currentDraggableCenterY = rect.top + rect.height / 2;
      mouseToDraggableCenterOffsetRef.current = {
        x: e2.clientX - currentDraggableCenterX,
        y: e2.clientY - currentDraggableCenterY
      }, window.addEventListener("mousemove", mouseMoveHandler, {
        capture: !0
      }), window.addEventListener("mouseup", mouseUpHandler, {
        capture: !0
      });
    },
    [mouseMoveHandler, mouseUpHandler]
  );
  useEffect(() => {
    const elementToListenOn = dragInitiatorNode || movingElementNode;
    return elementToListenOn && elementToListenOn.addEventListener("mousedown", mouseDownHandler), () => {
      elementToListenOn && elementToListenOn.removeEventListener("mousedown", mouseDownHandler), isDraggingRef.current && (onDragEnd && onDragEnd(), isDraggingRef.current = !1, movingElementNode && (movingElementNode.style.userSelect = ""), document.body.style.userSelect = "", document.body.style.cursor = "", window.removeEventListener("mousemove", mouseMoveHandler, {
        capture: !0
      }), window.removeEventListener("mouseup", mouseUpHandler, {
        capture: !0
      }));
    };
  }, [
    movingElementNode,
    dragInitiatorNode,
    mouseDownHandler,
    onDragEnd,
    mouseMoveHandler,
    mouseUpHandler
  ]), useEffect(() => {
    movingElementRef.current && providerData && providerData.borderLocation && // Needed for calculations within updateDraggablePosition
    persistedRelativeCenterRef.current && // Ensure we have a center to position to
    !isDraggingRef.current && // Not currently dragging
    !hasAnimatedOnceRef.current && requestAnimationFrame(() => {
      movingElementRef.current && updateDraggablePosition();
    });
  }, [
    movingElementNode,
    // Run when element is available/changes
    providerData,
    // Run if provider context changes (for borderLocation)
    config2.initialRelativeCenter,
    // If this changes, persistedRelativeCenterRef might be re-initialized
    initialSnapArea,
    // If this changes, an effect updates persistedRelativeCenterRef
    updateDraggablePosition
    // Memoized callback for positioning
    // hasAnimatedOnceRef is intentionally not a dep, its current value is checked inside.
  ]);
  const draggableRefCallback = useCallback((node) => {
    setMovingElementNode(node), movingElementRef.current = node;
  }, []), handleRefCallback = useCallback((node) => {
    setDragInitiatorNode(node), dragInitiatorRef.current = node;
  }, []);
  return {
    draggableRef: draggableRefCallback,
    handleRef: handleRefCallback,
    position: {
      snapArea: currentSnapArea,
      isTopHalf: persistedRelativeCenterRef.current ? persistedRelativeCenterRef.current.y <= 0.5 : !0,
      isLeftHalf: persistedRelativeCenterRef.current ? persistedRelativeCenterRef.current.x <= 0.5 : !0
    },
    wasDragged
  };
}
function ToolbarSection({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "fade-in slide-in-from-right-2 flex max-h-sm max-w-full animate-in snap-start flex-col items-center justify-between gap-1 py-0.5", children });
}
function ToolbarItem(props) {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex w-full shrink-0 items-center justify-center", children: [
    props.children,
    props.badgeContent && /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "bg-blue-600 text-white",
          props.badgeClassName,
          "pointer-events-none absolute right-0 bottom-0 flex h-3 w-max min-w-3 max-w-8 select-none items-center justify-center truncate rounded-full px-0.5 font-semibold text-[0.5em]"
        ),
        children: props.badgeContent
      }
    ),
    props.statusDot && /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "bg-rose-600",
          props.statusDotClassName,
          "pointer-events-none absolute top-0 right-0 size-1.5 rounded-full"
        )
      }
    )
  ] });
}
const ToolbarButton = forwardRef(
  ({
    badgeContent,
    badgeClassName,
    statusDot,
    statusDotClassName,
    tooltipHint,
    variant = "default",
    active,
    ...props
  }, ref) => {
    const button = /* @__PURE__ */ jsx(
      H$1,
      {
        ref,
        ...props,
        className: cn(
          "flex items-center justify-center rounded-full p-1 text-zinc-950 ring ring-transparent transition-all duration-150 hover:bg-zinc-950/5",
          variant === "default" ? "size-8" : "h-8 rounded-full",
          active && "bg-white/40 ring-zinc-950/20",
          props.className
        )
      }
    );
    return /* @__PURE__ */ jsx(
      ToolbarItem,
      {
        badgeContent,
        badgeClassName,
        statusDot,
        statusDotClassName,
        children: button
      }
    );
  }
);
ToolbarButton.displayName = "ToolbarButton";
const Logo = ({
  color = "default",
  loading = !1,
  loadingSpeed = "slow",
  ...props
}) => {
  const colorStyle = {
    default: "fill-stagewise-700 stroke-none",
    black: "fill-zinc-950 stroke-none",
    white: "fill-white stroke-none",
    zinc: "fill-zinc-500/50 stroke-none",
    current: "fill-current stroke-none",
    gradient: "fill-white stroke-black/30 stroke-1"
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: \`relative \${color === "gradient" ? "overflow-hidden rounded-full" : "overflow-visible"} \${props.className || ""} \${loading ? "drop-shadow-xl" : ""} aspect-square\`,
      children: [
        color === "gradient" && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 size-full bg-gradient-to-tr from-indigo-700 via-blue-500 to-teal-500" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 size-9/12 bg-[radial-gradient(circle,rgba(219,39,119,0.2)_0%,rgba(219,39,119,0)_100%)]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute right-1/2 bottom-1/2 size-full bg-[radial-gradient(circle,rgba(219,39,119,0.2)_0%,rgba(219,39,119,0)_100%)]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-[-10%] size-[120%] bg-[radial-gradient(circle,rgba(255,255,255,0)_60%,rgba(255,255,255,0.2)_70%)]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-[-20%] left-0 h-[120%] w-full bg-[radial-gradient(circle,rgba(55,48,163,0)_55%,rgba(55,48,163,0.35)_73%)]" })
        ] }),
        /* @__PURE__ */ jsxs(
          "svg",
          {
            className: \`absolute overflow-visible \${color === "gradient" ? "top-[25%] left-[25%] h-[50%] w-[50%] drop-shadow-indigo-950 drop-shadow-xs" : "top-0 left-0 h-full w-full"}\`,
            viewBox: "0 0 2048 2048",
            children: [
              /* @__PURE__ */ jsx("title", { children: "stagewise" }),
              /* @__PURE__ */ jsx(
                "ellipse",
                {
                  className: colorStyle[color] + (loading ? " animate-pulse" : ""),
                  id: "path3",
                  ry: "624",
                  rx: "624",
                  cy: "1024",
                  cx: "1024"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: \`absolute overflow-visible \${color === "gradient" ? "top-[25%] left-[25%] h-[50%] w-[50%]" : "top-0 left-0 h-full w-full"}\`,
            viewBox: "0 0 2048 2048",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                id: "path4",
                className: \`origin-center \${colorStyle[color]}\${loading ? loadingSpeed === "fast" ? " animate-spin-fast" : " animate-spin-slow" : ""}\`,
                d: "M 1024 0 A 1024 1024 0 0 0 0 1024 A 1024 1024 0 0 0 1024 2048 L 1736 2048 L 1848 2048 C 1958.7998 2048 2048 1958.7998 2048 1848 L 2048 1736 L 2048 1024 A 1024 1024 0 0 0 1024 0 z M 1024.9414 200 A 824 824 0 0 1 1848.9414 1024 A 824 824 0 0 1 1024.9414 1848 A 824 824 0 0 1 200.94141 1024 A 824 824 0 0 1 1024.9414 200 z "
              }
            )
          }
        )
      ]
    }
  );
}, SettingsButton = ({
  onOpenPanel,
  isActive = !1
}) => /* @__PURE__ */ jsx(ToolbarSection, { children: /* @__PURE__ */ jsx(ToolbarButton, { onClick: onOpenPanel, active: isActive, children: /* @__PURE__ */ jsx(Settings, { className: "size-4" }) }) }), SettingsPanel = () => /* @__PURE__ */ jsxs(Panel, { children: [
  /* @__PURE__ */ jsx(PanelHeader, { title: "Settings" }),
  /* @__PURE__ */ jsx(PanelContent, { children: /* @__PURE__ */ jsx(ConnectionSettings, {}) }),
  /* @__PURE__ */ jsx(PanelContent, { children: /* @__PURE__ */ jsx(ProjectInfoSection, {}) })
] }), ConnectionSettings = () => {
  const {
    windows,
    isDiscovering,
    discoveryError,
    discover,
    selectedSession,
    selectSession
  } = useVSCode(), handleSessionChange = (e2) => {
    const target = e2.target, selectedSessionId = target.value === "" ? void 0 : target.value;
    selectSession(selectedSessionId);
  }, { appName } = useVSCode(), handleRefresh = () => {
    discover();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 pb-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(
        "label",
        {
          htmlFor: "session-select",
          className: "mb-2 block font-medium text-sm text-zinc-700",
          children: [
            "IDE Window ",
            appName && \`(\${appName})\`
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center space-x-2", children: [
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "session-select",
            value: (selectedSession == null ? void 0 : selectedSession.sessionId) || "",
            onChange: handleSessionChange,
            className: "h-8 min-w-0 flex-1 rounded-lg border border-zinc-300 bg-zinc-500/10 px-3 text-sm backdrop-saturate-150 focus:border-zinc-500 focus:outline-none",
            disabled: isDiscovering,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", disabled: !0, children: windows.length > 0 ? "Select an IDE window..." : "No windows available" }),
              windows.map((window2) => /* @__PURE__ */ jsxs("option", { value: window2.sessionId, children: [
                window2.displayName,
                " - Port ",
                window2.port
              ] }, window2.sessionId))
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleRefresh,
            disabled: isDiscovering,
            className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-500/10 backdrop-saturate-150 transition-colors hover:bg-zinc-500/20 disabled:opacity-50",
            title: "Refresh window list",
            children: /* @__PURE__ */ jsx(
              RefreshCw,
              {
                className: \`size-4 \${isDiscovering ? "animate-spin" : ""}\`
              }
            )
          }
        )
      ] }),
      discoveryError && /* @__PURE__ */ jsxs("p", { className: "mt-1 text-red-600 text-sm", children: [
        "Error discovering windows: ",
        discoveryError
      ] }),
      !isDiscovering && windows.length === 0 && !discoveryError && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-zinc-500", children: "No IDE windows found. Make sure the Stagewise extension is installed and running." })
    ] }),
    selectedSession && /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-blue-50 p-3", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-blue-800 text-sm", children: [
        /* @__PURE__ */ jsx("strong", { children: "Selected:" }),
        " ",
        selectedSession.displayName
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-blue-600 text-xs", children: [
        "Session ID: ",
        selectedSession.sessionId.substring(0, 8),
        "..."
      ] })
    ] }),
    !selectedSession && windows.length > 0 && /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-amber-50 p-3", children: /* @__PURE__ */ jsxs("p", { className: "text-amber-800 text-sm", children: [
      /* @__PURE__ */ jsx("strong", { children: "No window selected:" }),
      " Please select an IDE window above to connect."
    ] }) })
  ] });
}, ProjectInfoSection = () => /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-xs text-zinc-700", children: [
  /* @__PURE__ */ jsxs("div", { className: "my-2 flex flex-wrap items-center gap-3", children: [
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: "https://github.com/stagewise-io/stagewise",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center gap-1 text-blue-700 hover:underline",
        title: "GitHub Repository",
        children: [
          /* @__PURE__ */ jsx("svg", { width: "16", height: "16", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" }) }),
          "GitHub"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: "https://discord.gg/gkdGsDYaKA",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center gap-1 text-indigo-700 hover:underline",
        title: "Join our Discord",
        children: [
          /* @__PURE__ */ jsx("svg", { width: "16", height: "16", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M20.317 4.369A19.791 19.791 0 0 0 16.885 3.2a.117.117 0 0 0-.124.06c-.537.96-1.13 2.22-1.552 3.2a18.524 18.524 0 0 0-5.418 0c-.423-.98-1.016-2.24-1.553-3.2a.117.117 0 0 0-.124-.06A19.736 19.736 0 0 0 3.683 4.369a.105.105 0 0 0-.047.043C.533 9.043-.32 13.579.099 18.057a.12.12 0 0 0 .045.083c1.934 1.426 3.81 2.288 5.671 2.857a.116.116 0 0 0 .127-.043c.438-.602.827-1.24 1.165-1.908a.112.112 0 0 0-.062-.158c-.619-.234-1.205-.52-1.77-.853a.117.117 0 0 1-.012-.194c.119-.09.238-.183.353-.277a.112.112 0 0 1 .114-.013c3.747 1.71 7.789 1.71 11.533 0a.112.112 0 0 1 .115.012c.115.094.234.188.353.278a.117.117 0 0 1-.012.194c-.565.333-1.151.619-1.77.853a.112.112 0 0 0-.062.158c.34.668.728 1.306 1.165 1.908a.115.115 0 0 0 .127.043c1.861-.569 3.737-1.431 5.671-2.857a.12.12 0 0 0 .045-.083c.5-5.177-.838-9.673-3.636-13.645a.105.105 0 0 0-.047-.043zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.095 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.96 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.095 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z" }) }),
          "Discord"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: "https://marketplace.visualstudio.com/items?itemName=stagewise.stagewise-vscode-extension",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center gap-1 text-violet-700 hover:underline",
        title: "VS Code Marketplace",
        children: [
          /* @__PURE__ */ jsx("svg", { width: "16", height: "16", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M21.805 2.29a2.25 2.25 0 0 0-2.45-.49l-7.5 3.25a2.25 2.25 0 0 0-1.31 2.06v1.13l-5.13 2.22a2.25 2.25 0 0 0-1.31 2.06v3.5a2.25 2.25 0 0 0 1.31 2.06l5.13 2.22v1.13a2.25 2.25 0 0 0 1.31 2.06l7.5 3.25a2.25 2.25 0 0 0 2.45-.49A2.25 2.25 0 0 0 23 20.25V3.75a2.25 2.25 0 0 0-1.195-1.46zM12 20.25v-16.5l7.5 3.25v10l-7.5 3.25z" }) }),
          "VS Code Marketplace"
        ]
      }
    )
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
    /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Contact:" }),
    " ",
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "mailto:sales@stagewise.io",
        className: "text-blue-700 hover:underline",
        children: "sales@stagewise.io"
      }
    )
  ] }),
  /* @__PURE__ */ jsx("div", { className: "mt-2 text-zinc-500", children: /* @__PURE__ */ jsxs("span", { children: [
    "Licensed under AGPL v3.",
    " ",
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "https://github.com/stagewise-io/stagewise/blob/main/LICENSE",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "hover:underline",
        children: "View license"
      }
    )
  ] }) })
] });
function DisconnectedStatePanel({
  discover,
  discoveryError
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-orange-200 bg-orange-50/90 p-4 shadow-lg backdrop-blur", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(WifiOff, { className: "size-5 text-orange-600" }),
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-orange-800", children: "Not Connected" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-orange-700 text-sm", children: [
      /* @__PURE__ */ jsx("p", { children: "The stagewise toolbar isn't connected to any IDE window." }),
      discoveryError && /* @__PURE__ */ jsxs("div", { className: "rounded border border-red-200 bg-red-100 p-2 text-red-700", children: [
        /* @__PURE__ */ jsx("strong", { children: "Error:" }),
        " ",
        discoveryError
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "To connect:" }),
        /* @__PURE__ */ jsxs("ol", { className: "list-inside list-decimal space-y-1 pl-2 text-xs", children: [
          /* @__PURE__ */ jsx("li", { children: "Open your IDE (Cursor, Windsurf, etc.)" }),
          /* @__PURE__ */ jsx("li", { children: "Install the stagewise extension" }),
          /* @__PURE__ */ jsx("li", { children: "Make sure the extension is active" }),
          /* @__PURE__ */ jsx("li", { children: "Click refresh below" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: discover,
          className: "flex w-full items-center justify-center gap-2 rounded-md bg-orange-600 px-3 py-2 font-medium text-sm text-white transition-colors hover:bg-orange-700",
          children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: "size-4" }),
            "Retry Connection"
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "border-orange-200 border-t pt-2", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://marketplace.visualstudio.com/items?itemName=stagewise.stagewise-vscode-extension",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-orange-600 text-xs hover:text-orange-800 hover:underline",
          children: "Get VS Code Extension →"
        }
      ) })
    ] })
  ] });
}
function ConnectingStatePanel() {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-blue-200 bg-blue-50/90 p-4 shadow-lg backdrop-blur", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(RefreshCw, { className: "size-5 animate-spin text-blue-600" }),
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-blue-800", children: "Connecting..." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-blue-700 text-sm", children: /* @__PURE__ */ jsxs("p", { children: [
      "Looking for active agent instances...",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "text-blue-500 text-xs", children: "VS Code, Cursor, Windsurf ..." })
    ] }) })
  ] });
}
function WindowSelectionPanel() {
  const {
    windows,
    isDiscovering,
    discoveryError,
    discover,
    selectedSession,
    selectSession,
    appName
  } = useVSCode(), handleSessionChange = (e2) => {
    const target = e2.target, selectedSessionId = target.value === "" ? void 0 : target.value;
    selectSession(selectedSessionId);
  }, handleRefresh = () => {
    discover();
  };
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-blue-200 bg-blue-50/90 p-4 shadow-lg backdrop-blur", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-blue-800", children: "Select IDE Window" }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: "window-selection-select",
            className: "mb-2 block font-medium text-blue-700 text-sm",
            children: [
              "IDE Window ",
              appName && \`(\${appName})\`
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center space-x-2", children: [
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "window-selection-select",
              value: (selectedSession == null ? void 0 : selectedSession.sessionId) || "",
              onChange: handleSessionChange,
              className: "h-8 min-w-0 flex-1 rounded-lg border border-blue-300 bg-white/80 px-3 text-sm backdrop-saturate-150 focus:border-blue-500 focus:outline-none",
              disabled: isDiscovering,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", disabled: !0, children: windows.length > 0 ? "Select an IDE window..." : "No windows available" }),
                windows.map((window2) => /* @__PURE__ */ jsxs("option", { value: window2.sessionId, children: [
                  window2.displayName,
                  " - Port ",
                  window2.port
                ] }, window2.sessionId))
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleRefresh,
              disabled: isDiscovering,
              className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100/80 backdrop-saturate-150 transition-colors hover:bg-blue-200/80 disabled:opacity-50",
              title: "Refresh window list",
              children: /* @__PURE__ */ jsx(
                RefreshCw,
                {
                  className: \`size-4 text-blue-600 \${isDiscovering ? "animate-spin" : ""}\`
                }
              )
            }
          )
        ] }),
        discoveryError && /* @__PURE__ */ jsxs("p", { className: "mt-1 text-red-600 text-sm", children: [
          "Error discovering windows: ",
          discoveryError
        ] }),
        !isDiscovering && windows.length === 0 && !discoveryError && /* @__PURE__ */ jsx("p", { className: "mt-1 text-blue-600 text-sm", children: "No IDE windows found. Make sure the Stagewise extension is installed and running." })
      ] }),
      selectedSession && /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-blue-100/80 p-3", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-blue-800 text-sm", children: [
          /* @__PURE__ */ jsx("strong", { children: "Selected:" }),
          " ",
          selectedSession.displayName
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-blue-600 text-xs", children: [
          "Session ID: ",
          selectedSession.sessionId.substring(0, 8),
          "..."
        ] })
      ] }),
      !selectedSession && /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-blue-200 bg-white/90 p-3", children: /* @__PURE__ */ jsxs("p", { className: "text-blue-800 text-sm", children: [
        /* @__PURE__ */ jsx("strong", { children: "No window selected:" }),
        " Please select an IDE window above to connect."
      ] }) })
    ] })
  ] });
}
function NormalStateButtons({
  handleButtonClick,
  pluginBox,
  setPluginBox,
  openPanel,
  setOpenPanel,
  chatState
}) {
  const pluginsWithActions = usePlugins().plugins.filter(
    (plugin) => plugin.onActionClick
  );
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      SettingsButton,
      {
        onOpenPanel: () => setOpenPanel(openPanel === "settings" ? null : "settings"),
        isActive: openPanel === "settings"
      }
    ),
    pluginsWithActions.length > 0 && /* @__PURE__ */ jsx(ToolbarSection, { children: pluginsWithActions.map((plugin) => /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: handleButtonClick(() => {
          (pluginBox == null ? void 0 : pluginBox.pluginName) !== plugin.pluginName ? plugin.onActionClick() && setPluginBox({
            component: plugin.onActionClick(),
            pluginName: plugin.pluginName
          }) : setPluginBox(null);
        }),
        active: (pluginBox == null ? void 0 : pluginBox.pluginName) === plugin.pluginName,
        children: plugin.iconSvg ? /* @__PURE__ */ jsx("span", { className: "size-4 stroke-zinc-950 text-zinc-950 *:size-full", children: plugin.iconSvg }) : /* @__PURE__ */ jsx(Puzzle, { className: "size-4" })
      },
      plugin.pluginName
    )) }),
    /* @__PURE__ */ jsx(ToolbarSection, { children: /* @__PURE__ */ jsx(
      ToolbarButton,
      {
        onClick: handleButtonClick(
          () => chatState.isPromptCreationActive ? chatState.stopPromptCreation() : chatState.startPromptCreation()
        ),
        active: chatState.isPromptCreationActive,
        children: /* @__PURE__ */ jsx(MessageCircle, { className: "size-4 stroke-zinc-950" })
      }
    ) })
  ] });
}
function DisconnectedStateButtons() {
  const { discover, isDiscovering } = useVSCode();
  return /* @__PURE__ */ jsx(ToolbarSection, { children: /* @__PURE__ */ jsx(
    ToolbarButton,
    {
      onClick: isDiscovering ? void 0 : () => discover(),
      className: cn(
        isDiscovering ? "text-blue-700" : "text-orange-700 hover:bg-orange-200"
      ),
      children: /* @__PURE__ */ jsx(
        RefreshCw,
        {
          className: cn("size-4", isDiscovering && "animate-spin")
        }
      )
    }
  ) });
}
function ToolbarDraggableBox() {
  const provider = useContext(DraggableContext), borderLocation = provider == null ? void 0 : provider.borderLocation, isReady = !!borderLocation && borderLocation.right - borderLocation.left > 0 && borderLocation.bottom - borderLocation.top > 0, draggable = useDraggable({
    startThreshold: 10,
    initialSnapArea: "bottomRight"
  }), {
    windows,
    isDiscovering,
    discoveryError,
    discover,
    shouldPromptWindowSelection
  } = useVSCode(), isConnected = windows.length > 0, [pluginBox, setPluginBox] = useState(null), [openPanel, setOpenPanel] = useState(null), chatState = useChatState(), { minimized, minimize, expand } = useAppState();
  useEffect(() => {
    minimized && (setPluginBox(null), setOpenPanel(null));
  }, [minimized]);
  const handleButtonClick = (handler) => (e2) => {
    if (draggable.wasDragged) {
      e2.preventDefault(), e2.stopPropagation();
      return;
    }
    handler();
  };
  if (!isReady) return null;
  const isLoadingState = isDiscovering, isDisconnectedState = !isConnected && !isDiscovering, isConnectedState = isConnected, shouldShowWindowSelection = shouldPromptWindowSelection && isConnectedState, theme = isLoadingState ? {
    border: "border-blue-300",
    bg: "bg-blue-100/80",
    divideBorder: "divide-blue-200",
    buttonBg: "from-blue-600 to-sky-600",
    buttonColor: "text-blue-700"
  } : isDisconnectedState ? {
    border: "border-orange-300",
    bg: "bg-orange-100/80",
    divideBorder: "divide-orange-200",
    buttonBg: "from-orange-600 to-red-600",
    buttonColor: "text-orange-700"
  } : {
    border: "border-border/30",
    bg: "bg-zinc-50/80",
    divideBorder: "divide-border/20",
    buttonBg: "from-sky-700 to-fuchsia-700",
    buttonColor: "stroke-zinc-950"
  }, getMinimizedIcon = () => isLoadingState ? /* @__PURE__ */ jsx(RefreshCw, { className: "size-4 animate-spin text-white" }) : isDisconnectedState ? /* @__PURE__ */ jsx(WifiOff, { className: "size-4 text-white" }) : /* @__PURE__ */ jsx(Logo, { className: "size-4.5", color: "white" });
  return /* @__PURE__ */ jsxs("div", { ref: draggable.draggableRef, className: "absolute p-0.5", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "absolute flex h-[calc(100vh-32px)] w-96 max-w-[40vw] items-stretch justify-end transition-all duration-300 ease-out",
          draggable.position.isTopHalf ? "top-0 flex-col-reverse" : "bottom-0 flex-col",
          draggable.position.isLeftHalf ? "left-[100%]" : "right-[100%]"
        ),
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "flex min-h-0 flex-1 origin-bottom-right flex-col items-stretch px-2 transition-all duration-300 ease-out",
                (pluginBox || openPanel === "settings" || !isConnectedState || shouldShowWindowSelection) && !minimized ? "pointer-events-auto scale-100 opacity-100 blur-none" : "pointer-events-none h-0 scale-50 opacity-0 blur-md",
                draggable.position.isTopHalf ? "justify-start" : "justify-end",
                draggable.position.isTopHalf ? draggable.position.isLeftHalf ? "origin-top-left" : "origin-top-right" : draggable.position.isLeftHalf ? "origin-bottom-left" : "origin-bottom-right"
              ),
              children: [
                isLoadingState && /* @__PURE__ */ jsx(ConnectingStatePanel, {}),
                isDisconnectedState && /* @__PURE__ */ jsx(
                  DisconnectedStatePanel,
                  {
                    discover,
                    discoveryError
                  }
                ),
                shouldShowWindowSelection && /* @__PURE__ */ jsx(WindowSelectionPanel, {}),
                isConnectedState && openPanel === "settings" && !shouldShowWindowSelection && /* @__PURE__ */ jsx(SettingsPanel, {}),
                isConnectedState && !shouldShowWindowSelection && (pluginBox == null ? void 0 : pluginBox.component)
              ]
            }
          ),
          isConnectedState && /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "z-20 w-full px-2 transition-all duration-300 ease-out",
                chatState.isPromptCreationActive && !minimized ? "pointer-events-auto scale-100 opacity-100 blur-none" : "pointer-events-none h-0 scale-50 opacity-0 blur-md",
                draggable.position.isTopHalf ? "mb-2" : "mt-2",
                draggable.position.isTopHalf ? draggable.position.isLeftHalf ? "origin-top-left" : "origin-top-right" : draggable.position.isLeftHalf ? "origin-bottom-left" : "origin-bottom-right"
              ),
              children: /* @__PURE__ */ jsx(ToolbarChatArea, {})
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: draggable.handleRef,
        className: cn(
          "pointer-events-auto z-50 rounded-full border px-0.5 shadow-md backdrop-blur transition-all duration-300 ease-out",
          theme.border,
          theme.bg,
          draggable.position.isTopHalf ? "flex-col-reverse divide-y-reverse" : "flex-col",
          minimized ? "h-9.5 w-9.5" : "h-[calc-size(auto,size)] h-auto w-auto"
        ),
        children: [
          /* @__PURE__ */ jsx(
            H$1,
            {
              onClick: () => expand(),
              className: cn(
                "absolute right-0 left-0 z-50 flex size-9 origin-center cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr transition-all duration-300 ease-out",
                theme.buttonBg,
                minimized ? "pointer-events-auto scale-100 opacity-100 blur-none" : "pointer-events-none scale-25 opacity-0 blur-md",
                draggable.position.isTopHalf ? "top-0" : "bottom-0"
              ),
              children: getMinimizedIcon()
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "flex h-[calc-size(auto)] scale-100 items-center justify-center divide-y transition-all duration-300 ease-out",
                theme.divideBorder,
                draggable.position.isTopHalf ? "origin-top flex-col-reverse divide-y-reverse" : "origin-bottom flex-col",
                minimized && "pointer-events-none h-0 scale-50 opacity-0 blur-md"
              ),
              children: [
                isConnectedState ? /* @__PURE__ */ jsx(
                  NormalStateButtons,
                  {
                    handleButtonClick,
                    pluginBox,
                    setPluginBox,
                    openPanel,
                    setOpenPanel,
                    chatState
                  }
                ) : /* @__PURE__ */ jsx(DisconnectedStateButtons, {}),
                /* @__PURE__ */ jsx(ToolbarSection, { children: /* @__PURE__ */ jsx(
                  ToolbarButton,
                  {
                    onClick: handleButtonClick(() => minimize()),
                    className: cn(
                      "h-5",
                      theme.buttonColor,
                      draggable.position.isTopHalf ? "rounded-t-3xl rounded-b-lg" : "rounded-t-lg rounded-b-3xl"
                    ),
                    children: draggable.position.isTopHalf ? /* @__PURE__ */ jsx(ChevronUp, { className: "size-4" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "size-4" })
                  }
                ) })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function ToolbarArea() {
  const containerRef = useRef(null);
  return /* @__PURE__ */ jsx("div", { className: "absolute size-full", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-4", ref: containerRef, children: /* @__PURE__ */ jsx(
    DraggableProvider,
    {
      containerRef,
      snapAreas: {
        topLeft: !0,
        topRight: !0,
        bottomLeft: !0,
        bottomRight: !0,
        topCenter: !0,
        bottomCenter: !0
      },
      children: /* @__PURE__ */ jsx(ToolbarDraggableBox, {})
    }
  ) }) });
}
function ElementSelector(props) {
  const lastHoveredElement = useRef(null), handleMouseMove = useCallback(
    (event) => {
      if (event.target.closest(".companion")) return;
      const refElement = getElementAtPoint(event.clientX, event.clientY);
      props.ignoreList.includes(refElement) || lastHoveredElement.current !== refElement && (lastHoveredElement.current = refElement, props.onElementHovered(refElement));
    },
    [props]
  ), handleMouseLeave = useCallback(() => {
    lastHoveredElement.current = null, props.onElementUnhovered();
  }, [props]), handleMouseClick = useCallback(
    (event) => {
      event.preventDefault(), event.stopPropagation(), lastHoveredElement.current && (props.ignoreList.includes(lastHoveredElement.current) || props.onElementSelected(lastHoveredElement.current));
    },
    [props]
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "pointer-events-auto fixed inset-0 h-screen w-screen cursor-copy",
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onClick: handleMouseClick,
      role: "button",
      tabIndex: 0
    }
  );
}
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  }), handleResize = useCallback(
    () => setSize({
      width: window.innerWidth,
      height: window.innerHeight
    }),
    []
  );
  return useEventListener("resize", handleResize), size;
}
function useCyclicUpdate(func, frameRate) {
  const animationFrameHandle = useRef(void 0), timeBetweenFrames = useMemo(
    () => 1e3 / frameRate,
    [frameRate]
  ), lastCallFrameTime = useRef(0), update = useCallback(
    (frameTime) => {
      frameTime - lastCallFrameTime.current >= timeBetweenFrames && (func(), lastCallFrameTime.current = frameTime), animationFrameHandle.current = requestAnimationFrame(update);
    },
    [func, timeBetweenFrames]
  );
  useEffect(() => (animationFrameHandle.current = requestAnimationFrame(update), () => {
    animationFrameHandle.current && (cancelAnimationFrame(animationFrameHandle.current), animationFrameHandle.current = void 0);
  }), [frameRate, update]);
}
function ContextItemProposal({
  refElement,
  ...props
}) {
  const boxRef = useRef(null), windowSize = useWindowSize(), { plugins } = usePlugins(), hoveredElementPluginContext = useMemo(() => refElement ? plugins.filter(
    (plugin) => plugin.onContextElementSelect
  ).map((plugin) => {
    var _a;
    return {
      pluginName: plugin.pluginName,
      context: (_a = plugin.onContextElementSelect) == null ? void 0 : _a.call(plugin, refElement)
    };
  }) : [], [refElement]), updateBoxPosition = useCallback(() => {
    if (boxRef.current)
      if (refElement) {
        const referenceRect = refElement.getBoundingClientRect();
        boxRef.current.style.top = \`\${referenceRect.top - 2}px\`, boxRef.current.style.left = \`\${referenceRect.left - 2}px\`, boxRef.current.style.width = \`\${referenceRect.width + 4}px\`, boxRef.current.style.height = \`\${referenceRect.height + 4}px\`, boxRef.current.style.display = void 0;
      } else
        boxRef.current.style.height = "0px", boxRef.current.style.width = "0px", boxRef.current.style.top = \`\${windowSize.height / 2}px\`, boxRef.current.style.left = \`\${windowSize.width / 2}px\`, boxRef.current.style.display = "none";
  }, [refElement, windowSize.height, windowSize.width]);
  return useCyclicUpdate(updateBoxPosition, 30), /* @__PURE__ */ jsxs(
    "div",
    {
      ...props,
      className: "fixed flex items-center justify-center rounded-lg border-2 border-blue-600/80 bg-blue-600/20 text-white transition-all duration-100",
      style: { zIndex: 1e3 },
      ref: boxRef,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute top-0.5 left-0.5 flex w-full flex-row items-start justify-start gap-1", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-row items-center justify-center gap-0.5 overflow-hidden rounded-md bg-zinc-700/80 px-1 py-0 font-medium text-white text-xs", children: /* @__PURE__ */ jsx("span", { className: "truncate", children: refElement.tagName.toLowerCase() }) }),
          hoveredElementPluginContext.filter((plugin) => plugin.context.annotation).map((plugin) => {
            var _a;
            return /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-center gap-0.5 overflow-hidden rounded-md bg-zinc-700/80 px-1 py-0 font-medium text-white text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "size-3 shrink-0 stroke-white text-white *:size-full", children: (_a = plugins.find((p2) => p2.pluginName === plugin.pluginName)) == null ? void 0 : _a.iconSvg }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: plugin.context.annotation })
            ] });
          })
        ] }),
        /* @__PURE__ */ jsx(Plus, { className: "size-6 drop-shadow-black drop-shadow-md" })
      ]
    }
  );
}
function ContextItem({
  refElement,
  pluginContext,
  ...props
}) {
  const boxRef = useRef(null), windowSize = useWindowSize(), updateBoxPosition = useCallback(() => {
    if (boxRef.current)
      if (refElement) {
        const referenceRect = refElement.getBoundingClientRect();
        boxRef.current.style.top = \`\${referenceRect.top}px\`, boxRef.current.style.left = \`\${referenceRect.left}px\`, boxRef.current.style.width = \`\${referenceRect.width}px\`, boxRef.current.style.height = \`\${referenceRect.height}px\`, boxRef.current.style.display = void 0;
      } else
        boxRef.current.style.height = "0px", boxRef.current.style.width = "0px", boxRef.current.style.top = \`\${windowSize.height / 2}px\`, boxRef.current.style.left = \`\${windowSize.width / 2}px\`, boxRef.current.style.display = "none";
  }, [refElement, windowSize.height, windowSize.width]);
  useCyclicUpdate(updateBoxPosition, 30);
  const chatState = useChatState(), handleDeleteClick = useCallback(() => {
    chatState.removeChatDomContext(chatState.currentChatId, refElement);
  }, [chatState, refElement]), { plugins } = usePlugins();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...props,
      className: "pointer-events-auto fixed flex cursor-pointer items-center justify-center rounded-lg border-2 border-green-600/80 bg-green-600/5 text-transparent transition-all duration-0 hover:border-red-600/80 hover:bg-red-600/20 hover:text-white",
      ref: boxRef,
      onClick: handleDeleteClick,
      role: "button",
      tabIndex: 0,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute top-0.5 left-0.5 flex w-full flex-row items-start justify-start gap-1", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-row items-center justify-center gap-0.5 overflow-hidden rounded-md bg-zinc-700/80 px-1 py-0 font-medium text-white text-xs", children: /* @__PURE__ */ jsx("span", { className: "truncate", children: refElement.tagName.toLowerCase() }) }),
          pluginContext.filter((plugin) => plugin.context.annotation).map((plugin) => {
            var _a;
            return /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-center gap-0.5 overflow-hidden rounded-md bg-zinc-700/80 px-1 py-0 font-medium text-white text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "size-3 shrink-0 stroke-white text-white *:size-full", children: (_a = plugins.find((p2) => p2.pluginName === plugin.pluginName)) == null ? void 0 : _a.iconSvg }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: plugin.context.annotation })
            ] });
          })
        ] }),
        /* @__PURE__ */ jsx(Trash2, { className: "size-6 drop-shadow-black drop-shadow-md" })
      ]
    }
  );
}
function SelectorCanvas() {
  const {
    chats,
    currentChatId,
    addChatDomContext,
    isPromptCreationActive,
    promptState
  } = useChatState(), currentChat = useMemo(
    () => chats.find((chat) => chat.id === currentChatId),
    [currentChatId, chats]
  ), shouldShow = isPromptCreationActive && promptState !== "loading", contextElements = useMemo(() => (currentChat == null ? void 0 : currentChat.domContextElements) || [], [currentChat]), [hoveredElement, setHoveredElement] = useState(
    null
  ), addElementToContext = useCallback(
    (el) => {
      addChatDomContext(currentChatId, el);
    },
    [addChatDomContext, currentChatId]
  );
  return shouldShow ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
    hoveredElement && /* @__PURE__ */ jsx(ContextItemProposal, { refElement: hoveredElement }),
    /* @__PURE__ */ jsx(
      ElementSelector,
      {
        ignoreList: contextElements.map((el) => el.element),
        onElementHovered: setHoveredElement,
        onElementSelected: addElementToContext,
        onElementUnhovered: () => setHoveredElement(null)
      }
    ),
    contextElements.map((el) => /* @__PURE__ */ jsx(ContextItem, { refElement: el.element, pluginContext: el.pluginContext }))
  ] }) : null;
}
function DesktopLayout() {
  return /* @__PURE__ */ jsxs("div", { className: cn("fixed inset-0 h-screen w-screen"), children: [
    /* @__PURE__ */ jsx(SelectorCanvas, {}),
    /* @__PURE__ */ jsx(ToolbarArea, {})
  ] });
}
function MainAppBlocker() {
  const { isMainAppBlocked } = useAppState();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "fixed inset-0 h-screen w-screen",
        isMainAppBlocked ? "pointer-events-auto" : "pointer-events-none"
      ),
      role: "button",
      tabIndex: 0
    }
  );
}
function App(config2) {
  return /* @__PURE__ */ jsxs(AppStateProvider, { children: [
    /* @__PURE__ */ jsx(MainAppBlocker, {}),
    /* @__PURE__ */ jsxs(ContextProviders, { config: config2, children: [
      /* @__PURE__ */ jsx(HotkeyListener, {}),
      /* @__PURE__ */ jsx(DesktopLayout, {})
    ] })
  ] });
}
const styleNode = document.createElement("style");
styleNode.textContent = appStyle;
document.head.appendChild(styleNode);
createRoot(document.body).render(
  createElement(StrictMode, null, createElement(App, config))
);
`,"plugin-ui.js":`import { j as clsx, c as cn, b as usePlugins } from "panel-C1evgHYw.js";
import { d, f, k, e } from "panel-C1evgHYw.js";
import { jsx } from "react/jsx-runtime";
const falsyToString = (value) => typeof value == "boolean" ? \`\${value}\` : value === 0 ? "0" : value, cx = clsx, cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config == null ? void 0 : config.variants) == null) return cx(base, props == null ? void 0 : props.class, props == null ? void 0 : props.className);
  const { variants, defaultVariants } = config, getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props == null ? void 0 : props[variant], defaultVariantProp = defaultVariants == null ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  }), propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    return value === void 0 || (acc[key] = value), acc;
  }, {}), getCompoundVariantClassNames = config == null || (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props == null ? void 0 : props.class, props == null ? void 0 : props.className);
}, badgeVariants = cva("rounded-md p-2", {
  variants: {
    color: {
      blue: "",
      green: "",
      red: "",
      yellow: "",
      purple: "",
      orange: "",
      pink: ""
    },
    style: {
      default: "text-white",
      outline: "border text-zinc-950"
    }
  },
  compoundVariants: [
    {
      style: "default",
      color: "blue",
      className: "bg-blue-500"
    },
    {
      style: "default",
      color: "green",
      className: "bg-green-500"
    },
    {
      style: "default",
      color: "red",
      className: "bg-red-500"
    },
    {
      style: "default",
      color: "yellow",
      className: "bg-yellow-500"
    },
    {
      style: "default",
      color: "purple",
      className: "bg-purple-500"
    },
    {
      style: "default",
      color: "orange",
      className: "bg-orange-500"
    },
    {
      style: "default",
      color: "pink",
      className: "bg-pink-500"
    },
    {
      style: "outline",
      color: "blue",
      className: "border-blue-500"
    },
    {
      style: "outline",
      color: "green",
      className: "border-green-500"
    },
    {
      style: "outline",
      color: "red",
      className: "border-red-500"
    },
    {
      style: "outline",
      color: "yellow",
      className: "border-yellow-500"
    },
    {
      style: "outline",
      color: "purple",
      className: "border-purple-500"
    },
    {
      style: "outline",
      color: "orange",
      className: "border-orange-500"
    },
    {
      style: "outline",
      color: "pink",
      className: "border-pink-500"
    }
  ],
  defaultVariants: {
    color: "blue",
    style: "default"
  }
});
function Badge({ children, color, style, className }) {
  return /* @__PURE__ */ jsx("span", { className: cn(badgeVariants({ color, style }), className), children });
}
function Button({
  children,
  variant = "primary",
  size = "md",
  asChild,
  ...props
}) {
  return asChild ? /* @__PURE__ */ jsx("button", { ...props, className: "cursor-pointer", children }) : /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: cn(
        "flex h-12 cursor-pointer items-center justify-center rounded-lg px-4 py-2 font-medium text-sm text-white",
        size === "sm" && "h-8",
        size === "md" && "h-12",
        size === "lg" && "h-16",
        variant === "primary" && "bg-blue-600",
        variant === "secondary" && "bg-zinc-500/40",
        variant === "outline" && "border border-zinc-500 bg-white text-blue-500",
        variant === "ghost" && "bg-transparent text-blue-500"
      ),
      type: "submit",
      children
    }
  );
}
const useToolbar = () => usePlugins().toolbarContext;
export {
  Badge,
  Button,
  d as Panel,
  f as PanelContent,
  k as PanelFooter,
  e as PanelHeader,
  useToolbar
};
`};function a(e={}){if(!("u">typeof window))return void console.warn("Stagewise Toolbar is not supported in non-browser environments.");if(document.querySelector("stagewise-toolbar"))return void console.warn("Stagewise Toolbar is already loaded - aborting init.");let t=document.createElement("stagewise-toolbar");t.style.display="block",t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.right="0",t.style.bottom="0",t.style.width="100vw",t.style.height="100vh",t.style.zIndex="2147483647",t.style.pointerEvents="none";let r=document.createElement("iframe");r.style.display="block",r.style.border="none",r.style.overflow="hidden",r.style.margin="0",r.style.padding="0",r.style.width="100vw",r.style.height="100vh",r.style.backgroundColor="transparent",r.style.pointerEvents="none",r.style.colorScheme="normal",r.sandbox.add("allow-same-origin"),r.sandbox.add("allow-scripts"),r.sandbox.add("allow-presentation"),r.sandbox.add("allow-pointer-lock"),r.setAttribute("allowtransparency","true"),r.srcdoc='<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="preconnect" href="https://rsms.me/"><link rel="stylesheet" href="https://rsms.me/inter/inter.css"></head><body style="pointer-events: none;"></body></html>',r.addEventListener("load",()=>{let t=!1,a=e=>{let s=r.contentDocument.elementFromPoint(e.clientX,e.clientY),a=s&&s!==document.body&&"HTML"!==s.tagName;a!==t&&(r.style.pointerEvents=a?"auto":"none",t=a)};window.addEventListener("mousemove",a,{capture:!0}),r.contentWindow.addEventListener("mousemove",a,{capture:!0});let o=Object.fromEntries(Object.entries(s).map(([e,t])=>[e,URL.createObjectURL(new Blob([t],{type:"text/javascript"}))]));if(o["@stagewise/toolbar/plugin-ui"]=URL.createObjectURL(new Blob(["export * from 'plugin-ui.js'"],{type:"text/javascript"})),e.plugins)for(let[t,r]of e.plugins.entries()){let e=URL.createObjectURL(new Blob([r.mainPlugin],{type:"text/javascript"}));o[`plugin-entry-${t}`]=e}let i=URL.createObjectURL(new Blob([function(e){var t,r;let s=(null==(t=e.plugins)?void 0:t.map((e,t)=>`import plugin${t} from 'plugin-entry-${t}'`).join(`
`))??"",a=`[${(null==(r=e.plugins)?void 0:r.map((e,t)=>`plugin${t}`).join(","))??""}]`,o=JSON.stringify({...e,plugins:"__PLUGIN_PLACEHOLDER__"});return o=o.replace('"__PLUGIN_PLACEHOLDER__"',a),`${s}

const config = ${o};

export default config;
`}(e)],{type:"text/javascript"}));o["@stagewise/toolbar/config"]=i;let n={react:"https://esm.sh/react@19.1.0","react-dom":"https://esm.sh/react-dom@19.1.0","react-dom/client":"https://esm.sh/react-dom@19.1.0/client","react/jsx-runtime":"https://esm.sh/react@19.1.0/jsx-runtime",...o},c=r.contentDocument.createElement("script");c.type="importmap",c.textContent=`{"imports":${JSON.stringify(n)}}`,r.contentDocument.head.appendChild(c);let l=r.contentDocument.createElement("script");l.type="module",l.textContent="import('index.js');",r.contentDocument.head.appendChild(l)}),t.appendChild(r),document.body.appendChild(t)}}}]);