if (document.getElementById('mini_producto')) {
  var tarjeta = document.getElementById('mini_producto').outerHTML;
  var tarjetas = '';
  for (i = 0; i < 8; i++) {
  tarjetas = tarjetas + tarjeta;
  }
  document.getElementById('mini_producto').outerHTML = tarjetas;
}

if (document.getElementById('menu')) {
  fetch('menu_superior.html').then(response => {
      return response.text();
  }).then(htmlContent => {
      document.getElementById('menu').innerHTML = htmlContent;
      window.scrollTo(0, 0);
  });
};

if (document.getElementById('perfil')) {
  var tarjeta = document.getElementById('perfil').outerHTML;
  var tarjetas = '';
  for (i = 0; i < 4; i++) {
  tarjetas = tarjetas + tarjeta;
  }
  document.getElementById('perfil').outerHTML = tarjetas;
}

if (document.getElementById('footer')) {
  fetch('footer.html').then(response => {
      return response.text();
  }).then(htmlContent => {
      document.getElementById('footer').innerHTML = htmlContent;
      window.scrollTo(0, 0);
  });
};