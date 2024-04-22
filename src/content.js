(() => {
  const closeDialog = () => {
    const dialog = document.querySelector("tp-yt-paper-dialog");
    if (!dialog || dialog.style.display === "none") {
      return;
    }

    const confirmButton = document.querySelector("#confirm-button button");
    if (!confirmButton) {
      return;
    }

    const event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    confirmButton.dispatchEvent(event);

    console.log("The confirmation dialog has been closed.");
  }

  window.addEventListener("load", event => {
    // 新しいタブで開くとコンテナが追加される前にスクリプトが実行されるため、タイマーで生成を待つ
    const timer = setInterval(() => {
      const container = document.querySelector("ytd-popup-container");
      if (!container) {
        return;
      }

      clearInterval(timer);

      // 初回はダイアログが追加されるまで待つ
      const dialogAdditionObserver = new MutationObserver(() => {
        const dialog = document.querySelector("tp-yt-paper-dialog");
        if (!dialog) {
          return;
        }

        dialogAdditionObserver.disconnect();
        closeDialog();

        // 2回目以降はダイアログが表示されるまで待つ
        const dialogDisplayObserver = new MutationObserver(() => {
          closeDialog();
        });

        dialogDisplayObserver.observe(dialog, { attributes: true, attributeFilter: ["style"] });
      });

      dialogAdditionObserver.observe(container, { childList: true });
    }, 1000);
  });
})();
