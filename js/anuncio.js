(function () {
  const popup    = document.getElementById('promoPopup');
  const closeBtn = document.getElementById('promoClose');
  const CTA      = document.getElementById('promoCta');
  const KEY      = 'promoSeen';   // evita que salga cada vez
  const DELAY_MS = 2500;          // 2,5 s después de cargar

  window.addEventListener('load', () => {
    if (!sessionStorage.getItem(KEY)) {
      setTimeout(() => popup.classList.remove('d-none'), DELAY_MS);
    }
  });

  closeBtn.addEventListener('click', () => {
    popup.classList.add('d-none');
    sessionStorage.setItem(KEY, '1');
  });

  CTA.addEventListener('click', () => sessionStorage.setItem(KEY, '1'));
})();
