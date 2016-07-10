var webdriver = require('..'),
    By = webdriver.By,
    until = webdriver.until,
    chrome = require('../chrome');

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
driver.manage().timeouts().implicitlyWait(7 * 1000);

function executeJS(script) {
    driver.executeScript(script).then(function(return_value) {
    });
}

// this function scroll window to top
function scrollUp(){
    executeJS("window.scrollTo(0,0);");
    driver.sleep(1000);
}

function verifyValue(className, textForCheck, message) {
    var element = driver.findElement(By.className(className));
    element.getText().then(function (text) {
        if (text = ! textForCheck) {
            throw message + '  ERROR';
        } else {
            console.log(message + '  OK');
        }
    });
}
function waitForElement(className) {
    driver.wait(function () {
        return driver.findElement(By.className(className)).isDisplayed();
    }, TimeOfLoading);
}

var TimeOfLoading = 10000;
var TitleRozetka = 'Интернет-магазин ROZETKA™: фототехника, видеотехника, аудиотехника, компьютеры и компьютерные комплектующие';
var TitleTechcnics = 'Бытовая техника - Интернет магазин Rozetka.ua | Магазин бытовой техники в Киеве, Харькове, Донецке, Одессе, Львове: цена, отзывы, продажа, купить оптом бытовую технику';
var TitleBlenders = 'Блендеры - Интернет магазин Rozetka.ua | Купить Блендеры в Киеве: цена, отзывы, продажа.';
var TitleTypeOfBlender = 'Тип: погружной. Блендеры - Интернет магазин Rozetka.ua | Купить Блендеры в Киеве: цена, отзывы, продажа.';
var TitleOneBlender = 'Rozetka.ua | Блендер BRAUN MQ535 SAUCE. Цена, купить Блендер BRAUN MQ535 SAUCE в Киеве, Харькове, Днепропетровске, Одессе, Запорожье, Львове. Блендер BRAUN MQ535 SAUCE: обзор, описание, продажа.';

driver.get('http://www.rozetka.com.ua');
driver.wait(until.titleIs(TitleRozetka), TimeOfLoading);

driver.findElement(By.partialLinkText('Бытовая техника')).click();
driver.wait(until.titleIs(TitleTechcnics),TimeOfLoading);
driver.findElement(By.linkText('Блендеры')).click();
driver.wait(until.titleIs(TitleBlenders), TimeOfLoading);
driver.findElement(By.linkText('Погружной')).click();
driver.wait(until.titleIs(TitleTypeOfBlender),TimeOfLoading);
driver.findElement(By.linkText('Блендер BRAUN MQ535 SAUCE')).click();
driver.wait(until.titleContains("Блендер BRAUN"), TimeOfLoading);

driver.wait(until.titleIs(TitleOneBlender), TimeOfLoading);
verifyValue('detail-title', 'Блендер BRAUN MQ535 SAUCE', 'The required goods have been found');
verifyValue('detail-description', 'Тип: погружной. Мощность: 600 Вт. Кол-во скоростей: 2. Мини-измельчитель: есть.'+
    'Колка льда: нет. Материал ножки блендера: металл. Цвет: белый/серый.', 'The description of goods have been found.');

driver.findElement(By.name('topurchases')).click();
waitForElement('cart-title');
verifyValue('cart-title', 'Вы добавили товар в корзину', 'The goods added to cart successfully.');
scrollUp();
driver.findElement(By.className('popup-close-icon')).click();

verifyValue('hub-i-count', '1', 'The amount of goods have been shown in the cart.');
driver.findElement(By.className('hub-i-cart-link-count')).click();
waitForElement('cart-title');
verifyValue('cart-i-title-link', 'Блендер BRAUN MQ535 SAUCE', 'The goods have been snown after reopen the cart.');
scrollUp();
driver.findElement(By.className('popup-close-icon')).click();

verifyValue('hub-i-count', '1', 'The amount of goods have been shown after reopen twice in the cart.');
driver.findElement(By.className('sprite-side novisited hub-i-link hub-i-cart-link-count')).click();
waitForElement('cart-title');
driver.findElement(By.className('cart-check-icon')).click();
driver.findElement(By.className('cart-i-delete-link')).click();
verifyValue('empty-cart-title', 'Корзина пуста', 'The message have been shown about empty cart.');
scrollUp();
driver.findElement(By.className('popup-close-icon')).click();

driver.findElement(By.className('hub-i-cart-link')).click();
verifyValue('empty-cart-title', 'Корзина пуста', 'The innformation about empty cart have been shown.');
scrollUp();
driver.findElement(By.className('popup-close-icon')).click();

driver.quit();