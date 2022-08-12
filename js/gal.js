window.onload = function () {
    $("#SHOW_MEDIA").hide();
    $("#SHOW_PRETEXT").hide();
    // $("#SHOW_TITLE").hide();
    $("#SHOW_DESCRIPTION").hide();
    // $("#SHOW_CHRONOLOGICAL").hide(); 
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
    $("#MEDIA").attr("src", MEDIA_URL??"");
    const PRETEXT = response.data["PRETEXT"].results[0]?.rich_text.plain_text;
    
    const TITLE = response.data["TITLE"].results[0]?.rich_text.plain_text;


    const DESCRIPTION = response.data["DESCRIPTION"].results[0]?.rich_text.plain_text;

    const LOCATION = response.data["LOCATION"].results[0]?.rich_text.plain_text;
  
    const CHRONOLOGICAL = response.data["CHRONOLOGICAL"].results[0]?.rich_text.plain_text;
    
    $("#PRETEXT").html(PRETEXT??"");
    $("#TITLE").html(TITLE??"");
    $("#DESCRIPTION").html(DESCRIPTION??"");
    $("#CHRONOLOGICAL").html(CHRONOLOGICAL??"");
    $("#LOCATION").html(LOCATION??"");
    if(MEDIA_URL) $("#SHOW_MEDIA").show();
    if(PRETEXT) $("#SHOW_PRETEXT").show();
    if(TITLE) $("#SHOW_TITLE").show();
    if(DESCRIPTION) $("#SHOW_DESCRIPTION").show();
    if(LOCATION) $("#SHOW_LOCATION").show();
    if(CHRONOLOGICAL) $("#SHOW_CHRONOLOGICAL").show();

  });
};
