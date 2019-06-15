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
  saveGoal: function(newGoal) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/goals",
      data: JSON.stringify(newGoal)
    });
  },
  getGoals: function() {
    return $.ajax({
      url: "api/goals",
      type: "GET"
    });
  },
  deleteGoal: function(id) {
    return $.ajax({
      url: "api/goals/" + id,
      type: "DELETE"
    });
  }
};

// refreshGoals gets new Goals from the db and repopulates the list
var refreshGoals = function() {
  API.getGoals().then(function(data) {
    var $goals = data.map(function(goal) {
      var $a = $("<a>")
        .text(goal.goal)
        .attr("href", "/Goal/" + goal.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": goal.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $goalList.empty();
    $goalList.append($goals);
  });
};

// handleFormSubmit is called whenever we submit a new Goal
// Save the new Goal to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var goalInfo = {
    goal: $goal.val().trim(),
    completetionDate: $endDate.val().trim(),
    ms1: $ms1.val().trim(),
    ms2: $ms2.val().trim(),
    ms3: $ms3.val().trim(),
    ms4: $ms4.val().trim(),
    ms5: $ms5.val().trim()
  };

  if (!(goalInfo.goal && goalInfo.completetionDate)) {
    alert("You must enter a Goal and!");
    return;
  }

  API.saveGoal(goalInfo).then(function() {
    refreshGoals();
  });

  $goal.val("");
  $endDate.val("");
  $ms1.val("");
  $ms2.val("");
  $ms3.val("");
  $ms4.val("");
  $ms5.val("");
};

// handleDeleteBtnClick is called when an Goal's delete button is clicked
// Remove the Goal from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteGoal(idToDelete).then(function() {
    refreshGoals();
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




})
