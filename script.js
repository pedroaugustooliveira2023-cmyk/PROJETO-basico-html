const campoAno = document.querySelector("#ano");
const formulario = document.querySelector("#formulario-contato");
const avisoContato = document.querySelector("#aviso-contato");
const botaoCopiar = document.querySelector("#copiar-email");

const emailPedro = "pedro.augusto.oliveira2023@gmail.com";

campoAno.textContent = new Date().getFullYear();

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const assunto = document.querySelector("#assunto").value.trim();
    const mensagem = document.querySelector("#mensagem").value.trim();

    if (!nome || !email || !assunto || !mensagem) {
        avisoContato.textContent =
            "Preencha todos os campos antes de continuar.";

        return;
    }

    const corpoEmail =
        "Olá, Pedro!\n\n" +
        mensagem +
        "\n\n" +
        "Nome: " + nome + "\n" +
        "E-mail para resposta: " + email;

    const enderecoGmail =
        "[mail.google.com](https://mail.google.com/mail/?view=cm&fs=1)" +
        "&to=" + encodeURIComponent(emailPedro) +
        "&su=" + encodeURIComponent(assunto) +
        "&body=" + encodeURIComponent(corpoEmail);

    avisoContato.textContent = "Abrindo o Gmail...";

    /*
     * A navegação acontece na mesma aba para evitar o bloqueio
     * de pop-ups do navegador.
     */
    window.location.href = enderecoGmail;
});

botaoCopiar.addEventListener("click", async function () {
    try {
        await navigator.clipboard.writeText(emailPedro);

        avisoContato.textContent =
            "E-mail copiado: " + emailPedro;

        botaoCopiar.textContent = "E-mail copiado!";
    } catch (erro) {
        /*
         * Forma alternativa para navegadores que bloqueiam
         * o acesso moderno à área de transferência.
         */
        const campoTemporario = document.createElement("textarea");

        campoTemporario.value = emailPedro;
        campoTemporario.style.position = "fixed";
        campoTemporario.style.opacity = "0";

        document.body.appendChild(campoTemporario);
        campoTemporario.select();
        document.execCommand("copy");
        campoTemporario.remove();

        avisoContato.textContent =
            "E-mail copiado: " + emailPedro;

        botaoCopiar.textContent = "E-mail copiado!";
    }

    setTimeout(function () {
        botaoCopiar.textContent = emailPedro;
    }, 2500);
});
