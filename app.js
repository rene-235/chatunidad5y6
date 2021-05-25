// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAzCd3mqNng0F0NfEeUZAqQCX1YUuzrbas",
    authDomain: "unidad4bd-b4a10.firebaseapp.com",
    databaseURL: "https://unidad4bd-b4a10-default-rtdb.firebaseio.com",
    projectId: "unidad4bd-b4a10",
    storageBucket: "unidad4bd-b4a10.appspot.com",
    messagingSenderId: "582564147442",
    appId: "1:582564147442:web:a3634db00c99f66512206b"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //obtener datos del html

  var txtUsuario = document.getElementById("usuario");
  var txtMensaje = document.getElementById("mensaje");
  var btnEnviar = document.getElementById("btnenviar"); 
  var chatlista = document.getElementById("chatlista");
  var fechahora = new Date;
  var fecha = fechahora.toString();
  fecha= fecha.substring(0,24);

  //Ejecutar accion en el boton

  btnEnviar.addEventListener("click",function(){
    var usuario = txtUsuario.value;
    var mensaje = txtMensaje.value;
    var html ="<li>"+usuario+ "Dice: "+mensaje+" "+fecha+"</li>";

    chatlista.innerHTML += html;
   
    firebase.database().ref('chat').push({
        user: usuario,
        message: mensaje,
        datetime: fecha
    })
  });

  /Mostrar datos/
  firebase.database().ref('chat').on('value', (snapshot) => {
    var html1 = '';
    //console.log(snapshot.val());
    snapshot.forEach(function (e){
      var elemento = e.val();
      var user1 = elemento.user;
      var mensaje1 = elemento.message;
      var fecha1 = elemento.datetime;
      html1 += `
      <ul class="p-0">
          <li>
              <div class="row comments mb-2">
                  <div class="col-md-2 col-sm-2 col-3 text-center user-img">
                      <img id="profile-photo" src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_960_720.png" class="rounded-circle" />
                  </div>
                  <div class="col-md-3 col-sm-3 col-9 comment rounded mb-2">
                      <h4 class="m-0"><a href="#">${user1}</a></h4>
                      <like></like>
                      <p class="mb-0 text-white">${mensaje1} </p> 
                      ${fecha1}
                      </div>
              </div>
             
          </li>
          
      </ul>`; 
    });
    chatlista.innerHTML = html1;
  })

  
  