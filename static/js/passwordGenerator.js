document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add('loaded');

    const lengthRange = document.getElementById('lengthRange');
    const lengthValue = document.getElementById('lengthValue');
    lengthValue.innerHTML+=parseInt(document.getElementById('lengthRange').value);
    generatePassword();
    lengthRange.addEventListener('input', () => {
        lengthValue.textContent = lengthRange.value;
    });

    function generatePassword(length, useUppercase, useLowercase, useSpecialChars, useNumbers) {
        if (length <= 0) return '';

        let charset = '';
        if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (useSpecialChars) charset += '!@#$%^&*()_+-=[]{};:\'|,.<>/?';
        if (useNumbers) charset += '0123456789';

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    document.getElementById('lengthRange').addEventListener('input', generateAndCheckPassword);

    function generateAndCheckPassword() {
        const desiredLength = parseInt(document.getElementById('lengthRange').value);
        const useUppercase = document.getElementById('uppercaseCheckbox').checked;
        const useLowercase = document.getElementById('lowercaseCheckbox').checked;
        const useSpecialChars = document.getElementById('specialCharsCheckbox').checked;
        const useNumbers = document.getElementById('numbersCheckbox').checked;

        if (!useUppercase && !useLowercase && !useSpecialChars && !useNumbers) {
            displayPassword('Proszę zaznacz przynajmniej jedną opcję.');
            return;
        }
        if(!useUppercase && !useLowercase && !useSpecialChars && useNumbers){
            displayPassword('Proszę zmienić parametry - korzystanie z samych cyfr nie jest dobrym rozwiązaniem, ponieważ jest mało znaków możliwych do użycia dodaj jeszcze jakąś opcję.')
            return;
        }
        let password = '';
        let charset = generateAlphabet(useUppercase,useLowercase,useSpecialChars,useNumbers);

        if ((desiredLength*calculateEntropy(charset))<64) {
            displayPassword('Prosze zmienić parametry - nie istnieje haslo silne o takich parametrach');
            return;
        }

        while (password.length < desiredLength) {
            const randomIndex = Math.floor(Math.random() * (charset.length-1));
            password += charset[randomIndex];
        }
        if (!isSequentialPassword(password) && !hasRepeatingPassword(password)&& isCheckAllParameters(password,useUppercase,useLowercase,useSpecialChars,useNumbers)){
            displayPassword(password)
        } else {
            generateAndCheckPassword(); // Generowanie nowego hasła, jeśli znalezione hasło nie spełnia wymagań
        }
    }

    function displayPassword(password) {
        document.getElementById('passwordOutput').innerHTML = password;
    }

    function isCheckAllParameters(password,useUpperCase,useLowerCase,useSpecialChars,useNumbers){
        return (useLowerCase===/[a-ząćęłńóśźż]/.test(password)) &&
            (useUpperCase===/[A-ZĄĆĘŁŃÓŚŹŻ]/.test(password)) &&
                (useSpecialChars=== /[!@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?]/.test(password)) &&
                (useNumbers===/[0-9]/.test(password));
    }
    function calculateEntropy(charset){
        const charsetSize = charset.length;
        return Math.log2(charsetSize);
    }
    function generateAlphabet(useUppercase,useLowercase,useSpecialChars,useNumbers){
        let charset = '';

        if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (useSpecialChars) charset += '\!\?\,\$\@\#\+\%\*\&\-\=\;\^\.\:\{\}\_\(\)\:';
        if (useNumbers) charset += '0123456789';

        return charset
    }

    function copyPasswordToClipboard() {
        const passwordOutput = document.getElementById('passwordOutput');
        const textarea = document.createElement('textarea');
        textarea.value = passwordOutput.innerText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    document.getElementById('copyPasswordBtn').addEventListener('click', copyPasswordToClipboard);

    document.querySelectorAll('.form-range').forEach(item => {
        item.addEventListener('input', generateAndCheckPassword);
    });

    document.querySelectorAll('.form-check-input').forEach(item => {
        item.addEventListener('input', generateAndCheckPassword);
    });

    generateAndCheckPassword();
});
