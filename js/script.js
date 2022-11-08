((d) => {
    const $form = d.querySelector(".contact__form"),
        $loader = d.querySelector(".loading"),
        $response = d.querySelector(".contact__form__response");

    $form.addEventListener("submit", (e) => {
        e.preventDefault();
        $loader.classList.remove("none");

        fetch("https://formsubmit.co/ajax/mronceroschavez@gmail.com", {
            method: "POST",
            body: new FormData(e.target),
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((json) => {
                console.log(json)
                $loader.classList.add("none")
                location.hash = "#send"
                $form.reset();
            })
            .catch(err => {
                console.log(err)
                let message = err.statusText || "An error occurred while sending message, please try again";
                $response.querySelector("h3").innerHTML = `Error ${err.status}: ${message}`;
            }).finally(() => {
                $loader.classList.add("none");
                setTimeout(() => {
                    location.hash = "#close";
                }, 3000);
            })
    });
})(document);