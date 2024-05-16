import { ParseService } from "@pagmf/parse";
import { ParseUser } from "@pagmf/security"

export class MyUser extends ParseUser {
    this: any;
    constructor(parseService: ParseService, user?: any) {
        if (!user) {
            user = new parseService.Parse.User();
        }
        super(parseService, user);
    }

    public static USERNAME = 'username';
    public static FIRSTNAME = 'firstname';
    public static LASTNAME = 'lastname';
    public static PASSWORD = 'password';
    public static PHONE = 'phone';
    public static EMAIL = 'email'

    get userId(): string {
        return this.getId() || this.id()
    }
    get username(): string {
        return this.getUsername();
    }
    get firstname(): string {
        return this.parseObject.get(MyUser.FIRSTNAME)
    }
    get lastname(): string {
        return this.parseObject.get(MyUser.LASTNAME)
    }
    get name(): string {
        if (!this.parseObject.get(MyUser.FIRSTNAME) && !this.parseObject.get(MyUser.LASTNAME)) {
            return this.getUsername()
        }
        return (this.parseObject.get(MyUser.FIRSTNAME) + ' ' + this.parseObject.get(MyUser.LASTNAME))
    }
    get email(): string {
        return this.getEmail();
    }
    get phone(): string {
        return this.parseObject.get(MyUser.PHONE)
    }
    get password(): string {
        return this.parseObject.get(MyUser.PASSWORD)
    }
    set username(username: string) {
        this.parseObject.set(MyUser.USERNAME, username)
    }
    set lastname(lastname: string) {
        this.parseObject.set(MyUser.LASTNAME, lastname)
    }
    set firstname(firstname: string) {
        this.parseObject.set(MyUser.FIRSTNAME, firstname)
    }
    set password(password: string) {
        this.parseObject?.set(MyUser.PASSWORD, password)
    }
    set phone(phone: string) {
        this.parseObject.set(MyUser.PHONE, phone)
    }
    set email(email: string) {
        this.parseObject.set(MyUser.EMAIL, email)
    }
}