const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=2&api_key=a08033ac-9fe1-4325-8235-c0a0e9358427";
const API_URL_FAVORITES =
  "https://api.thedogapi.com/v1/favourites?api_key=a08033ac-9fe1-4325-8235-c0a0e9358427";
const API_URL_FAVORITES_DELETE = (id) => 
  `https://api.thedogapi.com/v1/favourites/${id}?api_key=a08033ac-9fe1-4325-8235-c0a0e9358427`;

const spanError = document.getElementById("error");

async function loadRandomPerros() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("Random");
  console.log(data);

  if (res.status != 200) {
    spanError.innerHTML = "Error: " + res.status;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const btn1 = document.getElementById("btnFav1");
    const btn2 = document.getElementById("btnFav2");

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavoritePerro(data[0].id);
    btn2.onclick = () => saveFavoritePerro(data[1].id);
  }
}

async function loadFavoritesPerros() {
  const res = await fetch(API_URL_FAVORITES);
  const data = await res.json();
  console.log("Favs");
  console.log(data);

  if (res.status != 200) {
    spanError.innerHTML = "Error: " + res.status + data.message;
  } else {
    const section = document.getElementById("favoritesPerros");
    section.innerHTML = "";

    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Perros Favor')
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach((perro) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      btn.onclick = () => deleteFavoritePerro(perro.id);
      const btnText = document.createTextNode("Sacar perro en fav");

      img.src = perro.image.url;
      btn.appendChild(btnText);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavoritePerro(id) {
  const res = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await res.json();

  console.log("Guardar");
  console.log(res);

  if (res.status != 200) {
    spanError.innerHTML = "Error: " + res.status + data.message;
  } else {
    console.log('Perro en favs');
    loadFavoritesPerros();
  }
}

async function deleteFavoritePerro(id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: "DELETE",
  });
  const data = await res.json();

  if (res.status != 200) {
    spanError.innerHTML = "Error: " + res.status + data.message;
  } else {
    console.log('Perro elimonado de fav');
    loadFavoritesPerros();
  }
}

loadRandomPerros();
loadFavoritesPerros();
