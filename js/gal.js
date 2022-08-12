window.onload = function () {
    $("#SHOW_MEDIA").hide();
    $("#SHOW_PRETEXT").hide();
    $("#SHOW_TITLE").hide();
    $("#SHOW_DESCRIPTION").hide();
    $("#SHOW_CHRONOLOGICAL").hide(); 
    $("#SHOW_LOCATION").hide(); 
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  };

  var imgID = getUrlParameter("id");
  axios({
    method: "get",
    url: `https://eo1kch7zxcopjza.m.pipedream.net?id=${imgID}`,
    responseType: "json",
  }).then(function (response) {
  
    const MEDIA_URL = response.data["MEDIA"].files[0]?.file.url;
    if(MEDIA_URL) $("#SHOW_MEDIA").show();
    const PRETEXT = response.data["PRETEXT"].results[0]?.rich_text.plain_text;
    if(PRETEXT) $("#SHOW_PRETEXT").show();
    const TITLE = response.data["TITLE"].results[0]?.rich_text.plain_text;
    if(TITLE) $("#SHOW_TITLE").show();

    const DESCRIPTION = response.data["DESCRIPTION"].results[0]?.rich_text.plain_text;
    if(DESCRIPTION) $("#SHOW_DESCRIPTION").show();
    const LOCATION = response.data["LOCATION"].results[0]?.rich_text.plain_text;
    if(LOCATION) $("#SHOW_LOCATION").show();
    const CHRONOLOGICAL = response.data["CHRONOLOGICAL"].results[0]?.rich_text.plain_text;
    if(CHRONOLOGICAL) $("#SHOW_CHRONOLOGICAL").show();
    $("#MEDIA").attr("src", MEDIA_URL);
    $("#PRETEXT").text(PRETEXT);
    $("#TITLE").text(TITLE);
    $("#DESCRIPTION").text(DESCRIPTION);
    $("#CHRONOLOGICAL").text(CHRONOLOGICAL);
    $("#LOCATION").text(LOCATION);
  });
};
