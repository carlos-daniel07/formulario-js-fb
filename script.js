const firebaseConfig = {
  apiKey: "AIzaSyBwq9AXjB7XJ6TqyPZ2sCCEvh1CjOfCw1g",
  authDomain: "datos-de-formulario-js.firebaseapp.com",
  projectId: "datos-de-formulario-js",
  storageBucket: "datos-de-formulario-js.appspot.com",
  messagingSenderId: "530074767431",
  appId: "1:530074767431:web:2dd1a32a16f1d4bb106162",
  measurementId: "G-ZS6TS6XWNL",
};

firebase.initializeApp(firebaseConfig);

// Inicializar Cloud Firestore y traer la referencia del servicio
const db = firebase.firestore();

document.getElementById("formulario").addEventListener("submit", (event) => {
  event.preventDefault();

  // Valida nombre

  let entradaNombre = document.getElementById("name");
  let errorNombre = document.getElementById("nameError");

  if (entradaNombre.value.trim() === "") {
    errorNombre.textContent = "Por favor, introduce tu nombre";
    errorNombre.classList.add("error-message");
  } else {
    errorNombre.textContent = "";
    errorNombre.classList.remove("error-message");
  }

  // Valida correo electrónico

  let entradaEmail = document.getElementById("email");
  let errorEmail = document.getElementById("emailError");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Patrón de validación básico

  if (!emailPattern.test(entradaEmail.value)) {
    errorEmail.textContent = "Por favor introduzca un email valido";
    errorEmail.classList.add("error-message");
  } else {
    errorEmail.textContent = "";
    errorEmail.classList.remove("error-message");
  }

  // Valida la contraseña
  let entradaContrasena = document.getElementById("password");
  let errorContrasena = document.getElementById("passwordError");
  let contrasenaPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

  if (!contrasenaPattern.test(entradaContrasena.value)) {
    errorContrasena.textContent =
      "La contraseña debe tener al menos 8 caracteres, incluyendo: números, mayúsculas, minúsculas y caracteres especiales";
    errorContrasena.classList.add("error-message");
  } else {
    errorContrasena.textContent = "";
    errorContrasena.classList.remove("error-message");
  }

  // Si todos los datos son validos enviar la info

  if (
    !errorNombre.textContent &&
    !errorEmail.textContent &&
    !errorContrasena.textContent
  ) {
    //BACKEND QUE RECIBA LA INFO

    db.collection("users")
      .add({
        nombre: entradaNombre.value,
        email: entradaEmail.value,
        password: entradaContrasena.value,
      })
      .then((docRef) => {
        alert("El formulario se ha enviado con éxito", docRef.id);
        document.getElementById("formulario").reset();
      })
      .catch((error) => {
        alert(error);
      });
  }
});
