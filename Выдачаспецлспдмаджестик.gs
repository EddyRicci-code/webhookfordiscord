//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Привет! Постараюсь понятно и для всех расписать каждую деталь, чтобы вы могли без особых знаний переделать все под себя. by Eddy Ricci (bonya7950) discord.
// Если вдруг ничего не приходит в дискорд, то просто идем в Триггеры -> Ваш тригер и там три точки -> Ошибки выполнения.
// Если в гугл форме 5 полей для заполнения, то переменных тоже должно быть пять, иначе в дискорд ничего не придет, переменные это var.
// Здесь залочены переменные, и НЕ БЕРУТСЯ из гугл форм.
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
function sendToDiscord(e) {
    var formResponse = e.response;
    var itemResponses = formResponse.getItemResponses();

    //Меняете под себя.
    var discordWebhookUrl = ""; // //Веб-хуксюда, его получаем в канале дискорда. !!!ВНИМАНИЕ!!! Всегда скрывайте от посторонних глаз этот вебхук, ибо могут навредить.
    var creator = "by Eddy Ricci"; // Подпись,заполни под себя.
    var botname =" TRAVOLTA" // Имя бота от которого идут сообщения.
    var botavatar = "https://i.imgur.com/AMdUL3D.jpeg" // Автар бота, который отправляет сообщения.
    var titletheme = "Отчёт спец, вооружении Los-Santos Police Department" // Заголовок
    var iconurl = "" // Иконка рядом с датой и подписью.
    
    var weaponType = itemResponses[0].getResponse();    // Тип спец, вооружении 
    var serialNumber = itemResponses[1].getResponse();  // Серийный номер 
    var screenshotLink = itemResponses[2].getResponse(); // Скриншот, обязательно ссылка, ибо там будет цифра один.
    var interactionType = itemResponses[3].getResponse(); // Тип взаимодействия, обычно взял или положил
    var issuerId = itemResponses[4].getResponse();      // Статический ID выдавшего 
    var issuerName = itemResponses[5].getResponse();    // Имя Фамилия выдавшего 
    var receiverId = itemResponses[6].getResponse();    // Статический ID текущего владельца
    var receiverName = itemResponses[7].getResponse();  // Имя Фамилия текущего владельца
    var rank = itemResponses[8].getResponse();          // Ранг
    var department = itemResponses[9].getResponse();    // Отдел 
  //var mention = " <@&13494198732767> <@&13494198732767> "; // ТЭГ ролей, вам нужны их ID. Если нужно вам, чтобы приходил и тег в дискорде, раскомментировать.
  // Эти переменные можете менять по своему, но не забудьте, что цифры [] в скобках, это порядок вопросов в гугл форме, учтите начинается с нуля. 
  // Если нужна новая переменная, просто копируем var drugoenazvanie = itemResponses[5].getResponse(); обязательное уникальное имя вместо drugoenazvanie.


    var payload = {
        "username": botname, //Имя бота, от которого будут идти сообщения.
        "avatar_url": botavatar, // Аватарка бота, меняйте на свое усмотрение.
        //"content": mention, // Для тэга. Если нужно вам, чтобы приходил тег в дискорде, раскомментировать.
        "embeds": [{
            "title": titletheme, // Просто заголовок, можете менять нра свое усмотрение.
            "description": "", // Описание, если нужно используйте.
            "color": 0xFFFFFF, // Белый
            "fields": [
                {
                    // Тут сделано так, чтобы в дискорде вы получали Переменная:Значение, на одной строке. /n - символ новой строки, не стираем.
                    "name": "**Информация по спец. вооружению**", // **Слово** жирный шрифт.
                    "value": "Тип спец, вооружения: " + weaponType + "\nСерийный номер: " + serialNumber + "\nСкриншот: [Смотреть](" + screenshotLink + ")",
                    "inline": false
                },
                {
                    "name": "**Взаимодействие со складом**", // Тут кто брал спец со склада.
                    "value": "Тип взаимодействия: " + interactionType + "\nСтатический ID: " + issuerId + "\nИмя Фамилия: " + issuerName,
                    "inline": false
                },
                {
                    "name": "**Владелец спец. вооружениия**",  // Кто получил в итоге.
                    "value": "Статический ID: " + receiverId + "\nИмя Фамилия: " + receiverName + "\nПорядковый ранг: " + rank + "\nОтдел: " + department, 
                    "inline": false
                }
            ],
            "footer": {
                "text": new Date().toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }).replace(' г.', ' г').replace(',', ', ') + "\n" + creator, // реплейсы, чтобы убрать точку с запятой в выводе даты.  + "\nBy Eddy Ricci" меняете на свое или удаляете.
                "icon_url": iconurl // иконка рядом с датой

            },
        }]
    };

//Все, что ниже не трогайте.
    var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(payload)
    };

    UrlFetchApp.fetch(discordWebhookUrl, options);
}

function onFormSubmit(e) {
    sendToDiscord(e);
}
