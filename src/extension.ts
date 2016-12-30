'use strict';

import * as vscode from 'vscode';

import { expand } from './expand';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.bemExpand', () => {
        expand();

        return vscode.commands.executeCommand('editor.emmet.action.expandAbbreviation');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}
