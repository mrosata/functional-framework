const _console = console && typeof console === "object" ? console : {};
export const log = 'log' in _console ? console.log.bind(console) : () => {};
export const info = 'info' in _console ? console.info.bind(console) : () => {};
export const error = 'error' in _console ? console.error.bind(console) : () => {};
export const debug = 'debug' in _console ? console.debug.bind(console) : () => {};

export default {
}
