# About
*jQuery-translate* is a jQuery plugin for fast and format intensive client-side translations in javascript. It is based off of a number of existing translation (listed below) and licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

# Introduction
There are a number of features that are available in this library that provides easier integration into the website. This includes:

1. **Multiple translations in a single line**: Most libraries ask to separate translations making for harder maintenance, and updating many files at once. This reduces that by having all translations within a single call.
1. **Dynamic loading**: Larger websites may load various sections or pieces of code to improve performance. This library allows to add new translations during runtime for newly introduced elements and translations.
1. **Formatted translations**: Translations can be returned, but languages have different syntaxes and phrasing structures. Providing a parameterized translations (using `{{lookup}}` style parameters) allow for a more in-depth translation.
1. **jQuery lookup keys**: By using an exclamation mark (!) at the beginning of the key, it notifies the library that the key is a jQuery lookup string. This will also identify to the library that when the language changes, to automatically assign the new translations to these elements.
1. **Language by browser**: If no language is defined by the user or by the developer, the library will determine the user's browser's working language and display that language. If the defined language is not supported, a warning will be displayed in the browser's console and will switch to the default language.
1. **Default language**: In the case that no language can be determined, all cases will switch to the default language. Statically, this is 'en', but can be changed.

# Usage
To access the library, it must be provided a list of supported languages. Without this, the browser's console will be loaded with a number of warnings.

After loading the library through HTML, the list of languages must be supplied. It is also possible to define the default language to be used if no other language can be determined.

```javascript
$.translate.code_index = {[
    'en':0,
    'es':1,
    'fr':2
]};
$.translate.default_language = 'es';
$.translate.set_language();
```

Changing the language is done by supplying the new language code

```javascript
$.translate.set_language('fr');
```

Once the index has been defined, creating the list of translations can begin

```javascript
$.translate.add_codes({
    'some_text': ['English Text','Texte espa#&241;ol','Texte fran&#231;ais']
});
```

This text can then be referenced by it's key code. Each time the language changes, calling this line again will return the new translation.

```javascript
$('#txt_placeholder').text($.translate.get_text('some_text'));
```

It's also possible to create larger translations where the phrasing structure has changed, providing a more complex translation. Using the above example:

```javascript
$.translate.add_codes({
    'some_text': ['English {{txt}}','{{txt}} espa#&241;ol','Texte fran&#231;ais'],
    'text_word': ['Text','Texte','Texte']
});

// Read from a single value
$.translate.get_text('some_text',{txt:'Text'});

// Read from a custom code set
$.translate.get_text('some_text',{txt:['Text','Texte','Texte']});

// Or read from an existing code set
$.translate.get_text('some_text',{txt:$.translate.get_text('text_work')});
```

If the provided parameter in the format exists in the available codes, it will grab that (unless otherwise overwritten by the inputted options

```javascript
$.translate.add_codes({
    'some_text': ['English {{txt}}','{{txt}} espa#&241;ol','Texte fran&#231;ais'],
    'txt': ['Text','Texte','Texte']
});
$.translate.get_text('some_text');
// will output 'English Text' or:
$.translate.get_text('some_text', {txt:'Phrase'});
// will output 'English Phrase'
```

It is also possible to define the key as a jQuery lookup. Using the above example:

```javascript
$.translate.add_codes({
    '!#txt_placeholder': ['English {{txt}}','{{txt}} espa#&241;ol','{{txt}} fran&#231;ais'],
    'txt': ['Text','Texte','Texte']
});
```

Using this reference is now useful so when `$.translate.set_language('en');` is used, the library will find all jQuery lookups (identified by the '!') and apply translations automatically.

# Feature idea references
After creating a first implementation and not fully satisfied, I tried a number of plugins and stand-alone libraries that provided inspiration and for the work done here. I have tried:
- [https://github.com/recurser/jquery-i18n](recurser's jquery-i18n): Most ideas came from this repository. Although more complex, the idea of a lightweight but powerful library was useful. I could have used this, but didn't work well for the features needed for my projects.
- [https://github.com/kostia/jquery.li18n](kostia's li18n): Small library and works quickly. Got the idea for parameterized formats from this library.
