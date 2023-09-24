import randomInteger from "random-int";

export const generateAuthtoken = () => {
    const randomCode = randomInteger(1000, 9999);

    return randomCode;
};


export default generateAuthtoken;