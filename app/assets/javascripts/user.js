$(function() {


var search_list = $("#user-search-result");


function appendAddUser(user) {
   var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>
              `
    search_list.append(html);
    }

  var group_user_list = $("#chat-group-users");
   function appendGroupUser(user_id, user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>
               `
    group_user_list.append(html);
  }

 function appendNoUser(user) {
    var html = `<li>
                  <div class='listview__element--right-icon'>${ user }</div>
                </li>
               `
    search_list.append(html);
  }

  document.addEventListener('turbolinks:load', function() {
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendAddUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーがいません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });
  $(document).on('click', '.chat-group-user__btn--add', function(){
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    appendGroupUser(user_id, user_name);
    $(this).parent().remove();
    // 「追加」の部分を削除
  });

  $("#chat-group-users").on('click', '.user-search-remove', function()
  {
    $(this).parent().remove();
    });

  });
});
