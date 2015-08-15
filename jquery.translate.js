/*!
 * jQuery Translations plugin
 *
 * see https://github.com/wsidl/jquery-translate
 *
 * Licensed under the MIT license.
 *
 * Version: 1.1 (16 Apr 2015)
 */
(function($) {

  /**
   * translation library
   * @type {{code_index: {}, j: {}, k: number, default_language: string, add_codes: Function, set_language: Function, get_text: Function}}
   */
  var lang = {
    /*
     * class variables
     * code_index        : Dictionary of languages to support
     * j                 : Dictionary of translations using reference keys
     * k                 : Currently active language (as index number)
     * default_language  : Default language to support if no other language is supported
     */
  // Saving instance of original text element
    o: $.fn.text,
    code_index: {},
    j: {},
    k: 0,
    default_language: 'en',

    /**
     * add_codes()
     *
     * Assigns new dictionary to existing set of codes. If existing
     * key references exist, will be replaced by newer reference
     *
     * @param a dict : Dictionary of new code elements
     */
    add_codes: function (a) {
      lang.j = $.extend({}, lang.j, a);
      return lang;
    },

    /**
     * set_language()
     *
     * Defines the language to be used. If parameter not provided,
     * will read the default language from browser's settings. Then
     * applies statically applied keys.
     *
     * @param l string : language reference code. Accepts i18n strings
     *                   (eg. 'en-US') or two-character reference (eg. 'en')
     */
    set_language: function (l) {
      if (!(l == undefined)) {
        if (l.length > 2 && l.indexOf('-') >= 0)l = l.split('-')[0]
      } else {
        l = (navigator.language || navigator.userLanguage || navigator.systemLanguage).split("-")[0]
      }
      if (!(l in lang.code_index)) {
        console.log("Language not supported, add index for", l);
        l = lang.default_language
      }
      lang.k = lang.code_index[l];
      $.each(lang.j, function (a, b) {
        if (a.substr(0, 1) == '!') {
          var c = $(a.substr(1));
          if (!(c.is('button') || c.is('input'))) {
            c.html(lang.get_text(a))
          } else {
            c.val(lang.get_text(a))
          }
        }
      });
      return lang;
    },

    /**
     * get_language()
     *
     * Returns the two-character acronym of the currently active language.
     *
     * @returns {*} string: language code
     */
    get_language: function(){
      return lang.code_index[lang.k];
    },

    /**
     * get_text()
     *
     * Finds translations of provided key. If text contained in key's
     * reference contains sub-keys, options can be provided to fulfill
     * internal references
     *
     * @param k string : Key reference for translation
     * @param o dict : (optional) Dictionary of key references if translated
     *                 string contains additional keys
     * @returns {*} string : translated string
     */
    get_text: function (k, o) {
      if(k=="")return this;
      try {
        var t = lang.j[k][lang.k];
        var e = $.extend({}, lang.j, o);
        if (e) {
          $.each(e, function (a, b) {
            var c = new RegExp('{{' + a + '}}', 'g');
            var d = (typeof b == 'string' ? b : b[lang.k]);
            t = t.replace(c, d)
          })
        }
        if (t.match(/{{.*}}/))$.error("Missing option key for '" + k + "'");
        return $.proxy(lang.o, this, t);
      } catch (e) {
        return $.proxy(lang.o, this, k);
      }
    }
  };
  $.translate = lang;
  $.fn.text = lang.get_text;
})(jQuery);