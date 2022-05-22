export type Normal = {
    createUser?: string;
    createTime?: Date;
    updateUser?: string;
    updateTime: Date;
};

export type CountryBase = {
    _id?: string;
    name?: string;
};

export type Country = CountryBase & Normal;

export type SelectOption = {
    _id?: string;
    name?: string;
};

export type Selector = {
    value: string;
    label: string;
};

export type ArtistBase = {
    _id?: string;
    name?: string;
    birthday?: string;
    deadTime?: string;
    country?: Country;
    activeTime?: string[][];
};

export type Artist = ArtistBase & Normal;
