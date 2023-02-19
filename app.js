const express = require("express");
const app = express();
const request = require("request");

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    request("https://api.unsplash.com/search/photos?client_id=r-zDHTnGraGoq5Sw3BIz4Vfyyki5lv04qFtQA5UtO4w&query=wallpaper&page=" + Math.floor(Math.random() * 50), function(error, response, body){
    if(error){
        console.log(error);
    }else{
        res.render("homepage", {
            picData: JSON.parse(body)
        })
    }
    })
});

app.get("/game/:gameTitle/:gameCreator", function(req, res){
    const title = req.params.gameTitle;
    const creator = req.params.gameCreator;

    res.render("game.ejs", {
        title: title,
        creator: creator
    });
})

app.get("/pics/:pagenum", function(req, res){
    var page = req.params.pagenum;

    request("https://api.unsplash.com/search/photos?client_id=r-zDHTnGraGoq5Sw3BIz4Vfyyki5lv04qFtQA5UtO4w&query=flower&page=" + page, function(error, response, body){
    if(error){
        console.log(error);
    }else{
        res.render("pictures", {
            picData: JSON.parse(body),
            pageNumber: page
        })
    }
    })
});

app.get("/pics", function(req, res){
    var searchTerm = req.query.searchterm;
    var pageNumber = req.query.page;
    request("https://api.unsplash.com/search/photos?client_id=r-zDHTnGraGoq5Sw3BIz4Vfyyki5lv04qFtQA5UtO4w&page=" + pageNumber + "&query=" + searchTerm, function(error, response, body){
    if(error){
        console.log(error);
    }else{
        res.render("pictures", {
            picData: JSON.parse(body),
            pageNumber: pageNumber
        })
    }
    })
});

// request("https://api.unsplash.com/photos?client_id=r-zDHTnGraGoq5Sw3BIz4Vfyyki5lv04qFtQA5UtO4w", function(error, response, body){
//     if(error){
//         console.log(error);
//     } else{
//        var data = JSON.parse(body);
//        console.log(data[0].urls.raw);
//     }
// });

app.get("/search", function(req, res){
    res.render("search");
});

app.listen("3000", function(){
    console.log("Kamen's Website is now online.");
});

//r-zDHTnGraGoq5Sw3BIz4Vfyyki5lv04qFtQA5UtO4w