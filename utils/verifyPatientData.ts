export function verifyPatientData(name:string,description:string,website:string){
    if (name === "" || description === "" || website === "") {
        return 'Complete todos los campos';
    }
}