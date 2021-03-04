// Create and open a WebSocket to the specified server address.
// "ws://192.168.10.1:8080" for remote server
var webSocket = new WebSocket("ws://localhost:3000");

// Define callback function to run when WebSocket has connected.
webSocket.onopen = onSocketOpened;

// Define callback function to run when WebSocket has received a message.
webSocket.onmessage = onSocketReceiveMessage;

webSocket.onerror = onSocketError;

// I expect to receive a WebSocket event object in response
function onSocketOpened(evt) {
    alert("Open socket");
    document.getElementById("BUTTON_SEND_MESSAGE").addEventListener("click", onSendMessage);
}

function isOpen(webSocket) {
    return webSocket.readyState === webSocket.OPEN;
}

function onSocketError(evt)
{
    // evt contains error info
}

// I receive nothing from Web Browser due to user clicking button.
// pre- user has clicked button.
function onSendMessage()
{
    if (!isOpen(webSocket)) return;
    console.log("Send a message");
    let messg = {type: "post", collection: "users", data: {name: "Jane", password: "password", id: "487434"}};
    let jsonMessg = JSON.stringify( messg );
    console.log("Sending " + jsonMessg);
    webSocket.send( jsonMessg );
}

// I run when socket delivers a message from server
// I receive an evt object that HAS-A data
function onSocketReceiveMessage(evt)
{
    // consumes event data and converts JSON from server to JS object.
    // Only one chance to consume message so parse, then use it.
    let messg = JSON.parse(evt.data);

    // if(messg.type == "get_all" && messg.result == "OK")
    alert( JSON.stringify( messg ) );
}