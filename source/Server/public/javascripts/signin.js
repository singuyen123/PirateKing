var ws = new WebSocket('ws://128.199.225.158:80');
    ws.onopen = function () {
      //console.log('websocket is connected ...')

      // sending a send event to websocket server
      ws.send('{"stt":"connected"}')
    }

    // event emmited when receiving message 
    ws.onmessage = function (ev) {
      console.log(ev);
    }
    $(document).ready(function () {
      $(".message a").click(function () {
        $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
      });
    });
    function btn_login() {
      var username = document.getElementById("username").value;
      var pass = document.getElementById("pass").value;
      var temp1 = '{"stt":"login","username":"'// + usrname + '","pass":"' + pass + '"}'
      var temp2 = '","pass":"'
      var temp3 = '"}'
      ws.send(temp1 + username + temp2 + pass + temp3);
    }
    function btn_signup() {
      var username = document.getElementById("signup_user").value;
      var pass = document.getElementById("signup_pass").value;
      var email = document.getElementById("signup_email").value;
      var temp1 = '{"stt":"signup","username":"'// + usrname + '","pass":"' + pass + '"}'
      var temp2 = '","pass":"'
      var temp3 = '"}'
      var temp4 = '", "email" : "'
      ws.send(temp1 + username + temp2 + pass + temp4 + email + temp3);
    }