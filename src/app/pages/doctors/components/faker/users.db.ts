/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {User} from "../../../../components/users/user";
export const UsersDb: User[] = [
    {id: 1, name: 'alex', email: 'alex@mydoctor24.com', phone: '+375255283638'},
    {id: 2, name: 'foster', email: 'foster@mydoctor24.com', phone: '+375255283638'},
    {id: 3, name: 'abigail', email: 'alex@mydoctor24.com', phone: '+375255283638'},
    {id: 4, name: 'peter', email: 'alex@mydoctor24.com', phone: '+375255283638'},
    {id: 5, name: 'long', email: 'alex@mydoctor24.com', phone: '+375255283638'},
    {id: 6, name: 'gerome', email: 'alex@mydoctor24.com', phone: '+375255283638'},
    {id: 7, name: 'patric', email: 'alex@mydoctor24.com', phone: '+375255283638'},
    {id: 8, name: 'hans', email: 'alex@mydoctor24.com', phone: '+375255283638'},
    {id: 9, name: 'christophe', email: 'alex@mydoctor24.com', phone: '+375255283638'},
    {id: 10, name: 'mike', email: 'alex@mydoctor24.com', phone: '+375255283638'},
    {id: 11, name: 'gula', email: 'alex@mydoctor24.com', phone: '+375255283638'},
    {id: 12, name: 'josephine', email: 'alex@mydoctor24.com', phone: '+375255283638'},
    {id: 13, name: 'milli', email: 'milli@mydoctor24.com', phone: '+375255283638'},
    {id: 14, name: 'mura', email: 'mura@mydoctor24.com', phone: '+375255283638'},
].map(x => new User(x.id, x.name, x.email, x.phone));
