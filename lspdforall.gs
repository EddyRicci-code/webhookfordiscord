// Привет! Постараюсь понятно и для всех расписать каждую переменную, чтобы вы могли без особых знаний переделать все под себя. by Eddy Ricci (bonya7950) discord.
// Если вдруг чничего не приходит в дискорд, то просто идем в Триггеры -> Ваш тригер и там три точки -> Ошибки выполнения.
const WEBHOOK_URL = ""; // URL вебхука Discord, определяет, в какой канал будет отправлено сообщение.
const MENTIONS = "<@&1344663185810133002> and <@&1344652864244420609>"; // Упоминания ролей или пользователей в Discord.
const EMBED_COLOR = 32768; // Цвет боковой полосы 
const TITLE = "Заявка в департамент"; // Заголовок сверху крупным шрифтом.
const DESCRIPTION = ""; // Описание  текст под заголовком. Маленькими буквами.
const THUMBNAIL_URL = "https://i.imgur.com/j4tyow9.png"; // Картинка справа
const IMAGE_URL = "https://i.imgur.com/UVpNmTM.gif"; // URL большой картинки, которая появляется внизу эмбеда.
const BOT_USERNAME = "Secretary BOT"; // Имя бота, от которого отправляется сообщение в Discord.
const BOT_AVATAR_URL = "https://i.imgur.com/GcGiygQ.png"; // URL аватарки бота.
const FIELD_EMOJI = ""; // Смайлик который будет перед сообщениями https://emojipedia.org/ отсюда удобно брать.
const FOOTER_TEXT = "Eddy Ricci"; // Можно свое имя вписать
const FOOTER_ICON = ""; // URL маленькой иконки, которая появляется слева от текста подписи.
const SHOW_TIMESTAMP = true; // Показывать ли временную метку  (true — да, false — нет).

function onSubmit(e) {
    const response = e.response.getItemResponses(); 
    const fields = []; 

    // Цикл для обработки каждого ответа из формы
    for (const responseAnswer of response) {
        const question = responseAnswer.getItem().getTitle(); 
        const answer = responseAnswer.getResponse(); 

        if (!answer) continue; // 

        const parts = answer.match(/[\s\S]{1,1024}/g) || [answer]; 

        parts.forEach((part, index) => {
            fields.push({
                name: index === 0 ? `${FIELD_EMOJI} ${question}` : `${FIELD_EMOJI} ${question} (cont.)`,
                value: part, 
                inline: false 
            });
        });
    }

    const embed = {
        title: TITLE, 
        color: EMBED_COLOR, 
        description: DESCRIPTION, 
        fields: fields, 
        image: { url: IMAGE_URL }, 
        thumbnail: { url: THUMBNAIL_URL }, 
        footer: {
            text: FOOTER_TEXT, 
            icon_url: FOOTER_ICON 
        }
    };

    if (SHOW_TIMESTAMP) {
        embed.timestamp = new Date().toISOString(); 
    }

    const payload = {
        username: BOT_USERNAME, 
        avatar_url: BOT_AVATAR_URL, 
        content: MENTIONS, 
        embeds: [embed] 
    };

    const options = {
        method: "post", 
        headers: {
            "Content-Type": "application/json" 
        },
        payload: JSON.stringify(payload) 
    };

    UrlFetchApp.fetch(WEBHOOK_URL, options); 
}
