      function initMap() {
        var nckucsie = {lat: 22.997134, lng: 120.2210986};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: nckucsie
        });
        var marker = new google.maps.Marker({
          position: nckucsie,
          map: map
        });
      }