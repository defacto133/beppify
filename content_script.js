walk(document.body);

if (window.MutationObserver) {
    var observer = new MutationObserver(function (mutations) {
            Array.prototype.forEach.call(mutations, function (m) {
                    if (m.type === 'childList') {
                        walk(m.target);
                    } else if (m.target.nodeType === 3) {
                        handleText(m.target);
                    }
            });
    });

    observer.observe(document.body, {
        childList: true,
        attributes: false,
        characterData: true,
        subtree: true
    });
}

function walk(node) {
    // I stole this function from here:
    // http://is.gd/mwZp7E

    var child, next;

    switch ( node.nodeType ) {
        case 1: // Element
        case 9: // Document
        case 11: // Document fragment
            child = node.firstChild;
            while ( child ) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case 3: // Text node
            handleText(node);
            break;
    }
}

function handleText(textNode) {
    var oldValue = textNode.nodeValue;
        v = oldValue;

    v = v.replace(/\b(silvio )?(berlusconi)\b/gi,
            function(match,p1,p2,offset,string) {
                if (p2 == "BERLUSCONI")
                    return "PSICONANO";
                return "Psiconano";
            });
    v = v.replace(/\b(matteo )?(renzi)\b/gi,
            function(match,p1,p2,offset,string) {
                if (p2 == "RENZI")
                    return "EBETINO";
                return "Ebetino";
            });
    v = v.replace(/\b(mario )?(monti)\b/gi, 
            function(match,p1,p2,offset,string) {
                if (p2 == "MONTI")
                    return "RIGOR MONTIS";
                return "Rigor Montis";
            });
    v = v.replace(/\b(enrico )?(letta)\b/gi,
            function(match,p1,p2,offset,string) {
                if (p2 == "letta")
                    return string;
                if (p2 == "LETTA")
                    return "CAPITAN FINDUS";
                return "Capitan Findus";
            });
    v = v.replace(/\b(pier luigi )?(bersani)\b/gi,
            function(match,p1,p2,offset,string) {
                if (p2 == "BERSANI")
                    return "GARGAMELLA";
                return "Gargamella";
            });
    v = v.replace(/\b(giorgio )?(napolitano)\b/gi,
            function(match,p1,p2,offset,string) {
                if (p2 == "NAPOLITANO")
                    return "MORFEO";
                return "Morfeo";
            });

    // avoid infinite series of DOM changes
    if (v !== oldValue) {
        textNode.nodeValue = v;
    }
}
