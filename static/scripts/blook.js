const blookImages = {
    "pesip": {
      name: "Pesip",
      rarity: "Uncommon",
      image: "images/Soda/pesip2.png",
      background: "images/sodaa.webp"
    },
    "spit": {
      name: "Spit",
      rarity: "Uncommon",
      image: "images/Soda/spit.png",
      background: "images/sodaa.webp"
    },
    "cok": {
      name: "Cok",
      rarity: "Uncommon",
      image: "images/Soda/cok_soda.png",
      background: "images/sodaa.webp"
    },
    "cursh": {
      name: "Cursh",
      rarity: "Uncommon",
      image: "images/Soda/cursh2.png",
      background: "images/sodaa.webp"
    },
    "dorizo": {
      name: "Dorizo",
      rarity: "Uncommon",
      image: "images/Dorizo/Triangle.png",
      background: "images/paper.webp"
    },
    "metaldorizo": {
      name: "Metal Dorizo",
      rarity: "Goofy",
      image: "images/Dorizo/metaldorizo.webp",
      background: "images/paper.webp"
    },
    "dorizocubed": {
      name: "Dorizo³",
      rarity: "Mystical",
      image: "images/Dorizo/3DORITO.png",
      background: "images/paper.webp"
    },

  };
  
  function chooseRandomBlook() {
    const blookKeys = Object.keys(blookImages);
    const randomIndex = Math.floor(Math.random() * blookKeys.length);
    const randomBlookName = blookKeys[randomIndex];
    return blookImages[randomBlookName];
  }
  
  function updateBlook(blook) {
    const blookNameElement = document.getElementById('blookName');
    const blookRarityElement = document.getElementById('blookRarity');
    const blookImgElement = document.getElementById('blookImg');
    const blookBgElement = document.getElementById('blookBg');
  
    if (blookNameElement && blookRarityElement && blookImgElement && blookBgElement) {
      blookNameElement.textContent = blook.name;
      blookRarityElement.textContent = blook.rarity;
      blookImgElement.src = blook.image;
      blookBgElement.src = blook.background;
    } else {
      console.error("One or more elements not found. Please check your HTML structure.");
    }
  }
  
  // Choose and display a random Blook on page load
  const randomBlook = chooseRandomBlook();
  updateBlook(randomBlook);
  
  document.addEventListener('click', function(event) {
    const clickedElementId = event.target.id;
  
    if (blookImages[clickedElementId]) {
      const selectedBlook = blookImages[clickedElementId];
      updateBlook(selectedBlook);
    }
  });