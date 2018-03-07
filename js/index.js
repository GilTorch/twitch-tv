
var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(function () {
  loadAllChannels(users);
  $("#all-offline-online").click(function () {
    $("#loading-animation").show();    
    loadAllChannels(users);
  })

  $("#online-channels").click(function () {
    $("#loading-animation").show();    
    console.log("online called");
    loadOnlineChannels();
  })


  $("#offline-channels").click(function () {
    $("#loading-animation").show();    
    loadOfflineChannels();
  })

})


function loadOfflineChannels() {
  $("#show-channels").empty();
  users.forEach(function (user) {
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + user + "?callback=?").done(function (data) {
      var dataToFormat = {
        "logo": "NO LOGO",
        "status": "NO STATUS",
        "channel": "#",
        "connexionStatus": "OFFLINE"
      }
      if (!data.stream) {
        $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + user + "?callback=?").done(function (channeldata) {
          console.log(channeldata.logo);
          dataToFormat.logo = channeldata.logo;
          dataToFormat.status = channeldata.status;
          formatData(dataToFormat);
        });
      $("#loading-animation").hide();
        
      }
    });
  })
}


function loadOnlineChannels() {
  $("#show-channels").empty();
  users.forEach(function (user) {
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + user + "?callback=?").done(function (data) {
      var dataToFormat = {
        "logo": "NO LOGO",
        "status": "NO STATUS",
        "channel": "#",
      }
      if (data.stream) {
        dataToFormat.logo = data.stream.channel.logo;
        dataToFormat.status = data.stream.channel.status;
        dataToFormat.channel = data.stream.channel.url;
        dataToFormat.connexionStatus = "ONLINE";
        formatData(dataToFormat);
      $("#loading-animation").hide();
        
      }
    });
  })

}


function loadAllChannels(users) {
  $("#show-channels").empty();
  users.forEach(function (user) {
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + user + "?callback=?").done(function (data) {
      var dataToFormat = {
        "logo": "NO LOGO",
        "status": "NO STATUS",
        "channel": "#",
        "connexionStatus": "OFFLINE"
      }
      if (!data.stream) {
        $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + user + "?callback=?").done(function (channeldata) {
          console.log(channeldata.logo);
          dataToFormat.logo = channeldata.logo;
          dataToFormat.status = channeldata.status;
          formatData(dataToFormat);
        });
      } else {
        dataToFormat.logo = data.stream.channel.logo;
        dataToFormat.status = data.stream.channel.status;
        dataToFormat.channel = data.stream.channel.url;
        dataToFormat.connexionStatus = "ONLINE";
        formatData(dataToFormat);
      }
      $("#loading-animation").hide();
    });
  })


}


function formatData(data) {
  console.log(data,data.status);
  var connexionStatusContainer = $("<h1></h1>");
  var logoContainer = $("<img/>");
  var statusContainer = $("<p></p>");
  var container = $("<div></div>");
  
  if(data.connexionStatus==="OFFLINE"){
    container.addClass("offline");
  }else{
    container.addClass("online");
  }
  connexionStatusContainer.text("["+data.connexionStatus+"]");
  logoContainer.attr('src',data.logo);
  statusContainer.text(data.status);
  container.append(connexionStatusContainer);
  container.append(logoContainer);
  container.append(statusContainer);
  var link = $("<a class='each-channel' target='_blank'></a>").attr("href", data.channel);
  link.css('display', 'block');
  link.append(container);
  $("#show-channels").append(link);
}


function loadChannel(){
  $("#loading-animation").show();
  var searchQuery=$("#search-box").val();
  if(selectedUser===""){
    loadAllChannels(users);
  }
  var selectedUser=users.filter(function(user){
    return user.indexOf(searchQuery)!==-1;
  });
  loadAllChannels(selectedUser);
}













