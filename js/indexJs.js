var fieldId;
window.onload = async function () {
    fieldId = getQueryVariable("imgId");
    var response = await httpGet("http://localhost/WebProjects/uiPollApi/api/getImgDetails.php?imgId=" + fieldId)
    // console.log(httpGet("http://localhost/WebProjects/uiPollApi/api/getDesc.php?itemName=" + fieldId))
    // console.log("hi");
    var obj = JSON.parse(response);
    // console.log(obj[0]['name']);
    // console.log("http://localhost/WebProjects/uiPollApi/images/" + $fileId)
    // var response = httpGet("http://localhost/WebProjects/uiPollApi/api/getDesc.php?itemName=" + fieldId);
    document.getElementById("uiDesign").src = "http://localhost/WebProjects/uiPollApi/images/" + obj[0]['name'];
    document.getElementById("welcomeMessage").innerHTML = '<h1 id="mainMessageText" class="animated fadeIn">Hi there! <br> Welcome to UiPoll 👋</h1 ><h4 id="messageText" class="animated fadeIn delay-1s">UiPoll is a venture we started to help us get feedback on our UI designs from the very same people who we hope to delight someday with our ideas</h4><h5 class="animated fadeIn delay-1s slower"> So, What do you think of this UI mockup? 😃</h5> <h5 class="animated fadeIn delay-1s slower" id="itemDesc"></h5><p class="animated fadeIn delay-1s slower"> (Your choice is completely annonymous as we do not collect any identity info 😉)  </p>'

    var opinionGiven = getCookie(fieldId);
    if (opinionGiven == "") {
        document.getElementById("buttonsOrthankyou").innerHTML = '<div class="btn-group-vertical "><button type = "button" onclick = "sendOpinion(0)" id = "vgood"class="btn btn-outline-success" > This is awesome! Totally killing it dude!</button><button type="button" onclick="sendOpinion(1)" id="good"class="btn btn-outline-success">It\'s pretty good, but there is scope for improvement</button><button type="button" onclick="sendOpinion(2)" id="okay"class="btn btn-outline-warning">It\'s okay. Can be done much better though</button><button type="button" onclick="sendOpinion(3)" id="bad" class="btn btn-outline-warning">It\'s bad dude. And I mean, it sticks out like a camel in the Arctic</button><button type="button" onclick="sendOpinion(4)" id="vbad" class="btn btn-outline-danger">You have to find another job</button></div >';
    }
    document.getElementById("itemDesc").innerText = "Design Description: " + obj[0]['desc'];
    document.getElementById("preloader").innerHTML = "";
    // document.getElementById("vgood").addEventListener("click", sendOpinion(1));
    // document.getElementById("good").addEventListener("click", sendOpinion(2));
    // document.getElementById("okay").addEventListener("click", sendOpinion(3));
    // document.getElementById("bad").addEventListener("click", sendOpinion(4));
    // document.getElementById("vbad").addEventListener("click", sendOpinion(5));
    // console.log(response[0]);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

async function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

async function sendOpinion(opinionId) {
    theUrl = "http://localhost/WebProjects/uiPollApi/api/setOpinion.php?imgId=" + fieldId + "&opinion=" + opinionId
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    setCookie(fieldId, opinionId, 7);
    document.getElementById("buttonsOrthankyou").innerHTML = '<div id="thankYouDiv"><h3 id = "bigT" > Big thanks <br> and lots of love <br> from us here at TFMT</h3 ><h4>Your feedback will help us understand how we can make even more beautiful porducts for you</h4><h4>Stay tuned for more UIPolls</h4></div >'
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}