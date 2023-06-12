export class Espai {

    private id!: number;
    private nom : string;

    constructor(nom : string, id?: number) { 
        id ? this.id = id : undefined;
        this.nom = nom;
    }

    //Getters
    public get getId(): number{
        return this.id;
    }
    public get getNom(): string{
        return this.nom;
    }

    // SETTERS
    public set setId(id: number) {
        this.id;
    }
    public set setNom(nom: string) {
        this.nom = nom;
    }
}
