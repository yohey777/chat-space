$(function(){
  function buildHTML(message){
    var html = `
<div class="chat-box">
    <div class="nameday-box">
<p class="chat-name">
${message.user_name}
</p>
<p class="chat-day">2016/10/02 06:27:07</p>
</div>
<div class="text-box">
<p class="chat-text"></p>
${message.text}
</div>
</div>`
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href =  $(this).attr('action');
    // var href = window.location.href + '/groups/:group_id/messages'
    // Ajax通信を開始
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      // alert("test")
      console.log(data);
      var html = buildHTML(data);
      $('.right-mainbody').append(html)
      $('.form__submit').prop('disabled', false);
      $('#message_text').val('');
      $messages = $('.right-mainbody');
      $messages.animate({scrollTop: $messages[0].scrollHeight}, 10000);
    })
    .fail(function(){
      alert('error');
    })
  })
});




// $(function() {

//   function buildHTML(data) {
//     return html;
//   }

//   $('.form__submit').on('submit', function(e) {
//   // #new_messageは、formタグにつけたid。formがsubmitされた際、以下が行われる。
//     e.preventDefault();
//     // 非同期通信でメッセージの投稿を行いたいため、通常の動作を停止。
//     // 通常の動作： submit押される→create controllerでformの内容をDB保存→viewにredirect
//     var formData = new FormData($(this).get(0));
//     // ① new FormData()でFormDataオブジェクトを新規に作成。引数にフォームの情報を入れられる。
//     // ② this:イベントを発火させた要素、つまり#new_message、すなわちフォームのこと。
//     // ③-1 .get(0): JavaScriptのgetメソッド。このメソッドは、Mapオブジェクトである$(this)から要素を取り出すことができる。
//     //      今回の場合、$(this)からキーが0の要素を取得している。
//     // ③-2 Mapオブジェクト:「キーと値のペアのコレクション」とのことらしい。配列の中にkeyと値のペアがいくつか入ったオブジェクト、と言うふうにとりあえず理解。
//     // ③-3 Viewから取得したformのデータは、Mapオブジェクトになっている。詳細は、下のスクショを参照。

//     var group_id = $('.group_id').attr('value');
//     // group idをviewより取得。inputタグをhiddenにして、そこにgroup idを仕込んである。
    // var url = '/groups/' + group_id + '/messages.json'
//     // urlを定義
//     $.ajax({
//       type: 'POST',
//       url: url,
//       data: formData,
//       processData: false,
//       contentType: false
//       // この2つを何故falseにするのかが、ざっくりとしかわからない。
//       // dataをajaxで送信する際に、データに手を加えずにそのままま送る、みたいな感じ。詳細は下記参照。
//     })
//     .done(function(data) {
//       var html = buildHTML(data);
//       $('.text-box').append(html);
//       $('.form__message').val('');
//       // .doneからここまでで、テキストとファイルを投稿&テキスト入力欄をクリア。
//     })
//     .fail(function() {
//       alert('error');
//       // ajaxミスったらアラート。
//     });
//   });
// });
