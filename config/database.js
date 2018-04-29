if (process.env.NODE_ENV === 'production') {
	module.exports = {
		mongoURI: 'mongodb://morshinin:q3mvtobs@ds261929.mlab.com:61929/vidjot-prod'
	}
} else {
	module.exports = {
		mongoURI: 'mongodb://localhost/vidjot-dev'
	}
}