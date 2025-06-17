export interface City {
  id: number;
  name: string;
}

export interface State {
  id: number;
  name: string;
  cities: City[];
}

export const states: State[] = [
  {
    id: 1,
    name: "Acre",
    cities: [
      { id: 1, name: "Rio Branco" },
      { id: 2, name: "Cruzeiro do Sul" },
      // ... outras cidades
    ]
  },
  {
    id: 2,
    name: "Alagoas",
    cities: [
      { id: 1, name: "Maceió" },
      { id: 2, name: "Arapiraca" },
      // ... outras cidades
    ]
  },
  {
    id: 3,
    name: "Amapá",
    cities: [
      { id: 1, name: "Macapá" },
      { id: 2, name: "Santana" },
      // ... outras cidades
    ]
  },
  {
    id: 4,
    name: "Amazonas",
    cities: [
      { id: 1, name: "Manaus" },
      { id: 2, name: "Parintins" },
      // ... outras cidades
    ]
  },
  {
    id: 5,
    name: "Bahia",
    cities: [
      { id: 1, name: "Salvador" },
      { id: 2, name: "Feira de Santana" },
      // ... outras cidades
    ]
  },
  {
    id: 6,
    name: "Ceará",
    cities: [
      { id: 1, name: "Fortaleza" },
      { id: 2, name: "Caucaia" },
      // ... outras cidades
    ]
  },
  {
    id: 7,
    name: "Distrito Federal",
    cities: [
      { id: 1, name: "Brasília" },
      { id: 2, name: "Ceilândia" },
      // ... outras cidades
    ]
  },
  {
    id: 8,
    name: "Espírito Santo",
    cities: [
      { id: 1, name: "Vitória" },
      { id: 2, name: "Vila Velha" },
      // ... outras cidades
    ]
  },
  {
    id: 9,
    name: "Goiás",
    cities: [
      { id: 1, name: "Goiânia" },
      { id: 2, name: "Aparecida de Goiânia" },
      // ... outras cidades
    ]
  },
  {
    id: 10,
    name: "Maranhão",
    cities: [
      { id: 1, name: "São Luís" },
      { id: 2, name: "Imperatriz" },
      // ... outras cidades
    ]
  },
  {
    id: 11,
    name: "Mato Grosso",
    cities: [
      { id: 1, name: "Cuiabá" },
      { id: 2, name: "Várzea Grande" },
      // ... outras cidades
    ]
  },
  {
    id: 12,
    name: "Mato Grosso do Sul",
    cities: [
      { id: 1, name: "Campo Grande" },
      { id: 2, name: "Dourados" },
      // ... outras cidades
    ]
  },
  {
    id: 13,
    name: "Minas Gerais",
    cities: [
      { id: 1, name: "Belo Horizonte" },
      { id: 2, name: "Uberlândia" },
      // ... outras cidades
    ]
  },
  {
    id: 14,
    name: "Pará",
    cities: [
      { id: 1, name: "Belém" },
      { id: 2, name: "Ananindeua" },
      // ... outras cidades
    ]
  },
  {
    id: 15,
    name: "Paraíba",
    cities: [
      { id: 1, name: "João Pessoa" },
      { id: 2, name: "Campina Grande" },
      // ... outras cidades
    ]
  },
  {
    id: 16,
    name: "Paraná",
    cities: [
      { id: 1, name: "Curitiba" },
      { id: 2, name: "Londrina" },
      // ... outras cidades
    ]
  },
  {
    id: 17,
    name: "Pernambuco",
    cities: [
      { id: 1, name: "Recife" },
      { id: 2, name: "Jaboatão dos Guararapes" },
      // ... outras cidades
    ]
  },
  {
    id: 18,
    name: "Piauí",
    cities: [
      { id: 1, name: "Teresina" },
      { id: 2, name: "Parnaíba" },
      // ... outras cidades
    ]
  },
  {
    id: 19,
    name: "Rio de Janeiro",
    cities: [
      { id: 1, name: "Rio de Janeiro" },
      { id: 2, name: "São Gonçalo" },
      // ... outras cidades
    ]
  },
  {
    id: 20,
    name: "Rio Grande do Norte",
    cities: [
      { id: 1, name: "Natal" },
      { id: 2, name: "Mossoró" },
      // ... outras cidades
    ]
  },
  {
    id: 21,
    name: "Rio Grande do Sul",
    cities: [
      { id: 1, name: "Porto Alegre" },
      { id: 2, name: "Caxias do Sul" },
      // ... outras cidades
    ]
  },
  {
    id: 22,
    name: "Rondônia",
    cities: [
      { id: 1, name: "Porto Velho" },
      { id: 2, name: "Ji-Paraná" },
      // ... outras cidades
    ]
  },
  {
    id: 23,
    name: "Roraima",
    cities: [
      { id: 1, name: "Boa Vista" },
      { id: 2, name: "Caracaraí" },
      // ... outras cidades
    ]
  },
  {
    id: 24,
    name: "Santa Catarina",
    cities: [
      { id: 1, name: "Florianópolis" },
      { id: 2, name: "Joinville" },
      // ... outras cidades
    ]
  },
  {
    id: 25,
    name: "São Paulo",
    cities: [
      { id: 1, name: "São Paulo" },
      { id: 2, name: "Guarulhos" },
      // ... outras cidades
    ]
  },
  {
    id: 26,
    name: "Sergipe",
    cities: [
      { id: 1, name: "Aracaju" },
      { id: 2, name: "Nossa Senhora do Socorro" },
      // ... outras cidades
    ]
  },
  {
    id: 27,
    name: "Tocantins",
    cities: [
      { id: 1, name: "Palmas" },
      { id: 2, name: "Araguaína" },
      // ... outras cidades
    ]
  }
]; 