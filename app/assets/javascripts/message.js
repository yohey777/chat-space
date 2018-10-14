

$(document).on('turbolinks:load', function() {
    // setInterval(function() {
  function buildHTML(message){
    var image = message.image ? `<img src = '${message.image}' width="256" height="256">` : '';
    var html = `
          <div class="chat-box" id="${message.id}">
              <div class="nameday-box">
                <p class="chat-name">
                  ${message.user_name}
                </p>
                <p class="chat-day">${message.created_at}</p>
              </div>
              <div class="text-box">
                <p class="chat-text"></p>
                  ${message.text}
                  ${image}
              </div>
          </div>`
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href =  $(this).attr('action');
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
      var html = buildHTML(data);
      $('.right-mainbody').append(html)
      $('#new_message')[0].reset();
      $messages = $('.right-mainbody');
      $messages.animate({scrollTop: $messages[0].scrollHeight}, 'fast');
    })
    .fail(function(data){
      // alert('error');
      var html = buildHTML(data);
    })
    .always(function(data){
      var html = buildHTML(data);
      $('.form__submit').prop('disabled', false);
    })
  })

// ここから下が自動更新
var interval = setInterval(function(){
    // setIntervalで5秒ごとに更新
     var presentMessageId = $('.chat-box').last().attr('id')
     // console.log(presentMessageId)
     // 最新のメッセージからidを取得
    var presentHTML = window.location.href
    // console.log(presentHTML)
    // 現在のURLを表示

    // ↓メッセージ画面以外だと反応しないようにする
     if (presentHTML.match(/\/groups\/\d+\/messages/)) {
      console.log(presentHTML)
    // 現在のURLからIDを取得
       $.ajax ({
        url: presentHTML,
        type: 'GET',
        data: {id: presentMessageId},
        dataType: 'json',
        processData: false,
        contentType: false
      })
       .done(function(json){
        // insertHTMLを空欄として定義する
        var insertHTML = "";

        json.forEach(function(message){
          if (message.id > presentMessageId){
        // insertHTMLにbuildHTMLを加える（messageの中身は変数）また、buildHTMLは非同期のつぶやき内容
            insertHTML += buildHTML(message);
            // cosole.log(insertHTML)
        // 右側のright-mainbodyに非同期のつぶやきであるbuildHTMLを入れていく作業
            $messages = $('.right-mainbody');
            $messages.append(insertHTML);
            $messages.animate({scrollTop: $messages[0].scrollHeight}, 'fast');
            // alert("success")
          }
        });
      })
       .fail(function(data){
        // alert('error')
      });
     } else {
      clearInterval(interval)
    }
  },5000);
});

