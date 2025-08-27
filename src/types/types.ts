export interface paramsSlug {
    params: {slug: string};
}
export interface paramsEmial {
    params :{email: string};
}
export  interface User {
    _id?: string;
    id: string;
    name?: string;
    email?: string;
    password?: string;
    image?: string;
    roles: string;
    isVerified?: boolean;
  }

export interface UpdateUser {
    name?: string;
    password?: string;
    roles?: string;
}