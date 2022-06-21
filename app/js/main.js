const pages = document.getElementById("text-group").children;

function showPage(id){
    for (let i = 0; i < pages.length; i ++){
        var page = pages[i];
        if(page.id == id){
            page.style = "display: block !important;";
        }
        else{
            page.style = "display: none !important;";
        }
    }
}