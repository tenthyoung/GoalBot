// Get references to page elements
var $goal = $("#goal");
var $endDate = $("#end-date");
var $ms1 = $("#ms1");
var $ms2 = $("#ms2");
var $ms3 = $("#ms3");
var $ms4 = $("#ms4");
var $ms5 = $("#ms5");
var $submitBtn = $("#submit");
var $goalList = $("#goal-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/goals",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/goals",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/goals/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.goal)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $goalList.empty();
    $goalList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    goal: $goal.val().trim(),
    completetionDate: $endDate.val().trim(),
    ms1: $ms1.val().trim(),
    ms2: $ms2.val().trim(),
    ms3: $ms3.val().trim(),
    ms4: $ms4.val().trim(),
    ms5: $ms5.val().trim()
  };

  if (!(example.goal && example.completetionDate)) {
    alert("You must enter a Goal and!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $goal.val("");
  $endDate.val("");
  $ms1.val("");
  $ms2.val("");
  $ms3.val("");
  $ms4.val("");
  $ms5.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$goalList.on("click", ".delete", handleDeleteBtnClick);









$(document).ready(() => {
  // Materialize init
  $('.sidenav').sidenav();
  $('.tabs').tabs();
  $('.fixed-action-btn').floatingActionButton();
  $('.tooltipped').tooltip();
  $('.modal').modal();
  $('.datepicker').datepicker();

  //==============================================================||
  // Creating a New To Do
  //==============================================================||

  // Event Listener for Adding Subtasks within "To Do Creation Modal"
  $('#add-subtask').click(() => {
      let input = $("#create-subtask-input").val().trim();
      $('#new-subtasks').append(
          `<li class="collection-item">
              <div>${input}
                  <a href="#!" class="secondary-content">
                      <i class="material-icons red-text delete-subtask">delete</i>
                  </a>
              </div>
          </li>`
      )

      $('#create-subtask-input').val('');
  });

  //  Event Listener for Deleting Subtasks within "To Do Creation Modal"
  $('#todo-creation-modal').on('click', '.delete-subtask', () => {
      $(this).remove();
  });

  // Event Listener to render the To Do Item to the App
  $('#todo-creation-modal').on('click', '#create-new-todo-btn', () => {
      let newTask = $('#task-title').val().trim();
      console.log(newTask)
      $('#to-do-list').append(
          `<li class="collection-item">
              <div>${newTask}
                  <a href="#!" class="secondary-content">
                      <i class="material-icons red-text">send</i>
                  </a>
              </div>
          </li>`
      )
  });

  //==============================================================||
  //==============================================================||



})
