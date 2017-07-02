export function findClass(text): string | null {
    let match = text.match(/class="([^"]+)"|class='([^']+)|className="([^"]+)"|className='([^']+)'/);

    if (match != null) {
        return match.slice(1).find(m => m != null).split(' ')[0];
    }

    return null;
}

export function checkTree(text, obTree, line): boolean {
    let isClosed = is_closed(text);
    if (typeof isClosed.closed != "boolean") {
        obTree[obTree.length] = isClosed.closed.slice(0)[0];
    }
    if (typeof isClosed.opened != "boolean") {
        if (obTree.length == 0) {
            return true;
        }
        if (obTree.slice(-1)[0] == isClosed.opened.slice()[0]) {
            obTree.shift();
        }
    }

    return false;
}

function is_closed(text): any {
    let obReturn = {
        closed: false,
        unclosed: false,
        opened: false,
    };
    let match_closed = text.match(/<(\w+) .*>.*<\/(\w+)>/),
        match_unclosed = text.match(/<\w+ .*\/>$/),
        match_close = text.match(/[\s*]<\/(\w+)>$/),
        match_opened = text.match(/<(\w+) .*>[[\w-_]*]?$/);
    if (match_unclosed != null) {
        obReturn.unclosed = match_unclosed.slice(1);
        return obReturn;
    }
    if (match_close != null) {
        obReturn.closed = match_close.slice(1);
        return obReturn;
    }
    if (match_closed != null) {
        obReturn.closed = true;
        return obReturn;
    }
    if (match_opened != null) {
        obReturn.opened = match_opened.slice(1);
        return obReturn;
    }
    return obReturn;

}
