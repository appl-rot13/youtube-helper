(() => {
  document.querySelectorAll("li").forEach(async item => {
    const option = item.id;
    if (!option) {
      return;
    }

    const input = item.querySelector("input");
    input.checked = await chrome.runtime.sendMessage({ message: "get-" + option });

    input.addEventListener("click", () => {
      const state = input.checked;
      chrome.runtime.sendMessage({ message: "set-" + option, value: state });

      switch (option) {
        case "enable-close-chat":
          if (state) {
            // Close chat for all tabs
            chrome.tabs.query({}, tabs => {
              tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, "close-chat").catch(error => {});
              });
            });
          } else {
            // Show chat only for active tab
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
              chrome.tabs.sendMessage(tabs[0].id, "show-chat").catch(error => {});
            });
          }
          break;
      }
    });
  });
})();
