class UI {
  constructor() {
      this.api = new API()

      //crear los markres con layerGRup
      this.markers = new L.LayerGroup()

       // Iniciar el mapa
       this.mapa = this.inicializarMapa();

  }

  inicializarMapa() {
       // Inicializar y obtener la propiedad del mapa
       const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
       const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
       L.tileLayer(
           'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           attribution: '&copy; ' + enlaceMapa + ' Contributors',
           maxZoom: 18,
           }).addTo(map);
       return map;

  }

  mostrarEstablecimientos(){
    this.api.obtenerDatos()
              .then(datos=>{
                //console.log(datos)
                const resultado = datos.results
                this.mostrarPines(resultado)
              })
  }

  mostrarPines(datos){
    //limpiar los markers
    this.markers.clearLayers()

    datos.forEach(dato => {
      const {latitude, longitude, calle, regular, premiun} = dato
      
      //crear Poppup
      const opcionesPopUp = L.popup()
                    .setContent(`<p>Calle: ${calle}</p>
                                <p><b> $ ${regular}</b></p>
                                <p><b> $ ${premiun}</b></p>`)


      //apregar PIN
      const marker = new L.marker([
        parseFloat(latitude),
        parseFloat(longitude)
      ]).bindPopup(opcionesPopUp)
      this.markers.addLayer(marker)
    });
    this.markers.addTo(this.mapa)
  }

  obtenerSugerencias(busqueda){
    this.api.obtenerDatos()
        .then(datos=>{
          const resultados = datos.results
          this.filtraSugerencias(resultados,busqueda)
        })
  }

  filtraSugerencias(resultado,busqueda){
    
    //filtrar 
    const filtro = resultado.filter(filtro => filtro.calle.includes(busqueda))
    console.log(filtro)

    //mostrar pines
    this.mostrarPines(filtro)
  }
}