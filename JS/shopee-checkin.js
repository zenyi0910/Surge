/*
修改自 https://github.com/langkhach270389/Scripting/blob/master/shopee_checkin.js

適用台灣蝦皮 shopee.tw

[Script]
cron "0 7 * * *" script-path=https://raw.githubusercontent.com/jkgtw/Surge/master/JS/shopee-checkin.js
shopee-loyalty-cookie.js = type=http-request,pattern=^https:\/\/loyalty\.shopee\.tw\/api\/v1\/coins$,script-path=https://raw.githubusercontent.com/jkgtw/Surge/master/JS/shopee-cookie.js,script-update-interval=-1

MITM = loyalty.shopee.tw
*/
  var shopeeUrl = {
    url: 'https://shopee.tw/mkt/coins/api/v2/checkin',
    headers: {
      Cookie: $persistentStore.read("CookieSP"),
    }
  }
$httpClient.post(shopeeUrl, function(error, response, data){
  if (error) {
    $notification.post("蝦皮簽到", "", "連線錯誤‼️")
    $done(); 
  } 
  else{
  if(response.status == 200)
  {
    let obj= JSON.parse(data);
    if(obj["data"]["success"])
    {
      var user = obj["data"]["username"];
      var coins = obj["data"]["increase_coins"];
      var checkinday = obj["data"]["check_in_day"];
      $notification.post("蝦皮購物 " + user + " 已連續簽到 " + checkinday + " 天", "", "今日已領取：" + coins + " 蝦幣 💰💰💰");
      $done();
    }
    else if(obj["data"]["success"] == false)
    {
      $notification.post("今日蝦皮已簽到，每日只能簽到一次‼️", "", "");
      $done();
    }
  $done();
  }
else{
  $notification.post("蝦皮 Cookie 已過期‼️", "", "請重新抓取 🔓");
  $done();
  }
  }
});
