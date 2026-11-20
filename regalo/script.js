const inicio = new Date(2025, 8, 20, 0, 0, 0);

function sumarMeses(fecha, cantidad) {
    const nueva = new Date(fecha);
    const diaOriginal = nueva.getDate();

    nueva.setDate(1);
    nueva.setMonth(nueva.getMonth() + cantidad);

    const ultimoDia = new Date(
        nueva.getFullYear(),
        nueva.getMonth() + 1,
        0
    ).getDate();

    nueva.setDate(Math.min(diaOriginal, ultimoDia));

    return nueva;
}

function actualizarContador() {
    const ahora = new Date();
    let cursor = new Date(inicio);

    // Calcular años
    let anios = ahora.getFullYear() - inicio.getFullYear();

    cursor.setFullYear(inicio.getFullYear() + anios);

    if (cursor > ahora) {
        anios--;
        cursor = new Date(inicio);
        cursor.setFullYear(inicio.getFullYear() + anios);
    }

    // Calcular meses
    let meses =
        (ahora.getFullYear() - cursor.getFullYear()) * 12 +
        ahora.getMonth() - cursor.getMonth();

    cursor = sumarMeses(cursor, meses);

    if (cursor > ahora) {
        meses--;
        cursor = sumarMeses(
            new Date(inicio.getFullYear() + anios, inicio.getMonth(), inicio.getDate()),
            meses
        );
    }

    // Tiempo restante en milisegundos
    let restante = ahora - cursor;

    // Días
    const dias = Math.floor(restante / 86400000);
    restante %= 86400000;

    // Horas
    const horas = Math.floor(restante / 3600000);
    restante %= 3600000;

    // Minutos
    const minutos = Math.floor(restante / 60000);
    restante %= 60000;

    // Segundos
    const segundos = Math.floor(restante / 1000);

    // Mostrar los valores
    document.getElementById("anios").textContent = anios;
    document.getElementById("meses").textContent = meses;
    document.getElementById("días").textContent = dias;
    document.getElementById("horas").textContent = horas;

    document.getElementById("minutos").textContent =
        String(minutos).padStart(2, "0");

    document.getElementById("segundos").textContent =
        String(segundos).padStart(2, "0");
}

actualizarContador();
setInterval(actualizarContador, 1000);

function toggleCarta() {
    var contenido = document.getElementById("contenidoCarta");
    if (contenido.style.maxHeight && contenido.style.maxHeight !== "0px") {
        contenido.style.maxHeight = "0px";
        contenido.style.padding = "0 15px";
        contenido.style.border = "2px solid transparent";
    } else {
        contenido.style.maxHeight = contenido.scrollHeight + "50px";
        contenido.style.padding = "15px";
        contenido.style.border = "2px solid #ffccd5";
    }
}