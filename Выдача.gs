//------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Привет! Постараюсь понятно и для всех расписать каждую деталь, чтобы вы могли без особых знаний переделать все под себя. by Eddy Ricci (bonya7950) discord.
// Если вдруг ничего не приходит в дискорд, то просто идем в Триггеры -> Ваш тригер и там три точки -> Ошибки выполнения.
// Это код эмбеда специфичено настроен для выдачи, но можно и под себя оптимизировать
// Все названия строк берутся из ГУГЛ ФОРМЫ, какие-там такие придут и в дискорд.
// 
function sendToDiscord(e) {
    var formResponse = e.response;
    var itemResponses = formResponse.getItemResponses();
 // var mention = " <@&13494198732767> <@&13494198732767> "; // Если нужно расскомментируй и введи необходимые теги, для оповещения.

// Меняй под себя
    var discordWebhookUrl = ""; // Веб-хук сюда, его получаем в канале дискорда. !!!ВНИМАНИЕ!!! Всегда скрывайте от посторонних глаз этот вебхук, ибо могут навредить.
    var creator = "by Eddy Ricci"; // Подпись,заполни под себя.
    var botname =" TRAVOLTA" // Имя бота от которого идут сообщения.
    var botavatar = "https://i.imgur.com/AMdUL3D.jpeg"
    var titletheme = "Отчёт спец, вооружении Los-Santos Police Department" // Заголовок
    var iconurl = "" // Иконка рядом с датой и подписью.
    // Ниже не трогай.
    // Массив хранения
    let infoFields = []; // Для "Информация по спец. вооружению" 
    let interactionFields = []; // Для "Взаимодействие со складом" 
    let ownerFields = []; // Для "Владелец спец. вооружения" 

    
    for (let i = 0; i < itemResponses.length; i++) {
        const question = itemResponses[i].getItem().getTitle(); 
        const answer = itemResponses[i].getResponse(); 

        if (!answer) {
            continue; 
        }

        
        let parts = [];
        try {
            parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            parts = [answer];
        }

        for (const [index, part] of Object.entries(parts)) {
            let fieldName = index == 0 ? question : question + " (cont.)";
            let fieldValue = part;

            // Распределяем поля по группам
            if (i <= 2) {
                // Первые три вопроса
                if (fieldName.startsWith("Скриншот")) {
                    fieldValue = `[Смотреть](${part})`;
                }
                infoFields.push(`${fieldName}: ${fieldValue}`);
            } else if (i <= 5) {
                // Следующие три вопроса
                interactionFields.push(`${fieldName}: ${fieldValue}`);
            } else {
                // Последние четыре вопроса, если вопросов более 10, то остальные попадут в последнюю группу "Владелец спец. вооружения"
                ownerFields.push(`${fieldName}: ${fieldValue}`);
            }
        }
    }

    var payload = {
        "username": botname, // Имя бота, от которого будут идти сообщения.
        "avatar_url": botavatar, // Аватарка бота, меняйте на свое усмотрение.
        //"content": mention, // Для тэга. Если нужно вам, чтобы приходил тег в дискорде, раскомментировать.
        "embeds": [{
            "title": titletheme, // Просто заголовок, можете менять на свое усмотрение.
            "description": "", // Описание, если нужно используйте.
            "color": 0xFFFFFF, // Белый
            "fields": [
                {
                    "name": "**Информация по спец. вооружению**",
                    "value": infoFields.length > 0 ? infoFields.join("\n") : "Нет данных",
                    "inline": false
                },
                {
                    "name": "**Взаимодействие со складом**",
                    "value": interactionFields.length > 0 ? interactionFields.join("\n") : "Нет данных",
                    "inline": false
                },
                {
                    "name": "**Владелец спец. вооружения**",
                    "value": ownerFields.length > 0 ? ownerFields.join("\n") : "Нет данных",
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
                }).replace(' г.', ' г').replace(',', ', ') + "\n" + creator, // реплейсы, чтобы убрать точку с запятой в выводе даты.
                "icon_url": iconurl // иконка рядом с датой
            },
        }]
    };

    // Все, что ниже не трогайте.
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
