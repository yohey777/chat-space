$(function() {


var search_list = $("#user-search-result");
//コンテンツを追加したい場所。今回は#user-search-resultに追加

function appendAddUser(user) {
  // ここのuserは関数なのでなんでも良い
   var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</a>
                </div>
              `
// 追加する中身。
    search_list.append(html);
// search_listを追加
 }

 function appendNoUser(user) {
// 当てはまるデータがない場合
    var html = `<li>
                  <div class='listview__element--right-icon'>${ user }</div>
                </li>`
// 引数のuserつまり、下記に記載されてる「一致するユーザーがありません」が出力されるべき
    search_list.append(html);
  }

  document.addEventListener('turbolinks:load', function() {
    // ターボリンク,jsを有効にする（読み込む際にリロードしなくてよい）
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      console.log(input);
  // 基本的にクラスではなくidを指定する抜き取ってくる

      $.ajax({
        type: 'GET',
      // users_controllerのindexに飛ぶ→rake routesすればわかる
        url: '/users',
      // users_controllerのindexに飛ぶ
        data: { keyword: input },
      //  inputがuser_controllerのkeywordに入る
        dataType: 'json'
      })

      .done(function(users) {
        // 配列が完成してから実行→Aさん、Bさん、Cさんが入ってから実行
        console.log(users);

        $("#user-search-result").empty();
        // user-search-resultを空にする
        if (users.length !== 0) {
          // フォームに文字があるなら、入力があるなら、
          users.forEach(function(user){
            // usersの中身を入れる？わからんこの辺わかりません
            appendAddUser(user);
            // alert('成功');
          });
        }
        else {
          // 何も入力がないなら
          appendNoUser("一致するユーザーがいません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });
  });
});
