/*!
 * jQuery Translations plugin
 *
 * see https://github.com/wsidl/jquery-translate
 *
 * Licensed under the MIT license.
 *
 * Version: 1.3 (19 Aug 2015)
 */
(function($) {

  /**
   * translation library
   * @type {{code_index: {}, j: {}, k: number, default_language: string, add_codes: Function, set_language: Function, get_text: Function}}
   */
  p = {
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
    k: undefined,
    d: [],
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
      p.j = $.extend({}, p.j, a);
      return p;
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
      if (!(l in p.code_index)) {
        console.log("Language not supported, add index for", l);
        l = p.default_language
      }
      if(p.k==undefined)p.k=l;
      var ol = p.get_language();
      if(p.k==p.code_index[l])return this;
      p.k = p.code_index[l];
      $.each(p.j, function (a, b) {
        if (a.substr(0, 1) == '!') {
          var c = $(a.substr(1));
          if (!(c.is('button') || c.is('input'))) {
            c.html(p.get_text(a))
          } else {
            c.val(p.get_text(a))
          }
        }
      });
      $.each(p.d, function (a, b){
        try {
          b(ol, l);
        } catch (e){
          console.log(e);
        }
      });
      return this;
    },

    /**
     * get_language()
     *
     * Returns the two-character acronym of the currently active language.
     *
     * @returns {*} string: language code
     */
    get_language: function(){
      var d = p.default_language;
      $.each(p.code_index, function(k,v){
        if(v== p.k) {
          return d = k;
        }
      });
      return d;
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
      var r = "";
      try {
        var t = p.j[k][p.k];
        var e = $.extend({}, p.j, o);
        if (e) {
          $.each(e, function (a, b) {
            var c = new RegExp('{{' + a + '}}', 'g');
            var d = (typeof b == 'string' ? b : b[p.k]);
            t = t.replace(c, d)
          })
        }
        if (t.match(/{{.*}}/))$.error("Missing option for key '" + k + "'");
        r = t;
      } catch (e) {
        r = k;
      }
      if(this==p){
        return r;
      } else {
        return $.proxy(p.o, this, r)();
      }
    },

    /**
     * change()
     *
     * Offers a callback method for when the language is changed. This
     * permits for custom translation requirements or elements that cannot
     * be translated through supported means.
     *
     * @param a function : callback function to run
     * @returns this
     */
    change: function(c){
      if(typeof c=='function'){
        p.d.push(c);
      }
      return this;
    }
  };
  $.translate = p;
  $.fn.text = p.get_text;
})(jQuery);