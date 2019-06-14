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

  // The code below handles the case where we want to get blog posts for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getPosts(userId);
  }
  // If there's no userId we just get all posts as usual
  else {
    getPosts();
  }


  // This function grabs posts from the database and updates the view
  function getPosts(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/posts" + userId, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(user);
      }
      else {
        initializeRows();
      }
    });
  }

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

  // This function constructs a post's HTML
  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostuser = $("<h5>");
    newPostuser.text("Written by: " + post.user.name);
    newPostuser.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(post.title + " ");
    newPostBody.text(post.body);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostuser);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }

  $goal.val("");
  $endDate.val("");
  $ms1.val("");
  $ms2.val("");
  $ms3.val("");
  $ms4.val("");
  $ms5.val("");
};

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentGoal = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/addGoal?goal_id=" + currentGoal.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for user #" + id;
    }
    goalContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet" + partial + ", navigate <a href='/addGoals" + query +
    "'>here</a> in order to get started.");
    goalContainer.append(messageH2);
  }

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
