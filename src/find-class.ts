export function findClass(text): string | null {
    let match = text.match(/class="([^"]+)"|class='([^']+)|className="([^"]+)"|className='([^']+)'/);

    if (match != null) {
        return match.slice(1).find(m => m != null).split(' ')[0];
    }

    return null;
}

export function checkTree(text, obTree): boolean {
    let isClosedVar = isClosed(text);
    if (typeof isClosedVar.closed != "boolean") {
        obTree[obTree.length] = isClosedVar.closed.slice(0)[0];
    }
    if (typeof isClosedVar.opened != "boolean") {
        if (obTree.length == 0) {
            return true;
        }
        if (obTree.slice(-1)[0] == isClosedVar.opened.slice()[0]) {
            obTree.shift();
        }
    }

    return false;
}

function isClosed(text): any {
    let obReturn = {
        closed: false,
        unclosed: false,
        opened: false,
    };
    let matchClosed = text.match(/<(\w+) .*>.*<\/(\w+)>/),
        matchUnclosed = text.match(/<\w+ .*\/>$/),
        matchClose = text.match(/[\s*]<\/(\w+)>$/),
        matchOpened = text.match(/<(\w+) .*>[[\w-_]*]?$/);
    if (matchUnclosed != null) {
        obReturn.unclosed = matchUnclosed.slice(1);
        return obReturn;
    }
    if (matchClose != null) {
        obReturn.closed = matchClose.slice(1);
        return obReturn;
    }
    if (matchClosed != null) {
        obReturn.closed = true;
        return obReturn;
    }
    if (matchOpened != null) {
        obReturn.opened = matchOpened.slice(1);
        return obReturn;
    }
    return obReturn;

}
