document.addEventListener("DOMContentLoaded", () => {
    const reportLinks = document.querySelectorAll(".reports-list a")
    const reportTitle = document.getElementById("report-title")
    const reportData = document.getElementById("report-data")
  
    // Agregar evento click a cada enlace de reporte
    reportLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        const reportType = this.getAttribute("data-report")
        let reportTitleText = ""
  
        // Actualizar título según el reporte seleccionado
        switch (reportType) {
          case "todos":
            reportTitleText = "Todos los Usuarios"
            break
          case "hoy":
            reportTitleText = "Usuarios Creados Hoy"
            break
          case "ayer":
            reportTitleText = "Usuarios Creados Ayer"
            break
          default:
            reportTitleText = "Reporte"
        }
  
        reportTitle.textContent = reportTitleText
  
        // Mostrar mensaje de carga
        reportData.innerHTML = '<p class="loading">Cargando datos...</p>'
  
        // Solicitar datos del reporte al servidor
        fetch(`http://localhost:3000/ejecutar_reporte/${reportType}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al cargar el reporte")
            }
            return response.json()
          })
          .then((data) => {
            mostrarReporte(data)
          })
          .catch((error) => {
            reportData.innerHTML = `<p class="error-message">${error.message}</p>`
          })
      })
    })
  
    // Función para mostrar los datos del reporte en una tabla
    function mostrarReporte(data) {
      if (!data || data.length === 0) {
        reportData.innerHTML = '<p class="select-message">No hay datos disponibles para este reporte</p>'
        return
      }
  
      // Crear tabla para mostrar los datos
      let tableHTML = "<table>"
  
      // Encabezados de la tabla basados en las propiedades del primer objeto
      tableHTML += "<thead><tr>"
      const headers = Object.keys(data[0])
      headers.forEach((header) => {
        // Convertir el nombre de la propiedad a un formato más legible
        const headerText = header.charAt(0).toUpperCase() + header.slice(1).replace(/([A-Z])/g, " $1")
        tableHTML += `<th>${headerText}</th>`
      })
      tableHTML += "</tr></thead>"
  
      // Filas de datos
      tableHTML += "<tbody>"
      data.forEach((item) => {
        tableHTML += "<tr>"
        headers.forEach((header) => {
          tableHTML += `<td>${item[header] !== null ? item[header] : "-"}</td>`
        })
        tableHTML += "</tr>"
      })
      tableHTML += "</tbody></table>"
  
      reportData.innerHTML = tableHTML
    }
  })
  