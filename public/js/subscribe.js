// when save comment is clicked, add comment to db
$(document).on('click', '.subscribe-button', function() {
  var dbId = $('body').data('dbid');
  console.log($('#subscribe-to-team').val());

  $.ajax({
    method: "POST",
    url: "/subscribeToTeam/" + dbId,
    data: {
      body: {
        team: $('#subscribe-to-team').val(),
        date: Date.now()
      }
    }
    // then log it and empty the input box
  }).done(function(data) {
    console.log(data);
    $(this).html("Subscribed");
  })
});


var dbId = $('body').data('dbid');
$.ajax({
  method: "GET",
  url: "/subscribedTeams/" + dbId
}).done(function(data){
  // console.log(data);
  let html = '';
  const $subscribedTeams = $('#subscribed-teams');
  if(data.nhl.length == 0) {
    html = `<div>you have not subscribed to any teams yet!</div>`;
  } else {
    $subscribedTeams.append(`<div>You have subscribed to the following teams</div>`);
    for(var i = 0; i < data.nhl.length; i++) {
      html += `<div>${data.nhl[i].body.team}</div>`
    }
  }
  $subscribedTeams.append(html);
});
