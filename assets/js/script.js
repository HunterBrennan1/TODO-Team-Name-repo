
// BRANCH 2 TEST
var formEl = $('#search');
var treeInputEl = $('#tree-input');
var searchlistDisplay = $('#saved');
var photoKey = "563492ad6f917000010000015dd2698482af4591a9033ef8047b5bf4"
var species = ['oak','spruce','sequoia','pine','elm','maple','birch','sycamore','larch','magnolia','cypress','poplar','chestnut','cedar','basswood','fir','hemlock'];
var saveList = $('#saved');
var clear = $('#clear');
var wiki = $('#wiki');

var treesArray = localStorage.getItem('trees');
console.log(typeof treesArray, treesArray);
if(treesArray !== null) {
    trees = JSON.parse(treesArray);
    console.log(typeof trees, trees);
    for(i = 0; i < trees.length; i++) {
        saveList.append('<li>' + trees[i]);
        $('li').addClass('search-list');
    }
}

var printTreeData = function (input) {
  $('li').remove();
  console.log(input);
  var trees2 = JSON.parse(localStorage.getItem('trees'));
  console.log(trees2);
  if(trees2 == null){
    trees2 = [];
  }
  if(trees2.includes(input) == false && trees2.length < 9) {
    console.log(trees2);
    trees2.unshift(input);
    console.log(trees2);
  } else if (trees2.length = 9) {
    console.log(trees2);
    trees.pop();
    console.log(trees2);
    trees2.unshift(input);
    console.log(trees2);
  }
  localStorage.setItem('trees', JSON.stringify(trees2));
  for(i = 0; i < trees2.length; i++) {
    saveList.append('<li>' + trees2[i]);
    $('li').addClass('search-list');
  }
}

var handleFormSubmit = function (event) {

  var treeInput = treeInputEl.val();
  if(species.includes(treeInput) == false){
    $('#paragraph').text('Never heard of it!');
    treeInputEl.val('');
    wiki.text('WIKI');
    $('#display_images').html(`<img src="https://i.imgur.com/qFmcbT0.jpg" width="50%" height="50%">`);
    $('#paragraph').text('');
    $('#readmore').text('');
    console.log('does not');
    return 1;
  }

console.log('does');
  if (!treeInput) {
    console.log('You need to fill out the form!');
    return;
  }

  printTreeData(treeInput);
};

formEl.on('submit', handleFormSubmit);

// Function to get and display photo
var getPhoto = () => {
    console.log($('#tree-input').val());
    var tree = $('#tree-input').val();
    // tree = tree.replace(/\s/g, '_');
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
            let photo = "https://images.pexels.com/photos/"+ currentPhoto + "/pexels-photo-"+ currentPhoto + ".jpeg?auto=compress&cs=tinysrgb&h=350";
            $('#display_images').html(`<img src="${photo}">`);
            // $('#wikiTitle').text($('#tree-input').val());
            treeInputEl.val('');
      })
}
var getInfo = () => {
    console.log($('#tree-input').val());
    let input = $('#tree-input').val();
    fetch('https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&explaintext=1&titles='
    + input
    )
    .then(response => response.json())
    .then(response => {
        var data = response;
        var key = Object.keys(data.query.pages);
        console.log(typeof key, key);
        key = JSON.stringify(JSON.stringify(key));
        console.log(typeof key, key);
        key = key.substring(4, key.length - 4);
        console.log(typeof key, key);
        var infoLong = data.query.pages[key].extract;
        var info = infoLong.substring(0, 400);
        console.log(info);
        console.log(data);
        wiki.text(() => {
          return input.charAt(0).toUpperCase() + input.slice(1);
        });
        $('#paragraph').text(info + "...");
        $('#readmore').html('<a href="https://en.wikipedia.org/?curid=' + key + '" target="_blank">read more</a>');
    })
}

// search button event listener   
$('button').on("click", (event) => {
    event.preventDefault();
    currentTree = $('#tree-input').val();
    const blank = handleFormSubmit();
    if(blank == 1){
    console.log('1');
      return;
    }
    console.log('not 1');
    getPhoto();
    getInfo();
    });

// saved searches event listener
saveList.on('click', (event) => {
  var item = event.target.textContent
  console.log(item);
  treeInputEl.val(item);
  getPhoto();
  getInfo();
});

// clear searches event listener
clear.on('click', function(e) {
  treeInputEl.val('');
  wiki.text('WIKI');
  $('#display_images').html(`<img src="https://i.imgur.com/qFmcbT0.jpg">`);
  $('#paragraph').text('');
  $('#readmore').text('');
  $('li').remove();
  localStorage.clear();
});