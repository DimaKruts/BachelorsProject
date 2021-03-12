let time = 5000;
setInterval(function () 
{
    var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) 
    //     {
    //         document.getElementById("temperature").innerHTML = this.responseText;
    //     }
    // };
    xhttp.onload = () => {
        let res = xhttp.response;
        let data = JSON.parse(res);
        document.getElementById("temperature").innerHTML = data.temp;
        console.log(data);
      }
    xhttp.open("GET", "/data", true);
    xhttp.send();
}, time);