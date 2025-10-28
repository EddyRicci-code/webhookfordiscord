//---------------------------------------------------------------------------------------------------------------------------------------------------------------
// Привет! Постараюсь понятно и для всех расписать каждую деталь, чтобы вы могли без особых знаний переделать все под себя. by Eddy Ricci (bonya7950) discord.
// Если вдруг ничего не приходит в дискорд, то просто идем в Триггеры -> Ваш тригер и там три точки -> Ошибки выполнения.
// 
var POST_URL = ""; // webhook
var ROLE_IDS = ["1350080637616390185", "1382609118904451149"];  // роль
var IMAGE_URL = "https://cdn.discordapp.com/attachments/1384973185216413878/1429487776172347423/2b501bb5bc33dd70.jpg?ex=690034fc&is=68fee37c&hm=976d12f00b31b03de93d103bcc449b7c9aa4a147de77d919a0e11b79fd48e700&";     // картинка снизу
var ICON_URL = "https://i.imgur.com/AMdUL3D.jpeg"; // картинка рядом с подписью
var BOT_AVATAR = "https://i.imgur.com/AMdUL3D.jpeg"// аватар бота
var USERNAME_BOT = "Ассистент Шерифа"
function onSubmit(e) {
   var response = e.response.getItemResponses();

  // Discord ID 
  var discordId = null;
  for (var i = 0; i < response.length; i++) {
    var q = String(response[i].getItem().getTitle() || "");
    var a = String(response[i].getResponse() || "");
    if (/(discord|дискорд)/i.test(q)) { // Ищет в гугл форме вопрос с названием discord или дискорд
      var m = a.match(/\d{17,20}/); //ищет числовое значение из 17-20 цифр
      if (m) discordId = m[0];
      break;
    }
  }

  // Собираем все в одну переменную
  var description = "";
  for (var i = 0; i < response.length; i++) {
    var question = String(response[i].getItem().getTitle() || "").trim();
    var answer = String(response[i].getResponse() || "").trim();
    if (!answer) continue;
    description += `**${question}:**\n${answer}\n\n`;
  }

  // Упоминания 
  var roleMentions = ROLE_IDS.map(id => "<@&" + id + ">").join(" ");
  var contentText = roleMentions + (discordId ? ` <@${discordId}>` : "");

  // Контроль упоминаний в дискорде
  var allowedMentions = { parse: [] };
  if (ROLE_IDS.length) allowedMentions.roles = ROLE_IDS;
  if (discordId) allowedMentions.users = [discordId];

  // Сам embed
  var embed = {
    title: "Новая заявка из формы",
    description: description.slice(0, 4096), 
    color: 0xFF8800,
    timestamp: new Date().toISOString(),
    footer: {
      text: "Eddy Ricci", // подпись
      icon_url: ICON_URL // иконка слева от подписи
    },
    image: {
      url: IMAGE_URL
    }
  };

  var body = {
    content: contentText,
    username: USERNAME_BOT, // Имя бота
    avatar_url: BOT_AVATAR, // Его аватар
    allowed_mentions: allowedMentions,
    embeds: [embed]
  };

  // Post Запрос
  UrlFetchApp.fetch(POST_URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    payload: JSON.stringify(body)
  });
}
