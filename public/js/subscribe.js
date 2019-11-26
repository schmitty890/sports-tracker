class Subscribe {
  constructor() {
    this.dbId = $('body').data('dbid');
    this.$subscribedTeams = $('#subscribed-teams');
    this.$subscribedMsg = $('#subscribed-msg');
  }

  getData() {
    $.ajax({
      method: 'GET',
      url: `/subscribedTeams/${this.dbId}`
    }).done((data) => {
      console.log(data);
      let html = '';
      if (data.subscribed.length === 0) {
        html = '<div>you have not subscribed to any teams yet!</div>';
      } else {
        this.$subscribedTeams.append('<div>You have subscribed to the following teams</div>');
        for (let i = 0; i < data.subscribed.length; i++) {
          html += `<div>${data.subscribed[i].body.team}</div>`;
        }
      }
      this.$subscribedTeams.append(html);
    });
  }

  postData() {
    $(document).on('click', '.subscribe-button', () => {
      const team = $('#subscribe-to-team').val();
      const sport = $('#subscribe-to-team').find(':selected').data('sport');
      const teamID = $('#subscribe-to-team').find(':selected').data('team-id');
      const teamIDArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30, 52, 53, 54];
      const teamIDisValid = teamIDArr.includes(teamID);

      if (teamIDisValid) {
        $.ajax({
          method: 'POST',
          url: `/subscribeToTeam/${this.dbId}`,
          data: {
            body: {
              team,
              teamID,
              sport,
              date: Date.now()
            }
          }
        }).done((data) => {
          this.$subscribedMsg.html(data.html);
          this.$subscribedTeams.append(`<div>${team}</div>`);
          this.fadeOut();
        });
      } else {
        console.log('error subscribing to team :(');
        this.$subscribedMsg.html('<div>error :(</div>');
        this.fadeOut();
      }
    });
  }

  fadeOut() {
    setTimeout(() =>{
      this.$subscribedMsg.fadeOut( "slow" );;
    }, 3000);
  }
}

const SubscribedTeams = new Subscribe();
SubscribedTeams.getData();
SubscribedTeams.postData();
