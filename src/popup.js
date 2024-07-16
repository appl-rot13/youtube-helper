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
          const queryOptions = state ? {} : { active: true, currentWindow: true };

          chrome.tabs.query(queryOptions, tabs => {
            tabs.forEach(tab => {
              chrome.tabs.sendMessage(tab.id, "show-hide-chat").catch(error => {});
            });
          });
          break;
      }
    });
  });
})();
