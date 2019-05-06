window.onload = async function () {
    var fieldId = getQueryVariable("imgId");
    var response = await httpGet("http://localhost/WebProjects/uiPollApi/api/getImgDetails.php?imgId=" + fieldId)
    // console.log(httpGet("http://localhost/WebProjects/uiPollApi/api/getDesc.php?itemName=" + fieldId))
    // console.log("hi");
    var obj = JSON.parse(response);
    // console.log(obj[0]['name']);
    // console.log("http://localhost/WebProjects/uiPollApi/images/" + $fileId)
    // var response = httpGet("http://localhost/WebProjects/uiPollApi/api/getDesc.php?itemName=" + fieldId);
    document.getElementById("uiDesign").src = "http://localhost/WebProjects/uiPollApi/images/" + obj[0]['name'];
    document.getElementById("welcomeMessage").innerHTML = '<h1 id="mainMessageText" class="animated fadeIn">Hi there! <br> Welcome to UiPoll 👋</h1 ><h4 id="messageText" class="animated fadeIn delay-1s slower">UiPoll is a venture I started to help me get feedback on my UI designs from the very same people who would be using it in the future</h4><h5 class="animated fadeIn delay-1s slower"> What do you guys think of this UI mockup? 😃</h5> <h6 class="animated fadeIn delay-1s slower" id="itemDesc"></h6><p class="animated fadeIn delay-1s slower"> (Your choice is completely annonymous as we are not collecting any identity info 😉)  </p>'
    document.getElementById("itemDesc").innerText = "Design Description: " + obj[0]['desc'];
    document.getElementById("preloader").innerHTML = "";

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