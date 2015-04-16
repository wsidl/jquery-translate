/**
 * Created by wsiddall on 16/04/2015.
 */
$.translate.code_index = {
  "en":0,"fr":1,"es":2
};
$.translate.default_language = 'en';
$.translate.set_language();

$.translate.add_codes({
  lng_en:['Switch to English','Changer vers anglais','Cambiar a Ingl&#233;s'],
  lng_fr:['Switch to French','Changer vers fran&#231;is','Cambiar a franc&#233;s'],
  lng_es:['Switch to Spanish','Changer vers espa&#241;ol','Cambiar a espa&#241;ol'],
  header:["I'm using English", "J'utilise le fran&#234;ais","Estoy usuando espa&#241;ol"]
});
function translate(){
  $('#lang_en').html($.translate.get_text('lng_en'));
  $('#lang_fr').html($.translate.get_text('lng_fr'));
  $('#lang_es').html($.translate.get_text('lng_es'));
  $('#h1header').html($.translate.get_text('header'));
}
$(document).ready(function(){
  var t = ['#lang_en','#lang_fr','#lang_es'];
  $(t.toString()).click(function(evt){
    $.translate.set_language($(evt.target).attr('name'));
    translate();
  });
  translate()
});