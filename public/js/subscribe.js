// when save comment is clicked, add comment to db
$(document).on('click', '.subscribe-button', () => {
  const dbId = $('body').data('dbid');
  const team = $('#subscribe-to-team').val();
  const sport = $('#subscribe-to-team').find(':selected').data('sport');
  const teamID = $('#subscribe-to-team').find(':selected').data('team-id');

  $.ajax({
    method: 'POST',
    url: `/subscribeToTeam/${dbId}`,
    data: {
      body: {
        team,
        teamID,
        sport,
        date: Date.now()
      }
    }
    // then log it and empty the input box
  }).done((data) => {
    console.log(data);
  });
});


const dbId = $('body').data('dbid');
$.ajax({
  method: 'GET',
  url: `/subscribedTeams/${dbId}`
}).done((data) => {
  console.log(data);
  let html = '';
  const $subscribedTeams = $('#subscribed-teams');
  if (data.subscribed.length === 0) {
    html = '<div>you have not subscribed to any teams yet!</div>';
  } else {
    $subscribedTeams.append('<div>You have subscribed to the following teams</div>');
    for (let i = 0; i < data.subscribed.length; i++) {
      html += `<div>${data.subscribed[i].body.team}</div>`;
    }
  }
  $subscribedTeams.append(html);
});
