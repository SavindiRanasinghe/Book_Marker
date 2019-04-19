    document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(){
   // console.log('It work');
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteUrl').value;

    if(!validateForm(siteName,siteURL )){
        return false;
    }
    //creating an object
    var bookmark = {
        name: siteName,
        url: siteURL
    }
    console.log(bookmark);
    
    //local storage tests
//    localStorage.setItem('test', helloworld);
//    console.log(localStorage.getItem('test'));
//    localStorage.removeItem('test');
//    console.log(localStorage.getItem('test'));
    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        //add to the array
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    fetchBookmarks();

    //reset the form after entering a new bookmark
    document.getElementById('myForm').reset();
    //prevent form from submitting
    //e.preventDefault();
}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i = 0; i<bookmarks.length; i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks()   {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks);

    //Get output id
    var bookmarkResults = document.getElementById('bookmarksResult');

    //Build the output
    bookmarkResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++ ){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+
                                      ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                      '</h3>'+
                                      '</div>';
    }
}

function validateForm(siteName,siteURL ){

    if(!siteName || !siteURL){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('Please use a valid URL');
        return false;
    }
    return true;
}
//https://www.youtube.com/watch?v=DIVfDZZeGxM