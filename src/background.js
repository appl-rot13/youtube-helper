(() => {
  const enableCloseChat = "enable-close-chat";

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.message) {
      case "set-enable-close-chat":
        chrome.storage.local.set({ [enableCloseChat]: request.value });
        break;

      case "get-enable-close-chat":
        chrome.storage.local.get([enableCloseChat]).then(ret => {
          sendResponse((enableCloseChat in ret) ? ret[enableCloseChat] : true);
        });
        return true;
    }
  });
})();
