
// BRANCH 2 TEST
var formEl = $('#search');
var treeInputEl = $('#tree-input');
var searchlistDisplay = $('#saved');
var photoKey = "563492ad6f917000010000015dd2698482af4591a9033ef8047b5bf4";

var printTreeData = function (tree) {
  // add a class 
  var cardName = $('<li>').addClass('search-list').text(tree);
  searchlistDisplay.append(cardName);
};

var handleFormSubmit = function (event) {
  var treeInput = treeInputEl.val();
  if (!treeInput) {
    console.log('You need to fill out the form!');
    return;
  }
  printTreeData(treeInput);
  // reset form
  treeInputEl.val('');
};

formEl.on('submit', handleFormSubmit);

// Function to get and display photo
var getPhoto = () => {
    let tree = $('#tree-input').val();
    currentTree = $('#tree-input').val();
    // Set the queryURL to fetch from API
    let photoURL = `https://api.pexels.com/v1/search?query=${tree}&per_page=1&page=1`;
    $.ajax ({
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: this.photoKey
        },
        url: photoURL
    })
    .then(function(response) {
        currentPhoto = response.photos[0].id;
        console.log(currentPhoto);
      })
      .then((response) => {
            let photo = "https://images.pexels.com/photos/"+ currentPhoto + "/pexels-photo-"+currentPhoto+ ".jpeg?auto=compress&cs=tinysrgb&h=350";
            $('#display_images').html(`<img src="${photo}">`);
      })
}

// search button event listener   
$('#searchBtn').on("click", (event) => {
    event.preventDefault();
    currentTree = $('#tree-input').val();
    getPhoto();
    handleFormSubmit();
    });

// reset search button event listener
$('#resetBtn').on("click", (event) => {
    $('#saved').html("");
    $('#display_images').html("");
    })



