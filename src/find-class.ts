export function findClass(text): string | null {
    let match = text.match(/class="([^"]+)"|class='([^']+)|className="([^"]+)"|className='([^']+)'/);

    if (match != null) {
        return match.slice(1).find(m => m != null).split(' ')[0];
    }

    return null;
}
