
export const isNull = (object) => ( object == "" || object == null || object == undefined );

export const notNull = (object) => (  !isNull(object) );