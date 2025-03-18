document.addEventListener('click', function(event) {
    const clickedElementId = event.target.id;
  
    if (clickedElementId === 'spit' || clickedElementId === 'cok' || clickedElementId === 'crush') {
      const blookName = document.getElementById('blookName');
      const blookRarity = document.getElementById('blookRarity');
      const blookImg = document.getElementById('blookImg');
      const blookBg = document.getElementById('blookBg');

      if (clickedElementId === 'spit') {
        blookName.textContent = 'Spit';
        blookRarity.textContent = 'Uncommon';
        blookImg.src = 'images/Soda/spit.png';
        blookBg.src = 'images/sodaa.webp';
      } else if (clickedElementId === 'cok') {
        blookName.textContent = 'Cok';
        blookRarity.textContent = 'Uncommon';
        blookImg.src = 'images/Soda/cok_soda.png';
        blookBg.src = 'images/sodaa.webp';
      } else if (clickedElementId === 'cursh') {
        blookName.textContent = 'Cursh';
        blookRarity.textContent = 'Uncommon';
        blookImg.src = 'images/Soda/crush2.png';
        blookBg.src = 'images/sodaa.webp';
      }
    }
  });