function isSequentialPassword(password) {
            const sequentialPatterns = [
                "123", "234", "345", "456", "567", "678", "789", "890", "aaaa", "bbb", "ccc", "ddd", "eee", "zzz",
                "qwerty", "asdf", "zxcv", "qwe", "rty", "tyu", "yui", "uio", "asd", "sdf", "dfg", "fgh", "ghj", "hjk", "jkl", "zxc", "xcv", "cvb", "vbn", "bnm",
                "987654", "876543", "765432", "654321", "543210",
                "qwertyuiop", "asdfghjkl", "zxcvbnm",
                "abc", "def", "ghi", "jkl", "mno", "pqr", "stu", "vwx", "yz",
                "abc123", "def456", "ghi789", "123abc", "456def", "789ghi",
                "password", "letmein", "welcome", "monkey", "admin", "passw0rd",
            ];

            for (let pattern of sequentialPatterns) {
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

