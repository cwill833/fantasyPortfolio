# fantasyPortfolio

[**Wireframe Home**](https://wireframe.cc/ohG1NM)
[**Wireframe Questions**](https://wireframe.cc/umliqa)
[**Wireframe portfolio**](https://wireframe.cc/INmTg5)
[**Wireframe portfolio Show**](https://wireframe.cc/7jRl3l)
[**ERD wireframe**](https://i.imgur.com/P4aNM70.jpg)


[**link to site**](https://dry-escarpment-82584.herokuapp.com/)

# Lets Make You Some Portfolios!

Pseudocode: May 24st 2019

I want a user from ages 14+ to answer 3 questions and have a backend algo pull stock that fit those questions.  
The questions were going to be simple and non intrusive.  
Once the portfolio was build it would take the initial investment you dictaed and alocate it according to my percentages.  
The user would be able to add stock as well with how much they want allocated to that perticular stock.  
This would trigger some math to take evenly from each stock posiion to meet the new stock allocatino.  
It would also pull live data from the API [**AlphaVantage**](ps://www.alphavantage.co/documentation/) and track performance from purchase date.  
User can sell or buy more stock and it would add/subtract to the new balance.  

Lets see how far we get...


### Above was the thought process of this project on day 1.... We didnt exactly get there but it was a great attempt 

Were we ended up was...  

User can answer questions and it will build a portfolio with the parameters you set.  
Once the portfolio appears you can click details to show it.  
Once in the portfolio you can buy stocks with money in your account and it pulls live data from the API but does not update once set.  
You can sell the stock and the money will update accordingly.  

This is what you see before you are able to answer questions and buy stock.  

![Landing Page](https://i.imgur.com/7g5NUu5.jpg)  

Once logged in you are able to add a portfolio which will bring you to the questions page.  

![Index Pafe](https://i.imgur.com/wVOGJc8.png)  

![Questions Page](https://i.imgur.com/FawobZ4.png)  

Once you add a portfolio, an info page of what you just added will pop up then you can click back to see the portfolio.  

![Portfolio Show](https://i.imgur.com/hTmOBEK.png)  

Now you can add stock with the investment amount of your choosing and it will render with live data.  

![add stock](https://i.imgur.com/c1JRScF.png)  

![Portfolio w/ stock](https://i.imgur.com/eP50shi.png)  

For this project I incorporated:

 * HTML
 * JavaScript
 * CSS
 * Express.js w/ generator ejs
 * Node.js
 * mongoDB
 * mongoose
 * Materialize
 * a hole bunch of google/MDN/CSS Tricks :)

For Icebox items I plan on ...

* Being able to track performance
* Live investing
* Streaming Quotes (if possible)


