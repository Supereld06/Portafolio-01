// CAMBIO DE TEMA OSCURO Y BLANCO

document.addEventListener("DOMContentLoaded", () => {

    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');

    const UI = {
        cuerpo: document.body,
        alternarColor: function () {
            const current = html.getAttribute('data-theme') || "light";
            const newTheme = current === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            html.setAttribute('data-bs-theme', newTheme);
            if (icon) {
                icon.className = newTheme === 'dark'
                    ? 'bi bi-sun'
                    : 'bi bi-moon-stars';
            }
        },
        irASeccion: function (id) {
            const seccion = document.getElementById(id);
            if (seccion) {
                seccion.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener("click", () => UI.alternarColor());
    }

});


// FORMULARIO DE CONTACTO USO DE (Formspree)

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const button = document.getElementById("submit-btn");
const text = document.getElementById("btn-text");

async function handleSubmit(event) {

    event.preventDefault();

    const data = new FormData(form);

    text.innerText = "Enviando...";
    button.disabled = true;

    try {

        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {

            status.innerHTML = "✅ Mensaje enviado correctamente. Gracias por contactarme.";
            status.style.color = "green";

            form.reset();

        } else {

            status.innerHTML = "❌ Ocurrió un error. Intenta nuevamente.";
            status.style.color = "red";

        }

    } catch (error) {

        status.innerHTML = "❌ Error al enviar el formulario.";
        status.style.color = "red";

    }

    text.innerText = "Enviar mensaje";
    button.disabled = false;

}

if (form) {
    form.addEventListener("submit", handleSubmit);
}

