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


    async function cargarProyectos() {
        try {

            const response = await fetch("https://api.github.com/users/Supereld06/repos");

            if (!response.ok) {
                throw new Error("Error al cargar los proyectos");
            }

            const proyectos = await response.json();
            const contenedor = document.getElementById("contenedor-proyectos");

            if (!contenedor) return;

            contenedor.innerHTML = "";

            // Opcional: filtrar forks
            const proyectosFiltrados = proyectos.filter(p => !p.fork);

            proyectosFiltrados.forEach(proyecto => {
                contenedor.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="project-card p-3 shadow-sm rounded h-100">
                            <h5 class="fw-bold">${proyecto.name}</h5>
                            <p>${proyecto.description || "Sin descripción"}</p>
                            <a href="${proyecto.html_url}" target="_blank" class="btn btn-sm btn-accent">
                                Ver en GitHub
                            </a>
                        </div>
                    </div>
                `;
            });

        } catch (error) {
            console.error("Error:", error);
        }
    }

    cargarProyectos();

});

// Manejo de eventos para las tarjetas de proyectos

/*const contenedor = document.getElementById("contenedor-proyectos");

if (contenedor) {
    contenedor.addEventListener("click", function (evento) {
        const tarjeta = evento.target.closest(".project-card");

        if (tarjeta) {

            const titulo = tarjeta.querySelector("h5")?.innerText;

            alert("Haz hecho clic en un proyecto: " + titulo);
        }
    });
}*/

