export class Persona {

    private id!: number;
    private nom_cognoms : string;
    private usuari : string;
    private etapa: string;
    private curs: string;
    private grup: string;

    constructor(nom_cognoms : string, usuari : string, etapa: string, curs: string, grup: string, id?: number) { 
        id ? this.id = id : undefined;
        this.nom_cognoms = nom_cognoms;
        this.usuari = usuari;
        this.etapa = etapa;
        this.curs = curs;
        this.grup = grup;
    }

    //Getters
    public get getId(): number{
        return this.id;
    }
    public get getNomCognoms(): string{
        return this.nom_cognoms;
    }
    public get getUsuari(): string{
        return this.usuari;
    }
    public get getEtapa(): string{
        return this.etapa;
    }
    public get getCurs(): string{
        return this.curs;
    }
    public get getGrup(): string{
        return this.grup;
    }

    // SETTERS
    public set setId(id: number) {
        this.id;
    }
    public set setNomCognoms(nom_cognoms: string) {
        this.nom_cognoms = nom_cognoms;
    }
    public set setUsuari(usuari: string) {
        this.usuari = usuari;
    }
    public set setEtapa(etapa: string) {
        this.etapa = etapa;
    }
    public set setCurs(curs: string) {
        this.curs = curs;
    }
    public set setGrup(grup: string) {
        this.grup = grup;
    }
}
