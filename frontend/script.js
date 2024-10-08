document.addEventListener('DOMContentLoaded', () => {
    const codeDisplay = document.getElementById('codeDisplay');

    // Obtener el código usado del localStorage
    const usedCode = localStorage.getItem('usedCode');

    // Si ya se ha mostrado un código en esta sesión, solo mostrar ese código
    if (usedCode) {
        codeDisplay.innerText = `Ya recibiste tu codigo:
         ${usedCode}`;
    } else {
        // Solo solicitar un nuevo código si no hay uno guardado en localStorage
        fetch('./api/get-code')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.json();
            })
            .then(data => {
                if (data.code) {
                    // Mostrar el código y guardarlo en localStorage
                    codeDisplay.innerText = `${data.code}`;
                    localStorage.setItem('usedCode', data.code);  // Guardar el código en localStorage
                } else {
                    codeDisplay.innerText = data.message; // Mensaje si no hay códigos disponibles
                }
            })
            .catch(error => {
                console.error('Error al obtener el código:', error);
                codeDisplay.innerText = 'Error al obtener el código, inténtalo de nuevo.';
            });
    }

    // Evento para manejar la recarga o cierre de la página
    window.addEventListener('beforeunload', () => {
        const usedCode = localStorage.getItem('usedCode');
        if (usedCode) {
            // Enviar una petición para eliminar el código
            fetch('/api/remove-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: usedCode })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el código');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.message);
            })
            .catch(error => {
                console.error('Error al eliminar el código:', error);
            });
        }
    });
});
