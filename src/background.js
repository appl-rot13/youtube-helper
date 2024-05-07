(() => {
  const setStorageData = (key, value) => {
    chrome.storage.local.set({ [key]: value });
  }

  const getStorageData = (key, defaultValue) => {
    return new Promise(resolve => {
      chrome.storage.local.get([key], value => {
        resolve((key in value) ? value[key] : defaultValue);
      });
    });
  };

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    let url = changeInfo.url;
    if (!url) {
      return;
    }

    if (url.includes("www.youtube.com/shorts/") && !url.endsWith("www.youtube.com/shorts/")) {
      const enabled = await getStorageData("enable-redirect-shorts");
      if (!enabled) {
        return;
      }

      url = url.replace("/shorts/", "/video/");
      chrome.tabs.update(tabId, { url: url });
    }
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const message = request.message;

    if (message.startsWith("set-")) {
      setStorageData(message.substring(4), request.value);
    }

    if (message.startsWith("get-")) {
      getStorageData(message.substring(4), true).then(sendResponse);
      return true;
    }
  });
})();
