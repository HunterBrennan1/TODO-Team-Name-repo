var formEl = $('#search');
var treeInputEl = $('#tree-input');

var searchlistDisplay = $('#saved');

var printTreeData = function (tree) {

  // add a class 
  var cardName = $('<li>').addClass('search-list').text(tree);

  searchlistDisplay.append(cardName);
};

var handleFormSubmit = function (event) {
  event.preventDefault();

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
