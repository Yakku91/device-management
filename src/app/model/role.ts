import { ParseInjector, QueryOptions } from "@pagmf/parse";
import { PermissionRole } from "@pagmf/security";

export class Role extends PermissionRole{

    public static NAME='firstname';

    constructor(parseService: ParseInjector, role?: Role) {
        super(parseService, role)
    }
    public async loadUsers(options?: QueryOptions): Promise<any> {
        return await this.loadRelatedObjects('users', options)
    }
}
