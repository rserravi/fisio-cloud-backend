const nameInitial= (name) =>{

    try {
        const val = ""+ name.replace(/\s/g,'');
        return val[0].toUpperCase()+".";
    } catch (error) {
        console.log(error.error);
    }
   
}

const addressComplete = (customerData)=>{
    return (
        customerData.streetaddress + ", " + customerData.postalcodeaddress + " " + customerData.cityaddress + " (" + customerData.stateaddress + "), " + customerData.countryaddress
    )
}

const documentFillFromBluprintAndCustomer =(blueprint, customer) =>{
    // LAS SIGUIENTES ETIQUETAS PUEDEN ESTAR EN EL DOCUMENTO.
    // {{patient}}, {{birthdate}} {{DNI}} {{address}} {{company}} {{username}}
    let newDoc, newDoc2, newDoc3, newDoc4 = "";
    newDoc = blueprint.replace("{{patient}}", customer.firstname + " " + customer.lastname)
    if (customer.birthdate){
        newDoc2 = newDoc.replace("{{birthdate}}", customer.birthdate.toLocaleDateString());
    }
    else {
        newDoc2 = newDoc
    }
    newDoc3 = newDoc2.replace("{{DNI}}", customer.dni);
    newDoc4 = newDoc3.replace("{{address}}", addressComplete(customer))
    return newDoc4;
}    

module.exports = (
    nameInitial, addressComplete, documentFillFromBluprintAndCustomer
)