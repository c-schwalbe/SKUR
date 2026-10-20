window.onpageshow = () => {
    const transition_el = document.getElementById("transition-bg");
    const anchors = document.getElementsByClassName("link-fdr");

    setTimeout(() => {
        transition_el.classList.remove("is-active");
    }, 200);

    for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];

        anchor.addEventListener("click", e => {
            e.preventDefault();
            let target = e.currentTarget.href;

            transition_el.classList.add("is-active");

            setTimeout(() => {
                window.location.href = target;
            }, 200);
        });
    }
}
