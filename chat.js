// let txtMsg = document.getElementById('txtMsg');
// let txtOutput = document.getElementById('txtOutput');

document.addEventListener('load',()=>{
    if(txtOutput==''){
        txtOutput.innerHTML=`<p class="nomessage">no message sent or recieved</p>` 
    }


})

function themeChange(color){
    if (color=='secondary') {
        
    document.documentElement.style.setProperty('--bgbody', 'rgb(109, 109, 109)');
    document.documentElement.style.setProperty('--bgchat', 'rgb(180, 180, 180)');
    document.documentElement.style.setProperty('--color', 'black');

    }

    if (color=='dark') {
        
        document.documentElement.style.setProperty('--bgbody', 'rgb(7, 6, 6)');
        document.documentElement.style.setProperty('--bgchat', 'rgb(27, 27, 27)');
        document.documentElement.style.setProperty('--color', 'white');
    
    }
    if (color=='light') {
        
        document.documentElement.style.setProperty('--bgbody', '#f8f8f8');
        document.documentElement.style.setProperty('--bgchat', '#eee');
        document.documentElement.style.setProperty('--color', 'black');
    
    }

}

// setTimeout(()=>{
//     spinner.style.display = 'none';

// },2000)

setTimeout(() => {
    spinner.style.display = 'none';
}, 2000);

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && txtMsg.value != '') {

        Send()

    }
});
    


function Send() {
// alert('eyyy')
    var selLang = "en-US"

    var sQuestion = txtMsg.value;
    if (sQuestion == "") {
        alert("Type in your question!");
        txtMsg.focus();
        return;
    }

    const now = new Date();
    // const date = now.toLocaleString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    const time = now.toLocaleString('fa-IR', { hour: 'numeric', minute: 'numeric'});
    // console.log(`تاریخ: ${date}`);
    // console.log(`ساعت: ${time}`);

    var oHttp = new XMLHttpRequest();
    oHttp.open("POST", "https://api.openai.com/v1/completions");
    oHttp.setRequestHeader("Accept", "application/json");
    oHttp.setRequestHeader("Content-Type", "application/json");
    oHttp.setRequestHeader("Authorization", "Bearer " + "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")

    oHttp.onreadystatechange = function () {
        if (oHttp.readyState === 4) {
            //console.log(oHttp.status);
            var oJson = {}
            if (txtOutput.innerHTML != "") txtOutput.innerHTML += "\n";

            try {
                oJson = JSON.parse(oHttp.responseText);
            } catch (ex) {
                txtOutput.innerHTML += "Error: " + ex.message
            }

            if (oJson.error && oJson.error.message) {
                txtOutput.innerHTML += "Error: " + oJson.error.message;
            } else if (oJson.choices && oJson.choices[0].text) {
                var s = oJson.choices[0].text;

                if (selLang.value != "en-US") {
                    var a = s.split("?\n");
                    if (a.length == 2) {
                        s = a[1];
                    }
                }

                if (s == "") s = "No response";
                txtOutput.innerHTML += `\n <li class="clearfix">
                <div class="message-data text-right d-flex">
                <div class='text-message'>
                <img src="robot.png" alt="avatar">


                    <div class="message other-message">${s} </div>
                    </div>
                    
                </div>
                    <span class="message-data-time">${time}</span>
                </li> `;
                // TextToSpeech(s);
            }            
        }
    };

    var sModel = "text-davinci-003";
    var iMaxTokens = 2048;
    var sUserId = "1";
    var dTemperature = 0.5;    

    var data = {
        model: sModel,
        prompt: sQuestion,
        max_tokens: iMaxTokens,
        user: sUserId,
        temperature:  dTemperature,
        frequency_penalty: 0.0, //Number between -2.0 and 2.0  
                                //Positive values decrease the model's likelihood 
                                //to repeat the same line verbatim.
        presence_penalty: 0.0,  //Number between -2.0 and 2.0. 
                                //Positive values increase the model's likelihood 
                                //to talk about new topics.
        stop: ["#", ";"]        //Up to 4 sequences where the API will stop 
                                //generating further tokens. The returned text 
                                //will not contain the stop sequence.
    }

    oHttp.send(JSON.stringify(data));

    if (txtOutput.innerHTML != "") txtOutput.innerHTML += "\n";
    // txtOutput.innerHTML += " \n Me: " + sQuestion;
    txtOutput.innerHTML+= `\n <li class="clearfix">
    <div class="message my-message"> ${sQuestion} </div>
    <div class="message-data text-left">
        <span class="message-data-time">${time}</span>
    </div>
    </li> ` 
    txtMsg.value = "";
}

function Clear() {
    txtOutput.innerHTML = ''
}