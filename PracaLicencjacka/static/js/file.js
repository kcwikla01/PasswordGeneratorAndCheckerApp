async function pobierzDane(nazwaPliku) {
    try {
        const response = await fetch(`http://localhost:5000/pobierz_dane/${nazwaPliku}`);
        const data = await response.json();
        if (data.error) {
            console.error('Błąd:', data.error);
            return null;
        } else {
            return data.dane;
        }
    } catch (error) {
        console.error('Błąd:', error);
        return null;
    }
}

