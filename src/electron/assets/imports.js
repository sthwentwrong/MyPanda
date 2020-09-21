const links = document.querySelectorAll('link[rel="import"]')

function supportsImports() {
    mylinks = document.createElement('link')
    console.log(mylinks)
    return 'import' in mylinks
}

// Import and add each page to the DOM
if (supportsImports()){
    Array.prototype.forEach.call(links, (link) => {
        console.log(link)
        console.log(link.import)
        let template = link.import.querySelector('.task-template')
        let clone = document.importNode(template.content, true)
        if (link.href.match('about.html')) {
            document.querySelector('body').appendChild(clone)
        } else {
            document.querySelector('.content').appendChild(clone)
        }
    })
}else{
    console.log('DOES NOT SUPPORT IMPORT')
}

