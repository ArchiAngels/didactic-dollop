let my_request = {
    name:'Mikita',
    age:20,
    ActuallyWorked:true,
    res_fail:true
};

let res_out = null;
let time_response = 500;
let time_wait_response = 250;

let out_server = document.getElementById('res_server');
let demo1 = document.getElementById('demoss');

    demo1.addEventListener('click',()=>{
        let xhr = new XMLHttpRequest();
            xhr.open('POST','index.js');
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(my_request));
                let a = setInterval(()=>{
                    // console.log(xhr.status);
                    if(xhr.responseText){
                        console.log('OUTPUT!!',xhr.responseText);
                        res_out = JSON.parse(xhr.responseText);
                        console.log('res_out',res_out);
                        
                        out_server.innerText = 'Connection SUCCES';
                        
                        clearInterval(a);
                    }
                    else{
                        if(time_response <= 0){
                            clearInterval(a);
                            
                            out_server.innerText = 'Connection FAIL';
                        
                            my_request.res_fail = false;
                        }
                        else{
                            time_response -= time_wait_response;
                        }
                        console.log('EMPTY!!');
                    }
                },time_wait_response);
    });