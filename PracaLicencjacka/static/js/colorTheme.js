function toggleTheme() {
    const footer = document.querySelector(".footer");
    const icon = document.querySelector("#theme-toggle-navbar i");
    const body = document.body;
    const navbar = document.querySelector(".navbar");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const education=document.querySelector(".education");
    const generator=document.querySelector(".generator");
    const passwordOutput = document.querySelector("#passwordOutput");
    const checkPassword = document.querySelector(".checkPassword");
    const passwordInput = document.querySelector("#passwordInput");

    body.classList.toggle('bg-dark');
    body.classList.toggle('bg-light');
    navbar.classList.toggle('bg-dark');
    navbar.classList.toggle('bg-light');
    navbar.classList.toggle('navbar-dark');
    navbar.classList.toggle('navbar-light');
    toggleFooter(footer);
    footer.classList.toggle('bg-dark');
    footer.classList.toggle('bg-light');
    if(education) {
        education.classList.toggle('text-light');
        education.classList.toggle('text-dark');
        toggleEducation(education)
    }
    dropdownMenu.classList.toggle('dropdown-menu-dark');
    dropdownMenu.classList.toggle('dropdown-menu-light');
    icon.classList.toggle('bi-lightbulb-fill');
    icon.classList.toggle('bi-brightness-high');

    // Dodane dla generatora
    if(body.classList.contains('bg-light')) {
        if(generator){
            generator.style.backgroundColor = '#fff';
            generator.style.color = '#000';
            passwordOutput.style.backgroundColor = '#343a40';
            passwordOutput.style.color = '#fff';
            checkPassword.style.backgroundColor = '#fff';
            checkPassword.style.color = '#000';
            passwordInput.style.backgroundColor = '#343a40';
            passwordInput.style.color = '#fff';
        }
    } else {
        if(generator){
            generator.style.backgroundColor = '';
            generator.style.color = '';
            passwordOutput.style.backgroundColor = '';
            passwordOutput.style.color = '';
            checkPassword.style.backgroundColor = '';
            checkPassword.style.color = '';
            passwordInput.style.backgroundColor = '';
            passwordInput.style.color = '';
        }
    }
}

function toggleFooter(footer){
    if (footer.classList.contains('bg-dark')){
        footer.style.color="#464345";
    }
    else{
        footer.style.color="#fff";
    }
}

function toggleEducation(education){
    if (education.classList.contains('text-light')){
        education.style.backgroundColor="#343a40";
    }
    else{
        education.style.backgroundColor="#F2F2F2";
    }
}
// Nasłuchuj kliknięcia na przycisku w pasku nawigacyjnym
document.getElementById('theme-toggle-navbar').addEventListener('click', toggleTheme);
