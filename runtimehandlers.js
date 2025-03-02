/**
 * Executes a sequence of asynchronous middleware-like handlers around a core function.
 *
 * @param {Function} coreFunction - The main function to execute, which is treated as the last or first handler depending on mode.
 * @param {Function[]} [handlers=[]] - An array of middleware functions to execute before or after the core function.
 *      Each handler should be an async function accepting `next` and optional `context` parameters.
 * @param {Array} [context=[]] - Additional arguments to pass to each handler.
 * @param {Object} [options={ mode: "pre" }] - Execution mode options.
 * @param {("pre" | "post")} options.mode - Determines the order of execution:
 *      - `"pre"` (default): `handlers` execute before `coreFunction`.
 *      - `"post"`: `coreFunction` executes first, followed by `handlers`.
 *
 * @returns {Promise<void>} - Resolves when all handlers have completed execution.
 *
 * @example
 * async function middleware1(next, message) {
 *     console.log("Middleware 1:", message);
 *     await next();
 * }
 *
 * async function middleware2(next, message) {
 *     console.log("Middleware 2:", message);
 *     await next();
 * }
 *
 * async function mainFunction(next, message) {
 *     console.log("Main Function:", message);
 *     await next();
 * }
 *
 * runtimeHandlers(mainFunction, [middleware1, middleware2], ["Hello"], { mode: "pre" });
 * // Output:
 * // Middleware 1: Hello
 * // Middleware 2: Hello
 * // Main Function: Hello
 */
export async function runtimeHandlers(
	coreFunction,
	handlers = [],
	context = [],
	options = { mode: "pre" }
) {
	if (options.mode === "post") {
		handlers.unshift(coreFunction); // Add at the start
	} else {
		handlers.push(coreFunction); // Add at the end
	}

	const next = async () => {
		const handler = handlers.shift();
		if (handler) {
			try {
				await handler(next, ...context);
			} catch (error) {
				console.error("Middleware error:", error);
			}
		}
	};

	await next();
}
