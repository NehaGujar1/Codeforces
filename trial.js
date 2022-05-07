console.log('Hi ajax')
var input;
var url;
var url2;
function submit(){
    var paragraph = document.getElementById("p")
    paragraph.innerHTML="";
    var paragraph = document.getElementById("p2")
    paragraph.innerHTML="";
    var input= document.getElementById('inputd').value
    console.log(input)
    url='https://codeforces.com/api/user.info?handles='+ input
    info()
    console.log('Waiting for user info')
    url2='https://codeforces.com/api/user.rating?handle='+ input
    rating()
    return true
}


async function info() {
    /*const xhr = new XMLHttpRequest();
    xhr.open('GET',url ,true);
    xhr.onload  = function () {
    if(this.status==200){
    console.log('hello')
    document.write(this.responseText)
    console.log(this.responseText)
    S1= this.responseText
    }
    else{
    console.log('some error occured')
    }
    console.log('hi')
    }
    xhr.send();*/
    const info1 = await fetch(url)
    var info2 = await info1.json()
    if (info2.status == "FAILED") {
        console.log('User doesn\'t exist')
        document.write('User does\'t exist')
    }
    else{
        console.log(info2.result)
        /*document.writeln(info2.result[0].lastName)
        document.writeln(info2.result[0].rating)
        document.writeln(info2.result[0].friendOfCount)
        document.writeln(info2.result[0].rank)*/
        var paragraph = document.getElementById("p");
        var display ="Name:" +info2.result[0].lastName+"<br>"+"Rating:"+info2.result[0].rating+"<br>"+"Friend Of Count:"+info2.result[0].friendOfCount+"<br>"+"Rank:"+info2.result[0].rank;
        paragraph.innerHTML = display;
    }

}


async function rating(){
    const rating1 = await fetch(url2)
    const rating2 = await rating1.json()
    if(rating2.status=="FAILED"){
        console.log('Error')
    }
    else{
    console.log(rating2.result)
    chart1(rating2)
}
}
var contests;
async function chart1(rating2)
{
    const xValues  = new Array();
    const yValues  = new Array();
    for(i=0;i<rating2.result.length;i++){
       xValues[i] = i;
       yValues[i] = rating2.result[i].newRating;
    }
    var contests = i
//var xValues = [50,60,70,80,90,100,110,120,130,140,150];
//var yValues = [7,8,8,9,9,9,10,11,14,14,15];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
  }
});
display1(contests,rating2);
}
async function display1(noofcontest,ratingshow){
    var paragraph = document.getElementById("p2");
        for(p=0;p<4;p++){
        var display = ratingshow.result[noofcontest-p-1].contestName+":"+ ratingshow.result[noofcontest-p-1].rank
        console.log(display)
        var text = document.createTextNode(display);
        paragraph.innerHTML += display+ "<br>";
        }
        paragraph.innerHTML="Rating in last 4 contests"+"<br>"+paragraph.innerHTML
}