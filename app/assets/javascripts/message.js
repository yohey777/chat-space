$(function(){
  function buildHTML(message){
    var html = `
          <div class="chat-box">
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
