function addEventToElement(element){

    document.getElementById(element).addEventListener("keypress", (event)=> {
        console.log(event.key);
        if(event.key == 'Enter'){
            showSearchHitsOnly(element);
        }
    });
}