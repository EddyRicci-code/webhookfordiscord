//---------------------------------------------------------------------------------------------------------------------------------------------------------------
// Привет! Постараюсь понятно и для всех расписать каждую деталь, чтобы вы могли без особых знаний переделать все под себя. by Eddy Ricci (bonya7950) discord.
// Если вдруг ничего не приходит в дискорд, то просто идем в Триггеры -> Ваш тригер и там три точки -> Ошибки выполнения.
// Если в гугл форме 5 полей для заполнения, то переменных тоже должно быть пять, иначе в дискорд ничего не придет, переменные это var.
// 
function sendToDiscord(e) {
    var formResponse = e.response;
    var itemResponses = formResponse.getItemResponses();

    //Блок для счетчика, просто номер документа, для красоты.
    var scount = PropertiesService.getScriptProperties();
    var docNumber = parseInt(scount.getProperty('docNumber') || '0'); docNumber++;
    scount.setProperty('docNumber', docNumber); // Счетчик, при каждом новом заполнении +1. 
    //Меняем
    var discordWebhookUrl = ""; // Веб-хуксюда, его получаем в канале дискорда. !!!ВНИМАНИЕ!!! Всегда скрывайте от посторонних глаз этот вебхук, ибо могут навредить.
    var creator = "Bebe"; // Подпись,заполни под себя.
    var botname =" TRAVOLTA" // Имя бота от которого идут сообщения.
    var botavatar = "https://i.imgur.com/AMdUL3D.jpeg" // Автар бота, который отправляет сообщения.
    var titletheme = "📌 Заявление № " + docNumber // Заголовок
    var iconurl = "" // Иконка рядом с датой и подписью.
    var botavataronright = "" // Картинка справа
    var giforpicture = "https://s3-gallery.int-cdn.lcpdfrusercontent.com/monthly_2016_03/large.56f9bf968e979_AttemptedFight(Optimized).gif.48dd886cd9abba855b911a60ec64995f.gif" // Фотка снизу.

    var name = itemResponses[0].getResponse();       // Имя
    var static = itemResponses[1].getResponse();    // Static
    var issuer = itemResponses[2].getResponse();    // Кто выдал
    var link = itemResponses[3].getResponse();      // Ссылка
    var proof = itemResponses[4].getResponse();     // Доказательства
    var reason = itemResponses[5].getResponse();    // Причина
    var mention = " <@&1350081490616193134> <@&1350081490616193134> "; // ТЭГ ролей, вам нужны их ID.
    // Эти переменные можете менять по своему, но не забудьте, что цифры [] в скобках, это порядок вопросов в гугл форме, учтите начинается с нуля. 
    // Если нужна новая переменная, просто копируем var drugoenazvanie = itemResponses[5].getResponse(); обязательное уникальное имя вместо drugoenazvanie.
    
    var payload = {
        "username": botname, //Имя бота, от которого будет приходить сообщение.
        "avatar_url": botavatar, // Аватарка бота
        "content": mention, // Для тэга
        "embeds": [{
            "title": titletheme, // Просто заголовок
            "description": "",
            "color": 0xFF6B00, // Цвет края слева.
            "thumbnail": {
                "url": botavataronright, 
            },
            "fields": [
                {
                    "name": "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                    "value": "",
                    "inline": false
                },
                {
                    "name": ":index_pointing_at_the_viewer: Выговор был выдан по причине",
                    "value": "```fix\n" + reason + "\n```", // Поле для номера документ
                },
                {
                    "name": "👤 Сотрудник и static",
                    "value": "```fix\n" + name + " | " + static + "\n```",
                    "inline": true // значит будет на одной линии с другими полями где тоже есть inline: true
                },
                {
                    "name": ":man_police_officer:  Выдал",
                    "value": "```yaml\n" + issuer + "\n```",
                    "inline": true
                },
                {
                    "name": "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                    "value": "",
                    "inline": false
                },
                {
                    "name": "🔗 Ссылка на выговор",
                    "value": `[ Смотреть](${link})`, // Здесь ссылка будет спрятана за словом Смотреть.
                    "inline": true
                },
                {
                    "name": "📸 Доказательства",
                    "value": `[ Смотреть](${proof})`,
                    "inline": true
                }
            ],
            "image": {
                "url": giforpicture, // Картинка или гифка снизу.
            },
            "footer": {
                "text": creator,// Надпись внизу, обычно тут можно указать сове имя, типо прогрОмист.
                "icon_url": iconurl // Фотография рядом с напдисью
            },
            "timestamp": new Date().toISOString() // Дата
        }]
    };

    var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(payload)
    }; // Это по сути post запрос, который и отправляет все дискорду. Но сюда не лезьте.

    UrlFetchApp.fetch(discordWebhookUrl, options);
}

function onFormSubmit(e) { // функция вызывающая код выше
    sendToDiscord(e);
}
