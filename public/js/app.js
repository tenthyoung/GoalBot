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

