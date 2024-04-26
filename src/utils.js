export const isArrayNonEmpty = (data) => {
    return isValidElement(data?.length) && data.length > 0
}

export const isArray = (data) => {
    return isValidElement(data?.length);
}

export const isValidElement =(data) => {
    return data !== null && data !== undefined;
}