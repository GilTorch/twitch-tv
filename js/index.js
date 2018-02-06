$(document).ready(function(){
 
 loadAllChannels();
 $("#all-offline-online").click(function(){
   loadAllChannels();
 })
  
$("#online-channels").click(function(){
  console.log("online called");
   loadOnlineChannels();
 })
  

$("#offline-channels").click(function(){
   loadOfflineChannels();
 })
  

  
})


function loadOfflineChannels(){
   $("#show-channels").empty();
 var channelsIWannaSee=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  for(var i=0;i<channelsIWannaSee.length;i++)
        {
                     
                       $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/"+channelsIWannaSee[i]).done(function(data){
                         
              
                        if(data.stream==null)
                          {
                            
                            var url=data._links.channel;
                            url=url.replace("https://api.twitch.tv/kraken/","https://wind-bow.gomix.me/twitch-api/");
                            
                           // alert(typeof url);
                            //console.log(url);
                            
                            $.getJSON(url).done(function(newdata)
                                               {
                             // alert(newdata);
                                var h1=$("<h1></h1>").text("[OFFLINE]");
                               h1.css('color','red');
                                var logo= $("<img/>").attr("src",newdata.logo);
                               var status= $("<p></p>").text(newdata.status);
                               var div= $("<div></div>");
                              div.append(h1);
                                 div.append(logo);
                              // div.append(status);
                                  var link=$("<a class='each-channel' target='_blank'></a>").attr("href",newdata.url);
                                link.css('display','block');
                                 link.append(div);
                                link.css('opacity','0.4');
                               $("#show-channels").append(link);
                              
                              
                            })
                         }
                        
                                                            
                                                                                                         
                   });
            }
            $("#myAnimation").hide();
        }




function loadOnlineChannels(){
   $("#show-channels").empty();
   var animation=$("<div></div>");
 var channelsIWannaSee=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  for(var i=0;i<channelsIWannaSee.length;i++)
        {
                       $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/"+channelsIWannaSee[i]).done(function(data){
                         
              
                        if(data.stream!==null)
                          {  
                                var h1=$("<h1></h1>").text("[ONLINE]");
                                h1.css('color','green');
                                var logo= $("<img/>").attr("src",data.stream.channel.logo);
                               var status= $("<p></p>").text(data.stream.channel.status);
                               var div= $("<div></div>");
                               div.append(h1);
                                 div.append(logo);
                               div.append(status);
                                  var link=$("<a class='each-channel' target='_blank'></a>").attr("href",data.stream.channel.url);
                                link.css('display','block');
                                 link.append(div);
                               $("#show-channels").append(link);
  
                          }
                                                            
                                                                                                         
                   });
            }
             $("#myAnimation").hide();
        }


function loadAllChannels(){
   $("#show-channels").empty();
 var channelsIWannaSee=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","brunofin","comster404"];
  for(var i=0;i<channelsIWannaSee.length;i++)
        {
                       $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/"+channelsIWannaSee[i]).done(function(data){
                         
                                    
                                var streamurl=data.url;
                                streamurl=streamurl.replace("https://www.twitch.tv","https://wind-bow.gomix.me/twitch-api/streams");
                           
                               $.getJSON(streamurl).done(function(streamdata){
                                      
                                      if(streamdata.stream!==null)
                                       {
                                              var h1=$("<h1></h1>").text("[ONLINE]");
                                              h1.css('color','green');
                                             var logo= $("<img/>").attr("src",data.logo);
                                             var status= $("<p></p>").text(data.status);
                                             var div= $("<div></div>");
                                              div.append(h1);
                                               div.append(logo);
                                             div.append(status);
                                                var link=$("<a class='each-channel' target='_blank'></a>").attr("href",data.url);
                                              link.css('display','block');
                                               link.append(div);
                                             $("#show-channels").append(link);
                                       }
                                 else{
                                                 var h1=$("<h1></h1>").text("[OFFINE]");
                                                h1.css('color','red');
                                                 var logo= $("<img/>").attr("src",data.logo);
                                                 var status= $("<p></p>").text(data.status);
                                                 var div= $("<div></div>");
                                                  div.append(h1);
                                                  div.append(logo);
                                                // div.append(status);
                                                  var link=$("<a class='each-channel' target='_blank'></a>").attr("href",data.url);
                                                  link.css('display','block');
                                                  link.css('opacity','0.4');
                                                  link.append(div);
                                                  $("#show-channels").append(link);
                                   
                                 }
                                 
                               });                                                                          
                   });
            }
             $("#myAnimation").hide();
        }