(() => {
  const isEnabled = "isEnabled";

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.message) {
      case "set-enabled":
        chrome.storage.local.set({ [isEnabled]: request.value });
        break;

      case "get-enabled":
        chrome.storage.local.get([isEnabled]).then(ret => {
          sendResponse((isEnabled in ret) ? ret[isEnabled] : true);
        });
        return true;
    }
  });
})();
