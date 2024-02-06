//    Local Storage -----------------------------------------------

function getLocalStoreg(){
        
    likes = [];
    if(localStorage.getItem('arrayLikes') != null){
        let test = localStorage.getItem('arrayLikes');

        let felder = test.split(',');
        felder.toString();
    
        for(let i = 0; i < felder.length; i++){
            likes.push(parseInt(felder[i]));
        }
    }
}

function saveToLocalStorage(array){
    localStorage.setItem("arrayLikes", array.toString());
}