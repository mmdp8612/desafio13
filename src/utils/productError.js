

export const validateProduct = ({title, description, price, code, stock, status, category}) => {
    const errors = [];
    if(!title) errors.push("Falta el campo title");
    if(!description) errors.push("Falta el campo description");
    if(!price) errors.push("Falta el campo price");
    if(!code) errors.push("Falta el campo code");
    if(!stock) errors.push("Falta el campo stock");
    if(!status) errors.push("Falta el campo status");
    if(!category) errors.push("Falta el campo category");
    return errors;
}