var Crawler = require("crawler");
const mysql = require('mysql');

// 连接的配置
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'test'
});



var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            //相当于浏览器的jquery
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            // console.log($("title").text());

            //a lean implementation of core jQuery designed specifically for the server
            $(".layui-col-xs6").each((index, item) => {
                //item就是li
                // 获取名字
                const name = $(item).find('.list-bottom h1').text();

                // 获取图片
                const imgURL = $(item).find('div.list-top img').attr('lay-src');
                // console.log(name,imgURL);

                const sql = `insert into t_model1 (model_name,model_pic) values ('${name}','http://gz.shat.cn${imgURL}')`
                connection.query(sql, (error, results, fields) => {
                    console.log("insert OK!")
                })
            })
             // 关闭
            connection.end()
        }
        done();
    }
});
// Queue just one URL, with default callback
c.queue('http://gz.shat.cn/modellist?species=%E5%B9%B3%E9%9D%A2%E6%A8%A1%E7%89%B9');