//Verificar datos ingresados sobre los pacientes
export function verifyPatientData(name:string,description:string,website:string){
    if (name === "" || description === "" || website === "") {
        return 'Complete all fields';
    }
}