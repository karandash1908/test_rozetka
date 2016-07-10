var webdriver = require('..'),
    By = webdriver.By,
    until = webdriver.until,
    chrome = require('../chrome');


var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


var TimeOfLoading = 10000;
var TitleRozetka = 'Интернет-магазин ROZETKA™: фототехника, видеотехника, аудиотехника, компьютеры и компьютерные комплектующие';
var TitleTechcnics = 'Бытовая техника - Интернет магазин Rozetka.ua | Магазин бытовой техники в Киеве, Харькове, Донецке, Одессе, Львове: цена, отзывы, продажа, купить оптом бытовую технику';
var TitleBlenders = 'Блендеры - Интернет магазин Rozetka.ua | Купить Блендеры в Киеве: цена, отзывы, продажа.';
var TitleTypeOfBlender = 'Тип: погружной. Блендеры - Интернет магазин Rozetka.ua | Купить Блендеры в Киеве: цена, отзывы, продажа.';
var TitleOneBlender = 'Rozetka.ua | Блендер BRAUN MQ535 SAUCE. Цена, купить Блендер BRAUN MQ535 SAUCE в Киеве, Харькове, Днепропетровске, Одессе, Запорожье, Львове. Блендер BRAUN MQ535 SAUCE: обзор, описание, продажа.';

function LogOutUser () {
    if(driver.findElement(By.name('signin')) != null){
        return;
    }if(driver.findElement(By.name('profile')) != null){
        driver.findElement(By.name('profile')).click();
        driver.findElement(By.id('profile_signout')).click();
        if(driver.findElement(By.name('signin')) != null){
            return;
        }else{
            console.log('The user did not log out.')
        }
    }
}

driver.get('http://www.rozetka.com.ua');
driver.wait(until.titleIs(TitleRozetka), TimeOfLoading);
LogOutUser;
driver.findElement(By.linkText('Бытовая техника')).click();
driver.wait(until.titleIs(TitleTechcnics),TimeOfLoading);
driver.findElement(By.linkText('Блендеры')).click();
driver.wait(until.titleIs(TitleBlenders), TimeOfLoading);
driver.findElement(By.linkText('Погружной')).click();
driver.wait(until.titleIs(TitleTypeOfBlender),TimeOfLoading);
driver.findElement(By.linkText('Блендер BRAUN MQ535 SAUCE')).click();

driver.wait(until.titleContains("Блендер BRAUN"), TimeOfLoading);
driver.getTitle().then(function(text){
    console.log("Title : " + text);
});

driver.wait(until.titleIs(TitleOneBlender), TimeOfLoading);
driver.findElement(By.className('detail-title')).then(function(){
    if(text =! 'Блендер BRAUN MQ535 SAUCE'){
        throw 'The required goods did not find.';
    }
});
driver.findElement(By.className('detail-description')).then(function () {
    if(text != 'Тип: погружной. Мощность: 600 Вт. Кол-во скоростей: 2. Мини-измельчитель: есть. Колка льда: нет. Материал ножки блендера: металл. Цвет: белый/серый.'){
        throw 'The dicription of goods did not find.';
    }
});

driver.findElement(By.name('topurchases')).click();
driver.wait(function() {
    return driver.findElement(By.className('cart-title')).isDisplayed();
}, TimeOfLoading);
driver.findElement(By.className('cart-title')).then(function () {
    if(text != 'Вы добавили товар в корзину'){
        throw 'The goods did not added to cart';
    }
});
driver.findElement(By.className('popup-close-icon sprite')).click();

driver.findElement(By.className('hub-i-count')).then(function () {
    if(text != '1'){
        throw 'The amount of goods did not show in cart.';
    }
});
driver.findElement(By.className('sprite-side novisited hub-i-link hub-i-cart-link-count')).click();
driver.wait(function () {
    return driver.findElement(By.className('cart-title')).isDisplayed();
}, TimeOfLoading);
driver.findElement(By.name('goods-link')).then(function () {
    if(text != 'Блендер BRAUN MQ535 SAUCE'){
        throw 'The goods did not snow after reopen the cart.';
    }
});
driver.findElement(By.name('close')).click();



driver.quit();