// BRANCH 2 TEST
function fetchTree(term) { 
    fetch('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext=1&titles='
    + term
    )
}
