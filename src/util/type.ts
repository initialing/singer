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
