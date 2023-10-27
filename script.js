//creating an array to keep list of alarms set by user
let alarmList = [] 

//initializing alarm ringtone
let alarmRingtone = new Audio("audio/AlarmClockRingtone.mp3")

//Refernece for input values
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

//appending zeroes for values entered less than 10
hour.addEventListener("input", ()=>{
  hour.value = checkTime(hour.value);
});

minute.addEventListener("input", ()=>{
  minute.value = checkTime(minute.value);
});

second.addEventListener("input", ()=>{
  second.value = checkTime(second.value);
});

//function to show current time 
function getCurrentTime() {
  const today = new Date();

  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  let ampm = "AM";

  //setting time to 12 hr format
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  //appending zeroes for values less than 10
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);

  //set current time in the div
  document.getElementById('currTime').innerHTML = h + ":" + m + ":" + s + " " + ampm;

  //to ring alarm
  alarmList.forEach((alarm) => {
      if (`${alarm}`=== `${h}:${m}:${s} ${ampm}`) {
        alarmRingtone.play();
        alarmRingtone.loop = true;
        //timeout function to show alert when alarm goes off
        setTimeout(function(){
              alarmRingtone.pause();
              alert("The alarm went Off!")
        }, 30 *1000);
      }
  });
  //to keep the current time updating
  setTimeout(getCurrentTime, 1000);
}

//function to append zeroes before single digit of hour/min/sec
function checkTime(value) {
  if (value < 10)
    value = "0" + value;
  return value;
}

//function to add alarms in alarms list
function setAlarm() {
  let h = hour.value;
  let m = minute.value;
  let s = second.value;
  let ampm = document.getElementById("ampm").value;
  
  alarmList.push(h + ":" + m + ":" + s+" "+ampm)
  createAlarmList();
}


//create alarm list 
function createAlarmList() {
  
  document.getElementById("alarmsList").innerHTML = '';
  for (var i in alarmList) {

    //adding delete button for each alarm
    let button = document.createElement("input");
    button.type="button";
    button.value="Delete";
    button.id="deleteButton";
    
    //removing the deleted alarm from alarm list
    button.onclick=function(event){
      document.getElementById("alarmsList").removeChild(event.target.parentElement);
      alarmList = alarmList.filter(function (a) {
        return a !== event.target.parentElement.innerText;
      });
    }

    //adding list item for each alarm
    let list = document.createElement("li");
    list.innerText = alarmList[i];
    document.getElementById("alarmsList").appendChild(list).appendChild(button); 
  }
}