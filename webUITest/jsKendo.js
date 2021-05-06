const friends = [
  { name: "Miro Badev", email:"mirobadev@gmail.com", status:"available",
    imgUrl:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/5_copy.jpg"},
  { name: "Martin Joseph", email:"marjoseph@gmail.com", status:"away",
    imgUrl:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg"},
  { name: "Tomas Kennedy", email:"omaskennedy@gmail.com", status:"inactive",
    imgUrl:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/3_copy.jpg"},
  { name: "Enrique Sutton", email:"enriquesutton@gmail.com", status:"inactive",
    imgUrl:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/4_copy.jpg"},
  { name: "Darnell Strickland", email:"darnellstrickland@gmail.com", status:"inactive",
    imgUrl:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/5_copy.jpg"},
]

function buildFriendList(){
  // friends = await callAPI()
  var friendsListInHtml = "";
  
  for (var i=0; i < friends.length; i++){
    friendsListInHtml += '<div class="friend">'
                       + '<img src="' + friends[i].imgUrl+'" />'
                       + '<p><strong>' + friends[i].name + ' </strong>'
                       + '<span>' + friends[i].email + '</span></p>'
                       + '<div class="status ' + friends[i].status + '"></div></div>'
  }
  
  //console.log(friendsListInHtml);
  $("#friends").append(friendsListInHtml);
}


buildFriendList();

var preloadbg = document.createElement("img");
preloadbg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/timeline1.png";

$("#searchfield").focus(function(){
    if($(this).val() == "Search contacts..."){
        $(this).val("");
    }
});
$("#searchfield").focusout(function(){
    if($(this).val() == ""){
        $(this).val("Search contacts...");

    }
});

$("#sendmessage input").focus(function(){
    if($(this).val() == "Send message..."){
        $(this).val("");
    }
});
$("#sendmessage input").focusout(function(){
    if($(this).val() == ""){
        $(this).val("Send message...");

    }
});


$(".friend").each(function(){		
//  $(this).click(function(){
    //var childOffset = $(this).offset();
    //var parentOffset = $(this).parent().parent().offset();
    //var childTop = childOffset.top - parentOffset.top;
    //console.log("childTop:", childTop, $(this).index());



    
    $(this).click(function(){
      $("#header-title").text("Chat");
      
      var childOffset = $(this).offset();
      var parentOffset = $(this).parent().parent().offset();
      var childTop = childOffset.top - parentOffset.top;
      var clone = $(this).find('img').eq(0).clone();
      var top = childTop+12+"px";

      $(clone).css({'top': top}).addClass("floatingImg").appendTo("#chatbox");									

      setTimeout(function(){$("#profile p").addClass("animate");$("#profile").addClass("animate");}, 100);
      setTimeout(function(){
          $("#chat-messages").addClass("animate");
          $('.cx, .cy').addClass('s1');
          setTimeout(function(){$('.cx, .cy').addClass('s2');}, 100);
          setTimeout(function(){$('.cx, .cy').addClass('s3');}, 200);			
      }, 150);														

      $('.floatingImg').animate({
          'width': "68px",
//          'left':'108px',
          'left':'40%',
          'top':'20px'
      }, 200);

      var name = $(this).find("p strong").html();
      var email = $(this).find("p span").html();														
      $("#profile p").html(name);
      $("#profile span").html(email);			

      $(".message").not(".right").find("img").attr("src", $(clone).attr("src"));									
      $('#friendslist').fadeOut();
      $('#chatview').fadeIn();

      $('#close').unbind("click").click(function(){				
          $("#chat-messages, #profile, #profile p").removeClass("animate");
          $('.cx, .cy').removeClass("s1 s2 s3");
          $('.floatingImg').animate({
              'width': "40px",
              'top':top,
              'left': '12px'
          }, 200, function(){$('.floatingImg').remove()});				

          setTimeout(function(){
              $('#chatview').fadeOut();
              $('#friendslist').fadeIn();				
          }, 50);
      });
      
    });    
    
//  });
});	
