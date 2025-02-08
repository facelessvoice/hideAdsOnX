// Firefox extension 

function hideAdArticles() {
    document.querySelectorAll('*').forEach(element => {
        const spanChild = element.querySelector('span');
        if (spanChild && spanChild.textContent.trim() === "Ad") {
            console.log("Found Ad inside:", element);
            
            // Traverse up to find the nearest <article> parent (article parents are the closest parent that dont have generic/autogenerated div class)
            let parent = element;
            while (parent && parent.tagName !== "ARTICLE") {
                parent = parent.parentElement;
            }
            
            if (parent) {
                console.log("Hiding article:", parent);
                parent.style.display = "none";
            }
        }
    });
}

// Run on page load
hideAdArticles();

// Observe for dynamically loaded elements(it wont work without this, due to infinite scroll)
const observer = new MutationObserver(() => {
    hideAdArticles();
});

observer.observe(document.body, { childList: true, subtree: true });

