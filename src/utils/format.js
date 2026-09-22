export const fmt = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });

let _id = 100;
export const nextId = () => (_id++).toString(36);
