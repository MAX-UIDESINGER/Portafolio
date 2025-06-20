export function handleGmail() {
  const email = "maxcuba773@gmail.com";
  const subject = "Consulta sobre desarrollo web";
  const body = "Hola Pool,%0D%0A%0D%0AMe interesa trabajar contigo en un proyecto web. Me gustaría conocer más sobre tus servicios.%0D%0A%0D%0ASaludos!";
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${body}`;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    if (navigator.userAgent.toLowerCase().includes("android")) {
      window.location.href = `intent://compose?to=${email}&subject=${encodeURIComponent(subject)}&body=${body}#Intent;scheme=mailto;package=com.google.android.gm;end`;
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);
    } else {
      window.location.href = mailtoUrl;
    }
  } else {
    window.open(gmailWebUrl, "_blank");
  }
}