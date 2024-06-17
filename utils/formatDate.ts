//Formatear date a string
export function formatDate(fecha: string) {
    const date = new Date(fecha);
    return date.toLocaleDateString('en-us',{ weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit", second:"2-digit" });
  }