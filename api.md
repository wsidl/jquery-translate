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
code_index | dict | An index of supported languages, assigning a two-character language code to an index number. This index number is assigned by the developer to indicate which array value contains the translation for that particular language. This is up to the developer to include.\r\n```javascript\r\n$.translate.code_index = {"en":0,"es":1};\r\n``` |