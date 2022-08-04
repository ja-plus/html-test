// 检测浏览器是否支持SW
if (navigator.serviceWorker != null) {
  // 这里的路径是html相对的路径
  navigator.serviceWorker.register('./js/serviceWorker.js').then(function (registartion) {
    console.log('支持sw:', registartion.scope);
  });
}

const addBtn = document.querySelector('.install-button');
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // 保存事件
  deferredPrompt = e;
  // 显示按钮
  addBtn.style.display = 'block';
});

addBtn.addEventListener('click', () => {
  // 隐藏按钮
  addBtn.style.display = 'none';
  // 打开提示用户安装弹窗
  deferredPrompt.prompt();
  // 弹窗点击事件回调
  deferredPrompt.userChoice.then(choiceResult => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
});
