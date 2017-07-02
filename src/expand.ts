'use strict';

import * as vscode from 'vscode';

import { findClass, checkTree } from './find-class';

declare var obTree: object;

export function expand() {
    var obTree = {};
    let editor = vscode.window.activeTextEditor;

    let langId = editor.document.languageId;

    if (langId !== 'html' && langId !== 'typescriptreact' && langId != 'javascriptreact') {
        return;
    }

    let line = editor.selection.start.line;

    let range = new vscode.Range(new vscode.Position(line, 0), editor.selection.end);

    let text = editor.document.getText(range);

    if (!/&/.test(text)) {
        return;
    }

    let className: string = null;

    for (let i = line - 1; i > 0; i--) {
        let line = editor.document.lineAt(i);

        if (!checkTree(line.text, obTree, line)) {
            continue;
        }

        className = findClass(line.text);

        if (className != null) {
            break;
        }
    }

    if (className == null) {
        return;
    }

    let newText = text.replace(/&/g, className);

    editor.edit(editBuilder => {
        editBuilder.replace(range, newText);
    });

    let newPosition = new vscode.Position(line, newText.length);

    editor.selection = new vscode.Selection(newPosition, newPosition);
}
