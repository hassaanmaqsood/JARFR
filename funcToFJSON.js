function funcToFJSON(func) {
	// Validate input
	if (typeof func !== "function") {
		throw new TypeError("Input must be a function");
	}

	// Convert function to string representation
	const funcString = func.toString().trim();

	// Extract function name
	const functionName = func.name || "anonymous";

	// Extract arguments
	let functionArgs = [];
	const argsRegex = /\(([^)]*)\)/;
	const argsMatch = funcString.match(argsRegex);
	if (argsMatch) {
		// Split and trim arguments, handling default values and destructuring
		functionArgs = argsMatch[1]
			.split(",")
			.map((arg) => arg.trim())
			.filter(Boolean);
	}

	// Extract function body
	let functionBody = null;
	if (funcString.includes("=>")) {
		// Arrow function body
		const arrowBodyMatch = funcString.match(/=>\s*(.+)$/);
		if (arrowBodyMatch) {
			functionBody = arrowBodyMatch[1].trim();
			if (!functionBody.startsWith("{")) {
				// Single-expression arrow function
				functionBody = `return ${functionBody};`;
			}
		}
	} else {
		// Regular function body
		const bodyRegex = /{([\s\S]*)}/;
		const bodyMatch = funcString.match(bodyRegex);
		if (bodyMatch) {
			functionBody = bodyMatch[1].trim();
		}
	}

	// Analyze arguments for advanced cases
	const parsedArgs = functionArgs.map((arg) => {
		const [name, defaultValue] = arg.split("=").map((part) => part.trim());
		const isRest = name.startsWith("...");
		return {
			name: isRest ? name.slice(3) : name,
			isRest,
			defaultValue: defaultValue || null,
			isDestructured: name.includes("{") || name.includes("["),
		};
	});

	// Return parsed details
	return {
		functionName,
		functionArgs: parsedArgs,
		functionBody,
		isArrowFunction: funcString.includes("=>"),
		isAsync: funcString.startsWith("async"),
		isGenerator: funcString.startsWith("function*"),
	};
}

function funcFromFJSON(fjson) {
	console.warn('⚠️ funcFromFJSON is unstable, use it carefully after modifying it to your specific use case');
	const argNames = fjson.functionArgs.map((arg) => arg.name);
	const func = new Function(...argNames, fjson.functionBody);

	// Wrap in async if needed
	return fjson.isAsync ? async (...args) => func(...args) : func;
}
