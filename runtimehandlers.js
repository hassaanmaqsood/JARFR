/**
 * Wraps a function with runtime middleware handlers that execute before and after it.
 * This allows dynamic insertion of pre-processing and post-processing logic.
 *
 * @param {Function} func - The core function to be executed, with middleware handlers surrounding it.
 * @returns {Function} A wrapped function that executes pre-handlers, the core function, and post-handlers in order.
 *                      The wrapped function also provides methods to add or remove middleware handlers.
 */
export function addRuntimeHandlers(func) {
    const handlers = { pre: [], post: [] };

    /**
     * Executes the function with pre- and post-middleware handlers.
     *
     * @param {...any} context - Arguments passed to the function and handlers.
     */
    const mod = (...context) => {
        // Construct execution pipeline: pre-handlers → core function → post-handlers
        const runtimeHandlers = [...handlers.pre, func, ...handlers.post];

        // Function to execute the next middleware in the sequence
        const next = () => {
            const handler = runtimeHandlers.shift();
            if (handler) {
                try {
                    handler(next, ...context);
                } catch (error) {
                    console.error("Middleware error:", error);
                }
            }
        };

        next();
    };

    /**
     * Adds a middleware handler to either the "pre" or "post" execution phase.
     *
     * @param {Function} handler - The middleware function to add.
     * @param {"pre" | "post"} [opt="pre"] - Specifies whether to add the handler to the pre- or post-execution phase.
     * @returns {Function} The wrapped function for chaining.
     */
    mod.addCallHandler = (handler, opt = "pre") => {
        handlers[opt].push(handler);
        return mod;
    };

    /**
     * Removes a previously added middleware handler.
     *
     * @param {Function} handler - The middleware function to remove.
     * @param {"pre" | "post"} [opt="pre"] - Specifies whether to remove the handler from the pre- or post-execution phase.
     * @returns {Function} The wrapped function for chaining.
     */
    mod.removeCallHandler = (handler, opt = "pre") => {
        handlers[opt] = handlers[opt].filter((h) => h !== handler);
        return mod;
    };

    return mod;
}
