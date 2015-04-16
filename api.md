---
layout: page
title: jquery-translate API
---

# Class: $.translate

## Description

The "translate" class incorporates a series of functions for controlling language translations within a website. All actions are carried out immediately without requiring loading external files such as translation files or accessing external APIs.

## Properties

Name | Type | Description
---- | ---- | ---
code_index | dict | <p>An index of supported languages, assigning a two-character language code to an index number. This index number is assigned by the developer to indicate which array value contains the translation for that particular language.</p><p>This is up to the developer to include.</p><code>$.translate.code_index = {"en":0,"es":1};</code>
default_language | string | Two-character language code to be defined as default for the website. Default value is 'en'.

## Functions

Name | Parameters | Return Type | Description
---- | ---- | ---- | ----
set_language | l = (opt) "language code" | void | <p>Sets the current implementation of the website to the specified language.</p><p>If no parameter is specified, will read the language code from the user's browser. And if the found language is not provided, will use the language specified by the property "default_language"</p>
get_language |  | string | Returns the two-character language code of the currently used language
add_codes | a = "Dictionary of translations" | void | <p>The method to insert translation dictionaries into the class. The dictionary is defined by the two-letter language code which points to an array value. The array must contain the same number of values as what is defined in the property "code_index"</p><code>$.translate.code_index = {<br />&nbsp;&nbsp;"en": 0,<br />&nbsp;&nbsp;"es":1<br/>}<br/>$.translate.add_codes({<br />&nbsp;&nbsp;title: ["English Title", "Titre espa&#241;ol"]<br/>});</code>
get_text | k = "Code Key"<br/>o = (opt) "key value references" | string | ts
