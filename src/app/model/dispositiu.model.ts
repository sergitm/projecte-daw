export class Dispositiu {
    
    private id!: number;
    private nom : string;
    private tipus : string;
    private estat: string;

    constructor(nom : string, tipus : string, estat: string, id?: number) { 
        id ? this.id = id : undefined;
        this.nom = nom;
        this.tipus = tipus;
        this.estat = estat;
    }

    //Getters
    public get getId(): number{
        return this.id;
    }
    public get getNom(): string{
        return this.nom;
    }
    public get getTipus(): string{
        return this.tipus;
    }
    public get getEstat(): string{
        return this.estat;
    }

    // SETTERS
    public set setId(id: number) {
        this.id;
    }
    public set setNom(nom: string) {
        this.nom = nom;
    }
    public set setTipus(tipus: string) {
        this.tipus = tipus;
    }
    public set setEstat(estat: string) {
        this.estat = estat;
    }
}
