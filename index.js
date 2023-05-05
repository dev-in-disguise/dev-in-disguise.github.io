document.addEventListener("DOMContentLoaded", (event) => {   
    // setup href click events
    Array.from(document.querySelectorAll('a')).filter(isContentLink).forEach(addContentStorageCapability);

    // set correct content on refresh
    if (
        (window.performance.navigation && window.performance.navigation.type === 1) 
      || 
      window.performance
          .getEntriesByType('navigation')
          .map((nav) => nav.type)
          .includes('reload')
    )
    {
        const sites = new Map([
            ['about', 'about.html'],
            ['home', 'home.html']
        ]);
        
        const initialState = localStorage.getItem('iframeContent');
        let site = sites.get(initialState); 

        if (site !== undefined) {
            document.getElementById('content-frame').src = site;
        } else {
            document.getElementById('content-frame').src = 'invalid-content.html'
        } 
    } else {
      document.getElementById('content-frame').src = 'home.html';
    }
});

function isContentLink(a) {
    return a.target === "content-frame";
}

function addContentStorageCapability(a) {
    a.addEventListener('click', (event) => {
        localStorage.setItem('iframeContent', a.dataset.linksTo);        
    });
}