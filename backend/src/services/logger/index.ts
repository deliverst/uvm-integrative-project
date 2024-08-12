const debugMode = process.env.ENV === 'development'

// This is a simple index service that logs messages to the console, might add some additional index eventually..... maybe.....
export const logger = {
	log: (...params: unknown[]) => {
		if (debugMode) {
			console.log(...params)
		}
	},
	error: (...params: unknown[]) => {
		if (debugMode) {
			console.error(...params)
		}
	},
	warn: (...params: unknown[]) => {
		if (debugMode) {
			console.warn(...params)
		}
	},
	info: (...params: unknown[]) => {
		if (debugMode) {
			console.info(...params)
		}
	},
	debug: (...params: unknown[]) => {
		if (debugMode) {
			console.debug(...params)
		}
	},
}

