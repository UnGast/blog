/*
**  Nuxt
*/
const http = require('http')
const { Nuxt, Builder } = require('nuxt')
let nuxtUrl
let config = require('./nuxt.config.js')
config.hooks = {
	'vue-renderer': {
		context (context) {
			context.electronBaseUrl = nuxtUrl
		}
	}
}
config.rootDir = __dirname // for electron-builder
// Init Nuxt.js

// Listen the server
async function startServer () {
	const nuxt = new Nuxt(config)
	await nuxt.ready()
	const builder = new Builder(nuxt)
	const server = http.createServer(nuxt.render)
	// Build only in dev mode
	if (config.dev) {
		builder.build().catch(err => {
			console.error(err) // eslint-disable-line no-console
			process.exit(1)
		})
	}
	server.listen()
	nuxtUrl = `http://localhost:${server.address().port}`
	console.log(`Nuxt working on ${nuxtUrl}`)

	/*
	** Electron
	*/
	let win = null // Current window
	const electron = require('electron')
	const path = require('path')
	const app = electron.app
	const newWin = async () => {
		win = new electron.BrowserWindow({
			icon: path.join(__dirname, 'static/icon.png')
		})
		win.maximize()
		win.on('closed', () => win = null)
		if (config.dev) {
			// Install vue dev tool and open chrome dev tools
			const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
			installExtension(VUEJS_DEVTOOLS.id).then(name => {
				console.log(`Added Extension:  ${name}`)
				win.webContents.openDevTools()
			}).catch(err => console.log('An error occurred: ', err))
			// Wait for nuxt to build
			const pollServer = () => {
				http.get(nuxtUrl, (res) => {
					if (res.statusCode === 200) { win.loadURL(nuxtUrl) } else { setTimeout(pollServer, 300) }
				}).on('error', pollServer)
			}
			pollServer()
		} else {
			console.log('loaded', nuxtUrl)
			await win.loadURL(nuxtUrl)
		}
	}
	app.whenReady().then(newWin)
	//app.on('window-all-closed', () => app.quit())
	//app.on('activate', () => win === null && newWin())
}

startServer()


