$(function(){
  function buildHTML(message){
    var image = message.image ? `<img src = '${message.image}' width="256" height="256">` : '';
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
      $('#new_message')[0].reset();
      $messages = $('.right-mainbody');
      $messages.animate({scrollTop: $messages[0].scrollHeight}, 'fast');
    })
    .fail(function(data){
      alert('error');
      var html = buildHTML(data);
    })
    .always(function(data){
      var html = buildHTML(data);
      $('.form__submit').prop('disabled', false);
    })
  })
});
