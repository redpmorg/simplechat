const user = document.querySelector("#name");
const submitUserName = document.querySelector("#submit1");
const submitMessage = document.querySelector("#submit2");
const messages = document.querySelector("#messages");
const message = document.querySelector("#mess");
const conn = new WebSocket('ws://localhost:8080');

var userName = '',
  mess = '';

conn.onopen = function(e) {
  console.log("Connection established!");
};

function writeMessage(data, container, cName) {
  var d = document.createElement('div');
  d.className = "message";
  d.className += " " + cName;
  d.appendChild(document.createTextNode(data.user + ' :: '));
  d.appendChild(document.createTextNode(data.mess));
  container.appendChild(d);
  message.value = '';
}

conn.onmessage = function(e) {
  var res = JSON.parse(e.data);
  writeMessage({
    user: res.user,
    mess: res.mess
  }, messages, 'resMess');
};

submitUserName.addEventListener('click', () => {
  userName = user.value;
  if (userName.length !== 0) {
    user.disabled = true;
    submitUserName.style.visibility = 'hidden';
    submitMessage.style.visibility = 'visible';
    message.style.visibility = 'visible';
  } else {
    alert('come on! gimme your name!');
  }
});

submitMessage.addEventListener('click', () => {
  mess = message.value;
  if (mess.length !== 0) {
    var data = {
      user: userName,
      mess: mess
    };
    conn.send(JSON.stringify(data));
    writeMessage(data, messages, 'reqMess');
  }
});
