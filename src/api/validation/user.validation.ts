const isNotString = (param: any) => typeof param !== "string";
const containsNumbers = (param: string) =>
  Boolean(param.split("").find((elem) => !isNaN(Number(elem))));

export const isNotName = (name: any) => {

  if (isNotString(name)) return true;

  if (containsNumbers(name)) return true;

  if (name.length < 3) return true;


  return false;
};

export const isNotEmail = (email: any) => {
  

  if (isNotString(email)) return true;

  

  if (!email.includes("@")) return true;
  

  const lastArroba = email.split("@")[1].split("").length > 3;
  if (!lastArroba) return true;


  return false;
};

export const isNotDate = (date: any) => {
  const dateForm = new Date(date);


  if (!dateForm.getDate()) return true;

  return false;
};

export const isNotPassword = (password: any) => {
  if (isNotString(password)) return true;

 
  if (password.length < 7) return true;
  const numberReg = /[0-9]/gm;
  if (!numberReg.test(password)) return true;
  const UpperCase = /[A-Z]/gm;
  if (!UpperCase.test(password)) return true;


  return false;
};

export default function IsNotClient(client: any) {
  return isNotName(client.firstName)
    ? true
    : isNotEmail(client.email)
    ? true
    : isNotDate(client.birth_date)
    ? true
    : isNotPassword(client.password)
    ? true
    : false;
}
