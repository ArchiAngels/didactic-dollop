const http = require('http');
const fs = require('fs');
const path = require('path');

let server_is_run = false;
let num = {
    x:15,
    y:0,
    ty:'nice',
    goToVideo:'https://www.youtube.com/watch?v=cy1HoNWbPdc'
};
let res_end = false;
let wait_to_res_post = false;


http.createServer(function(req,res){

    if(req.method == 'GET'){
        if(req.url == '' || req.url == '/' || req.url == '/main'){
            res.write(fs.readFileSync('index.html'));
            res.write('<p>home</p>');
            // setTimeout(()=>{
            //     res.redirect
            // },1000)''
            
        }
        else if(req.url == '/history'){
            res.write(fs.readFileSync('index.html'));
            res.write('<p>history</p>');
        }
        else if(req.url == '/signup'){
            res.write(fs.readFileSync('src/templates/signUp.html'));
            // res.write(`<style>${fs.readFileSync('src/style/signUp.css')}</style>`);
        }
        else{
            
            let extName = path.extname(req.url);
            let res_item = null;
            let new_dir = req.url.slice(1,req.url.length);
            let file_exists = false;
    
            // console.log(extName);
    
            if(req.url == '/favicon.ico'){}
    
            else{
                if(extName){
                    if(fs.existsSync(new_dir)){
                        res_item = fs.readFileSync(new_dir);
                        file_exists = true;
                    }
                    else{
                        // FILE NOT EXISTS -- ERROR
                    }
                    
                }
                if(file_exists){
                    if(extName == '.js'){
                        res.write(res_item);
                    }
                    else if(extName == '.css'){
                        res.write(res_item);
                    }
                    else if(extName == '.html'){
                        res.setHeader("Content-Type", "text/plain");
                        res.write(res_item);
                    }
                }
                else{
                    res.write(fs.readFileSync('src/templates/404.html'));
                    // res.write(`<style>${fs.readFileSync('')}</style>`);
                    res.write(`<h2>Material <span class = 'not_exists' >${new_dir}</span> isn't exists</h2>`);
                    res.end('<h1>404 sry..</h1>');
                }
            }
        }
    }
    else if(req.method == 'POST'){
        let temp = null;
        wait_to_res_post = true;
        // let give_response = true;
        req.on('data',(chunk)=>{
            
            temp = JSON.parse(chunk);

            console.log('REQ BODY :: '+chunk+'\n'+'REQ METHOD :: '+req.method);

            for(let i in temp){
                console.log(i,temp[i]);
            }

            console.log(JSON.stringify(num));

            if(temp.res_fail){
                res_end = true;
            }
            
            else{
                res.write(JSON.stringify(num));
                res_end = true;
            }
        });
    }
    else{
        res.write(`<p>POSOSI</p>`)
    }
    server_is_run = true;
    if(wait_to_res_post){
        let a = setInterval(() => {
            if(res_end){
                res.end();
                clearInterval(a);
                res_end = false;
                wait_to_res_post = false;
            }
            else{
                console.log('wait to res');
            }
        }, 5);
    }
    else{
        res.end();
    }
    
}).listen(8080);



