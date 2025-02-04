/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

var darkThemeName = 'dark';
var lightThemeName = 'light';
var getTenantName = function getTenantName() {
  return document.documentElement.getAttribute('data-tenant') || '';
};
var getStoredTheme = function getStoredTheme() {
  return localStorage.getItem(getTenantName() + '-admintheme');
};
var setStoredTheme = function setStoredTheme(theme) {
  return localStorage.setItem(getTenantName() + '-admintheme', theme);
};
var getPreferredTheme = function getPreferredTheme() {
  var storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? darkThemeName : lightThemeName;
};
var setTheme = function setTheme(theme) {
  if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-bs-theme', darkThemeName);
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
};
var getAdminPreferenceKey = function getAdminPreferenceKey() {
  return getTenantName() + '-adminPreferences';
};
var getAdminPreferences = function getAdminPreferences() {
  return JSON.parse(localStorage.getItem(getAdminPreferenceKey()));
};
var setAdminPreferences = function setAdminPreferences(adminPreferences) {
  var key = getAdminPreferenceKey();
  localStorage.setItem(key, JSON.stringify(adminPreferences));
  Cookies.set(key, JSON.stringify(adminPreferences), {
    expires: 360
  });
};
// We add some classes to the body tag to restore the sidebar to the state is was before reload.
// That state was saved to localstorage by userPreferencesPersistor.js
// We need to apply the classes BEFORE the page is rendered. 
// That is why we use a MutationObserver instead of document.Ready().
var themeObserver = new MutationObserver(function (mutations) {
  for (var i = 0; i < mutations.length; i++) {
    for (var j = 0; j < mutations[i].addedNodes.length; j++) {
      if (mutations[i].addedNodes[j].tagName == 'BODY') {
        setTheme(getPreferredTheme());

        // we're done: 
        themeObserver.disconnect();
      }
      ;
    }
  }
});
themeObserver.observe(document.documentElement, {
  childList: true,
  subtree: true
});
// We add some classes to the body tag to restore the sidebar to the state is was before reload.
// That state was saved to localstorage by userPreferencesPersistor.js
// We need to apply the classes BEFORE the page is rendered.
// That is why we use a MutationObserver instead of document.Ready().
var isCompactExplicit = false;
var observer = new MutationObserver(function (mutations) {
  for (var i = 0; i < mutations.length; i++) {
    for (var j = 0; j < mutations[i].addedNodes.length; j++) {
      if (mutations[i].addedNodes[j].tagName == 'BODY') {
        var body = mutations[i].addedNodes[j];
        var adminPreferences = getAdminPreferences();
        if (adminPreferences) {
          isCompactExplicit = adminPreferences.isCompactExplicit;
          if (adminPreferences != null && adminPreferences.leftSidebarCompact == true) {
            body.classList.add('left-sidebar-compact');
          }
        }
        observer.disconnect();
      }
      ;
    }
  }
});
observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});