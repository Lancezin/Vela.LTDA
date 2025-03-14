document.addEventListener('DOMContentLoaded', function() {
    const popupContainer = document.getElementById('popup-container');
    
    // Cria 3 popups iniciais "Você gostou do site?"
    for (let i = 0; i < 3; i++) {
      popupContainer.appendChild(createSitePopup());
    }
    
    // A cada 10 segundos, se não houver o popup de cartão E nenhum clone-popup estiver na tela, cria-o
    setInterval(() => {
      if (!document.querySelector('.popup.card-popup') && !document.querySelector('.popup.clone-popup')) {
        popupContainer.appendChild(createCardPopup());
      }
    }, 10000);
  });
  
  // Retorna uma posição aleatória para o popup
  function getRandomPosition() {
    const popupWidth = 250;
    const popupHeight = 150;
    const maxLeft = window.innerWidth - popupWidth;
    const maxTop = window.innerHeight - popupHeight;
    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;
    return { left, top };
  }
  
  // Cria o botão de fechar "X" (agora no canto superior direito)
  function createCloseButton() {
    const btn = document.createElement('button');
    btn.className = 'close-btn';
    btn.textContent = 'X';
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      btn.parentElement.remove();
    });
    return btn;
  }
  
  // Popup do tipo "Você gostou do site?"
  function createSitePopup() {
    const popup = document.createElement('div');
    popup.className = 'popup site-popup';
    const pos = getRandomPosition();
    popup.style.left = pos.left + 'px';
    popup.style.top = pos.top + 'px';
    
    popup.appendChild(createCloseButton());
    
    const message = document.createElement('p');
    message.textContent = 'Você gostou do site?';
    popup.appendChild(message);
    
    // Botão "Sim": remove apenas este popup
    const yesBtn = document.createElement('button');
    yesBtn.className = 'yes-btn';
    yesBtn.textContent = 'Sim';
    yesBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      popup.remove();
    });
    popup.appendChild(yesBtn);
    
    // Botão "Não": duplica todos os popups deste tipo
    const noBtn = document.createElement('button');
    noBtn.className = 'no-btn';
    noBtn.textContent = 'Não';
    noBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      duplicateSitePopups();
    });
    popup.appendChild(noBtn);
    
    return popup;
  }
  
  // Duplica os popups do tipo "Você gostou do site?"
  function duplicateSitePopups() {
    const popupContainer = document.getElementById('popup-container');
    const sitePopups = document.querySelectorAll('.popup.site-popup');
    sitePopups.forEach(() => {
      popupContainer.appendChild(createSitePopup());
    });
  }
  
  // Popup do tipo "Podemos clonar o seu cartão?"
  function createCardPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup card-popup';
    const pos = getRandomPosition();
    popup.style.left = pos.left + 'px';
    popup.style.top = pos.top + 'px';
    
    popup.appendChild(createCloseButton());
    
    const message = document.createElement('p');
    message.textContent = 'Podemos clonar o seu cartão?';
    popup.appendChild(message);
    
    // Botão "Sim": inicia o processo de clonagem
    const yesBtn = document.createElement('button');
    yesBtn.className = 'yes-btn';
    yesBtn.textContent = 'Sim';
    yesBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      popup.remove();
      spawnClonePopups();
    });
    popup.appendChild(yesBtn);
    
    // Botão "Não": remove o popup
    const noBtn = document.createElement('button');
    noBtn.className = 'no-btn';
    noBtn.textContent = 'Não';
    noBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      popup.remove();
    });
    popup.appendChild(noBtn);
    
    return popup;
  }
  
  // Inicia a clonagem: a cada 0.0001 segundos, cria popups "Robamo vosekk" por 20 segundos
  function spawnClonePopups() {
    const popupContainer = document.getElementById('popup-container');
    // Tenta criar clones a cada 0.0001 segundos (0,1 ms)
    const cloneInterval = setInterval(() => {
      popupContainer.appendChild(createClonePopup());
    }, 0.1);
    
    // Após 20 segundos, para de criar clones e exibe o popup de agradecimento
    setTimeout(() => {
      clearInterval(cloneInterval);
      popupContainer.appendChild(createThankYouPopup());
    }, 20000);
  }
  
  // Popup dos clones: "Robamo vosekk"
  function createClonePopup() {
    const popup = document.createElement('div');
    popup.className = 'popup clone-popup';
    const pos = getRandomPosition();
    popup.style.left = pos.left + 'px';
    popup.style.top = pos.top + 'px';
    
    popup.appendChild(createCloseButton());
    
    const message = document.createElement('p');
    message.textContent = 'Robamo vosekk';
    popup.appendChild(message);
    
    return popup;
  }
  
  // Popup final: "Obrigado pela clonagem"
  function createThankYouPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup thank-popup';
    const pos = getRandomPosition();
    popup.style.left = pos.left + 'px';
    popup.style.top = pos.top + 'px';
    
    popup.appendChild(createCloseButton());
    
    const message = document.createElement('p');
    message.textContent = 'Obrigado pela clonagem';
    popup.appendChild(message);
    
    return popup;
  }
  