//---------------------------------------------------------------------------------------------------------------------------------------------------------------
// Привет! Постараюсь понятно и для всех расписать каждую деталь, чтобы вы могли без особых знаний переделать все под себя. by Eddy Ricci (bonya7950) discord.
// Если вдруг ничего не приходит в дискорд, то просто идем в Триггеры -> Ваш тригер и там три точки -> Ошибки выполнения.
// Если в гугл форме 5 полей для заполнения, то переменных тоже должно быть пять, иначе в дискорд ничего не придет, переменные это var.
// 
function sendToDiscord(e) {
    var formResponse = e.response;
    var itemResponses = formResponse.getItemResponses();
    //Меняем
    var discordWebhookUrl = ""; // //Веб-хуксюда, его получаем в канале дискорда. !!!ВНИМАНИЕ!!! Всегда скрывайте от посторонних глаз этот вебхук, ибо могут навредить.
    var creator = "by Eddy Ricci"; // Подпись,заполни под себя.
    var botname =" TRAVOLTA" // Имя бота от которого идут сообщения.
    var botavatar = "https://i.imgur.com/AMdUL3D.jpeg" // Автар бота, который отправляет сообщения.
    var titletheme = "Отчёт спец, вооружении Los-Santos Police Department" // Заголовок
    var iconurl = "" // Иконка рядом с датой и подписью.
    var botavataronright = "" // Картинка справа
    var giforpicture = "https://i.imgur.com/MdSmTTq.gif" // Фотка снизу.

    var name = itemResponses[0].getResponse();       // Имя
    var issuer = itemResponses[1].getResponse();    // Кто выдал
    var link = itemResponses[2].getResponse();      // Ссылка
    var proof = itemResponses[3].getResponse();     // Доказательства
    var reason = itemResponses[4].getResponse();    // Причина
    var mention = " <@&1350081490616193134> <@&1350081490616193134> "; // ТЭГ ролей, вам нужны их ID.
    // Эти переменные можете менять по своему, но не забудьте, что цифры [] в скобках, это порядок вопросов в гугл форме, учтите начинается с нуля. 
    // Если нужна новая переменная, просто копируем var drugoenazvanie = itemResponses[5].getResponse(); обязательное уникальное имя вместо drugoenazvanie.
    
    var discordWebhookUrl = ""; //Веб-хуксюда, его получаем в канале дискорда.

    var payload = {
        "username": botname, //Имя бота, от которого будет приходить сообщение.
        "avatar_url": botavatar, // Аватарка бота
        "content": mention, // Для тэга
        "embeds": [{
            "title": "⚠️" + titletheme, // Просто заголовок
            "description": "```css\nПоступила новая запись об отработке выговора по причине: " + reason + "\n```",// Где Русские буквы, пишите, что угодно, но остальное не трогайте.
            "color": 0xFF6B00, // Цвет края слева.
            "thumbnail": {
                "url": botavataronright, 
            },
            "fields": [
                {
                    "name": "👤 Сотрудник",
                    "value": "```fix\n" + name + "\n```",
                    "inline": true // значит будет на одной линии с другими полями где тоже есть inline: true
                },
                {
                    "name": "🛡️ Выдал",
                    "value": "```yaml\n" + issuer + "\n```",
                    "inline": true
                },
                {
                    "name": "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                    "value": "",
                    "inline": false
                },
                {
                    "name": "🔗 Выговор",
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
