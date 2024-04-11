document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add('loaded');

    const passwordInput = document.getElementById('passwordInput');
    const passwordLengthMessage = document.getElementById('passwordLengthMessage');
    const passwordBars = document.querySelectorAll('.progress-bar');
    const passwordLengthDiv = document.getElementById('passwordLength');
    const whatAddSrodek = document.getElementById('whatAddSrodek');

    passwordBars.forEach(bar => {
        bar.style.width = '0%';
    });

    passwordInput.addEventListener('input', function () {
        const password = passwordInput.value.replace(/\s/g, '');
        passwordInput.value = password;
        const passwordLength = password.length;

        // Update password length message
        passwordLengthDiv.innerHTML = 'Ilość znaków w haśle: <strong>' + passwordLength + '</strong>';

        // Check password strength and update progress bars
        if (passwordLength === 0) {
            setProgressBarWidths([0, 0, 0]);
            whatAddSrodek.innerHTML = '<span class="text-danger">&#10008; Małą literę</span>, <span class="text-danger">&#10008; Dużą literę</span>, <span class="text-danger">&#10008; Znak specjalny</span>, <span class="text-danger">&#10008; Cyfrę</span>';
            passwordLengthMessage.textContent="Jak silne jest twoje hasło:";
            passwordLengthMessage.style.color = "white";
        } else {
            checkPasswordStrength(password);
            updatePasswordStrength(password);
        }

    });

    document.getElementById("showPasswordButton").addEventListener("click", function () {
        const passwordInput = document.getElementById("passwordInput");
        const eyeIcon = document.querySelector("#showPasswordButton i");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.classList.remove("bi-eye");
            eyeIcon.classList.add("bi-eye-slash");
        } else {
            passwordInput.type = "password";
            eyeIcon.classList.remove("bi-eye-slash");
            eyeIcon.classList.add("bi-eye");
        }
    });

    function updatePasswordStrength(password) {
        const entropy = calculateAmountOfInformation(password);
        const isSequential = isSequentialPassword(password);
        const hasReapeating = hasRepeatingPassword(password);

        const onlyDigits = /^\d+$/.test(password);
        if (onlyDigits) {
            if (entropy < 40) {
                passwordLengthMessage.textContent = 'Słabe hasło (używasz tylko cyfr)';
                passwordLengthMessage.style.color = "red";
                setProgressBarWidths([33, 0, 0]);
            }
            else {
                passwordLengthMessage.textContent = 'Średnie hasło (używasz tylko cyfr)';
                passwordLengthMessage.style.color = "orange";
                setProgressBarWidths([33, 33, 0]);
            }
             if (hasReapeating){
                passwordLengthMessage.textContent = 'Słabe hasło (używasz tylko cyfr oraz masz powtórzenia znaków)';
                passwordLengthMessage.style.color = "red";
                setProgressBarWidths([33, 0, 0]);
            }
            if (isSequential){
                passwordLengthMessage.textContent = 'Słabe hasło (używasz tylko cyfr oraz często powtarzające się sekwencje znaków)';
                passwordLengthMessage.style.color = "red";
                setProgressBarWidths([33, 0, 0]);
                if (hasReapeating){
                    passwordLengthMessage.textContent = 'Słabe hasło (używasz tylko cyfr oraz masz powtórzenia znaków i często powtarzające się sekwencje znaków)';
                    passwordLengthMessage.style.color = "red";
                    setProgressBarWidths([33, 0, 0]);
                }
            }
        }
        else {
            if (isSequential){
                if (entropy<40) {
                    passwordLengthMessage.textContent = 'Słabe hasło (hasło zawiera często używane fragmenty haseł)';
                    passwordLengthMessage.style.color = "red";
                    setProgressBarWidths([33, 0, 0]);
                    if (hasReapeating) {
                        passwordLengthMessage.textContent = 'Słabe hasło (hasło zawiera powtarzające się znaki co najmniej 4 razy oraz często używane fragmenty haseł)';
                        passwordLengthMessage.style.color = "red";
                        setProgressBarWidths([33, 0, 0]);
                    }
                }
                else {
                    passwordLengthMessage.textContent = 'Średnie hasło (hasło zawiera często używane fragmenty haseł)';
                    passwordLengthMessage.style.color = "orange";
                    setProgressBarWidths([33, 33, 0]);
                    if (hasReapeating){
                        passwordLengthMessage.textContent = 'Słabe hasło (hasło zawiera powtarzające się znaki co najmniej 4 razy oraz często używane fragmenty haseł)';
                        passwordLengthMessage.style.color = "red";
                        setProgressBarWidths([33, 0, 0]);
                    }
                }
            }
        //git
        else if (hasReapeating && entropy>=40){
            passwordLengthMessage.textContent = 'Średnie hasło (hasło zawiera powtarzające się znaki co najmniej 4 razy)';
            passwordLengthMessage.style.color = "orange";
            setProgressBarWidths([33, 33, 0]);
        }
        else if (hasReapeating && entropy<40){
            passwordLengthMessage.textContent = 'Słabe hasło (hasło zawiera powtarzające się znaki co najmniej 4 razy oraz ma mało znaków i słabe ich zróżnicowanie)';
            passwordLengthMessage.style.color = "red";
            setProgressBarWidths([33, 0, 0]);
        }
        else
            {
                if (entropy < 40 ) {
                    passwordLengthMessage.textContent = 'Słabe hasło';
                    passwordLengthMessage.style.color = "red";
                    setProgressBarWidths([33, 0, 0]);
                } else if ((entropy >= 40 && entropy < 64)) {
                    passwordLengthMessage.textContent = 'Średnie hasło';
                    passwordLengthMessage.style.color = "orange";
                    setProgressBarWidths([33, 33, 0]);
                } else if (entropy >= 64) {
                    passwordLengthMessage.textContent = 'Silne hasło';
                    passwordLengthMessage.style.color = "green";
                    setProgressBarWidths([33, 33, 34]);
                    console.log(entropy);
                }
            }
        }

    }

    function checkYourAlphabet(password) {
            let charset = "";
            if (/[a-ząćęłńóśźż]/.test(password)) charset += "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż";
            if (/[A-ZĄĆĘŁŃÓŚŹŻ]/.test(password)) charset += "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ";
            if (/[0-9]/.test(password)) charset += "0123456789";
            if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) charset += "!@#$%^&*()_+-=[]{};:'|,.<>/?";

            return charset;
    }

    function calculateAmountOfInformation(password) {
            let charset = checkYourAlphabet(password);
            const charsetSize = charset.length;
            console.log("Charset size:", charsetSize);
            return password.length * Math.log2(charsetSize);
    }

    function setProgressBarWidths(widths) {
            passwordBars.forEach((bar, index) => {
                bar.style.width = widths[index] + '%';
            });
    }

    function checkPasswordStrength(password) {
            const lowercaseRegex = /[a-ząćęłńóśźż]/;
            const uppercaseRegex = /[A-ZĄĆĘŁŃÓŚŹŻ]/;
            const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            const digitRegex = /[0-9]/;

            let missingElements = [];

            if (!lowercaseRegex.test(password)) {
                missingElements.push('<span class="text-danger">&#10008; Małą literę,</span>');
            } else {
                missingElements.push('<span class="text-success">&#10004; Małą literę,</span>');
            }

            if (!uppercaseRegex.test(password)) {
                missingElements.push('<span class="text-danger">&#10008; Dużą literę,</span>');
            } else {
                missingElements.push('<span class="text-success">&#10004; Dużą literę,</span>');
            }

            if (!specialCharRegex.test(password)) {
                missingElements.push('<span class="text-danger">&#10008; Znak specjalny,</span>');
            } else {
                missingElements.push('<span class="text-success">&#10004; Znak specjalny,</span>');
            }

            if (!digitRegex.test(password)) {
                missingElements.push('<span class="text-danger">&#10008; Cyfrę.</span>');
            } else {
                missingElements.push('<span class="text-success">&#10004; Cyfrę.</span>');
            }
            if (password === '') {
                missingElements = missingElements.map(element => `<span class="text-danger">${element}</span>`);
            }
            whatAddSrodek.innerHTML = missingElements.join(' ');
    }

})


