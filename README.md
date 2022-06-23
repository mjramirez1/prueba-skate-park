# prueba-skate-park


  <script>
    $('button').click(async (event) => {
      console.log('hola')
      event.preventDefault()
      const email = $('#email').val()
      const nombre = $('#nombre').val()
      const password = $('#password').val()
      const repitaPassword = $('#repitaPassword').val()
      const experiencia = $('#experiencia').val()
      const especialidad = $('#especialidad').val()
      const foto = $('#foto').val()
      console.log(email, nombre, password, repitaPassword, experiencia, especialidad, foto)

      const payload = { email, nombre, password, repitaPassword, experiencia, especialidad, foto }
      const FormData = require('form-data')
      const form = document.querySelector("formularioRegistro")
      const formulario = new FormData(form)

      try {
        await axios.post('/Registro', formulario, {
          Headers: {
            "Content-Type": "multipart/form-data" 
          }
        })
        alert('Usuario registrado con éxito')
        window.location.href = '/Login'
      }
      catch (error) {
        alert(error.message)
      }

    })
  </script>
