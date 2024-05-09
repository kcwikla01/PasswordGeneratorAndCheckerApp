function isSequentialPassword(password) {
            for (let pattern of weakPasswordTable) {
                if (password.toLowerCase().includes(pattern)) {
                    return true;
                }
            }

            return false;
    }

      function hasRepeatingPassword(password) {

            const passwordsLetters = password.split("");
            for (let i = 0; i < passwordsLetters.length; i++) {
                if (password.split(passwordsLetters[i]).length - 1 >= 4) {
                    return true;
                }
            }
            return false;
    }

