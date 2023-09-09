// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');
// const xmlParser = require('fast-xml-parser');

const {XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	const res = await axios.get("https://blog.webdevsimplified.com/rss.xml");
	// console.log(xmlParser.parse(res.data))
	const parser = new XMLParser();
	const articles = parser.parse(res.data).rss.channel.item.map
	(article => {
		return {
			label: article.title,
			detail: article.description,
			link: article.link,
		}
	});
	console.log(articles);
	// console.log(parser.parse(res.data));
	// console.log(res.data)

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "wds-search-blog-example" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('wds-search-blog-example.helloWorld', 
	async function () {
		const article = await vscode.window.showQuickPick(articles, {
			matchOnDetail: true,
		})
		// The code you place here will be executed every time your command is executed
		console.log(article);
		if (article == null) return;
		vscode.env.openExternal(article.link);
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from WDS Search Blog Example!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
