// ===============================
// COUNTDOWN
// ===============================

const birthdayDate =
    new Date("May 25, 2026 15:00:00").getTime();

setInterval(() => {

    const now =
        new Date().getTime();

    const distance =
        birthdayDate - now;

    const days =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance % (1000 * 60))
            / 1000
        );

    document.getElementById("days").innerText =
        days;

    document.getElementById("hours").innerText =
        hours;

    document.getElementById("minutes").innerText =
        minutes;

    document.getElementById("seconds").innerText =
        seconds;

}, 1000);


// ===============================
// CONFIRMAR ASISTENCIA WHATSAPP
// ===============================

function confirmAttendance() {

    const name =
        document.getElementById("guestName").value;

    const guests =
        document.getElementById("guestCount").value;

    // VALIDACION

    if (!name || !guests) {

        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Completa todos los campos'
        });

        return;
    }

    // NUMERO WHATSAPP
    // FORMATO:
    // 549381XXXXXXX

    const phone =
        "5493816467896";

    // MENSAJE

    const message =
        `🎉 *¡Hola! Queremos confirmar asistencia al cumpleaños!* 🥳

    👨‍👩‍👧 *Nombre/Familia:*
    ${name}

    🎈 *Cantidad de invitados:*
    ${guests}

    ¡Nos vemos en la fiesta! 🎂`;

    // URL WHATSAPP

    const url =
        `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

    // ALERTA

    Swal.fire({
        icon: 'success',
        title: 'Redirigiendo a WhatsApp...',
        text: 'Gracias por confirmar 🥳',
        timer: 1800,
        showConfirmButton: false
    });

    // ABRIR WHATSAPP

    setTimeout(() => {

        window.open(url, "_blank");

    }, 1500);
}


// ===============================
// DESCARGAR INVITACION
// ===============================

async function downloadInvitation() {

    try {

        const card =
            document.getElementById("invitationCard");

        // GENERAR CANVAS

        const canvas =
            await html2canvas(card, {
                scale: 3,
                useCORS: true
            });

        // CONVERTIR A BLOB

        canvas.toBlob(async (blob) => {

            // CREAR ARCHIVO

            const file =
                new File(
                    [blob],
                    "invitacion-cumple.png",
                    {
                        type: "image/png"
                    }
                );

            // SI EL DISPOSITIVO SOPORTA SHARE API

            if (
                navigator.share &&
                navigator.canShare({
                    files: [file]
                })
            ) {

                await navigator.share({

                    title:
                        "Invitación Cumpleaños",

                    text:
                        "🎉 Mira mi invitación 🎂",

                    files: [file]

                });

            } else {

                // FALLBACK DESKTOP

                const url =
                    URL.createObjectURL(blob);

                const link =
                    document.createElement("a");

                link.href =
                    url;

                link.download =
                    "invitacion-cumple.png";

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(url);
            }

        }, "image/png");

    } catch (error) {

        console.error(error);

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo descargar la invitación'
        });
    }
}