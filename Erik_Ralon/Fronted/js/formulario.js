document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm")
    const nombreInput = document.getElementById("nombre")
    const fechaInput = document.getElementById("fecha")
    const edadInput = document.getElementById("edad")
    const telefonoInput = document.getElementById("telefono")
    const correoInput = document.getElementById("correo")
    const responseMessage = document.getElementById("response-message")
  
    // Validación de nombre (solo letras)
    nombreInput.addEventListener("input", function () {
      const nombreError = document.getElementById("nombre-error")
      const regex = /^[a-zA-Z\s]+$/
  
      if (!regex.test(this.value) && this.value !== "") {
        nombreError.textContent = "El nombre solo debe contener letras (a-z, A-Z)"
        this.classList.add("error")
      } else {
        nombreError.textContent = ""
        this.classList.remove("error")
      }
    })
  
    // Validación de fecha (formato dd-mm-yyyy)
    fechaInput.addEventListener("input", function () {
      const fechaError = document.getElementById("fecha-error")
      const regex = /^(\d{2})-(\d{2})-(\d{4})$/
  
      if (!regex.test(this.value) && this.value !== "") {
        fechaError.textContent = "El formato debe ser dd-mm-yyyy"
        this.classList.add("error")
      } else if (regex.test(this.value)) {
        const parts = this.value.split("-")
        const day = Number.parseInt(parts[0], 10)
        const month = Number.parseInt(parts[1], 10) - 1 // Meses en JS son 0-11
        const year = Number.parseInt(parts[2], 10)
        const date = new Date(year, month, day)
  
        // Verificar si la fecha es válida
        if (
          date.getDate() !== day ||
          date.getMonth() !== month ||
          date.getFullYear() !== year ||
          year < 1900 ||
          year > new Date().getFullYear()
        ) {
          fechaError.textContent = "La fecha no es válida"
          this.classList.add("error")
        } else {
          fechaError.textContent = ""
          this.classList.remove("error")
  
          // Calcular edad
          calcularEdad(date)
        }
      }
    })
  
    // Validación de teléfono (solo números)
    telefonoInput.addEventListener("input", function () {
      const telefonoError = document.getElementById("telefono-error")
      const regex = /^[0-9]+$/
  
      if (!regex.test(this.value) && this.value !== "") {
        telefonoError.textContent = "El teléfono solo debe contener números (0-9)"
        this.classList.add("error")
      } else {
        telefonoError.textContent = ""
        this.classList.remove("error")
      }
    })
  
    // Validación de correo electrónico
    correoInput.addEventListener("input", function () {
      const correoError = document.getElementById("correo-error")
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
      if (!regex.test(this.value) && this.value !== "") {
        correoError.textContent = "El correo debe tener el formato correcto (ejemplo@dominio.com)"
        this.classList.add("error")
      } else {
        correoError.textContent = ""
        this.classList.remove("error")
      }
    })
  
    // Función para calcular la edad
    function calcularEdad(fechaNacimiento) {
      const hoy = new Date()
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
      const mes = hoy.getMonth() - fechaNacimiento.getMonth()
  
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--
      }
  
      edadInput.value = edad
    }
  
    // Envío del formulario
    userForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Validar todos los campos antes de enviar
      const nombreValido = /^[a-zA-Z\s]+$/.test(nombreInput.value)
      const fechaValida = /^(\d{2})-(\d{2})-(\d{4})$/.test(fechaInput.value)
      const telefonoValido = /^[0-9]+$/.test(telefonoInput.value)
      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoInput.value)
  
      if (!nombreValido || !fechaValida || !telefonoValido || !correoValido) {
        mostrarMensaje("Por favor, corrija los errores en el formulario antes de enviar.", "error")
        return
      }
  
      // Preparar datos para enviar
      const formData = {
        nombre: nombreInput.value,
        fecha: fechaInput.value,
        telefono: telefonoInput.value,
        correo: correoInput.value,
      }
  
      // Enviar datos al servidor
      fetch("http://localhost:3000/guardar_usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.error || "Error al guardar el usuario")
            })
          }
          return response.json()
        })
        .then((data) => {
          mostrarMensaje(`Usuario guardado exitosamente. ID: ${data.id}`, "success")
          userForm.reset()
          edadInput.value = "0"
        })
        .catch((error) => {
          mostrarMensaje(error.message, "error")
        })
    })
  
    // Función para mostrar mensajes de respuesta
    function mostrarMensaje(mensaje, tipo) {
      responseMessage.textContent = mensaje
      responseMessage.className = "response-message"
      responseMessage.classList.add(tipo)
  
      // Hacer scroll hasta el mensaje
      responseMessage.scrollIntoView({ behavior: "smooth" })
    }
  })
  