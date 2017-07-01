'use strict';

import * as vscode from 'vscode';

import { findClass } from './find-class';

export function expand() {
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

    for (let i = line; i > 0; i--) {
        let line = editor.document.lineAt(i);

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
