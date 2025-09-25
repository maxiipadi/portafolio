// Script para inicializar AOS
AOS.init();

document.addEventListener('DOMContentLoaded', function () {

    // CÓDIGO PARA TYPED.JS
    var typedOptions = {
        strings: [
            'Desarrollador de Software.',
            'Líder de Equipos de Innovación.',
            'Apasionado por la Tecnología.'
        ],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
    };
    var typed = new Typed('#typed-subtitle', typedOptions);

    // CÓDIGO ACTUALIZADO PARA EL FORMULARIO (VALIDACIÓN + SPINNER + SWEETALERT)
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const originalButtonText = submitButton.innerHTML; // Guardamos el texto original del botón

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            event.stopPropagation();
            contactForm.classList.add('was-validated');
        } else {
            // ---- INICIO DE LA LÓGICA DEL SPINNER ----
            // Deshabilitamos el botón y mostramos el spinner
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Enviando...
            `;
            // ---- FIN DE LA LÓGICA DEL SPINNER ----

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: '¡Mensaje Enviado!',
                        text: 'Gracias por contactarme. Te responderé a la brevedad.',
                        icon: 'success',
                        confirmButtonColor: '#4646e6'
                    });
                    contactForm.reset();
                    contactForm.classList.remove('was-validated');
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.',
                        icon: 'error',
                        confirmButtonColor: '#af42a1'
                    });
                }
            }).catch(error => {
                Swal.fire({
                    title: 'Error de Conexión',
                    text: 'No se pudo enviar el mensaje. Por favor, revisa tu conexión a internet.',
                    icon: 'error',
                    confirmButtonColor: '#af42a1'
                });
            }).finally(() => {
                // ---- RESTAURAR EL BOTÓN ----
                // Esta parte se ejecuta siempre, ya sea éxito o error
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                // ---- FIN DE RESTAURAR EL BOTÓN ----
            });
        }
    }, false);
});