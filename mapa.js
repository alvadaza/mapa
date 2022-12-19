// Obtener el formulario de búsqueda y el campo de entrada
var form = document.getElementById('search-form');
var input = document.getElementById('search-input');

// Procesar la búsqueda del usuario al enviar el formulario
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener la búsqueda del usuario
  var search = input.value;

  // Utilizar la API de Google Maps para buscar lugares o direcciones
  var request = {
    query: search,
    fields: ['name', 'geometry'],
  };
  var service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Limpiar el mapa de marcadores anteriores
      map.clear();

      // Agregar marcadores para mostrar los resultados de la búsqueda
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }

      // Centrar el mapa en el primer resultado de la búsqueda
      map.setCenter(results[0].geometry.location);
    }
  });
});
